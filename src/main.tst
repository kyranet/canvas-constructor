/* eslint-disable @typescript-eslint/unified-signatures */
// IF(BROWSER):                                                                \
// eslint-disable-next-line spaced-comment                                     \
/// <reference lib="dom" />                                                    \
export type NativeCanvas = HTMLCanvasElement;                                  \
export type NativeCanvasRenderingContext2D = CanvasRenderingContext2D;         \
export type NativeImage = HTMLImageElement;
// IF(!BROWSER): import { deprecate } from 'node:util';
// IF(CAIRO):                                                                  \
import {                                                                       \
	Canvas as NativeCanvas,                                                    \
	CanvasRenderingContext2D as NativeCanvasRenderingContext2D,                \
	createCanvas,                                                              \
	Image as NativeImage,                                                      \
	JpegConfig,                                                                \
	JPEGStream,                                                                \
	loadImage,                                                                 \
	PdfConfig,                                                                 \
	PDFStream,                                                                 \
	PngConfig,                                                                 \
	PNGStream,                                                                 \
	registerFont as loadFont                                                   \
} from 'canvas';
// IF(NAPI_RS):                                                                \
import {                                                                       \
	Canvas as NativeCanvas,                                                    \
	createCanvas,                                                              \
	GlobalFonts,                                                               \
	Image as NativeImage,                                                      \
	Path2D,                                                                    \
	type AvifConfig,                                                           \
	type SKRSContext2D as NativeCanvasRenderingContext2D                       \
} from '@napi-rs/canvas';
// IF(SKIA):                                                                   \
import {                                                                       \
	Canvas as NativeCanvas,                                                    \
	CanvasRenderingContext2D as NativeCanvasRenderingContext2D,                \
	FontLibrary,                                                               \
	Image as NativeImage,                                                      \
	loadImage,                                                                 \
	Path2D,                                                                    \
	type Font,                                                                 \
	type RenderOptions                                                         \
} from 'skia-canvas';

export interface BeveledRadiusOptions {
	/**
	 * Top left corner.
	 */
	tl: number;

	/**
	 * Top right corner.
	 */
	tr: number;

	/**
	 * Bottom right corner.
	 */
	br: number;

	/**
	 * Bottom left corner.
	 */
	bl: number;
}

export interface GradientStop {
	position: number;
	color: string;
}

export interface PrintCircularOptions {
	/**
	 * The fit options, this is similar to CSS's object-fit.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
	 */
	fit?: 'fill' | 'contain' | 'cover' | 'none';
}

export type ImageResolvable = Canvas | NativeImage | NativeCanvas;
function _resolveImage(resolvable: ImageResolvable) {
	return resolvable instanceof Canvas ? resolvable.canvas : resolvable;
}

// IF(BROWSER):                                                                \
export type PatternResolvable = Canvas | CanvasImageSource;                    \
function _resolvePattern(resolvable: PatternResolvable) {                      \
	if (resolvable instanceof Canvas) return resolvable.canvas;                \
	return resolvable;                                                         \
}
// IF(CAIRO,SKIA):                                                             \
export type PatternResolvable = Canvas | NativeImage | NativeImage;            \
function _resolvePattern(resolvable: PatternResolvable) {                      \
	if (resolvable instanceof Canvas) return resolvable.canvas;                \
	return resolvable;                                                         \
}
// IF(NAPI_RS):                                                                \
export type PatternResolvable = Canvas | NativeImage | ImageData;              \
function _resolvePattern(resolvable: PatternResolvable) {                      \
	if (resolvable instanceof Canvas) return resolvable.getImageData();        \
	return resolvable;                                                         \
}

export type PatternRepeat = 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat' | null;
export type Transform = ReturnType<NativeCanvasRenderingContext2D['getTransform']>;
// IF(CAIRO):                                                                                                          \
export type AntiAlias = NativeCanvasRenderingContext2D['antialias'];                                                   \
export type TextDrawingMode = NativeCanvasRenderingContext2D['textDrawingMode'];                                       \
export type PatternQuality = NativeCanvasRenderingContext2D['patternQuality'];
// IF(SKIA):                                                                                                                                                   \
export type RenderImageFormat = `${`${'image/' | ''}${'png' | 'jpg'}` | 'image/svg+xml' | 'svg' | `${'application/' | ''}pdf`}${`@${number}x` | ''}`;          \
export interface SaveAsOptions extends RenderOptions {                                                                                                         \
	/**                                                                                                                                                        \
	 * The image format to use.                                                                                                                                \
	 */                                                                                                                                                        \
	format?: RenderImageFormat;                                                                                                                                \
}
// IF(!SKIA): export type ContextAttributes = ReturnType<NativeCanvasRenderingContext2D['getContextAttributes']>;

export class Canvas {
	/**
	 * The constructed Canvas.
	 */
	public canvas: NativeCanvas;

	/**
	 * The 2D context for the Canvas.
	 */
	public context: NativeCanvasRenderingContext2D;

// IF(BROWSER):                                                                                                        \
	/**                                                                                                                \
	 * Initialize canvas-constructor in a browser.                                                                     \
	 * @param canvas An {@link HTMLCanvasElement}.                                                                     \
	 * <script type="text/javascript" src="canvasconstructor.main.min.js"></script>                                    \
	 * <script type="text/javascript">                                                                                 \
	 * const canvasElement = document.getElementById('canvas');                                                        \
	 * new CanvasConstructor.Canvas(canvasElement)                                                                     \
	 *     .setColor('green')                                                                                          \
	 *     .printRectangle(10, 10, 100, 100);                                                                          \
	 * </script>                                                                                                       \
	 */                                                                                                                \
	public constructor(canvas: NativeCanvas, context?: NativeCanvasRenderingContext2D) {                               \
		this.canvas = canvas;                                                                                          \
		this.context = context ?? this.canvas.getContext('2d')!;                                                       \
	}
// IF(CAIRO):                                                                                                          \
	/**                                                                                                                \
	 * Initialize canvas-constructor with `canvas`.                                                                    \
	 * @param width The width of the canvas.                                                                           \
	 * @param height The height of the canvas.                                                                         \
	 * @param type The type of Canvas.                                                                                 \
	 */                                                                                                                \
	public constructor(width: number, height: number, type?: 'pdf' | 'svg') {                                          \
		this.canvas = createCanvas(width, height, type);                                                               \
		this.context = this.canvas.getContext('2d');                                                                   \
	}
// IF(NAPI_RS):                                                                                                        \
	/**                                                                                                                \
	 * Initialize canvas-constructor with `@napi-rs/canvas`.                                                           \
	 * @param width The width of the canvas.                                                                           \
	 * @param height The height of the canvas.                                                                         \
	 * @param contextAttributes The attributes for the underlying 2D context.                                          \
	 */                                                                                                                \
	public constructor(width: number, height: number, contextAttributes?: ContextAttributes) {                         \
		this.canvas = createCanvas(width, height);                                                                     \
		this.context = this.canvas.getContext('2d', contextAttributes);                                                \
	}
// IF(SKIA):                                                                                                           \
	public constructor(width: number, height: number);                                                                 \
	public constructor(canvas: NativeCanvas, context?: NativeCanvasRenderingContext2D);                                \
	public constructor(width: number | NativeCanvas, height?: number | NativeCanvasRenderingContext2D) {               \
		if (typeof width === 'number') {                                                                               \
			this.canvas = new NativeCanvas(width, height as number);                                                   \
			this.context = this.canvas.getContext('2d');                                                               \
		} else {                                                                                                       \
			this.canvas = width;                                                                                       \
			this.context = (height ?? this.canvas.getContext('2d')) as NativeCanvasRenderingContext2D;                 \
		}                                                                                                              \
	}

// IF(CAIRO):                                                                                                          \
	/**                                                                                                                \
	 * For PDF canvases, adds another page.                                                                            \
	 * @param width The width of the new PDF page, defaults to the canvas's initial width.                             \
	 * @param height The height of the new PDF page, defaults to the canvas's initial height.                          \
	 * @note This is a `canvas` extension.                                                                             \
	 */                                                                                                                \
	public addPage(width?: number, height?: number): this;                                                             \
	public addPage(...args: readonly any[]): this {                                                                    \
		this.context.addPage(...args);                                                                                 \
		return this;                                                                                                   \
	}
// IF(SKIA):                                                                                                           \
	/**                                                                                                                \
	 * Creates a new page for the canvas, which can be retrieved later with {@link pages}.                             \
	 * @param width The width of the new page.                                                                         \
	 * @param height The height of the new page.                                                                       \
	 * @returns A new instance of {@link NativeCanvas} with the new context.                                           \
	 * @note This is a `skia-canvas` extension.                                                                        \
	 */                                                                                                                \
	public addPage(width: number, height: number): Canvas {                                                            \
		return new Canvas(this.canvas, this.canvas.newPage(width, height));                                            \
	}

	/**
	 * The image width of this canvas
	 */
	public get width(): number {
		return this.canvas.width;
	}

	public set width(value: number) {
		this.canvas.width = value;
	}

	/**
	 * The image height of this canvas
	 */
	public get height(): number {
		return this.canvas.height;
	}

	public set height(value: number) {
		this.canvas.height = value;
	}

	/**
	 * The current text direction used to draw text.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/direction
	 */
	public get direction(): CanvasDirection {
		return this.context.direction;
	}

	/**
	 * The current text style to use when drawing text. This string uses the same syntax as the
	 * [CSS font](https://developer.mozilla.org/en-US/docs/Web/CSS/font) specifier.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font
	 */
	public get font(): string {
		return this.context.font;
	}

	/**
	 * The alpha (transparency) value that is applied to shapes and images before they are drawn onto the canvas.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
	 */
	public get globalAlpha(): number {
		return this.context.globalAlpha;
	}

	/**
	 * Whether scaled images are smoothed (true, default) or not (false).
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled
	 */
	public get imageSmoothingEnabled(): boolean {
		return this.context.imageSmoothingEnabled;
	}

	/**
	 * The quality of image smoothing.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingQuality
	 */
	public get imageSmoothingQuality(): ImageSmoothingQuality {
		return this.context.imageSmoothingQuality;
	}

// IF(!SKIA):                                                                                                          \
	/**                                                                                                                \
	 * Returns an object that contains the actual context parameters. Context attributes can be requested with this    \
	 * class instantiation.                                                                                            \
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getContextAttributes             \
	 */                                                                                                                \
	public get contextAttributes(): ContextAttributes {                                                                \
		return this.context.getContextAttributes();                                                                    \
	}

// IF(CAIRO):                                                                                                          \
	/**                                                                                                                \
	 * Gets the anti-aliasing mode.                                                                                    \
	 * @note This is a `canvas` extension.                                                                             \
	 */                                                                                                                \
	public get antialias(): AntiAlias {                                                                                \
		return this.context.antialias;                                                                                 \
	}

// IF(CAIRO):                                                                                                          \
	/**                                                                                                                \
	 * Gets the text drawing mode.                                                                                     \
	 * @note This is a `canvas` extension.                                                                             \
	 */                                                                                                                \
	public get textDrawingMode(): TextDrawingMode {                                                                    \
		return this.context.textDrawingMode;                                                                           \
	}

// IF(CAIRO):                                                                                                          \
	/**                                                                                                                \
	 * Gets the pattern quality.                                                                                       \
	 * @note This is a `canvas` extension.                                                                             \
	 */                                                                                                                \
	public get patternQuality(): PatternQuality {                                                                      \
		return this.context.patternQuality;                                                                            \
	}

// IF(SKIA):                                                                                                           \
	/**                                                                                                                \
	 * Returns the pages created with {@link addPage}.                                                                 \
	 * @note This is a `skia-canvas` extension.                                                                        \
	 */                                                                                                                \
	public get pages(): NativeCanvasRenderingContext2D[] {                                                             \
		return this.canvas.pages;                                                                                      \
	}

// IF(SKIA):                                                                                                           \
	/**                                                                                                                \
	 * Returns the canvas's current CSS3 [font-variant](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant).\
	 * @note This is a `skia-canvas` extension.                                                                        \
	 * @see {@link setFontVariant}                                                                                     \
	 */                                                                                                                \
	public get fontVariant(): FontVariantString {                                                                      \
		return this.context.fontVariant;                                                                               \
	}

// IF(SKIA):                                                                                                           \
	/**                                                                                                                \
	 * Returns the text tracking property.                                                                             \
	 * @note This is a `skia-canvas` extension.                                                                        \
	 * @see {@link setTextTracking}                                                                                    \
	 */                                                                                                                \
	public get textTracking(): number {                                                                                \
		return this.context.textTracking;                                                                              \
	}

// IF(SKIA):                                                                                                           \
	/**                                                                                                                \
	 * Returns whether or not text-wrap is enabled.                                                                    \
	 * @note This is a `skia-canvas` extension.                                                                        \
	 * @see {@link setTextWrap}                                                                                        \
	 */                                                                                                                \
	public get textWrap(): boolean {                                                                                   \
		return this.context.textWrap;                                                                                  \
	}

