/* eslint-disable no-bitwise */

const { Image, Canvas } = require('canvas');

module.exports = buffer => {
	if (!(buffer instanceof Buffer)) throw new TypeError(`Expected type Buffer. Received: ${typeof buffer}`);
	const image = new Image();
	image.src = buffer;
	const canvas = new Canvas(image.width, image.height);
	const ctx = canvas.getContext('2d');
	const data = ctx.getImageData(0, 0, image.width, image.height);
	let i = -4;
	let count = 0;
	const rgb = { r: 0, g: 0, b: 0 };
	while ((i += 5 * 4) < data.data.length) {
		++count;
		rgb.r += data.data[i];
		rgb.g += data.data[i + 1];
		rgb.b += data.data[i + 2];
	}

	// ~~ used to floor values
	rgb.r = ~~(rgb.r / count);
	rgb.g = ~~(rgb.g / count);
	rgb.b = ~~(rgb.b / count);

	return rgb;
};
