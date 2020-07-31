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

/**
 * Utility to format an hexadecimal string into a CSS hexadecimal string.
 * @param hex The hexadecimal code.
 * @example
 * hex('FFF'); // -> '#FFF'
 * hex('0F0F0F'); // -> '#0F0F0F'
 */
export const hex = (hex: string): string => `#${hex}`;

/**
 * Utility to format a RGB set of values into a string.
 * @param red The red value, must be a number between 0 and 255 inclusive.
 * @param green The green value, must be a number between 0 and 255 inclusive.
 * @param blue The blue value, must be a number between 0 and 255 inclusive.
 * @see https://en.wikipedia.org/wiki/RGB_color_model#Geometric_representation
 * @example
 * rgb(255, 150, 65); // -> 'rgb(255, 150, 65)'
 */
export const rgb = (red: number, green: number, blue: number): string => `rgb(${red}, ${green}, ${blue})`;

/**
 * Utility to format a RGBA set of values into a string.
 * @param red The red value, must be a number between 0 and 255 inclusive.
 * @param green The green value, must be a number between 0 and 255 inclusive.
 * @param blue The blue value, must be a number between 0 and 255 inclusive.
 * @param alpha The alpha value, must be a number between 0 and 1 inclusive.
 * @see https://en.wikipedia.org/wiki/RGB_color_model#Geometric_representation
 * @example
 * rgba(255, 150, 65, 0.3); // -> 'rgba(255, 150, 65, 0.3)'
 */
export const rgba = (red: number, green: number, blue: number, alpha: number): string => `rgba(${red}, ${green}, ${blue}, ${alpha})`;

/**
 * Utility to format a HSL set of values into a string.
 * @param hue The hue, must be a number between 0 and 360 inclusive.
 * @param saturation The saturation, must be a number between 0 and 100 inclusive.
 * @param lightness The lightness, must be a number between 0 and 100 inclusive, 0 will make it black, 100 will make it white.
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV
 * @example
 * hsl(120, 100, 40); // -> 'hsl(120, 100, 40)'
 */
export const hsl = (hue: number, saturation: number, lightness: number): string => `hsl(${hue}, ${saturation}%, ${lightness}%)`;

/**
 * Utility to format a HSLA set of values into a string.
 * @param hue The hue, must be a number between 0 and 360 inclusive.
 * @param saturation The saturation, must be a number between 0 and 100 inclusive.
 * @param lightness The lightness, must be a number between 0 and 100 inclusive, 0 will make it black, 100 will make it white
 * @param alpha The alpha value, must be a number between 0 and 1 inclusive.
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV
 * @example
 * hsla(120, 100, 40, 0.4); // -> 'hsla(120, 100, 40, 0.4)'
 */
export const hsla = (hue: number, saturation: number, lightness: number, alpha: number): string =>
	`hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;

/**
 * Utility to type-safely use CSS colors.
 * @param color The CSS keyword color.
 * @example
 * color('silver'); // ✔
 * color('some-imaginary-number'); // ❌
 */
export const color = (color: ColorKeyword): ColorKeyword => color;

export type ColorKeyword = ColorKeywordLevel1 | ColorKeywordLevel2 | ColorKeywordLevel3 | ColorKeywordLevel4;

export type ColorKeywordLevel1 =
	| 'black'
	| 'silver'
	| 'gray'
	| 'white'
	| 'maroon'
	| 'red'
	| 'purple'
	| 'fuchsia'
	| 'green'
	| 'lime'
	| 'olive'
	| 'yellow'
	| 'navy'
	| 'blue'
	| 'teal'
	| 'aqua';

export type ColorKeywordLevel2 = 'orange';

export type ColorKeywordLevel3 =
	| 'aliceblue'
	| 'antiquewhite'
	| 'aquamarine'
	| 'azure'
	| 'beige'
	| 'bisque'
	| 'blanchedalmond'
	| 'blueviolet'
	| 'brown'
	| 'burlywood'
	| 'cadetblue'
	| 'chartreuse'
	| 'chocolate'
	| 'coral'
	| 'cornflowerblue'
	| 'cornsilk'
	| 'crimson'
	| 'cyan'
	| 'darkblue'
	| 'darkcyan'
	| 'darkgoldenrod'
	| 'darkgray'
	| 'darkgreen'
	| 'darkgrey'
	| 'darkkhaki'
	| 'darkmagenta'
	| 'darkolivegreen'
	| 'darkorange'
	| 'darkorchid'
	| 'darkred'
	| 'darksalmon'
	| 'darkseagreen'
	| 'darkslateblue'
	| 'darkslategray'
	| 'darkslategrey'
	| 'darkturquoise'
	| 'darkviolet'
	| 'deeppink'
	| 'deepskyblue'
	| 'dimgray'
	| 'dimgrey'
	| 'dodgerblue'
	| 'firebrick'
	| 'floralwhite'
	| 'forestgreen'
	| 'gainsboro'
	| 'ghostwhite'
	| 'gold'
	| 'goldenrod'
	| 'greenyellow'
	| 'grey'
	| 'honeydew'
	| 'hotpink'
	| 'indianred'
	| 'indigo'
	| 'ivory'
	| 'khaki'
	| 'lavender'
	| 'lavenderblush'
	| 'lawngreen'
	| 'lemonchiffon'
	| 'lightblue'
	| 'lightcoral'
	| 'lightcyan'
	| 'lightgoldenrodyellow'
	| 'lightgray'
	| 'lightgreen'
	| 'lightgrey'
	| 'lightpink'
	| 'lightsalmon'
	| 'lightseagreen'
	| 'lightskyblue'
	| 'lightslategray'
	| 'lightslategrey'
	| 'lightsteelblue'
	| 'lightyellow'
	| 'limegreen'
	| 'linen'
	| 'magenta'
	| 'mediumaquamarine'
	| 'mediumblue'
	| 'mediumorchid'
	| 'mediumpurple'
	| 'mediumseagreen'
	| 'mediumslateblue'
	| 'mediumspringgreen'
	| 'mediumturquoise'
	| 'mediumvioletred'
	| 'midnightblue'
	| 'mintcream'
	| 'mistyrose'
	| 'moccasin'
	| 'navajowhite'
	| 'oldlace'
	| 'olivedrab'
	| 'orangered'
	| 'orchid'
	| 'palegoldenrod'
	| 'palegreen'
	| 'paleturquoise'
	| 'palevioletred'
	| 'papayawhip'
	| 'peachpuff'
	| 'peru'
	| 'pink'
	| 'plum'
	| 'powderblue'
	| 'rosybrown'
	| 'royalblue'
	| 'saddlebrown'
	| 'salmon'
	| 'sandybrown'
	| 'seagreen'
	| 'seashell'
	| 'sienna'
	| 'skyblue'
	| 'slateblue'
	| 'slategray'
	| 'slategrey'
	| 'snow'
	| 'springgreen'
	| 'steelblue'
	| 'tan'
	| 'thistle'
	| 'tomato'
	| 'turquoise'
	| 'violet'
	| 'wheat'
	| 'whitesmoke'
	| 'yellowgreen';

export type ColorKeywordLevel4 = 'rebeccapurple';