	/**
	 * Returns the current transformation matrix being applied to the context.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getTransform
	 */
	public get transform(): Transform {
		return this.context.getTransform();
	}

	/**
	 * The font height
	 */
	public get textFontHeight(): number {
		return getFontHeight(this.context.font);
	}

	/**
	 * A list of numbers that specifies distances to alternately draw a line and a gap (in coordinate space units).
	 * If the number, when setting the elements, was odd, the elements of the array get copied and concatenated. For
	 * example, setting the line dash to [5, 15, 25] will result in getting back [5, 15, 25, 5, 15, 25].
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getLineDash
	 * @example
	 * new Canvas(400, 300)
	 *     .beginPath()
	 *     .setLineDash([5, 15])
	 *     .moveTo(0, 50)
	 *     .lineTo(400, 50)
	 *     .stroke()
	 *     .png();
	 */
	public get lineDash(): number[] {
		return this.context.getLineDash();
	}

	/**
	 * Change the current canvas' size.
	 * @param width The new width for the canvas.
	 * @param height The new height for the canvas.
	 */
	public changeCanvasSize(width: number, height: number): this {
		return this.changeCanvasWidth(width).changeCanvasHeight(height);
	}

	/**
	 * Change the current canvas' width.
	 * @param width The new width for the canvas.
	 */
	public changeCanvasWidth(width: number): this {
		this.width = width;
		return this;
	}

	/**
	 * Change the current canvas' height.
	 * @param height The new height for the canvas.
	 */
	public changeCanvasHeight(height: number): this {
		this.height = height;
		return this;
	}

	/**
	 * Save the entire state of the canvas by pushing the current state onto a stack.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
	 */
	public save(): this {
		this.context.save();
		return this;
	}

	/**
	 * Restores the most recently saved canvas by popping the top entry in the drawing state stack. If there is no saved
	 * state, this method does nothing.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore
	 */
	public restore(): this {
		this.context.restore();
		return this;
	}

	/**
	 * Adds a rotation to the transformation matrix. The angle argument represents a clockwise rotation angle and is
	 * expressed in radians.
	 * @param angle The angle to rotate clockwise in radians.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate
	 */
	public rotate(angle: number): this {
		this.context.rotate(angle);
		return this;
	}

	/**
	 * Adds a scaling transformation to the canvas units by X horizontally and by y vertically.
	 * @param x Scaling factor in the horizontal direction.
	 * @param y Scaling factor in the vertical direction.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale
	 */
	public scale(x: number, y: number): this {
		this.context.scale(x, y);
		return this;
	}

	/**
	 * Adds a translation transformation by moving the canvas and its origin X horizontally and y vertically on the grid.
	 * @param x Distance to move in the horizontal direction.
	 * @param y Distance to move in the vertical direction.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate
	 */
	public translate(x: number, y: number): this {
		this.context.translate(x, y);
		return this;
	}

	/**
	 * Turns the path currently being built into the current clipping path.
	 * @param fillRule The algorithm by which to determine if a point is inside a path or outside a path.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip
	 */
	public clip(fillRule?: CanvasFillRule): this;
	/**
	 * Turns the path currently being built into the current clipping path.
	 * @param path The path to use.
	 * @param fillRule The algorithm by which to determine if a point is inside a path or outside a path.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip
	 */
	public clip(path: Path2D, fillRule?: CanvasFillRule): this;
	public clip(...args: []): this {
		this.context.clip(...args);
		return this;
	}

	/**
	 * Resets (overrides) the current transformation to the identity matrix and then invokes a transformation described
	 * by the arguments of this method.
	 * @param a Horizontal scaling.
	 * @param b Horizontal skewing.
	 * @param c Vertical skewing.
	 * @param d Vertical scaling.
	 * @param e Horizontal moving.
	 * @param f Vertical moving.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
	 */
	public setTransform(a: number, b: number, c: number, d: number, e: number, f: number): this;
	/**
	 * Resets (overrides) the current transformation to the identity matrix and then invokes a transformation described
	 * by the arguments of this method.
	 * @param matrix The new transform matrix.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
	 */
	public setTransform(transform?: DOMMatrix): this;
	public setTransform(...args: readonly any[]): this {
		this.context.setTransform(...args);
		return this;
	}

	/**
	 * Resets the transformation.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/resetTransform
	 */
	public resetTransform(): this {
		return this.resetTransform();
	}

	/**
	 * Resets the filters.
	 */
	public resetFilters(): this {
		return this.setFilter('none');
	}

	/**
	 * Returns an ImageData object representing the underlying pixel data for the area of the canvas
	 * denoted by the entire Canvas. This method is not affected by the canvas transformation matrix.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
	 */
	public getImageData(): ImageData;
	/**
	 * Returns an ImageData object representing the underlying pixel data for the area of the canvas denoted by the rectangle which starts at (sx, sy)
	 * and has an sw width and sh height. This method is not affected by the canvas transformation matrix.
	 * @param x The X coordinate of the upper left corner of the rectangle from which the ImageData will be extracted.
	 * @param y The Y coordinate of the upper left corner of the rectangle from which the ImageData will be extracted.
	 * @param width The width of the rectangle from which the ImageData will be extracted.
	 * @param height The height of the rectangle from which the ImageData will be extracted.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
	 */
	public getImageData(x: number, y: number, width: number, height: number): ImageData;
	public getImageData(x?: number, y?: number, width?: number, height?: number): ImageData {
		return this.context.getImageData(x ?? 0, y ?? 0, width ?? this.width, height ?? this.height);
	}

	/**
	 * The CanvasRenderingContext2D.putImageData() method of the Canvas 2D API paints data from the given ImageData object onto the bitmap.
	 * This method is not affected by the canvas transformation matrix.
	 * @param imagedata An ImageData object containing the array of pixel values.
	 * @param dx Horizontal position (x-coordinate) at which to place the image data in the destination canvas.
	 * @param dy Vertical position (y-coordinate) at which to place the image data in the destination canvas.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
	 */
	public putImageData(imagedata: ImageData, dx: number, dy: number): this;
	/**
	 * The CanvasRenderingContext2D.putImageData() method of the Canvas 2D API paints data from the given ImageData object onto the bitmap.
	 * Only the pixels from that rectangle are painted.
	 * This method is not affected by the canvas transformation matrix.
	 * @param imagedata An ImageData object containing the array of pixel values.
	 * @param x Horizontal position (x-coordinate) at which to place the image data in the destination canvas.
	 * @param y Vertical position (y-coordinate) at which to place the image data in the destination canvas.
	 * @param dirtyX Horizontal position (x-coordinate). The X coordinate of the top left hand corner of your Image data. Defaults to 0.
	 * @param dirtyY Vertical position (y-coordinate). The Y coordinate of the top left hand corner of your Image data. Defaults to 0.
	 * @param dirtyWidth Width of the rectangle to be painted. Defaults to the width of the image data.
	 * @param dirtyHeight Height of the rectangle to be painted. Defaults to the height of the image data.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
	 */
	public putImageData(imagedata: ImageData, x: number, y: number, dirtyX: number, dirtyY: number, dirtyWidth: number, dirtyHeight: number): this;

	public putImageData(...args: [any, any, any]): this {
		this.context.putImageData(...args);
		return this;
	}

	/**
	 * Fills the current or given path with the current fill style using the non-zero or even-odd winding rule.
	 * @param fillRule The algorithm by which to determine if a point is inside a path or outside a path.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fill
	 */
	public fill(fillRule?: CanvasFillRule): this;
	/**
	 * Fills the current or given path with the current fill style using the non-zero or even-odd winding rule.
	 * @param path The path to fill.
	 * @param fillRule The algorithm by which to determine if a point is inside a path or outside a path.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fill
	 */
	public fill(path: Path2D, fillRule?: CanvasFillRule): this;
	public fill(...args: [any]): this {
		this.context.fill(...args);
		return this;
	}

	/**
	 * Add a text.
	 * @param text The text to write.
	 * @param x The position x to start drawing the element.
	 * @param y The position y to start drawing the element.
	 * @param maxWidth The maximum width to draw. If specified, and the string is computed to be wider than this width,
	 * the font is adjusted to use a more horizontally condensed font.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText
	 */
	public printText(text: string, x: number, y: number, maxWidth?: number): this;
	public printText(text: string, x: number, y: number, ...rest: readonly any[]): this {
		this.context.fillText(text, x, y, ...rest);
		return this;
	}

	/**
	 * Add responsive text
	 * @param text The text to write.
	 * @param x The position x to start drawing the element.
	 * @param y The position y to start drawing the element.
	 * @param maxWidth The max length in pixels for the text.
	 * @example
	 * new Canvas(400, 300)
	 *     .setTextFont('40px Tahoma')
	 *     .printResponsiveText('Hello World', 30, 30, 50)
	 *     .png();
	 */
	public printResponsiveText(text: string, x: number, y: number, maxWidth: number): this {
		const [tail, height, lead] = this.parseFont(this.context.font);
		if (typeof height !== 'number') return this.printText(text, x, y);

		// Measure the width of the text. If it fits `maxWidth`, draw the text directly:
		const { width } = this.measureText(text);
		if (width <= maxWidth) return this.printText(text, x, y);

		// Otherwise save state, set the font with a size that fits, draw the text, and restore:
		const newHeight = (maxWidth / width) * height;
		return this.save().setTextFont(`${tail}${newHeight}${lead}`).printText(text, x, y).restore();
	}

	/**
	 * Add text with line breaks (node-canvas and web canvas compatible)
	 * @param text The text to write.
	 * @param x The position x to start drawing the element.
	 * @param y The position y to start drawing the element.
	 * @example
	 * new Canvas(400, 300)
	 *     .setTextFont('25px Tahoma')
	 *     .printMultilineText('This is a really\nlong text!', 139, 360)
	 *     .png();
	 */
	public printMultilineText(text: string, x: number, y: number): this {
		const lines = text.split(/\r?\n/);

		// If there are no new lines, return using printText
		if (lines.length <= 1) return this.printText(text, x, y);

		const height = this.textFontHeight;

		let linePositionY = y;
		for (const line of lines) {
			this.printText(line, x, Math.floor(linePositionY));
			linePositionY += height;
		}

		return this;
	}

	/**
	 * Wrap the text in multiple lines and write it
	 * @param text The text to wrap and write.
	 * @param x The position x to start drawing the element.
	 * @param y The position y to start drawing the element.
	 * @param wrapWidth The width in pixels of the line wrap
	 * @example
	 * new Canvas(400, 300)
	 *     .setTextFont('25px Tahoma')
	 *     .printWrappedText('This is a really long text!', 139, 360)
	 *     .png();
	 */
	public printWrappedText(text: string, x: number, y: number, wrapWidth: number): this {
		const wrappedText = textWrap(this, text, wrapWidth);
		return this.printMultilineText(wrappedText, x, y);
	}

