/* eslint-disable @typescript-eslint/no-namespace */
import type { Canvas, LoadableImage } from './Canvas';

export const browser = typeof window !== 'undefined';

export type InternalCanvas = BrowserCanvas | SkiaCanvas | NodeCanvas;

export const mod: InternalCanvas = (() => {
	if (browser) {
		return { type: CanvasType.Browser, module: HTMLCanvasElement };
	}

	try {
		return { type: CanvasType.SkiaCanvas, module: require('skia-canvas') };
	} catch {
		return { type: CanvasType.NodeCanvas, module: require('canvas') };
	}
})();

export const getFontHeight = (() => {
	const kRegexSize = /([\d.]+)(px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q)/i;
	const kCache = new Map<string, number>();

	return (font: string): number => {
		// If it was already parsed, do not parse again
		const previous = kCache.get(font);
		if (previous) return previous;

		// Test for required properties first, return null if the text is invalid
		const sizeFamily = kRegexSize.exec(font);
		if (!sizeFamily) return 0;

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
export const resolveImage = (() => {
	if (mod.type === CanvasType.Browser) {
		return (src: string, options?: Partial<HTMLImageElement>): Promise<HTMLImageElement> => {
			return new Promise<HTMLImageElement>((resolve, reject) => {
				// eslint-disable-next-line no-undef
				const image = Object.assign(document.createElement('img'), options) as HTMLImageElement;

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
		};
	}

	if (mod.type === CanvasType.SkiaCanvas) {
		return (src: string | Buffer) => mod.module.loadImage(src);
	}

	return (src: LoadableImage, options?: any) => mod.module.loadImage(src, options);
})();

export const registerFont = (() => {
	if (mod.type === CanvasType.Browser) {
		return (() => {
			throw new Error('Unsupported, please use `@font-face` from CSS to load custom fonts.');
		}) as BrowserCanvas.registerFont;
	}

	if (mod.type === CanvasType.SkiaCanvas) {
		return mod.module.FontLibrary.use.bind(mod.module.FontLibrary) as SkiaCanvas.registerFont;
	}

	return mod.module.registerFont.bind(mod.module) as NodeCanvas.registerFont;
})();

/**
 * The names of the filters that take a string argument.
 */
type LiteralFilters = 'url';

export type Percentage<T extends number = number> = `${T}%`;

/**
 * The names of the filters that take a percentage argument.
 */
type PercentageFilters = 'brightness' | 'contrast' | 'grayscale' | 'invert' | 'opacity' | 'saturate' | 'sepia';

type RelativeLengthUnits = 'cap' | 'ch' | 'em' | 'ex' | 'ic' | 'lh' | 'rem' | 'rlh';
type RelativeUnits = RelativeLengthUnits | '%';
type ViewportPercentageUnits = 'vh' | 'vw' | 'vi' | 'vb' | 'vmin' | 'vmax';
type AbsoluteLengthUnits = 'px' | 'cm' | 'mm' | 'Q' | 'in' | 'pc' | 'pt';
type LengthUnits = RelativeUnits | ViewportPercentageUnits | AbsoluteLengthUnits;
export type Length<T extends number = number> = `${T}${LengthUnits}`;

/**
 * The names of the filters that take a length argument.
 */
type LengthFilters = 'blur';

type AngleUnits = 'deg' | 'grad' | 'rad' | 'turn';
export type Angle<T extends number = number> = `${T}${AngleUnits}`;

/**
 * The names of the filters that take an angle argument.
 */
type AngleFilters = 'hue-rotate';

export type Color = ColorKeyword | ColorHexadecimal | ColorRGB | ColorRGBA | ColorHSL | ColorHSLA;

interface Filter {
	<K extends LiteralFilters, V extends string>(name: K, url: V): `${K}(${V})`;
	<K extends PercentageFilters, V extends Percentage>(name: K, percentage: V): `${K}(${V})`;
	<K extends LengthFilters, V extends Length>(name: K, length: V): `${K}(${V})`;
	<K extends AngleFilters, V extends Angle>(name: K, angle: V): `${K}(${V})`;
	<Vx extends Length, Vy extends Length>(name: 'drop-shadow', x: Vx, y: Vy): `drop-shadow(${Vx} ${Vy})`;
	<Vx extends Length, Vy extends Length, Vb extends Length>(name: 'drop-shadow', x: Vx, y: Vy, blur: Vb): `drop-shadow(${Vx} ${Vy} ${Vb})`;
	<Vx extends Length, Vy extends Length, Vc extends Color>(name: 'drop-shadow', x: Vx, y: Vy, color: Vc): `drop-shadow(${Vx} ${Vy} ${Vc})`;
	<Vx extends Length, Vy extends Length, Vb extends Length, Vc extends Color>(
		name: 'drop-shadow',
		x: Vx,
		y: Vy,
		blur: Vb,
		color: Vc
	): `drop-shadow(${Vx} ${Vy} ${Vb} ${Vc})`;
	(value: 'none'): 'none';
}

// @ts-expect-error: Overload hell
export const filter: Filter = (name: string, ...args: readonly any[]) => `${name}(${args.join(' ')})` as const;

/**
 * Represents a formatted hexadecimal value.
 */
export type ColorHexadecimal<T extends string = string> = `#${T}`;

/**
 * Utility to format an hexadecimal string into a CSS hexadecimal string.
 * @param hex The hexadecimal code.
 * @example
 * hex('FFF'); // -> '#FFF'
 * hex('0F0F0F'); // -> '#0F0F0F'
 */
export const hex = <T extends string>(hex: T): ColorHexadecimal<T> => `#${hex}` as const;

/**
 * Represents a formatted RGB value.
 */
export type ColorRGB<R extends number = number, G extends number = number, B extends number = number> = `rgb(${R}, ${G}, ${B})`;

/**
 * Utility to format a RGB set of values into a string.
 * @param red The red value, must be a number between 0 and 255 inclusive.
 * @param green The green value, must be a number between 0 and 255 inclusive.
 * @param blue The blue value, must be a number between 0 and 255 inclusive.
 * @see https://en.wikipedia.org/wiki/RGB_color_model#Geometric_representation
 * @example
 * rgb(255, 150, 65); // -> 'rgb(255, 150, 65)'
 */
export const rgb = <R extends number, G extends number, B extends number>(red: R, green: G, blue: B): ColorRGB<R, G, B> =>
	`rgb(${red}, ${green}, ${blue})` as const;

/**
 * Represents a formatted RGBA value.
 */
export type ColorRGBA<R extends number = number, G extends number = number, B extends number = number, A extends number = number> =
	`rgba(${R}, ${G}, ${B}, ${A})`;

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
export const rgba = <R extends number, G extends number, B extends number, A extends number>(
	red: R,
	green: G,
	blue: B,
	alpha: A
): ColorRGBA<R, G, B, A> => `rgba(${red}, ${green}, ${blue}, ${alpha})` as const;

/**
 * Represents a formatted HSL value.
 */
export type ColorHSL<H extends number = number, S extends number = number, L extends number = number> = `hsl(${H}, ${S}%, ${L}%)`;

/**
 * Utility to format a HSL set of values into a string.
 * @param hue The hue, must be a number between 0 and 360 inclusive.
 * @param saturation The saturation, must be a number between 0 and 100 inclusive.
 * @param lightness The lightness, must be a number between 0 and 100 inclusive, 0 will make it black, 100 will make it white.
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV
 * @example
 * hsl(120, 100, 40); // -> 'hsl(120, 100, 40)'
 */
export const hsl = <H extends number, S extends number, L extends number>(hue: H, saturation: S, lightness: L): ColorHSL<H, S, L> =>
	`hsl(${hue}, ${saturation}%, ${lightness}%)` as const;

/**
 * Represents a formatted HSL value.
 */
export type ColorHSLA<H extends number = number, S extends number = number, L extends number = number, A extends number = number> =
	`hsla(${H}, ${S}%, ${L}%, ${A})`;

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
export const hsla = <H extends number, S extends number, L extends number, A extends number>(
	hue: H,
	saturation: S,
	lightness: L,
	alpha: A
): ColorHSLA<H, S, L, A> => `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})` as const;

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

export const enum CanvasType {
	Browser,
	SkiaCanvas,
	NodeCanvas
}

export interface BrowserCanvas {
	type: CanvasType.Browser;
	module: typeof HTMLCanvasElement;
}

export namespace BrowserCanvas {
	export type Canvas = HTMLCanvasElement;
	export type Image = HTMLImageElement;
	export type Context2D = CanvasRenderingContext2D;
	export type registerFont = () => never;
}

export interface SkiaCanvas {
	type: CanvasType.SkiaCanvas;
	module: typeof import('skia-canvas');
}

export namespace SkiaCanvas {
	export type Canvas = import('skia-canvas').Canvas;
	export type Image = import('skia-canvas').Image;
	export type Context2D = import('skia-canvas').CanvasRenderingContext2D;
	export type registerFont = import('skia-canvas').FontLibrary['use'];
}

export interface NodeCanvas {
	type: CanvasType.NodeCanvas;
	module: typeof import('canvas');
}

export namespace NodeCanvas {
	export type Canvas = import('canvas').Canvas;
	export type Image = import('canvas').Image;
	export type Context2D = import('canvas').CanvasRenderingContext2D;
	export type registerFont = typeof import('canvas')['registerFont'];
}
