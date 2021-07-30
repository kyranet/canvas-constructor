// eslint-disable-next-line spaced-comment
/// <reference lib="dom" />

import type { BaseCanvas } from './BaseCanvas';

/**
 * Invert an image
 * @param canvas The Canvas instance
 */
export const invert = (canvas: BaseCanvas) =>
	canvas.save().setGlobalCompositeOperation('difference').setColor('white').printRectangle(0, 0, canvas.width, canvas.height).restore();

/**
 * Greyscale an image
 * @param canvas The Canvas instance
 */
export const greyscale = (canvas: BaseCanvas) => {
	const imageData = canvas.getImageData();
	const { data } = imageData;
	for (let i = 0; i < data.length; i += 4) {
		const luminance = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
		data[i] = luminance;
		data[i + 1] = luminance;
		data[i + 2] = luminance;
	}

	return canvas.putImageData(imageData, 0, 0);
};
export const grayscale = greyscale;

/**
 * Invert then greyscale an image
 * @param canvas The Canvas instance
 */
export const invertGrayscale = (canvas: BaseCanvas) => {
	const imageData = canvas.getImageData();
	const { data } = imageData;
	for (let i = 0; i < data.length; i += 4) {
		const luminance = 255 - (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]);
		data[i] = luminance;
		data[i + 1] = luminance;
		data[i + 2] = luminance;
	}

	return canvas.putImageData(imageData, 0, 0);
};
export const invertGreyscale = invertGrayscale;

/**
 * Give an image a sepia tone
 * @param canvas The Canvas instance
 */
export const sepia = (canvas: BaseCanvas): BaseCanvas => {
	const imageData = canvas.getImageData();
	const { data } = imageData;
	for (let i = 0; i < data.length; i += 4) {
		const r = data[i];
		const g = data[i + 1];
		const b = data[i + 2];
		data[i] = r * 0.393 + g * 0.769 + b * 0.189;
		data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
		data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
	}
	return canvas.putImageData(imageData, 0, 0);
};

/**
 * Turn an image into a silhouette
 * @param canvas The Canvas instance
 */
export const silhouette = (canvas: BaseCanvas): BaseCanvas => {
	const imageData = canvas.getImageData();
	const { data } = imageData;
	for (let i = 0; i < data.length; i += 4) {
		data[i] = 0;
		data[i + 1] = 0;
		data[i + 2] = 0;
	}

	return canvas.putImageData(imageData, 0, 0);
};

/**
 * Apply a threshold to the image
 * @param canvas The Canvas instance
 * @param threshold The threshold to apply in a range of 0 to 255
 */
export const threshold = (canvas: BaseCanvas, threshold: number): BaseCanvas => {
	const imageData = canvas.getImageData();
	const { data } = imageData;
	for (let i = 0; i < data.length; i += 4) {
		const luminance = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2] >= threshold ? 255 : 0;
		data[i] = luminance;
		data[i + 1] = luminance;
		data[i + 2] = luminance;
	}

	return canvas.putImageData(imageData, 0, 0);
};

/**
 * Apply an inverted threshold to the image
 * @param canvas The Canvas instance
 * @param threshold The threshold to apply in a range of 0 to 255
 */
export const invertedThreshold = (canvas: BaseCanvas, threshold: number): BaseCanvas => {
	const imageData = canvas.getImageData();
	const { data } = imageData;
	for (let i = 0; i < data.length; i += 4) {
		const luminance = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2] >= threshold ? 0 : 255;
		data[i] = luminance;
		data[i + 1] = luminance;
		data[i + 2] = luminance;
	}

	return canvas.putImageData(imageData, 0, 0);
};

/**
 * Brighten an image
 * @param canvas The Canvas instance
 * @param brightness The brightness to apply in a range of 0 to 255
 */
export const brightness = (canvas: BaseCanvas, brightness: number): BaseCanvas => {
	const imageData = canvas.getImageData();
	const { data } = imageData;
	for (let i = 0; i < data.length; i += 4) {
		data[i] += brightness;
		data[i + 1] += brightness;
		data[i + 2] += brightness;
	}

	return canvas.putImageData(imageData, 0, 0);
};