	/**
	 * Strokes the current or given path with the current stroke style using the non-zero winding rule.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke
	 */
	public stroke(): this {
		this.context.stroke();
		return this;
	}

	/**
	 * Paints a rectangle which has a starting point at (X, Y) and has a w width and an h height onto the canvas, using
	 * the current stroke style.
	 * @param x The x axis of the coordinate for the rectangle starting point.
	 * @param y The y axis of the coordinate for the rectangle starting point.
	 * @param width The rectangle's width.
	 * @param height The rectangle's height.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeRect
	 */
	public printStrokeRectangle(x: number, y: number, width: number, height: number): this {
		this.context.strokeRect(x, y, width, height);
		return this;
	}

	/**
	 * Add stroked text.
	 * @param text The text to write.
	 * @param x The position x to start drawing the element.
	 * @param y The position y to start drawing the element.
	 * @param maxWidth The maximum width to draw. If specified, and the string is computed to be wider than this width,
	 * the font is adjusted to use a more horizontally condensed font.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeText
	 */
	public printStrokeText(text: string, x: number, y: number, maxWidth?: number): this {
		this.context.strokeText(text, x, y, maxWidth);
		return this;
	}

	/**
	 * Measure a text's width given a string.
	 * @param text The text to measure.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/measureText
	 * @example
	 * const size = new Canvas(500, 400)
	 *     .setTextFont('40px Tahoma')
	 *     .measureText('Hello World!'); // Returns a number
	 *
	 * const newSize = size.width < 500 ? 40 : (500 / size.width) * 40;
	 *
	 * new Canvas(500, 400)
	 *     .setTextFont(`${newSize}px Tahoma`)
	 *     .printText('Hello World!', 30, 50)
	 *     .png(); // Returns a Buffer
	 * @example
	 * new Canvas(500, 400)
	 *     .setTextFont('40px Tahoma')
	 *     .process((canvas) => {
	 *         const size = canvas.measureText('Hello World!');
	 *         const newSize = size.width < 500 ? 40 : (500 / size.width) * 40;
	 *         this.setTextFont(`${newSize}px Tahoma`);
	 *     })
	 *     .printText('Hello World!', 30, 50)
	 *     .png(); // Returns a Buffer
	 */
	public measureText(text: string): TextMetrics {
		return this.context.measureText(text);
	}

	/**
	 * Set the new font size, unlike setTextFont, this only requires the number.
	 * @param size The new size to set
	 */
	public setTextSize(size: number): this {
		const result = this.parseFont(this.context.font);
		return result.length === 1 ? this : this.setTextFont(`${result[0]}${size}${result[2]}`);
	}

	/**
	 * Specifies the color or style to use for the lines around shapes.
	 * @param color A canvas' color resolvable.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle
	 */
	public setStroke(color: string | CanvasGradient | CanvasPattern): this {
		this.context.strokeStyle = color;
		return this;
	}

	/**
	 * Sets the thickness of lines in space units.
	 * @param width A number specifying the line width in space units.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth
	 */
	public setLineWidth(width: number): this {
		this.context.lineWidth = width;
		return this;
	}

	public setStrokeWidth(width: number): this {
		return this.setLineWidth(width);
	}

	/**
	 * Sets the line dash pattern offset or "phase" to achieve a "marching ants" effect
	 * @param value A float specifying the amount of the offset. Initially 0.0.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
	 */
	public setLineDashOffset(value: number): this {
		this.context.lineDashOffset = value;
		return this;
	}

	/**
	 * Determines how two connecting segments (of lines, arcs or curves) with non-zero lengths in a shape are joined
	 * together (degenerate segments with zero lengths, whose specified endpoints and control points are exactly at the
	 * same position, are skipped).
	 * @param value The line join type.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
	 */
	public setLineJoin(value: CanvasLineJoin): this {
		this.context.lineJoin = value;
		return this;
	}

	/**
	 * Determines how the end points of every line are drawn. There are three possible values for this property and
	 * those are: butt, round and square. By default this property is set to butt.
	 * @param value The line join type.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap
	 */
	public setLineCap(value: CanvasLineCap): this {
		this.context.lineCap = value;
		return this;
	}

	/**
	 * Sets the line dash pattern used when stroking lines, using an array of values which specify alternating lengths
	 * of lines and gaps which describe the pattern.
	 * @param segments An Array of numbers which specify distances to alternately draw a line and a gap (in coordinate
	 * space units). If the number of elements in the array is odd, the elements of the array get copied and
	 * concatenated. For example, [5, 15, 25] will become [5, 15, 25, 5, 15, 25]. If the array is empty, the line dash
	 * list is cleared and line strokes return to being solid.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
	 */
	public setLineDash(segments: number[]): this {
		this.context.setLineDash(segments);
		return this;
	}

	/**
	 * Add an image at a position (x, y) with the source image's width and height.
	 * @param image The image.
	 * @param dx The x-axis coordinate in the destination canvas at which to place the top-left corner of the source `image`.
	 * @param dy The y-axis coordinate in the destination canvas at which to place the top-left corner of the source `image`.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
	 */
	public printImage(image: ImageResolvable, dx: number, dy: number): this;
	/**
	 * Add an image at a position (x, y) with a given width and height.
	 * @param image The image.
	 * @param dx The x-axis coordinate in the destination canvas at which to place the top-left corner of the source `image`.
	 * @param dy The y-axis coordinate in the destination canvas at which to place the top-left corner of the source `image`.
	 * @param dw The width to draw the `image` in the destination canvas. This allows scaling of the drawn image.
	 * @param dh The height to draw the `image` in the destination canvas. This allows scaling of the drawn image.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
	 */
	public printImage(image: ImageResolvable, dx: number, dy: number, dw: number, dh: number): this;
	/**
	 * Add an image at a position (x, y) with a given width and height, from a specific source rectangle.
	 * @param image The image.
	 * @param sx The x-axis coordinate of the top left corner of the sub-rectangle of the source `image` to draw into the destination context.
	 * @param sy The y-axis coordinate of the top left corner of the sub-rectangle of the source `image` to draw into the destination context.
	 * @param sw The width of the sub-rectangle of the source `image` to draw into the destination context.
	 * @param sh The height of the sub-rectangle of the source `image` to draw into the destination context.
	 * @param dx The x-axis coordinate in the destination canvas at which to place the top-left corner of the source `image`.
	 * @param dy The y-axis coordinate in the destination canvas at which to place the top-left corner of the source `image`.
	 * @param dw The width to draw the `image` in the destination canvas. This allows scaling of the drawn image.
	 * @param dh The height to draw the `image` in the destination canvas. This allows scaling of the drawn image.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
	 */
	public printImage(image: ImageResolvable, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): this;
	public printImage(image: ImageResolvable, ...args: [number, number]) {
		this.context.drawImage(_resolveImage(image), ...args);
		return this;
	}

	/**
	 * Add a round image.
	 * @param imageOrBuffer The image.
	 * @param x The X coordinate in the destination canvas at which to place the top-left corner of the source image.
	 * @param y The Y coordinate in the destination canvas at which to place the top-left corner of the source image.
	 * @param width The width to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in width when drawn.
	 * @param height The height to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in height when drawn.
	 * @param radius The radius for the circle
	 */
	public printCircularImage(imageOrBuffer: ImageResolvable, x: number, y: number, radius: number, options?: PrintCircularOptions): this;
	public printCircularImage(
		imageOrBuffer: ImageResolvable,
		x: number,
		y: number,
		radius: number,
		{ fit = 'fill' }: PrintCircularOptions = {}
	): this {
		const { positionX, positionY, sizeX, sizeY } = this.resolveCircularCoordinates(imageOrBuffer, x, y, radius, fit);
		return this.save()
			.createCircularClip(x, y, radius, 0, Math.PI * 2, false)
			.printImage(imageOrBuffer, positionX, positionY, sizeX, sizeY)
			.restore();
	}

	/**
	 * Add a beveled image.
	 * @param imageOrBuffer The image.
	 * @param x The position x to start drawing the element.
	 * @param y The position y to start drawing the element.
	 * @param width The width of the element.
	 * @param height The height of the element.
	 * @param radius The radius for the new image.
	 */
	public printRoundedImage(
		imageOrBuffer: ImageResolvable,
		x: number,
		y: number,
		width: number,
		height: number,
		radius: BeveledRadiusOptions | number
	): this;

	public printRoundedImage(
		imageOrBuffer: ImageResolvable,
		x: number,
		y: number,
		width: number,
		height: number,
		radius: BeveledRadiusOptions | number
	): this {
		return this.save().createRoundedClip(x, y, width, height, radius).printImage(imageOrBuffer, x, y, width, height).restore();
	}

	/**
	 * Add a circle or semi circle.
	 * @param x The position x in the center of the circle.
	 * @param y The position y in the center of the circle.
	 * @param radius The radius for the clip.
	 */
	public printCircle(x: number, y: number, radius: number): this {
		return this.save().createCircularPath(x, y, radius).fill().restore();
	}

	/**
	 * Add a rectangle.
	 * @param x The position x to start drawing the element.
	 * @param y The position y to start drawing the element.
	 * @param width The width of the element.
	 * @param height The height of the element.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect
	 */
	public printRectangle(x: number, y: number, width: number, height: number): this {
		this.context.fillRect(x, y, width, height);
		return this;
	}

	/**
	 * Add a beveled rectangle.
	 * @param x The position x to start drawing the element.
	 * @param y The position y to start drawing the element.
	 * @param width  The width of the element.
	 * @param height The height of the element.
	 * @param radius The radius for the bevels.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect
	 * @example
	 * // Radius argument
	 * new Canvas(200, 200)
	 *     .printRoundedRectangle(0, 0, 200, 50, 35)
	 *     .png();
	 *
	 * @example
	 * // Configured bevels
	 * new Canvas(200, 200)
	 *     .printRoundedRectangle(0, 0, 200, 50, {
	 *         // Top left border
	 *         tl: 15,
	 *         // Top right border
	 *         tr: 20,
	 *         // Bottom left border
	 *         bl: 5,
	 *         // Bottom right border
	 *         br: 10
	 *     })
	 *     .png();
	 *
	 * @example
	 * // Top bevels only
	 * new Canvas(200, 200)
	 *     .printRoundedRectangle(0, 0, 200, 50, { tl: 20, tr: 20, bl: 0, br: 0 })
	 *     .png();
	 */
	public printRoundedRectangle(x: number, y: number, width: number, height: number, radius: number | BeveledRadiusOptions): this {
		return this.save().createRoundedPath(x, y, width, height, radius).fill().restore();
	}

	/**
	 * Create a round path.
	 * @param dx The position x in the center of the clip's circle.
	 * @param dy The position y in the center of the clip's circle.
	 * @param radius The radius for the clip.
	 * @param start The degree in radians to start drawing the circle.
	 * @param angle The degree in radians to finish drawing the circle, defaults to a full circle.
	 * @param antiClockwise Whether the path should be anti-clockwise.
	 */
	public createCircularPath(dx: number, dy: number, radius: number, start = 0, angle = Math.PI * 2, antiClockwise = false): this {
		this.context.beginPath();
		this.context.arc(dx, dy, radius, start, angle, antiClockwise);
		return this;
	}

	/**
	 * Create a round clip.
	 * @param dx The position x in the center of the clip's circle.
	 * @param dy The position y in the center of the clip's circle.
	 * @param radius The radius for the clip.
	 * @param start The degree in radians to start drawing the circle.
	 * @param angle The degree in radians to finish drawing the circle, defaults to a full circle.
	 * @param antiClockwise Whether the path should be anti-clockwise.
	 * @see createRoundPath
	 */
	public createCircularClip(dx: number, dy: number, radius: number, start?: number, angle?: number, antiClockwise?: boolean): this {
		return this.createCircularPath(dx, dy, radius, start, angle, antiClockwise).clip();
	}

	/**
	 * Create a rectangle path.
	 * @param x The position x in the left corner.
	 * @param y The position y in the upper corner.
	 * @param width The width of the rectangle.
	 * @param height The height of the rectangle.
	 */
	public createRectanglePath(x: number, y: number, width: number, height: number): this {
		this.context.rect(x, y, width, height);
		return this;
	}

