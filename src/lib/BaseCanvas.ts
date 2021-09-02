// eslint-disable-next-line spaced-comment
/// <reference lib="dom" />

/* eslint-disable @typescript-eslint/unified-signatures */
import { fontRegExp, getFontHeight, textWrap } from './Util';

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

export type GlobalCompositeOperation = CanvasRenderingContext2D['globalCompositeOperation'];
export type PatternRepeat = 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat' | '' | null;

export interface BaseCanvasElement {
	width: number;
	height: number;
	getContext(type: '2d'): unknown;
}

export interface BaseImageElement {
	width: number | SVGAnimatedLength;
	height: number | SVGAnimatedLength;
}

export abstract class BaseCanvas<
	CanvasType extends BaseCanvasElement = HTMLCanvasElement,
	ContextType extends CanvasRenderingContext2D = CanvasRenderingContext2D,
	ImageType extends Parameters<ContextType['drawImage']>[0] = Parameters<ContextType['drawImage']>[0],
	TextMetricsType extends ReturnType<ContextType['measureText']> = ReturnType<ContextType['measureText']>
> {
	/**
	 * The constructed Canvas
	 * @since 0.0.1
	 */
	public canvas: CanvasType;

	/**
	 * The 2D context for the Canvas.
	 * @since 0.0.1
	 */
	public context: ContextType;

	/**
	 * Initialize canvas-constructor in a browser.
	 * @param canvas An HTMLCanvasElement.
	 * <script type="text/javascript" src="canvasconstructor.main.min.js"></script>
	 * <script type="text/javascript">
	 * const canvasElement = document.getElementById('canvas');
	 * new CanvasConstructor.Canvas(canvasElement)
	 *     .setColor('green')
	 *     .printRectangle(10, 10, 100, 100);
	 * </script>
	 */
	public constructor(canvas: CanvasType, context?: ContextType) {
		this.canvas = canvas;
		this.context = context ?? (this.canvas.getContext('2d') as ContextType);
	}

	/**
	 * The image width of this canvas
	 * @since 0.0.1
	 */
	public get width(): number {
		return this.canvas.width;
	}

	public set width(value: number) {
		this.canvas.width = value;
	}

	/**
	 * The image height of this canvas
	 * @since 0.0.1
	 */
	public get height(): number {
		return this.canvas.height;
	}

	public set height(value: number) {
		this.canvas.height = value;
	}

	/**
	 * The font height
	 * @since 3.0.0
	 */
	public get textFontHeight(): number {
		return getFontHeight(this.context.font);
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
	public clip(fillRule?: CanvasFillRule): this {
		this.context.clip(fillRule);
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
	 */
	public resetTransformation(): this {
		return this.setTransform(1, 0, 0, 1, 0, 0);
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
	 * Calls the callback with an ImageData object representing the underlying pixel data for the area of the canvas
	 * denoted by the entire Canvas. This method is not affected by the canvas transformation matrix.
	 * @param callback The callback to be called.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
	 */
	public getImageData(callback: (this: this, data: ImageData, canvas: this) => unknown): this;
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
	/**
	 * Calls the callback with an ImageData object representing the underlying pixel data for the area of the canvas
	 * denoted by the rectangle which starts at (x, y) and has an sw width and sh height. This method is not affected by
	 * the canvas transformation matrix.
	 * @param x The X coordinate of the upper left corner of the rectangle from which the ImageData will be extracted.
	 * @param y The Y coordinate of the upper left corner of the rectangle from which the ImageData will be extracted.
	 * @param width The width of the rectangle from which the ImageData will be extracted.
	 * @param height The height of the rectangle from which the ImageData will be extracted.
	 * @param callback The callback to be called.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
	 */
	public getImageData(x: number, y: number, width: number, height: number, callback: (this: this, data: ImageData, canvas: this) => unknown): this;

	public getImageData(
		x?: number | ((this: this, data: ImageData, canvas: this) => unknown),
		y?: number,
		width?: number,
		height?: number,
		callback?: (this: this, data: ImageData, canvas: this) => unknown
	): this | ImageData {
		if (typeof x === 'function') {
			callback = x;
			x = 0;
		}
		if (callback) {
			if (typeof callback !== 'function') throw new TypeError('Callback must be a function');
			callback.call(this, this.context.getImageData(x ?? 0, y ?? 0, width ?? this.width, height ?? this.height), this);
			return this;
		}

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

	public putImageData(...args: readonly any[]): this {
		// @ts-expect-error: Complains about invalid overload (expects more than 0 overloads).
		this.context.putImageData(...args);
		return this;
	}

	/**
	 * Fills the current or given path with the current fill style using the non-zero or even-odd winding rule.
	 * @param fillRule The algorithm by which to determine if a point is inside a path or outside a path.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fill
	 */
	public fill(fillRule?: CanvasFillRule): this {
		this.context.fill(fillRule);
		return this;
	}

	/**
	 * Add a text.
	 * @param text The text to write.
	 * @param dx The position x to start drawing the element.
	 * @param dy The position y to start drawing the element.
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
	 *     .toBuffer();
	 */
	public printResponsiveText(text: string, x: number, y: number, maxWidth: number): this {
		const [tail, height, lead] = this.parseFont(this.context.font);
		if (typeof height !== 'number') return this.printText(text, x, y);

		const { width } = this.measureText(text);
		const newHeight = maxWidth > width ? height : (maxWidth / width) * height;
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
	 *     .toBuffer();
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
	 *     .toBuffer();
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
	 *     .toBuffer(); // Returns a Buffer
	 */
	public measureText(text: string): TextMetricsType;
	/**
	 * Measure a text's width given a string.
	 * @param text The text to measure.
	 * @param callback The callback, if not specified, this method won't be chainable as it will return a
	 * number. If you use an arrow function, you might want to use the second argument which is the instance of the
	 * class. Otherwise, the keyword this is bound to the class instance itself, so you can use it safely.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/measureText
	 * @example
	 * new Canvas(500, 400)
	 *     .setTextFont('40px Tahoma')
	 *     .measureText('Hello World!', function(size) {
	 *         const newSize = size.width < 500 ? 40 : (500 / size.width) * 40;
	 *         this.setTextFont(`${newSize}px Tahoma`);
	 *     })
	 *     .printText('Hello World!', 30, 50)
	 *     .toBuffer(); // Returns a Buffer
	 * @example
	 * new Canvas(500, 400)
	 *     .setTextFont('40px Tahoma')
	 *     .measureText('Hello World!', (size, inst) => {
	 *         const newSize = size.width < 500 ? 40 : (500 / size.width) * 40;
	 *         inst.setTextFont(`${newSize}px`);
	 *     })
	 *     .printText('Hello World!', 30, 50)
	 *     .toBuffer(); // Returns a Buffer
	 */
	public measureText(text: string, callback: (this: this, measurement: TextMetricsType, canvas: this) => unknown): this;
	public measureText(text: string, callback?: (this: this, measurement: TextMetricsType, canvas: this) => unknown): this | TextMetricsType {
		if (callback) {
			if (typeof callback !== 'function') throw new TypeError('Callback must be a function.');
			callback.call(this, this.context.measureText(text) as TextMetricsType, this);
			return this;
		}
		return this.context.measureText(text) as TextMetricsType;
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
	public printImage(image: ImageType, dx: number, dy: number): this;
	/**
	 * Add an image at a position (x, y) with a given width and height.
	 * @param image The image.
	 * @param dx The x-axis coordinate in the destination canvas at which to place the top-left corner of the source `image`.
	 * @param dy The y-axis coordinate in the destination canvas at which to place the top-left corner of the source `image`.
	 * @param dw The width to draw the `image` in the destination canvas. This allows scaling of the drawn image.
	 * @param dh The height to draw the `image` in the destination canvas. This allows scaling of the drawn image.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
	 */
	public printImage(image: ImageType, dx: number, dy: number, dw: number, dh: number): this;
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
	public printImage(image: ImageType, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): this;
	public printImage(...args: readonly unknown[]) {
		// @ts-expect-error: Mismatching overloads
		this.context.drawImage(...args);
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
	public printCircularImage(imageOrBuffer: ImageType, x: number, y: number, radius: number, options?: PrintCircularOptions): this;
	public printCircularImage(imageOrBuffer: any, x: number, y: number, radius: number, { fit = 'fill' }: PrintCircularOptions = {}): this {
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
		imageOrBuffer: ImageType,
		x: number,
		y: number,
		width: number,
		height: number,
		radius: BeveledRadiusOptions | number
	): this;

	public printRoundedImage(imageOrBuffer: any, x: number, y: number, width: number, height: number, radius: BeveledRadiusOptions | number): this {
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
	 *     .toBuffer();
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
	 *     .toBuffer();
	 *
	 * @example
	 * // Top bevels only
	 * new Canvas(200, 200)
	 *     .printRoundedRectangle(0, 0, 200, 50, { tl: 20, tr: 20, bl: 0, br: 0 })
	 *     .toBuffer();
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
	 *     .toBuffer();
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
	 *     .toBuffer();
	 *
	 * @example
	 * // Top bevels only
	 * new Canvas(200, 200)
	 *     .createRoundedClip(0, 0, 200, 50, { tl: 20, tr: 20, bl: 0, br: 0 })
	 *     .printImage(buffer, 0, 0, 200, 50)
	 *     .toBuffer();
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
	public createPattern(image: ImageType, repetition: PatternRepeat): CanvasPattern;
	/**
	 * Creates a pattern using the specified image. It repeats the source in the directions specified by the repetition
	 * argument, and calls the callback.
	 * @param image A Canvas Image to be used as the image to repeat.
	 * @param repetition The repeat mode.
	 * @param callback The callback to take the createPattern.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createPattern
	 */
	public createPattern(image: ImageType, repetition: PatternRepeat, callback: (this: this, pattern: CanvasPattern, canvas: this) => unknown): this;

	public createPattern(
		image: ImageType,
		repetition: PatternRepeat,
		callback?: (this: this, pattern: CanvasPattern, canvas: this) => unknown
	): CanvasPattern | this {
		const pattern = this.context.createPattern(image, repetition)!;
		if (callback) {
			callback.call(this, pattern, this);
			return this;
		}

		return pattern;
	}

	/**
	 * Creates a pattern using the specified image. It repeats the source in the directions specified by the repetition
	 * argument, and prints it.
	 * @param image A Canvas Image to be used as the image to repeat.
	 * @param repetition The repeat mode.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createPattern
	 */
	public printPattern(image: ImageType, repetition: PatternRepeat): this {
		return this.createPattern(image, repetition, (pattern) => this.setColor(pattern));
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
	 * @param angleThe degree in radians to finish drawing the circle, defaults to a full circle.
	 * @param antiClockwise Whether or not the angle should be anti-clockwise.
	 */
	public clearCircle(x: number, y: number, radius: number, start = 0, angle = Math.PI * 2, antiClockwise = false): this {
		return this.createCircularClip(x, y, radius, start, angle, antiClockwise).clearRectangle(x - radius, y - radius, radius * 2, radius * 2);
	}

	/**
	 * Clear an area.
	 * @param x The position x to start drawing the element.
	 * @param y The position y to start drawing the element.
	 * @param width The width of the element.
	 * @param height The height of the element.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
	 */
	public clearRectangle(dx = 0, dy = 0, width = this.width, height = this.height): this {
		this.context.clearRect(dx, dy, width, height);
		return this;
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
	 *     .toBuffer();
	 */
	public getLineDash(): number[] {
		return this.context.getLineDash();
	}

	/**
	 * Alias of Canvas#getLineDash();
	 */
	public get lineDash(): number[] {
		return this.getLineDash();
	}

	/**
	 * Reports whether or not the specified point is contained in the current path.
	 * @param x The X coordinate of the point to check.
	 * @param y The Y coordinate of the point to check.
	 * @param fillRule The algorithm by which to determine if a point is inside a path or outside a path.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInPath
	 */
	public isPointInPath(x: number, y: number, fillRule?: CanvasFillRule): boolean {
		return this.context.isPointInPath(x, y, fillRule);
	}

	/**
	 * Reports whether or not the specified point is inside the area contained by the stroking of a path.
	 * @param x The X coordinate of the point to check.
	 * @param y The Y coordinate of the point to check.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInStroke
	 */
	public isPointInStroke(x: number, y: number): boolean {
		return this.context.isPointInStroke(x, y);
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
	 */
	public wrapText(text: string, wrapWidth: number): string;
	/**
	 * Wraps a text into a width-limited multi-line text.
	 * @param text The text to wrap
	 * @param wrapWidth The wrap width
	 * @param callback The callback receiving the wrapped text.
	 * @example
	 * // Wrap the text and add it
	 * const buffer = new Canvas(500, 300)
	 *     .setTextFont('48px Verdana')
	 *     .wrapText('Hello World, this is a quite\nlong text.', 300, (wrappedText, canvas) => canvas
	 *         .setTextAlign('center')
	 *         .addMultilineText(wrappedText, 250, 50))
	 *     .toBuffer(); // Returns a Buffer
	 */
	public wrapText(text: string, wrapWidth: number, callback: (this: this, text: string, canvas: this) => unknown): this;
	public wrapText(text: string, wrapWidth: number, callback?: (this: this, text: string, canvas: this) => unknown): string | this {
		const wrappedText = textWrap(this, text, wrapWidth);
		if (callback) {
			if (typeof callback !== 'function') throw new TypeError('Callback must be a function');
			callback.call(this, wrappedText, this);
			return this;
		}
		return wrappedText;
	}

	protected parseFont(font: string) {
		const result = fontRegExp.exec(font);
		if (result === null) return [font] as const;

		return [font.slice(0, result.index), Number(result[1]), font.slice(result.index + result[1].length)] as const;
	}

	protected resolveCircularCoordinates(
		imageOrBuffer: ImageType,
		x: number,
		y: number,
		radius: number,
		fit: NonNullable<PrintCircularOptions['fit']>
	): ResolvedCircularCoordinates {
		const { width, height } = imageOrBuffer;
		const [w, h] = [typeof width === 'number' ? width : width.animVal.value, typeof height === 'number' ? height : height.animVal.value];
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