/**
 * Darken an image
 * @param canvas The Canvas instance
 * @param darkness The darkness to apply in a range of 0 to 255
 */
export const darkness = (canvas: BaseCanvas, darkness: number): BaseCanvas => {
	const imageData = canvas.getImageData();
	const { data } = imageData;
	for (let i = 0; i < data.length; i += 4) {
		data[i] -= darkness;
		data[i + 1] -= darkness;
		data[i + 2] -= darkness;
	}

	return canvas.putImageData(imageData, 0, 0);
};
export const myOldFriend = darkness;

/**
 * Convolute a image. This filter needs a fix.
 * @param canvas The Canvas instance
 * @param weights The weights
 * @param opaque Whether or not pixels should try to be opaque
 * @see https://www.html5rocks.com/en/tutorials/canvas/imagefilters/
 */
export const convolute = (canvas: BaseCanvas, weights: readonly number[], opaque = true): BaseCanvas => {
	const side = Math.round(Math.sqrt(weights.length));
	const halfSide = Math.floor(side / 2);

	const pixels = canvas.getImageData();
	const src = pixels.data;
	const sw = pixels.width;
	const sh = pixels.height;

	// pad output by the convolution matrix
	const w = sw;
	const h = sh;
	const output = canvas.getImageData();
	const dst = output.data;

	// go through the destination image pixels
	const alphaFac = opaque ? 1 : 0;
	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) {
			const sy = y;
			const sx = x;
			const dstOff = (y * w + x) * 4;
			// calculate the weighed sum of the source image pixels that
			// fall under the convolution matrix
			let r = 0;
			let g = 0;
			let b = 0;
			let a = 0;
			for (let cy = 0; cy < side; cy++) {
				for (let cx = 0; cx < side; cx++) {
					const scy = sy + cy - halfSide;
					const scx = sx + cx - halfSide;
					if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
						const srcOff = (scy * sw + scx) * 4;
						const wt = weights[cy * side + cx];
						r += src[srcOff] * wt;
						g += src[srcOff + 1] * wt;
						b += src[srcOff + 2] * wt;
						a += src[srcOff + 3] * wt;
					}
				}
			}
			dst[dstOff] = r;
			dst[dstOff + 1] = g;
			dst[dstOff + 2] = b;
			dst[dstOff + 3] = a + alphaFac * (255 - a);
		}
	}

	return canvas.putImageData(output, 0, 0);
};

/**
 * The LaPlace matrix for edge
 * @internal
 */
const edgeLaPlaceMatrix = [0, -1, 0, -1, 4, -1, 0, -1, 0];

/**
 * Display an image's edges
 * @param canvas The Canvas instance
 */
export const edge = (canvas: BaseCanvas): BaseCanvas => convolute(canvas, edgeLaPlaceMatrix, true);

/**
 * The LaPlace matrix for sharpen
 * @internal
 */
const sharpenLaPlaceMatrix = [0, -1, 0, -1, 5, -1, 0, -1, 0];

/**
 * Sharpen an image
 * @param canvas The Canvas instance
 * @param passes The amount of iterations to do
 */
export const sharpen = (canvas: BaseCanvas, passes = 1): BaseCanvas => {
	for (let i = 0; i < passes; ++i) {
		convolute(canvas, sharpenLaPlaceMatrix, true);
	}

	return canvas;
};

/**
 * The LaPlace matrix for blur
 * @internal
 */
const blurLaPlaceMatrix = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9];

/**
 * Blur an image
 * @param canvas The Canvas instance
 * @param passes The amount of iterations to do
 */
export const blur = (canvas: BaseCanvas, passes = 1): BaseCanvas => {
	for (let i = 0; i < passes; ++i) {
		convolute(canvas, blurLaPlaceMatrix, true);
	}

	return canvas;
};