	/**
	 * Create a rectangle clip.
	 * @param x The position x in the left corner.
	 * @param y The position y in the upper corner.
	 * @param width The width of the rectangle.
	 * @param height The height of the rectangle.
	 */
	public createRectangleClip(x: number, y: number, width: number, height: number): this {
		return this.createRectanglePath(x, y, width, height).clip();
	}

	/**
	 * Create a beveled path.
	 * @param x The position x to start drawing clip.
	 * @param y The position y to start drawing clip.
	 * @param width The width of clip.
	 * @param height The height of clip.
	 * @param radius The radius for clip's rounded borders.
	 */
	public createRoundedPath(x: number, y: number, width: number, height: number, radius: number | BeveledRadiusOptions): this {
		if (width > 0 && height > 0) {
			let radiusObject: BeveledRadiusOptions | undefined = undefined;
			if (typeof radius === 'number') {
				radius = Math.min(radius, width / 2, height / 2);
				radiusObject = { tl: radius, tr: radius, br: radius, bl: radius };
			} else {
				radiusObject = radius;
				radius = Math.min(5, width / 2, height / 2);
			}
			const { tl = radius, tr = radius, br = radius, bl = radius } = radiusObject;
			this.context.beginPath();
			this.context.moveTo(x + tl, y);
			this.context.lineTo(x + width - tr, y);
			this.context.quadraticCurveTo(x + width, y, x + width, y + tr);
			this.context.lineTo(x + width, y + height - br);
			this.context.quadraticCurveTo(x + width, y + height, x + width - br, y + height);
			this.context.lineTo(x + bl, y + height);
			this.context.quadraticCurveTo(x, y + height, x, y + height - bl);
			this.context.lineTo(x, y + tl);
			this.context.quadraticCurveTo(x, y, x + tl, y);
			this.context.closePath();
		}
		return this;
	}

	/**
	 * Create a beveled clip.
	 * @param x The position x to start drawing clip.
	 * @param y The position y to start drawing clip.
	 * @param width The width of clip.
	 * @param height The height of clip.
	 * @param radius The radius for clip's rounded borders.
	 * @example
	 * // Radius argument, fill the content
	 * new Canvas(200, 200)
	 *     .createRoundedClip(0, 0, 200, 50, 35)
	 *     .fill()
	 *     .png();
	 *
	 * @example
	 * // Configured bevels
	 * new Canvas(200, 200)
	 *     .createRoundedClip(0, 0, 200, 50, {
	 *         // Top left border
	 *         tl: 15,
	 *         // Top right border
	 *         tr: 20,
	 *         // Bottom left border
	 *         bl: 5,
	 *         // Bottom right border
	 *         br: 10
	 *     })
	 *     // Add an image with the shape of the beveled clip using different borders
	 *     .printImage(buffer, 0, 0, 200, 50)
	 *     .png();
	 *
	 * @example
	 * // Top bevels only
	 * new Canvas(200, 200)
	 *     .createRoundedClip(0, 0, 200, 50, { tl: 20, tr: 20, bl: 0, br: 0 })
	 *     .printImage(buffer, 0, 0, 200, 50)
	 *     .png();
	 */
	public createRoundedClip(x: number, y: number, width: number, height: number, radius: number | BeveledRadiusOptions): this {
		return this.createRoundedPath(x, y, width, height, radius).clip();
	}

	/**
	 * Set a color for the canvas' context.
	 * @param color A canvas' color resolvable.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
	 */
	public setColor(color: string | CanvasGradient | CanvasPattern): this {
		this.context.fillStyle = color;
		return this;
	}

	/**
	 * Change the font.
	 * @param font The font's name to set.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font
	 */
	public setTextFont(font: string): this {
		this.context.font = font;
		return this;
	}

	/**
	 * Change the font alignment.
	 * @param align The font's alignment to set.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign
	 */
	public setTextAlign(align: CanvasTextAlign): this {
		this.context.textAlign = align;
		return this;
	}

	/**
	 * Change the font's baseline.
	 * @param baseline The font's baseline to set.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline
	 */
	public setTextBaseline(baseline: CanvasTextBaseline): this {
		this.context.textBaseline = baseline;
		return this;
	}

	/**
	 * Change the canvas's filters.
	 * @param filter The filter to set.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter
	 */
	public setFilter(filter: string): this {
		this.context.filter = filter;
		return this;
	}

	/**
	 * Starts a new path by emptying the list of sub-paths.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath
	 */
	public beginPath(): this {
		this.context.beginPath();
		return this;
	}

	/**
	 * Causes the point of the pen to move back to the start of the current sub-path.
	 * If the shape has already been closed or has only one point, this function does nothing.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/closePath
	 */
	public closePath(): this {
		this.context.closePath();
		return this;
	}

	/**
	 * Creates a pattern using the specified image. It repeats the source in the directions specified by the repetition
	 * argument, and returns it.
	 * @param image A Canvas Image to be used as the image to repeat.
	 * @param repetition The repeat mode.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createPattern
	 */
	public createPattern(image: PatternResolvable, repetition: PatternRepeat): CanvasPattern {
		return this.context.createPattern(_resolvePattern(image), repetition)!;
	}

	/**
	 * Creates a pattern using the specified image. It repeats the source in the directions specified by the repetition
	 * argument, and prints it.
	 * @param image A Canvas Image to be used as the image to repeat.
	 * @param repetition The repeat mode.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createPattern
	 */
	public printPattern(image: PatternResolvable, repetition: PatternRepeat): this {
		return this.setColor(this.createPattern(image, repetition));
	}

	/**
	 * Creates a gradient along the line given by the coordinates represented by the parameters.
	 * The coordinates are global, the second point does not rely on the position of the first and vice versa.
	 * @param x0 The x axis of the coordinate of the start point.
	 * @param y0 The y axis of the coordinate of the start point.
	 * @param x1 The x axis of the coordinate of the end point.
	 * @param y1 The y axis of the coordinate of the end point.
	 * @param steps The gradient steps.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient
	 */
	public createLinearGradient(x0: number, y0: number, x1: number, y1: number, steps: readonly GradientStop[] = []): CanvasGradient {
		const gradient = this.context.createLinearGradient(x0, y0, x1, y1);
		for (const step of steps) {
			gradient.addColorStop(step.position, step.color);
		}

		return gradient;
	}

	/**
	 * Creates a gradient along the line given by the coordinates represented by the parameters.
	 * The coordinates are global, the second point does not rely on the position of the first and vice versa. This
	 * method is chainable and calls setColor after creating the gradient.
	 * @param x0 The x axis of the coordinate of the start point.
	 * @param y0 The y axis of the coordinate of the start point.
	 * @param x1 The x axis of the coordinate of the end point.
	 * @param y1 The y axis of the coordinate of the end point.
	 * @param steps The gradient steps.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient
	 * @example
	 * new Canvas(200, 200)
	 *     .printLinearColorGradient(0, 0, 200, 50, [
	 *         { position: 0, color: 'white' },
	 *         { position: 0.25, color: 'red' },
	 *         { position: 0.5, color: 'blue' }
	 *     ])
	 *     .printRectangle(10, 10, 200, 100)
	 */
	public printLinearColorGradient(x0: number, y0: number, x1: number, y1: number, steps?: readonly GradientStop[]): this {
		const gradient = this.createLinearGradient(x0, y0, x1, y1, steps);
		return this.setColor(gradient);
	}

	/**
	 * Creates a gradient along the line given by the coordinates represented by the parameters.
	 * The coordinates are global, the second point does not rely on the position of the first and vice versa. This
	 * method is chainable and calls setStroke after creating the gradient.
	 * @param x0 The x axis of the coordinate of the start point.
	 * @param y0 The y axis of the coordinate of the start point.
	 * @param x1 The x axis of the coordinate of the end point.
	 * @param y1 The y axis of the coordinate of the end point.
	 * @param steps The gradient steps.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient
	 * @example
	 * new Canvas(200, 200)
	 *     .printLinearStrokeGradient(0, 0, 200, 50, [
	 *         { position: 0, color: 'white' },
	 *         { position: 0.25, color: 'red' },
	 *         { position: 0.5, color: 'blue' }
	 *     ])
	 *     .printRectangle(10, 10, 200, 100)
	 */
	public printLinearStrokeGradient(x0: number, y0: number, x1: number, y1: number, steps?: readonly GradientStop[]): this {
		const gradient = this.createLinearGradient(x0, y0, x1, y1, steps);
		return this.setStroke(gradient);
	}

	/**
	 * Creates a radial gradient given by the coordinates of the two circles represented by the parameters.
	 * @param x0 The x axis of the coordinate of the start circle.
	 * @param y0 The y axis of the coordinate of the start circle.
	 * @param r0 The radius of the start circle.
	 * @param x1 The x axis of the coordinate of the end circle.
	 * @param y1 The y axis of the coordinate of the end circle.
	 * @param r1 The radius of the end circle.
	 * @param steps The gradient steps.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
	 */
	public createRadialGradient(
		x0: number,
		y0: number,
		r0: number,
		x1: number,
		y1: number,
		r1: number,
		steps: readonly GradientStop[] = []
	): CanvasGradient {
		const gradient = this.context.createRadialGradient(x0, y0, r0, x1, y1, r1);
		for (const step of steps) {
			gradient.addColorStop(step.position, step.color);
		}

		return gradient;
	}

