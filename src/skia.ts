// eslint-disable-next-line spaced-comment
/// <reference lib="dom" />

import {
	Canvas as SkiaCanvas,
	CanvasRenderingContext2D as SkiaCanvasRenderingContext2D,
	FontLibrary,
	FontVariant,
	Image as SkiaImage,
	loadImage,
	Path2D
} from 'skia-canvas';
import { BaseCanvas } from './lib/BaseCanvas';

export type RenderImageFormat = `${`${'image/' | ''}${'png' | 'jpg'}` | 'image/svg+xml' | 'svg' | `${'application/' | ''}pdf`}${`@${number}x` | ''}`;

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-ligatures
 */
export type FontVariantLigatures =
	| 'common-ligatures'
	| 'no-common-ligatures'
	| 'discretionary-ligatures'
	| 'no-discretionary-ligatures'
	| 'historical-ligatures'
	| 'no-historical-ligatures'
	| 'contextual'
	| 'no-contextual';

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-alternates
 */
export type FontVariantAlternates =
	| 'historical-forms'
	| `stylistic(${string})`
	| `styleset(${string})`
	| `character-variant(${string})`
	| `swash(${string})`
	| `ornaments(${string})`
	| `annotation()${string}'`;

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-caps
 */
export type FontVariantCaps = 'small-caps' | 'all-small-caps' | 'petite-caps';

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric
 */
export type FontVariantNumeric =
	| 'lining-nums'
	| 'oldstyle-nums'
	| 'proportional-nums'
	| 'tabular-nums'
	| 'diagonal-fractions'
	| 'stacked-fractions'
	| 'ordinal'
	| 'slashed-zero';

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-east-asian
 */
export type FontVariantEastAsian =
	| 'jis78'
	| 'jis83'
	| 'jis90'
	| 'jis04'
	| 'simplified'
	| 'traditional'
	| 'full-width'
	| 'proportional-width'
	| 'ruby';

export type FontVariantString = 'normal' | 'none' | string;

export interface RenderOptions {
	/**
	 * An integer that allows for the individual selection of pages in a multi-page canvas.
	 * @note Page indexing starts with page 1 not 0. The page value can also be negative, counting from the end of the
	 * canvas's `pages` array.
	 * @default -1
	 */
	page?: number;

	/**
	 * By default, the images will be at a 1:1 ratio with the canvas's width and height dimensions (i.e., a 72 × 72
	 * canvas will yield a 72 pixel × 72 pixel bitmap). But with screens increasingly operating at higher densities,
	 * you'll frequently want to generate images where an on-canvas 'point' may occupy multiple pixels. The optional
	 * density argument allows you to specify this magnification factor using an integer ≥1.
	 */
	density?: number;

	/**
	 * A number between 0 and 1.0 that controls the level of JPEG compression both when making JPEG files directly and
	 * when embedding them in a PDF.
	 * @default 0.92
	 */
	quality?: number;

	/**
	 * When generating SVG output containing text, you have two options for how to handle the fonts that were used. By
	 * default, SVG files will contain <text> elements that refer to the fonts by name in the embedded stylesheet. This
	 * requires that viewers of the SVG have the same fonts available on their system (or accessible as web-fonts).
	 * Setting the optional outline argument to true will trace all the letter-forms and 'burn' them into the file as
	 * bézier paths. This will result in a much larger file (and one in which the original text strings will be
	 * unrecoverable), but it will be viewable regardless of the specifics of the system it's displayed on.
	 * @default false
	 */
	outline?: boolean;
}

export interface SaveAsOptions extends RenderOptions {
	/**
	 * The image format to use.
	 */
	format?: RenderImageFormat;
}

export class Canvas extends BaseCanvas<SkiaCanvas, SkiaCanvasRenderingContext2D> {
	public constructor(canvas: SkiaCanvas, context: SkiaCanvasRenderingContext2D);
	public constructor(width: number, height: number);
	public constructor(width: SkiaCanvas | number, height?: SkiaCanvasRenderingContext2D | number) {
		if (typeof width === 'number') {
			super(new SkiaCanvas(width, height as number));
		} else {
			super(width, height as SkiaCanvasRenderingContext2D);
		}
	}

	/**
	 * Returns the pages created with {@link SkiaCanvas.newPage}.
	 */
	public getPages(): readonly SkiaCanvasRenderingContext2D[];
	/**
	 * Calls the callback with the pages created with {@link SkiaCanvas.newPage}, and returns itself.
	 * @param cb The callback to be called.
	 */
	public getPages(cb: (pages: readonly SkiaCanvasRenderingContext2D[]) => void): this;
	public getPages(cb?: (pages: readonly SkiaCanvasRenderingContext2D[]) => void) {
		if (typeof cb === 'function') {
			cb(this.canvas.pages);
			return this;
		}

		return this.canvas.pages;
	}

