import { Canvas as NodeCanvas, Image, loadImage } from 'canvas';
import type { Canvas, LoadableImage } from './Canvas';

export const browser = typeof window !== 'undefined';

export const internalCanvas = (() => {
	// eslint-disable-next-line no-undef
	if (browser) return typeof HTMLCanvasElement === 'undefined' ? null : HTMLCanvasElement;
	try {
		return require('canvas-prebuilt');
	} catch (_) {
		return require('canvas');
	}
})();

export const getFontHeight = (() => {
	// node-canvas has its own font parser
	if (!browser && 'parseFont' in internalCanvas) return (font: string) => internalCanvas.parseFont(font).size;

	// Load polyfill
	const kRegexSize = /([\d.]+)(px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q)/i;
	const kCache = new Map<string, number>();

	return (font: string) => {
		// If it was already parsed, do not parse again
		const previous = kCache.get(font);
		if (previous) return previous;

		// Test for required properties first, return null if the text is invalid
		const sizeFamily = kRegexSize.exec(font);
		if (!sizeFamily) return null;

		let size = Number(sizeFamily[1]);
		const unit = sizeFamily[2];

		switch (unit) {
			case 'pt':
				size /= 0.75;
				break;
			case 'pc':
				size *= 16;
				break;
			case 'in':
				size *= 96;
				break;
			case 'cm':
				size *= 96.0 / 2.54;
				break;
			case 'mm':
				size *= 96.0 / 25.4;
				break;
			case 'em':
			case 'rem':
				size *= 16 / 0.75;
				break;
			case 'q':
				size *= 96 / 25.4 / 4;
				break;
		}

		kCache.set(font, size);
		return size;
	};
})();

export const textWrap = (canvas: Canvas, text: string, wrapWidth: number): string => {
	const result = [];
	const buffer = [];

	const spaceWidth = canvas.measureText(' ').width;

	// Run the loop for each line
	for (const line of text.split(/\r?\n/)) {
		let spaceLeft = wrapWidth;

		// Run the loop for each word
		for (const word of line.split(' ')) {
			const wordWidth = canvas.measureText(word).width;
			// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
			const wordWidthWithSpace = wordWidth + spaceWidth;

			if (wordWidthWithSpace > spaceLeft) {
				if (buffer.length) {
					result.push(buffer.join(' '));
					buffer.length = 0;
				}
				buffer.push(word);
				spaceLeft = wrapWidth - wordWidth;
			} else {
				spaceLeft -= wordWidthWithSpace;
				buffer.push(word);
			}
		}

		if (buffer.length) {
			result.push(buffer.join(' '));
			buffer.length = 0;
		}
	}

	return result.join('\n');
};

/**
 * Resolves an Image or Buffer
 * @param src An Image instance or a buffer
 * @param cb The callback
 */
export const resolveImage = (src: LoadableImage, options?: any): Promise<NodeCanvas | Image> => {
	if (browser) {
		return new Promise((resolve, reject) => {
			// eslint-disable-next-line no-undef
			const image = Object.assign(document.createElement('img'), options);

			function cleanup() {
				image.onload = null;
				image.onerror = null;
			}

			image.onload = () => {
				cleanup();
				resolve(image);
			};
			image.onerror = () => {
				cleanup();
				reject(new Error(`Failed to load the image "${src}"`));
			};

			image.src = src;
		});
	}

	return loadImage(src, options);
};