	/**
	 * Creates a radial gradient given by the coordinates of the two circles represented by the parameters. This
	 * method is chainable and calls setColor after creating the gradient.
	 * @param x0 The x axis of the coordinate of the start circle.
	 * @param y0 The y axis of the coordinate of the start circle.
	 * @param r0 The radius of the start circle.
	 * @param x1 The x axis of the coordinate of the end circle.
	 * @param y1 The y axis of the coordinate of the end circle.
	 * @param r1 The radius of the end circle.
	 * @param steps The gradient steps.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
	 */
	public printRadialColorGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number, steps?: readonly GradientStop[]): this {
		const gradient = this.createRadialGradient(x0, y0, r0, x1, y1, r1, steps);
		return this.setColor(gradient);
	}

	/**
	 * Creates a radial gradient given by the coordinates of the two circles represented by the parameters. This
	 * method is chainable and calls setStroke after creating the gradient.
	 * @param x0 The x axis of the coordinate of the start circle.
	 * @param y0 The y axis of the coordinate of the start circle.
	 * @param r0 The radius of the start circle.
	 * @param x1 The x axis of the coordinate of the end circle.
	 * @param y1 The y axis of the coordinate of the end circle.
	 * @param r1 The radius of the end circle.
	 * @param steps The gradient steps.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
	 */
	public printRadialStrokeGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number, steps?: readonly GradientStop[]): this {
		const gradient = this.createRadialGradient(x0, y0, r0, x1, y1, r1, steps);
		return this.setStroke(gradient);
	}

	/**
	 * Creates a radial gradient around a point with given coordinates.
	 * @param startAngle The angle at which to begin the gradient, in radians. Angle measurements start vertically above the centre and move around clockwise.
	 * @param x The x-axis coordinate of the centre of the gradient.
	 * @param y The y-axis coordinate of the centre of the gradient.
	 * @param steps The gradient steps.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createConicGradient
	 */
	public createConicGradient(startAngle: number, x: number, y: number, steps: readonly GradientStop[] = []): CanvasGradient {
		const gradient = this.context.createConicGradient(startAngle, x, y);
		for (const step of steps) {
			gradient.addColorStop(step.position, step.color);
		}

		return gradient;
	}

	/**
	 * Creates a radial gradient given by the coordinates of the two circles represented by the parameters. This
	 * method is chainable and calls setColor after creating the gradient.
	 * @param startAngle The angle at which to begin the gradient, in radians. Angle measurements start vertically above the centre and move around clockwise.
	 * @param x The x-axis coordinate of the centre of the gradient.
	 * @param y The y-axis coordinate of the centre of the gradient.
	 * @param steps The gradient steps.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createConicGradient
	 */
	public printConicColorGradient(startAngle: number, x: number, y: number, steps?: readonly GradientStop[]): this {
		const gradient = this.createConicGradient(startAngle, x, y, steps);
		return this.setColor(gradient);
	}

	/**
	 * Creates a radial gradient around a point with given coordinates. This method is chainable and calls setStroke after creating the gradient.
	 * @param startAngle The angle at which to begin the gradient, in radians. Angle measurements start vertically above the centre and move around clockwise.
	 * @param x The x-axis coordinate of the centre of the gradient.
	 * @param y The y-axis coordinate of the centre of the gradient.
	 * @param steps The gradient steps.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createConicGradient
	 */
	public printConicStrokeGradient(startAngle: number, x: number, y: number, steps?: readonly GradientStop[]): this {
		const gradient = this.createConicGradient(startAngle, x, y, steps);
		return this.setStroke(gradient);
	}

	/**
	 * Adds an ellipse to the path which is centered at (X, Y) position with the radius radiusX and radiusY starting at
	 * startAngle and ending at endAngle going in the given direction by anticlockwise (defaulting to clockwise).
	 * @param x The x axis of the coordinate for the ellipse's center.
	 * @param y The y axis of the coordinate for the ellipse's center.
	 * @param radiusX The ellipse's major-axis radius.
	 * @param radiusY The ellipse's minor-axis radius.
	 * @param rotation The rotation for this ellipse, expressed in radians.
	 * @param startAngle The starting point, measured from the x axis, from which it will be drawn, expressed in radians.
	 * @param endAngle The end ellipse's angle to which it will be drawn, expressed in radians.
	 * @param anticlockwise An optional Boolean which, if true, draws the ellipse anticlockwise (counter-clockwise), otherwise in a clockwise direction.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/ellipse
	 */
	public createEllipsePath(
		x: number,
		y: number,
		radiusX: number,
		radiusY: number,
		rotation: number,
		startAngle: number,
		endAngle: number,
		anticlockwise?: boolean
	): this {
		this.context.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
		return this;
	}

	/**
	 * Creates an ellipse clip which is centered at (X, Y) position with the radius radiusX and radiusY starting at
	 * startAngle and ending at endAngle going in the given direction by anticlockwise (defaulting to clockwise).
	 * @param x The x axis of the coordinate for the ellipse's center.
	 * @param y The y axis of the coordinate for the ellipse's center.
	 * @param radiusX The ellipse's major-axis radius.
	 * @param radiusY The ellipse's minor-axis radius.
	 * @param rotation The rotation for this ellipse, expressed in radians.
	 * @param startAngle The starting point, measured from the x axis, from which it will be drawn, expressed in radians.
	 * @param endAngle The end ellipse's angle to which it will be drawn, expressed in radians.
	 * @param anticlockwise An optional Boolean which, if true, draws the ellipse anticlockwise (counter-clockwise), otherwise in a clockwise direction.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/ellipse
	 */
	public createEllipseClip(
		x: number,
		y: number,
		radiusX: number,
		radiusY: number,
		rotation: number,
		startAngle: number,
		endAngle: number,
		anticlockwise?: boolean
	): this {
		return this.createEllipsePath(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise).clip();
	}

	/**
	 * Adds an arc to the path which is centered at (X, Y) position with radius r starting at startAngle and ending at
	 * endAngle going in the given direction by anticlockwise (defaulting to clockwise).
	 * @param x The X coordinate of the arc's center.
	 * @param y The Y coordinate of the arc's center.
	 * @param radius The arc's radius.
	 * @param startAngle The angle at which the arc starts, measured clockwise from the positive x axis and expressed in radians.
	 * @param endAngle The angle at which the arc ends, measured clockwise from the positive x axis and expressed in radians.
	 * @param anticlockwise An optional Boolean which, if true, causes the arc to be drawn counter-clockwise between the two angles. By default it is drawn clockwise.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
	 */
	public arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): this {
		this.context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
		return this;
	}

	/**
	 * Adds an arc to the path with the given control points and radius, connected to the previous point by a straight line.
	 * @param x1 The x axis of the coordinate for the first control point.
	 * @param y1 The y axis of the coordinate for the first control point.
	 * @param x2 The x axis of the coordinate for the second control point.
	 * @param y2 The y axis of the coordinate for the second control point.
	 * @param radius The arc's radius.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arcTo
	 */
	public arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): this {
		this.context.arcTo(x1, y1, x2, y2, radius);
		return this;
	}

	/**
	 * Adds a quadratic Bézier curve to the path. It requires two points. The first point is a control point and the
	 * second one is the end point. The starting point is the last point in the current path, which can be changed using
	 * moveTo() before creating the quadratic Bézier curve.
	 * @param cpx The x axis of the coordinate for the control point.
	 * @param cpy The y axis of the coordinate for the control point.
	 * @param x The x axis of the coordinate for the end point.
	 * @param y The y axis of the coordinate for the end point.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo
	 */
	public quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): this {
		this.context.quadraticCurveTo(cpx, cpy, x, y);
		return this;
	}

	/**
	 * Adds a cubic Bézier curve to the path. It requires three points. The first two points are control points and the
	 * third one is the end point. The starting point is the last point in the current path, which can be changed using
	 * moveTo() before creating the Bézier curve.
	 * @param cp1x The x axis of the coordinate for the first control point.
	 * @param cp1y The y axis of the coordinate for first control point.
	 * @param cp2x The x axis of the coordinate for the second control point.
	 * @param cp2y The y axis of the coordinate for the second control point.
	 * @param x The x axis of the coordinate for the end point.
	 * @param y The y axis of the coordinate for the end point.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/bezierCurveTo
	 */
	public bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): this {
		this.context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
		return this;
	}

	/**
	 * Connects the last point in the sub-path to the x, y coordinates with a straight line
	 * @param x The x axis of the coordinate for the end of the line.
	 * @param y The y axis of the coordinate for the end of the line.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo
	 */
	public lineTo(x: number, y: number): this {
		this.context.lineTo(x, y);
		return this;
	}

	/**
	 * Moves the starting point of a new sub-path to the (X, Y) coordinates.
	 * @param x The x axis of the point.
	 * @param y The y axis of the point.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/moveTo
	 */
	public moveTo(x: number, y: number): this {
		this.context.moveTo(x, y);
		return this;
	}

	/**
	 * Set the shadow's blur.
	 * @param radius The shadow's blur radius to set.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowBlur
	 */
	public setShadowBlur(radius: number): this {
		this.context.shadowBlur = radius;
		return this;
	}

	/**
	 * Set the shadow's color.
	 * @param color A canvas' color resolvable to set as shadow's color.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor
	 */
	public setShadowColor(color: string): this {
		this.context.shadowColor = color;
		return this;
	}

	/**
	 * Set the property that specifies the distance that the shadow will be offset in horizontal distance.
	 * @param value The value in pixels for the distance.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX
	 */
	public setShadowOffsetX(value: number): this {
		this.context.shadowOffsetX = value;
		return this;
	}

	/**
	 * Set the property that specifies the distance that the shadow will be offset in vertical distance.
	 * @param value The value in pixels for the distance.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY
	 */
	public setShadowOffsetY(value: number): this {
		this.context.shadowOffsetY = value;
		return this;
	}

	/**
	 * Sets the miter limit ratio in space units. When getting, it returns the current value (10.0 by default). When
	 * setting, zero, negative, Infinity and NaN values are ignored; otherwise the current value is set to the new value.
	 * @param value A number specifying the miter limit ratio in space units. Zero, negative, Infinity and NaN values
	 * are ignored.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/miterLimit
	 */
	public setMiterLimit(value: number): this {
		this.context.miterLimit = value;
		return this;
	}

	/**
	 * Sets the type of compositing operation to apply when drawing new shapes, where type is a string identifying which
	 * of the compositing or blending mode operations to use.
	 * @param type The global composite operation mode.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
	 */
	public setGlobalCompositeOperation(type: GlobalCompositeOperation): this {
		this.context.globalCompositeOperation = type;
		return this;
	}

	/**
	 * Modify the alpha value that is applied to shapes and images before they are drawn into the canvas.
	 * @param value The alpha value, from 0.0 (fully transparent) to 1.0 (fully opaque)
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
	 */
	public setGlobalAlpha(value: number): this {
		this.context.globalAlpha = value;
		return this;
	}

	/**
	 * Modify whether or not image smoothing should be enabled.
	 * @param value Whether or not image smoothing should be enabled.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled
	 */
	public setImageSmoothingEnabled(value: boolean): this {
		this.context.imageSmoothingEnabled = value;
		return this;
	}

	/**
	 * Modify the smoothing quality value.
	 * @param value The smoothing quality value.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled
	 */
	public setImageSmoothingQuality(value: ImageSmoothingQuality): this {
		this.context.imageSmoothingQuality = value;
		return this;
	}

// IF(CAIRO):                                                                                                          \
	/**                                                                                                                \
	 * Set antialias mode.                                                                                             \
	 * @param antialias The antialias mode.                                                                            \
	 * @note This is a `canvas` extension.                                                                             \
	 */                                                                                                                \
	public setAntialiasMode(antialias: AntiAlias): this {                                                              \
		this.context.antialias = antialias;                                                                            \
		return this;                                                                                                   \
	}

// IF(CAIRO):                                                                                                          \
	/**                                                                                                                \
	 * Set the text drawing mode. Using glyph is much faster than path for drawing, and when using a PDF context will  \
	 * embed the text natively, so will be selectable and lower file size. The downside is that cairo does not have    \
	 * any subpixel precision for glyph, so this will be noticeably lower quality for text positioning in cases such   \
	 * as rotated text. Also, strokeText in glyph will act the same as fillText, except using the stroke style for     \
	 * the fill.                                                                                                       \
	 * @param mode The drawing mode.                                                                                   \
	 * @note This is a `canvas` extension.                                                                             \
	 */                                                                                                                \
	public setTextDrawingMode(mode: TextDrawingMode): this {                                                           \
		this.context.textDrawingMode = mode;                                                                           \
		return this;                                                                                                   \
	}

// IF(CAIRO):                                                                                                          \
	/**                                                                                                                \
	 * Change the pattern quality                                                                                      \
	 * @param pattern The pattern quality.                                                                             \
	 * @note This is a `canvas` extension.                                                                             \
	 */                                                                                                                \
	public setPatternQuality(pattern: PatternQuality): this {                                                          \
		this.context.patternQuality = pattern;                                                                         \
		return this;                                                                                                   \
	}

// IF(SKIA):                                                                                                           \
	/**                                                                                                                \
	 * Sets the canvas's CSS3 [font-variant](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant).           \
	 * @param fontVariant The CSS3 [font-variant](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant) value \
	 * to be set.                                                                                                      \
	 * @note The font-variant does not persist between font changes. Additionally, you can use {@link fontVariant}.    \
	 * @note This is a `skia-canvas` extension.                                                                        \
	 */                                                                                                                \
	public setFontVariant(fontVariant: FontVariantString): this {                                                      \
		this.context.fontVariant = fontVariant;                                                                        \
		return this;                                                                                                   \
	}

// IF(SKIA):                                                                                                           \
	/**                                                                                                                \
	 * Sets the text tracking property in the canvas.                                                                  \
	 * @param textTracking An integer representing the amount of space to add/remove in terms of 1/1000’s of an ‘em’   \
	 * (a.k.a. the current font size). Positive numbers will space out the text (e.g., `100` is a good value for       \
	 * setting all-caps) while negative values will pull the letters closer together (this is only rarely a good       \
	 * idea).                                                                                                          \
	 * @note The tracking value defaults to `0` and settings will persist across font changes.                         \
	 * @note This is a `skia-canvas` extension.                                                                        \
	 */                                                                                                                \
	public setTextTracking(textTracking: number): this {                                                               \
		this.context.textTracking = textTracking;                                                                      \
		return this;                                                                                                   \
	}