	/**
	 * Creates a new page for the canvas, which can be retrieved later with {@link SkiaCanvas.getPages}.
	 * @param width The width of the new page.
	 * @param height The height of the new page.
	 * @returns A new instance of {@link SkiaCanvas} with the new context.
	 */
	public newPage(width: number, height: number): Canvas {
		return new Canvas(this.canvas, this.canvas.newPage(width, height));
	}

	/**
	 * Sets the canvas's CSS3 [font-variant](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant).
	 * @param fontVariant The CSS3 [font-variant](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant) value
	 * to be set.
	 * @note The font-variant does not persist between font changes. Additionally, you can use {@link fontVariant}
	 */
	public setFontVariant(fontVariant: FontVariantString): this {
		this.context.fontVariant = fontVariant;
		return this;
	}

	/**
	 * Returns the canvas's current CSS3 [font-variant](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant).
	 */
	public getFontVariant(): FontVariantString;
	/**
	 * Calls the callback with the canvas's current CSS3
	 * [font-variant](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant), and returns itself.
	 * @param cb The callback to be called.
	 */
	public getFontVariant(cb: (fontVariant: FontVariantString) => void): this;
	public getFontVariant(cb?: (fontVariant: FontVariantString) => void) {
		if (typeof cb === 'function') {
			cb(this.context.fontVariant);
			return this;
		}

		return this.context.fontVariant;
	}

	/**
	 * Sets the text tracking property in the canvas.
	 * @param textTracking An integer representing the amount of space to add/remove in terms of 1/1000’s of an ‘em’
	 * (a.k.a. the current font size). Positive numbers will space out the text (e.g., `100` is a good value for setting
	 * all-caps) while negative values will pull the letters closer together (this is only rarely a good idea).
	 * @note The tracking value defaults to `0` and settings will persist across font changes.
	 */
	public setTextTracking(textTracking: number): this {
		this.context.textTracking = textTracking;
		return this;
	}

	/**
	 * Returns the text tracking property.
	 * @see {@link SkiaCanvas.setTextTracking}
	 */
	public getTextTracking(): number;
	/**
	 * Calls the callback with the text tracking property, and returns itself.
	 * @param cb The callback to be called.
	 * @see {@link SkiaCanvas.setTextTracking}
	 */
	public getTextTracking(cb: (textTracking: number) => void): this;
	public getTextTracking(cb?: (textTracking: number) => void) {
		if (typeof cb === 'function') {
			cb(this.context.textTracking);
			return this;
		}

		return this.context.textTracking;
	}

	/**
	 * Sets whether or not Skia's text-wrap system should be enabled. Setting to `true` has the following effects:
	 *
	 * - {@link SkiaCanvas.printText} will honor newlines as opposed to converting them to spaces.
	 * - {@link SkiaCanvas.printText}'s width argument will be interpreted as column width and will word-wrap long lines.
	 * - {@link SkiaCanvas.printStrokeText}'s width argument will be interpreted as column width and will word-wrap long lines.
	 *
	 * However, when set to `false` (default), the text-drawing methods will never choose a more-condensed weight or
	 * otherwise attempt to squeeze your entire string into the measure specified by `width`. Instead the text will be
	 * typeset up through the last word that fits and the rest will be omitted.
	 * @param value Whether text wrap should be enabled or not.
	 */
	public setTextWrap(value: boolean): this {
		this.context.textWrap = value;
		return this;
	}

	/**
	 * Returns whether or not text-wrap is enabled.
	 * @see {@link SkiaCanvas.setTextWrap}
	 */
	public getTextWrap(): boolean;
	/**
	 * Calls the callback with whether or not text-wrap is enabled, and returns itself.
	 * @param cb The callback to be called.
	 * @see {@link SkiaCanvas.setTextWrap}
	 */
	public getTextWrap(cb: (textWrap: boolean) => void): this;
	public getTextWrap(cb?: (textWrap: boolean) => void) {
		if (typeof cb === 'function') {
			cb(this.context.textWrap);
			return this;
		}

		return this.context.textWrap;
	}

	/**
	 * Render the canvas into a data URL with the specified format.
	 * @param format The image format the data URL must have.
	 * @param options The render options.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
	 */
	public toDataURL(format: RenderImageFormat, options?: RenderOptions): Promise<string>;
	public toDataURL(...args: readonly any[]): Promise<string> {
		// @ts-expect-error: Complains about invalid overload (expects more than 0 overloads).
		return this.canvas.toDataURL(...args);
	}

	/**
	 * Shorthand for {@link SkiaCanvas.toBuffer} with `application/pdf` as `format` and default options.
	 * @returns A PDF document.
	 */
	public pdf(): Promise<Buffer> {
		return Promise.resolve(this.canvas.pdf);
	}

	/**
	 * Shorthand for {@link SkiaCanvas.toBuffer} with `image/svg+xml` as `format` and default options.
	 * @returns A SVG image.
	 */
	public svg(): Promise<Buffer> {
		return Promise.resolve(this.canvas.svg);
	}

