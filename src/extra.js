/* extra canvas methods */

const { Canvas, Image } = require('canvas');

/**
 * <warning>Quality must be a multiple of 4. Setting quality very low will negatively impact performance.</warning>
 * Gets the vibrant color of an image
 * @param {Buffer} buffer The buffer of the image
 * @param {number} quality The precision used while getting the vibrant color
 * @returns {any} An object containing RGBA values for the color
 */
exports.vibrant = (buffer, quality = 20) => {
	if (!(buffer instanceof Uint8Array)) throw new TypeError('You must provide a valid Uint8Array or Buffer.');
	const img = new Image();
	img.src = buffer;
	const canvas = new Canvas(img.width, img.height);
	const ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0, img.width, img.height);
	const { data: pixels } = ctx.getImageData(0, 0, img.width, img.height);
	const pixelCount = buffer.length / 4;
	const pixelMap = new Map();
	/* eslint-disable no-bitwise */
	for (let i = 0, offset; i < pixelCount; i += quality) {
		offset = i * 4;
		const id = (pixels[offset] << 24) + (pixels[offset + 1] << 16) + (pixels[offset + 2] << 8) + pixels[offset + 3];
		pixelMap.set(id, (pixelMap.get(id) || 0) + 1);
	}
	return [...pixelMap].sort((a, b) => a[1] > b[1] ? -1 : 1).slice(0, 3).map(([n, count]) => ({
		count,
		r: (n >> 24) & 0xFF,
		g: (n >> 16) & 0xFF,
		b: (n >> 8) & 0xFF,
		a: n & 0xFF
	}));
	/* eslint-enable no-bitwise */
};

/**
 * Gets the average color of an image.
 * @param {Buffer} buffer The buffer of the image.
 * @returns {any} An object containing RGBA values of the average color
 */
exports.average = buffer => {
	if (!(buffer instanceof Uint8Array)) throw new TypeError('You must provide a valid UInt8Array or Buffer.');
	const image = new Image();
	image.src = buffer;
	const canvas = new Canvas(image.width, image.height);
	const ctx = canvas.getContext('2d');
	ctx.drawImage(image, 0, 0, image.width, image.height);
	const data = ctx.getImageData(0, 0, image.width, image.height);
	let i = -4;
	let count = 0;
	const rgb = { r: 0, g: 0, b: 0 };
	while ((i += 5 * 4) < data.data.length) {
		++count;
		rgb.r += data.data[i];
		rgb.g += data.data[i + 1];
		rgb.b += data.data[i + 2];
		rgb.a += data.data[i + 3];
	}
	/* eslint-disable no-bitwise */
	// ~~ used to floor values
	rgb.r = ~~(rgb.r / count);
	rgb.g = ~~(rgb.g / count);
	rgb.b = ~~(rgb.b / count);
	rgb.a = ~~(rgb.a / count);
	/* eslint-enable no-bitwise */
	return rgb;
};