// IF(SKIA):                                                                                                           \
	/**                                                                                                                \
	 * Sets whether or not Skia's text-wrap system should be enabled. Setting to `true` has the following effects:     \
	 *                                                                                                                 \
	 * - {@link printText} will honor newlines as opposed to converting them to spaces.                                \
	 * - {@link printText}'s width argument will be interpreted as column width and will word-wrap long lines.         \
	 * - {@link printStrokeText}'s width argument will be interpreted as column width and will word-wrap long lines.   \
	 *                                                                                                                 \
	 * However, when set to `false` (default), the text-drawing methods will never choose a more-condensed weight or   \
	 * otherwise attempt to squeeze your entire string into the measure specified by `width`. Instead the text will be \
	 * typeset up through the last word that fits and the rest will be omitted.                                        \
	 * @param value Whether text wrap should be enabled or not.                                                        \
	 * @note This is a `skia-canvas` extension.                                                                        \
	 */                                                                                                                \
	public setTextWrap(value: boolean): this {                                                                         \
		this.context.textWrap = value;                                                                                 \
		return this;                                                                                                   \
	}

	/**
	 * Sets the shadow blur and offsets to zero, then sets the shadow color to transparent. If shadows are not longer
	 * used in a canvas and performance is critical, `.setShadowColor('transparent')` should be used instead, as of the
	 * [note from Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor).
	 * @example
	 * new Canvas(500, 500)
	 *     // Set a shadow color and blur
	 *     .setShadowColor('rgba(23, 23, 23, 0.2)')
	 *     .setShadowBlur(5)
	 *     // Render the text with a blow effect
	 *     .printText('Hello', 30, 50)
	 *     // Reset the shadows
	 *     .resetShadows()
	 *     // Render the text without shadows
	 *     .printText('World!', 30, 100);
	 */
	public resetShadows(): this {
		return this.setShadowBlur(0).setShadowOffsetX(0).setShadowOffsetY(0).setShadowColor('transparent');
	}

	/**
	 * Clear a circle.
	 * @param x The position x in the center of the clip's circle.
	 * @param y The position y in the center of the clip's circle.
	 * @param radius The radius for the clip.
	 * @param start The degree in radians to start drawing the circle.
	 * @param angle The degree in radians to finish drawing the circle, defaults to a full circle.
	 * @param antiClockwise Whether or not the angle should be anti-clockwise.
	 */
	public clearCircle(x: number, y: number, radius: number, start = 0, angle = Math.PI * 2, antiClockwise = false): this {
		return this.createCircularClip(x, y, radius, start, angle, antiClockwise).clearRectangle(x - radius, y - radius, radius * 2, radius * 2);
	}

	/**
	 * Clear an area.
	 * @param dx The position x to start drawing the element.
	 * @param dy The position y to start drawing the element.
	 * @param width The width of the element.
	 * @param height The height of the element.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
	 */
	public clearRectangle(dx = 0, dy = 0, width = this.width, height = this.height): this {
		this.context.clearRect(dx, dy, width, height);
		return this;
	}

	/**
	 * Reports whether or not the specified point is contained in the current path.
	 * @param x The X coordinate of the point to check.
	 * @param y The Y coordinate of the point to check.
	 * @param fillRule The algorithm by which to determine if a point is inside a path or outside a path.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInPath
	 */
	public isPointInPath(x: number, y: number, fillRule?: CanvasFillRule): boolean;
	/**
	 * Reports whether or not the specified point is contained in the given path.
	 * @param path The {@link Path2D} to check against.
	 * @param x The X coordinate of the point to check.
	 * @param y The Y coordinate of the point to check.
	 * @param fillRule The algorithm by which to determine if a point is inside a path or outside a path.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInPath
	 */
	public isPointInPath(path: Path2D, x: number, y: number, fillRule?: CanvasFillRule): boolean;
	public isPointInPath(...args: [any, any]): boolean {
		return this.context.isPointInPath(...args);
	}

	/**
	 * Reports whether or not the specified point is inside the area contained by the stroking of the current path.
	 * @param x The X coordinate of the point to check.
	 * @param y The Y coordinate of the point to check.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInStroke
	 */
	public isPointInStroke(x: number, y: number): boolean;
	/**
	 * Reports whether or not the specified point is inside the area contained by the stroking of the given path.
	 * @param path The {@link Path2D} to check against.
	 * @param x The X coordinate of the point to check.
	 * @param y The Y coordinate of the point to check.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInStroke
	 */
	public isPointInStroke(path: Path2D, x: number, y: number): boolean;
	public isPointInStroke(...args: [any, any]): boolean {
		return this.context.isPointInStroke(...args);
	}

	/**
	 * Process data with this as the context
	 * @param fn A callback function
	 * @param args Extra arguments to pass to the function
	 */
	public process<Args extends readonly any[]>(fn: (this: this, canvas: this, ...args: Args) => unknown, ...args: Args): this {
		fn.call(this, this, ...args);
		return this;
	}

	/**
	 * Wraps a text into a width-limited multi-line text.
	 * @param text The text to wrap
	 * @param wrapWidth The wrap width
	 * @example
	 * // Calculate the wrapped text and return it, which
	 * // is useful for storage to avoid re-calculating the
	 * // wrapped text
	 * const wrappedText = new Canvas(500, 300)
	 *     .setTextFont('48px Verdana')
	 *     .wrapText('Hello World, this is a quite\nlong text.', 300);
	 * @example
	 * // Wrap the text and add it
	 * const buffer = new Canvas(500, 300)
	 *     .setTextFont('48px Verdana')
	 *     .process((canvas) => {
	 *         const wrappedText = canvas.wrapText('Hello World, this is a quite\nlong text.');
	 *         return canvas
	 *             .setTextAlign('center')
	 *             .addMultilineText(wrappedText, 250, 50)
	 *     })
	 *     .png(); // Returns a Buffer
	 */
	public wrapText(text: string, wrapWidth: number): string {
		return textWrap(this, text, wrapWidth);
	}

	/**
	 * Creates a new, blank {@link ImageData} object with the specified dimensions. All of the pixels in the new object are transparent black.
	 * @param sw The width to give the new {@link ImageData} object. A negative value flips the rectangle around the vertical axis.
	 * @param sh The height to give the new {@link ImageData} object. A negative value flips the rectangle around the horizontal axis.
	 * @param settings The settings to be used.
	 */
	public createImageData(sw: number, sh: number, settings?: ImageDataSettings): ImageData;
	/**
	 * Creates a new, blank {@link ImageData} object with the dimensions of the specified object. All of the pixels in the new object are transparent black.
	 * @param imageData An existing {@link ImageData} object from which to copy the width and height. The image itself is not copied.
	 */
	public createImageData(imageData: ImageData): ImageData;
	public createImageData(...args: [any]): ImageData {
		return this.context.createImageData(...args);
	}

// IF(CAIRO):                                                                  \
	/**                                                                        \
	 * Gets a JPEG buffer.                                                     \
	 * @param config The render configuration.                                 \
	 * @returns A JPEG buffer.                                                 \
	 * @see {@link jpegAsync} for the async version.                           \
	 */                                                                        \
	public jpeg(config?: JpegConfig): Buffer {                                 \
		return this.toBuffer('image/jpeg', config);                            \
	}
// IF(NAPI_RS):                                                                \
	/**                                                                        \
	 * Gets a JPEG buffer.                                                     \
	 * @param quality The quality to use, defaults to `92`.                    \
	 * @returns A JPEG buffer.                                                 \
	 * @see {@link jpegAsync} for the async version.                           \
	 */                                                                        \
	public jpeg(quality?: number): Buffer {                                    \
		return this.canvas.encodeSync('jpeg', quality);                        \
	}
// IF(SKIA):                                                                   \
	/**                                                                        \
	 * Gets a JPEG buffer.                                                     \
	 * @param options The render options.                                      \
	 * @returns A JPEG buffer.                                                 \
	 * @see {@link jpegAsync} for the async version.                           \
	 */                                                                        \
	public jpeg(options?: RenderOptions): Buffer {                             \
		return this.canvas.toBufferSync('jpeg', options);                      \
	}

// IF(CAIRO):                                                                  \
	/**                                                                        \
	 * Gets a JPEG buffer.                                                     \
	 * @param config The render configuration.                                 \
	 * @returns A JPEG buffer.                                                 \
	 * @see {@link jpegAsync} for the async version.                           \
	 */                                                                        \
	public jpegAsync(config?: JpegConfig): Promise<Buffer> {                   \
		return this.toBufferAsync('image/jpeg', config);                       \
	}
// IF(NAPI_RS):                                                                \
	/**                                                                        \
	 * Gets a JPEG buffer.                                                     \
	 * @param quality The quality to use, defaults to `92`.                    \
	 * @returns A JPEG buffer.                                                 \
	 * @see {@link jpegAsync} for the async version.                           \
	 */                                                                        \
	public jpegAsync(quality?: number): Promise<Buffer> {                      \
		return this.canvas.encode('jpeg', quality);                            \
	}
// IF(SKIA):                                                                   \
	/**                                                                        \
	 * Gets a JPEG buffer.                                                     \
	 * @param options The render options.                                      \
	 * @returns A JPEG buffer.                                                 \
	 */                                                                        \
	public jpegAsync(options?: RenderOptions): Promise<Buffer> {               \
		return this.canvas.toBuffer('jpeg', options);                          \
	}

// IF(CAIRO):                                                                  \
	/**                                                                        \
	 * Creates a JPEG stream.                                                  \
	 * @param config The config to use.                                        \
	 * @note This is a `canvas` extension.                                     \
	 */                                                                        \
	public jpegStream(config?: JpegConfig): JPEGStream {                       \
		return this.canvas.createJPEGStream(config);                           \
	}

// IF(NAPI_RS):                                                                \
	/**                                                                        \
	 * Gets a WebP buffer.                                                     \
	 * @param quality The quality to use, defaults to `80`.                    \
	 * @returns A WebP buffer.                                                 \
	 * @see {@link webpAsync} for the async version.                           \
	 */                                                                        \
	public webp(quality?: number): Buffer {                                    \
		return this.canvas.encodeSync('webp', quality);                        \
	}

// IF(NAPI_RS):                                                                \
	/**                                                                        \
	 * Gets a WebP buffer.                                                     \
	 * @param quality The quality to use, defaults to `80`.                    \
	 * @returns A WebP buffer.                                                 \
	 * @see {@link webpAsync} for the async version.                           \
	 */                                                                        \
	public webpAsync(quality?: number): Promise<Buffer> {                      \
		return this.canvas.encode('webp', quality);                            \
	}

// IF(CAIRO):                                                                  \
	/**                                                                        \
	 * Gets a PNG buffer.                                                      \
	 * @param config The render configuration.                                 \
	 * @returns A PNG buffer.                                                  \
	 * @see {@link pngAsync} for the async version.                            \
	 */                                                                        \
	public png(config?: PngConfig): Buffer {                                   \
		return this.toBuffer('image/png', config);                             \
	}
// IF(NAPI_RS):                                                                \
	/**                                                                        \
	 * Gets a PNG buffer.                                                      \
	 * @returns A PNG buffer.                                                  \
	 * @see {@link pngAsync} for the async version.                            \
	 */                                                                        \
	public png(): Buffer {                                                     \
		return this.canvas.encodeSync('png');                                  \
	}
// IF(SKIA):                                                                   \
	/**                                                                        \
	 * Gets a PNG buffer.                                                      \
	 * @param options The render options.                                      \
	 * @returns A PNG buffer.                                                  \
	 * @see {@link pngAsync} for the async version.                            \
	 */                                                                        \
	public png(options?: RenderOptions): Buffer {                              \
		return this.canvas.toBufferSync('png', options);                       \
	}