	/**
	 * Shorthand for {@link SkiaCanvas.toBuffer} with `image/jpg` as `format` and default options.
	 * @returns A JPG image.
	 */
	public jpg(): Promise<Buffer> {
		return Promise.resolve(this.canvas.jpg);
	}

	/**
	 * Shorthand for {@link SkiaCanvas.toBuffer} with `image/png` as `format` and default options.
	 * @returns A PNG image.
	 */
	public png(): Promise<Buffer> {
		return Promise.resolve(this.canvas.png);
	}

	/**
	 * Renders the canvas into a buffer with the specified format.
	 * @param format The format to use for the image. An `@` suffix can be added to the format string to specify a
	 * pixel-density (for instance, "jpg@2x").
	 * @param options The render options.
	 */
	public toBuffer(format: RenderImageFormat, options?: RenderOptions): Buffer | Promise<Buffer>;
	public toBuffer(...args: readonly any[]): Buffer | Promise<Buffer> {
		// @ts-expect-error: Complains about invalid overload (expects more than 0 overloads).
		return this.canvas.toBuffer(...args);
	}

	/**
	 * Takes a file path and writes the canvas's current contents to disk. If the filename ends with an extension that
	 * makes its format clear, the second argument is optional. If the filename is ambiguous, you can pass an options
	 * object with a format string using names like "png" and "jpeg" or a full mime type like "application/pdf".
	 * @param filename The way multi-page documents are handled depends on the filename argument. If the filename
	 * contains the string "{}", it will be used as template for generating a numbered sequence of files—one per page.
	 * If no curly braces are found in the filename, only a single file will be saved. That single file will be
	 * multi-page in the case of PDF output but for other formats it will contain only the most recently added page.
	 *
	 * An integer can optionally be placed between the braces to indicate the number of padding characters to use for
	 * numbering. For instance "page-{}.svg" will generate files of the form page-1.svg whereas "frame-{4}.png" will
	 * generate files like frame-0001.png.
	 * @param options The options for the image render.
	 */
	public saveAs(filename: string, options?: SaveAsOptions): this;
	public saveAs(...args: readonly any[]): this {
		// @ts-expect-error: Complains about invalid overload (expects more than 0 overloads).
		this.canvas.saveAs(...args);
		return this;
	}
}

export { BeveledRadiusOptions, GlobalCompositeOperation, GradientStop, PatternRepeat, PrintCircularOptions } from './lib/BaseCanvas';
export * from './lib/Filter';
export * from './lib/Util';
export { Path2D, FontLibrary, SkiaImage as Image };
export const resolveImage = loadImage;

export function registerFont(familyName: string, fontPaths: ReadonlyArray<string>): FontVariant[];
export function registerFont(fontPaths: ReadonlyArray<string>): FontVariant[];
export function registerFont(families: Record<string, ReadonlyArray<string> | string>): Record<string, FontVariant[] | FontVariant>;
export function registerFont(...args: readonly any[]) {
	// @ts-expect-error: Complains about invalid overload (expects more than 0 overloads).
	return FontLibrary.use(...args);
}

export type FontVariants = FontVariantLigatures | FontVariantAlternates | FontVariantCaps | FontVariantNumeric | FontVariantEastAsian;

type GetFontVariant<K extends FontVariants> = K extends FontVariantLigatures
	? FontVariantLigatures
	: K extends FontVariantAlternates
	? FontVariantAlternates
	: K extends FontVariantCaps
	? FontVariantCaps
	: K extends FontVariantNumeric
	? FontVariantNumeric
	: FontVariantEastAsian;

export function fontVariant<K1 extends FontVariantString>(k1: K1): K1;
export function fontVariant<K1 extends FontVariants, K2 extends Exclude<FontVariants, GetFontVariant<K1>>>(k1: K1, k2: K2): `${K1} ${K2}`;
export function fontVariant<
	K1 extends FontVariants,
	K2 extends Exclude<FontVariants, GetFontVariant<K1>>,
	K3 extends Exclude<FontVariants, GetFontVariant<K2>>
>(k1: K1, k2: K2, k3: K3): `${K1} ${K2} ${K3}`;
export function fontVariant<
	K1 extends FontVariants,
	K2 extends Exclude<FontVariants, GetFontVariant<K1>>,
	K3 extends Exclude<FontVariants, GetFontVariant<K2>>,
	K4 extends Exclude<FontVariants, GetFontVariant<K3>>
>(k1: K1, k2: K2, k3: K3, k4: K4): `${K1} ${K2} ${K3} ${K4}`;
export function fontVariant<
	K1 extends FontVariants,
	K2 extends Exclude<FontVariants, GetFontVariant<K1>>,
	K3 extends Exclude<FontVariants, GetFontVariant<K2>>,
	K4 extends Exclude<FontVariants, GetFontVariant<K3>>,
	K5 extends Exclude<FontVariants, GetFontVariant<K4>>
>(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5): `${K1} ${K2} ${K3} ${K4} ${K5}`;
export function fontVariant(...args: readonly FontVariantString[]): string {
	return args.join(' ');
}