// IF(CAIRO):                                                                  \
	/**                                                                        \
	 * Gets a PNG buffer.                                                      \
	 * @param config The render configuration.                                 \
	 * @returns A PNG buffer.                                                  \
	 * @see {@link pngAsync} for the async version.                            \
	 */                                                                        \
	public pngAsync(config?: PngConfig): Promise<Buffer> {                     \
		return this.toBufferAsync('image/png', config);                        \
	}
// IF(NAPI_RS):                                                                \
	/**                                                                        \
	 * Gets a PNG buffer.                                                      \
	 * @returns A PNG buffer.                                                  \
	 * @see {@link pngAsync} for the async version.                            \
	 */                                                                        \
	public pngAsync(): Promise<Buffer> {                                       \
		return this.canvas.encode('png');                                      \
	}
// IF(SKIA):                                                                   \
	/**                                                                        \
	 * Gets a PNG buffer.                                                      \
	 * @param options The render options.                                      \
	 * @returns A PNG buffer.                                                  \
	 */                                                                        \
	public pngAsync(options?: RenderOptions): Promise<Buffer> {                \
		return this.canvas.toBuffer('png', options);                           \
	}

// IF(CAIRO):                                                                  \
	/**                                                                        \
	 * Creates a PNG stream.                                                   \
	 * @param config The config to use.                                        \
	 * @note This is a `canvas` extension.                                     \
	 */                                                                        \
	public pngStream(config?: PngConfig): PNGStream {                          \
		return this.canvas.createPNGStream(config);                            \
	}

// IF(CAIRO):                                                                  \
	/**                                                                        \
	 * Gets a PDF buffer.                                                      \
	 * @param config The render configuration.                                 \
	 * @returns A PDF buffer.                                                  \
	 * @see {@link pdfAsync} for the async version.                            \
	 */                                                                        \
	public pdf(config?: PdfConfig): Buffer {                                   \
		return this.toBuffer('application/pdf', config);                       \
	}
// IF(SKIA):                                                                   \
	/**                                                                        \
	 * Gets a PDF buffer.                                                      \
	 * @param options The render options.                                      \
	 * @returns A PDF buffer.                                                  \
	 * @see {@link pdfAsync} for the async version.                            \
	 */                                                                        \
	public pdf(options?: RenderOptions): Buffer {                              \
		return this.canvas.toBufferSync('pdf', options);                       \
	}

// IF(CAIRO):                                                                  \
	/**                                                                        \
	 * Gets a PDF buffer.                                                      \
	 * @param config The render configuration.                                 \
	 * @returns A PDF buffer.                                                  \
	 * @see {@link pngAsync} for the async version.                            \
	 */                                                                        \
	public pdfAsync(config?: PdfConfig): Promise<Buffer> {                     \
		return this.toBufferAsync('application/pdf', config);                  \
	}
// IF(SKIA):                                                                   \
	/**                                                                        \
	 * Gets a PDF buffer.                                                      \
	 * @param options The render options.                                      \
	 * @returns A PDF buffer.                                                  \
	 */                                                                        \
	public pdfAsync(options?: RenderOptions): Promise<Buffer> {                \
		return this.canvas.toBuffer('pdf', options);                           \
	}

// IF(CAIRO):                                                                  \
	/**                                                                        \
	 * Creates a PDF stream.                                                   \
	 * @param config The config to use.                                        \
	 * @note This is a `canvas` extension.                                     \
	 */                                                                        \
	public pdfStream(config?: PdfConfig): PDFStream {                          \
		return this.canvas.createPDFStream(config);                            \
	}

// IF(SKIA):                                                                   \
	/**                                                                        \
	 * Gets a SVG buffer.                                                      \
	 * @param options The render options.                                      \
	 * @returns A SVG buffer.                                                  \
	 * @see {@link svgAsync} for the async version.                            \
	 */                                                                        \
	public svg(options?: RenderOptions): Buffer {                              \
		return this.canvas.toBufferSync('svg', options);                       \
	}

// IF(SKIA):                                                                   \
	/**                                                                        \
	 * Gets a SVG buffer.                                                      \
	 * @param options The render options.                                      \
	 * @returns A SVG buffer.                                                  \
	 */                                                                        \
	public svgAsync(options?: RenderOptions): Promise<Buffer> {                \
		return this.canvas.toBuffer('svg', options);                           \
	}

// IF(NAPI_RS):                                                                                                        \
	/**                                                                                                                \
	 * Gets an AVIF buffer.                                                                                            \
	 * @returns A AVIF buffer.                                                                                         \
	 * @see {@link avifAsync} for the async version.                                                                   \
	 */                                                                                                                \
	public avif(cfg?: AvifConfig): Buffer {                                                                            \
		return this.canvas.encodeSync('avif', cfg);                                                                    \
	}

// IF(NAPI_RS):                                                                                                        \
	/**                                                                                                                \
	 * Gets an AVIF buffer.                                                                                            \
	 * @returns A AVIF buffer.                                                                                         \
	 * @see {@link avifAsync} for the async version.                                                                   \
	 */                                                                                                                \
	public avifAsync(cfg?: AvifConfig): Promise<Buffer> {                                                              \
		return this.canvas.encode('avif', cfg);                                                                        \
	}

// IF(CAIRO):                                                                                                          \
	/**                                                                                                                \
	 * For image canvases, encodes the canvas as a PNG. For PDF canvases, encodes the canvas as a PDF. For SVG         \
	 * canvases, encodes the canvas as an SVG.                                                                         \
	 */                                                                                                                \
	public toBuffer(): Buffer;                                                                                         \
	/**                                                                                                                \
	 * Encodes the canvas as a PNG.                                                                                    \
	 * @param mimeType the standard MIME type for the image format to return.                                          \
	 * @param config The render configuration.                                                                         \
	 */                                                                                                                \
	public toBuffer(mimeType: 'image/png', config?: PngConfig): Buffer;                                                \
	/**                                                                                                                \
	 * Encodes the canvas as a JPG.                                                                                    \
	 * @param mimeType the standard MIME type for the image format to return.                                          \
	 * @param config The render configuration.                                                                         \
	 */                                                                                                                \
	public toBuffer(mimeType: 'image/jpeg', config?: JpegConfig): Buffer;                                              \
	/**                                                                                                                \
	 * Encodes the canvas as a PDF.                                                                                    \
	 * @param mimeType the standard MIME type for the image format to return.                                          \
	 * @param config The render configuration.                                                                         \
	 */                                                                                                                \
	public toBuffer(mimeType: 'application/pdf', config?: PdfConfig): Buffer;                                          \
	/**                                                                                                                \
	 * Returns the unencoded pixel data, top-to-bottom. On little-endian (most) systems, the array will be ordered     \
	 * BGRA; on big-endian systems, it will be ARGB.                                                                   \
	 * @param mimeType the standard MIME type for the image format to return.                                          \
	 */                                                                                                                \
	public toBuffer(mimeType: 'raw'): Buffer;                                                                          \
	public toBuffer(...args: readonly any[]): Buffer {                                                                 \
		// @ts-expect-error: Complains about invalid overload (expects more than 0 overloads).                         \
		return this.canvas.toBuffer(...args);                                                                          \
	}
// IF(SKIA):                                                                                                           \
	/**                                                                                                                \
	 * Renders the canvas into a buffer with the specified format.                                                     \
	 * @param format The format to use for the image. An `@` suffix can be added to the format string to specify a     \
	 * pixel-density (for instance, "jpg@2x").                                                                         \
	 * @param options The render options.                                                                              \
	 */                                                                                                                \
	public toBuffer(format: RenderImageFormat, options?: RenderOptions): Buffer;                                       \
	public toBuffer(...args: [any]): Buffer {                                                                          \
		return this.canvas.toBufferSync(...args);                                                                      \
	}

// IF(CAIRO):                                                                                                          \
	/**                                                                                                                \
	 * For image canvases, encodes the canvas as a PNG. For PDF canvases, encodes the canvas as a PDF. For SVG         \
	 * canvases, encodes the canvas as an SVG.                                                                         \
	 */                                                                                                                \
	public toBufferAsync(): Promise<Buffer>;                                                                           \
	/**                                                                                                                \
	 * Encodes the canvas as a PNG.                                                                                    \
	 * @param mimeType the standard MIME type for the image format to return.                                          \
	 * @param config The render configuration.                                                                         \
	 */                                                                                                                \
	public toBufferAsync(mimeType: 'image/png', config?: PngConfig): Promise<Buffer>;                                  \
	/**                                                                                                                \
	 * Encodes the canvas as a JPG.                                                                                    \
	 * @param mimeType the standard MIME type for the image format to return.                                          \
	 * @param config The render configuration.                                                                         \
	 */                                                                                                                \
	public toBufferAsync(mimeType: 'image/jpeg', config?: JpegConfig): Promise<Buffer>;                                \
	/**                                                                                                                \
	 * Encodes the canvas as a PDF.                                                                                    \
	 * @param mimeType the standard MIME type for the image format to return.                                          \
	 * @param config The render configuration.                                                                         \
	 */                                                                                                                \
	public toBufferAsync(mimeType: 'application/pdf', config?: PdfConfig): Promise<Buffer>;                            \
	public toBufferAsync(...args: readonly any[]): Promise<Buffer> {                                                   \
		return new Promise<Buffer>((resolve, reject) =>                                                                \
			// @ts-expect-error: Complains about invalid overload (expects more than 0 overloads).                     \
			this.canvas.toBuffer((error: Error | null, buffer: Buffer | null): void => {                               \
				if (error) reject(error);                                                                              \
				else resolve(buffer!);                                                                                 \
			}, ...args)                                                                                                \
		);                                                                                                             \
	}
// IF(SKIA):                                                                                                           \
	/**                                                                                                                \
	 * Renders the canvas into a buffer with the specified format.                                                     \
	 * @param format The format to use for the image. An `@` suffix can be added to the format string to specify a     \
	 * pixel-density (for instance, "jpg@2x").                                                                         \
	 * @param options The render options.                                                                              \
	 */                                                                                                                \
	public toBufferAsync(format: RenderImageFormat, options?: RenderOptions): Promise<Buffer>;                         \
	public toBufferAsync(...args: [any]): Promise<Buffer> {                                                            \
		return this.canvas.toBuffer(...args);                                                                          \
	}

// IF(BROWSER,CAIRO):                                                                                                  \
	/**                                                                                                                \
	 * Render the canvas into a PNG Data URL.                                                                          \
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL                               \
	 */                                                                                                                \
	public toDataURL(): string;                                                                                        \
	/**                                                                                                                \
	 * Render the canvas into a PNG Data URL.                                                                          \
	 * @param type the standard MIME type for the image format to return.                                              \
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL                               \
	 */                                                                                                                \
	public toDataURL(mimeType: 'image/png'): string;                                                                   \
	/**                                                                                                                \
	 * Render the canvas into a JPEG Data URL.                                                                         \
	 * @param type the standard MIME type for the image format to return.                                              \
	 * @param quality The quality for the JPEG.                                                                        \
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL                               \
	 */                                                                                                                \
	public toDataURL(mimeType: 'image/jpeg', quality?: number): string;                                                \
	public toDataURL(...args: []): string {                                                                            \
		return this.canvas.toDataURL(...args);                                                                         \
	}
// IF(NAPI_RS):                                                                                                        \
	public toDataURL(mime?: 'image/png'): string;                                                                      \
	public toDataURL(mime: 'image/jpeg' | 'image/webp', quality?: number): string;                                     \
	public toDataURL(mime?: 'image/jpeg' | 'image/webp' | 'image/png', quality?: number): string;                      \
	public toDataURL(mime?: 'image/avif', cfg?: AvifConfig): string;                                                   \
	public toDataURL(...args: [any]): string {                                                                         \
		return this.canvas.toDataURL(...args);                                                                         \
	}
// IF(SKIA):                                                                                                           \
	/**                                                                                                                \
	 * Render the canvas into a data URL with the specified format.                                                    \
	 * @param format The image format the data URL must have.                                                          \
	 * @param options The render options.                                                                              \
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL                               \
	 */                                                                                                                \
	public toDataURL(format: RenderImageFormat, options?: RenderOptions): Promise<string>;                             \
	public toDataURL(...args: [any]): Promise<string> {                                                                \
		return this.canvas.toDataURL(...args);                                                                         \
	}

// IF(NAPI_RS):                                                                                                        \
	public toDataURLAsync(mime?: 'image/png'): Promise<string>;                                                        \
	public toDataURLAsync(mime: 'image/jpeg' | 'image/webp', quality?: number): Promise<string>;                       \
	public toDataURLAsync(mime?: 'image/jpeg' | 'image/webp' | 'image/png', quality?: number): Promise<string>;        \
	public toDataURLAsync(mime?: 'image/avif', cfg?: AvifConfig): Promise<string>;                                     \
	public toDataURLAsync(...args: [any]): Promise<string> {                                                           \
		return this.canvas.toDataURLAsync(...args);                                                                    \
	}

// IF(SKIA):                                                                                                           \
	/**                                                                                                                \
	 * Takes a file path and writes the canvas's current contents to disk. If the filename ends with an extension that \
	 * makes its format clear, the second argument is optional. If the filename is ambiguous, you can pass an options  \
	 * object with a format string using names like "png" and "jpeg" or a full mime type like "application/pdf".       \
	 * @param filename The way multi-page documents are handled depends on the filename argument. If the filename      \
	 * contains the string "{}", it will be used as template for generating a numbered sequence of files—one per page. \
	 * If no curly braces are found in the filename, only a single file will be saved. That single file will be        \
	 * multi-page in the case of PDF output but for other formats it will contain only the most recently added page.   \
	 *                                                                                                                 \
	 * An integer can optionally be placed between the braces to indicate the number of padding characters to use for  \
	 * numbering. For instance "page-{}.svg" will generate files of the form page-1.svg whereas "frame-{4}.png" will   \
	 * generate files like frame-0001.png.                                                                             \
	 * @param options The options for the image render.                                                                \
	 */                                                                                                                \
	public saveAs(filename: string, options?: SaveAsOptions): this;                                                    \
	public saveAs(...args: readonly any[]): this {                                                                     \
		// @ts-expect-error: Complains about invalid overload (expects more than 0 overloads).                         \
		this.canvas.saveAsSync(...args);                                                                               \
		return this;                                                                                                   \
	}

// IF(SKIA):                                                                                                           \
	/**                                                                                                                \
	 * Takes a file path and writes the canvas's current contents to disk. If the filename ends with an extension that \
	 * makes its format clear, the second argument is optional. If the filename is ambiguous, you can pass an options  \
	 * object with a format string using names like "png" and "jpeg" or a full mime type like "application/pdf".       \
	 * @param filename The way multi-page documents are handled depends on the filename argument. If the filename      \
	 * contains the string "{}", it will be used as template for generating a numbered sequence of files—one per page. \
	 * If no curly braces are found in the filename, only a single file will be saved. That single file will be        \
	 * multi-page in the case of PDF output but for other formats it will contain only the most recently added page.   \
	 *                                                                                                                 \
	 * An integer can optionally be placed between the braces to indicate the number of padding characters to use for  \
	 * numbering. For instance "page-{}.svg" will generate files of the form page-1.svg whereas "frame-{4}.png" will   \
	 * generate files like frame-0001.png.                                                                             \
	 * @param options The options for the image render.                                                                \
	 */                                                                                                                \
	public saveAsAsync(filename: string, options?: SaveAsOptions): Promise<this>;                                      \
	public async saveAsAsync(...args: readonly any[]): Promise<this> {                                                 \
		// @ts-expect-error: Complains about invalid overload (expects more than 0 overloads).                         \
		await this.canvas.saveAs(...args);                                                                             \
		return this;                                                                                                   \
	}

// IF(BROWSER):                                                                                                        \
	/**                                                                                                                \
	 * <warn>This is for web usage only, node-canvas does not support this</warn>                                      \
	 * Render the canvas into a Blob object representing the image contained in the canvas                             \
	 * @param callback A callback function with the resulting `Blob` object as a single argument.                      \
	 * @param type A string indicating the image format. The default type is `image/png`.                              \
	 * @param quality A number between 0 and 1 indicating image quality if the requested type is `image/jpeg` or       \
	 * `image/webp`.                                                                                                   \
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob                                  \
	 */                                                                                                                \
	public toBlob(callback: BlobCallback, type?: string, quality?: any): void {                                        \
		return this.canvas.toBlob(callback, type, quality);                                                            \
	}

// IF(BROWSER):                                                                                                        \
	/**                                                                                                                \
	 * <warn>This is for web usage only, node-canvas does not support this</warn>                                      \
	 * Render the canvas into a Blob object representing the image contained in the canvas                             \
	 * @param type A string indicating the image format. The default type is `image/png`.                              \
	 * @param quality A number between 0 and 1 indicating image quality if the requested type is `image/jpeg` or       \
	 * `image/webp`.                                                                                                   \
	 */                                                                                                                \
	public toBlobAsync(type?: string, quality?: any): Promise<Blob | null> {                                           \
		return new Promise<Blob | null>((resolve) => this.canvas.toBlob(resolve, type, quality));                      \
	}

	protected parseFont(font: string) {
		const result = fontRegExp.exec(font);
		if (result === null) return [font] as const;

		return [font.slice(0, result.index), Number(result[1]), font.slice(result.index + result[1].length)] as const;
	}

	protected resolveCircularCoordinates(
		imageOrBuffer: ImageResolvable,
		x: number,
		y: number,
		radius: number,
		fit: NonNullable<PrintCircularOptions['fit']>
	): ResolvedCircularCoordinates {
		const { width: w, height: h } = imageOrBuffer;
		if (fit === 'none') {
			return {
				positionX: x - w / 2,
				positionY: y - h / 2,
				sizeX: w,
				sizeY: h
			};
		}

		const ratio = w / h;
		const diameter = radius * 2;

		if (fit === 'fill' || ratio === 1) {
			return {
				positionX: x - radius,
				positionY: y - radius,
				sizeX: diameter,
				sizeY: diameter
			};
		}

		if (fit === 'contain') {
			return ratio > 1
				? {
						positionX: x - radius,
						positionY: y - radius / ratio,
						sizeX: diameter,
						sizeY: diameter / ratio
				  }
				: {
						positionX: x - radius * ratio,
						positionY: y - radius,
						sizeX: diameter * ratio,
						sizeY: diameter
				  };
		}

		if (ratio > 1) {
			const sizeX = diameter * ratio;
			const sizeY = diameter;
			return {
				positionX: x - sizeX / 2,
				positionY: y - sizeY / 2,
				sizeX,
				sizeY
			};
		}

		const sizeX = diameter;
		const sizeY = diameter / ratio;
		return {
			positionX: x - sizeX / 2,
			positionY: y - sizeY / 2,
			sizeX,
			sizeY
		};
	}
}

interface ResolvedCircularCoordinates {
	positionX: number;
	positionY: number;
	sizeX: number;
	sizeY: number;
}

// IF(CAIRO): export { loadImage, NativeImage as Image };
// IF(NAPI_RS): export { Path2D, GlobalFonts, NativeImage as Image };
// IF(SKIA): export { Path2D, FontLibrary, NativeImage as Image, loadImage };

// IF(BROWSER):                                                                                                        \
export const Image = HTMLImageElement;                                                                                 \
export function loadImage(src: string, options?: Partial<HTMLImageElement>): Promise<HTMLImageElement> {               \
	return new Promise<HTMLImageElement>((resolve, reject) => {                                                        \
		// eslint-disable-next-line no-undef                                                                           \
		const image = Object.assign(document.createElement('img'), options) as HTMLImageElement;                       \
		function cleanup() {                                                                                           \
			image.onload = null;                                                                                       \
			image.onerror = null;                                                                                      \
		}                                                                                                              \
		image.onload = () => {                                                                                         \
			cleanup();                                                                                                 \
			resolve(image);                                                                                            \
		};                                                                                                             \
		image.onerror = () => {                                                                                        \
			cleanup();                                                                                                 \
			reject(new Error(`Failed to load the image "${src}"`));                                                    \
		};                                                                                                             \
		image.src = src;                                                                                               \
	});                                                                                                                \
}

// IF(!BROWSER): export const resolveImage = deprecate(loadImage, 'resolveImage() is deprecated. Use loadImage() instead.');
// IF(NAPI_RS):                                                                                                        \
export function loadImage(data: Buffer) {                                                                              \
	const image = new NativeImage();                                                                                   \
	image.src = data;                                                                                                  \
	return image;                                                                                                      \
}

// IF(NAPI_RS):                                                                                                                            \
export function loadFont(font: Buffer, alias?: string): boolean;                                                                           \
export function loadFont(path: string, alias?: string): boolean;                                                                           \
export function loadFont(fontOrPath: Buffer | string, alias?: string): boolean {                                                           \
	return typeof fontOrPath === 'string' ? GlobalFonts.registerFromPath(fontOrPath, alias) : GlobalFonts.register(fontOrPath, alias);     \
}
// IF(SKIA):                                                                                                           \
export function loadFont(familyName: string, fontPaths?: string | readonly string[]): Font[];                          \
export function loadFont(fontPaths: readonly string[]): Font[];                                                        \
export function loadFont(families: Record<string, readonly string[] | string>): Record<string, Font[] | Font>;         \
export function loadFont(...args: [any]) {                                                                             \
	return FontLibrary.use(...args) as any;                                                                            \
}

// IF(NAPI_RS):                                                                                                        \
export function loadFontsFromDirectory(path: string): number {                                                         \
	return GlobalFonts.loadFontsFromDir(path);                                                                         \
}

// IF(!BROWSER): export const registerFont = deprecate(loadFont, 'registerFont() is deprecated. Use loadFont() instead.');

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

// Start Section: Filters
/**
 * Invert an image
 * @param canvas The Canvas instance
 */
export const invert = (canvas: Canvas) =>
	canvas.save().setGlobalCompositeOperation('difference').setColor('white').printRectangle(0, 0, canvas.width, canvas.height).restore();

/**
 * Greyscale an image
 * @param canvas The Canvas instance
 */
export const greyscale = (canvas: Canvas) => {
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
export const invertGrayscale = (canvas: Canvas) => {
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
export const sepia = (canvas: Canvas): Canvas => {
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
export const silhouette = (canvas: Canvas): Canvas => {
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
export const threshold = (canvas: Canvas, threshold: number): Canvas => {
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
export const invertedThreshold = (canvas: Canvas, threshold: number): Canvas => {
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
export const brightness = (canvas: Canvas, brightness: number): Canvas => {
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
export const darkness = (canvas: Canvas, darkness: number): Canvas => {
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
export const convolute = (canvas: Canvas, weights: readonly number[], opaque = true): Canvas => {
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
export const edge = (canvas: Canvas): Canvas => convolute(canvas, edgeLaPlaceMatrix, true);

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
export const sharpen = (canvas: Canvas, passes = 1): Canvas => {
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
export const blur = (canvas: Canvas, passes = 1): Canvas => {
	for (let i = 0; i < passes; ++i) {
		convolute(canvas, blurLaPlaceMatrix, true);
	}

	return canvas;
};
// End Section: Filters
// Start Section: Util
export const fontRegExp = /([\d.]+)(px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q)/i;
export const getFontHeight = (() => {
	const kCache = new Map<string, number>();

	return (font: string): number => {
		// If it was already parsed, do not parse again
		const previous = kCache.get(font);
		if (previous) return previous;

		// Test for required properties first, return null if the text is invalid
		const sizeFamily = fontRegExp.exec(font);
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
export type ColorRGBA<
	R extends number = number,
	G extends number = number,
	B extends number = number,
	A extends number = number
> = `rgba(${R}, ${G}, ${B}, ${A})`;

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
export type ColorHSLA<
	H extends number = number,
	S extends number = number,
	L extends number = number,
	A extends number = number
> = `hsla(${H}, ${S}%, ${L}%, ${A})`;

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
// End Section: Util
