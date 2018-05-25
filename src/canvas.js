let Canvas;
try {
	Canvas = require('canvas-prebuilt');
} catch (_) {
	Canvas = require('canvas');
}

/**
 * This variable helps Canvas-Constructor to identify if the version
 * of canvas is older than 2.0.0 (new Canvas()) or newer (Canvas.createCanvas).
 */
const isNotConstructor = typeof Canvas.createCanvas === 'function';

class CanvasConstructor {

	/**
	 * Initialize canvas-constructor
	 * @param {number} width The canvas' width in pixels.
	 * @param {number} height The canvas' height in pixels.
	 * @param {('pdf'|'svg')} [type] The canvas type.
	 */
	constructor(width, height, type) {
		/**
		 * The constructed Canvas
		 * @since 0.0.1
		 * @type {Canvas}
		 * @private
		 */
		this.canvas = isNotConstructor
			// node-canvas >2.0.0
			? Canvas.createCanvas(width, height, type)
			// node-canvas <2.0.0
			: new Canvas(width, height);

		/**
		 * The 2D context for this canvas
		 * @since 0.0.1
		 * @type {CanvasRenderingContext2D}
		 * @private
		 */
		this.context = this.canvas.getContext('2d');

		/**
		 * The image width of this canvas
		 * @since 0.0.1
		 * @type {number}
		 */
		this.width = width;

		/**
		 * The image height of this canvas
		 * @since 0.0.1
		 * @type {number}
		 */
		this.height = height;
	}

	/**
	 * Change the current canvas' size.
	 * @param {number} width  The new width for the canvas.
	 * @param {number} height The new heigth for the canvas.
	 * @returns {this}
	 * @chainable
	 */
	changeCanvasSize(width, height) {
		if (width && isNaN(width) === false) {
			this.canvas.width = width;
			this.width = width;
		}

		if (height && isNaN(height) === false) {
			this.canvas.height = height;
			this.height = height;
		}

		return this;
	}

	/**
	 * Change the current canvas' width.
	 * @param {number} width The new width for the canvas.
	 * @returns {this}
	 * @chainable
	 */
	changeCanvasWidth(width) {
		return this.changeCanvasSize(width, undefined);
	}

	/**
	 * Change the current canvas' height.
	 * @param {number} height The new height for the canvas.
	 * @returns {this}
	 * @chainable
	 */
	changeCanvasHeigth(height) {
		return this.changeCanvasSize(undefined, height);
	}

	/**
	 * Save the entire state of the canvas by pushing the current state onto a stack.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
	 */
	save() {
		this.context.save();
		return this;
	}

	/**
	 * Restores the most recently saved canvas by popping the top entry in the drawing state stack. If there is no saved state, this method does nothing.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore
	 */
	restore() {
		this.context.restore();
		return this;
	}

	/**
	 * Adds a rotation to the transformation matrix. The angle argument represents a clockwise rotation angle and is expressed in radians.
	 * @param {number} angle The angle to rotate clockwise in radians.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate
	 */
	rotate(angle) {
		this.context.rotate(angle);
		return this;
	}

	/**
	 * Adds a scaling transformation to the canvas units by x horizontally and by y vertically.
	 * @param {number} x Scaling factor in the horizontal direction.
	 * @param {number} y Scaling factor in the vertical direction.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale
	 */
	scale(x, y) {
		this.context.scale(x, y);
		return this;
	}

	/**
	 * Adds a translation transformation by moving the canvas and its origin x horizontally and y vertically on the grid.
	 * @param {number} x Distance to move in the horizontal direction.
	 * @param {number} y Distance to move in the vertical direction.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate
	 */
	translate(x, y) {
		this.context.translate(x, y);
		return this;
	}

	/**
	 * Turns the path currently being built into the current clipping path.
	 * @param {any} path A Path2D path to fill.
	 * @param {('nonzero'|'evenodd')} fillRule The algorithm by which to determine if a point is inside a path or
	 * outside a path.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip
	 */
	clip(path, fillRule) {
		this.context.clip(fillRule);
		return this;
	}

	/**
	 * Resets (overrides) the current transformation to the identity matrix and then invokes a transformation described
	 * by the arguments of this method.
	 * @param {number} a Horizontal scaling.
	 * @param {number} b Horizontal skewing.
	 * @param {number} c Vertical skewing.
	 * @param {number} d Vertical scaling.
	 * @param {number} e Horizontal moving.
	 * @param {number} f Vertical moving.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
	 */
	setTransform(a, b, c, d, e, f) {
		this.context.setTransform(a, b, c, d, e, f);
		return this;
	}

	/**
	 * Reset the transformation.
	 * @returns {this}
	 * @chainable
	 */
	resetTransformation() {
		return this.setTransform(1, 0, 0, 1, 0, 0);
	}

	/**
	 * Returns an ImageData object representing the underlying pixel data for the area of the canvas denoted by the rectangle which starts at (sx, sy)
	 * and has an sw width and sh height. This method is not affected by the canvas transformation matrix.
	 * @param {(number|Function)} [x] The x coordinate of the upper left corner of the rectangle from which the ImageData will be extracted.
	 * @param {number} [y] The y coordinate of the upper left corner of the rectangle from which the ImageData will be extracted.
	 * @param {number} [width] The width of the rectangle from which the ImageData will be extracted.
	 * @param {number} [height] The height of the rectangle from which the ImageData will be extracted.
	 * @param {Function} callback The callback, if not specified, this method won't be chainable as it will return a
	 * number. If you use an arrow function, you might want to use the second argument which is the instance of the
	 * class. Otherwise, the keyword this is binded to the class instance itself, so you can use it safely.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
	 */
	getImageData(x = 0, y = 0, width = this.width, height = this.height, callback) {
		if (typeof x === 'function') {
			callback = x;
			x = 0;
		}
		if (callback) {
			if (typeof callback !== 'function') throw new TypeError('Callback must be a function');
			callback.call(this, this.context.getImageData(x, y, width, height), this);
			return this;
		}
		return this.context.getImageData(x, y, width, height);
	}

	/**
	 * The CanvasRenderingContext2D.putImageData() method of the Canvas 2D API paints data from the given ImageData object onto the bitmap.
	 * If a dirty rectangle is provided, only the pixels from that rectangle are painted.
	 * This method is not affected by the canvas transformation matrix.
	 * @param {ImageData} imagedata An ImageData object containing the array of pixel values.
	 * @param {number} dx Horizontal position (x-coordinate) at which to place the image data in the destination canvas.
	 * @param {number} dy Vertical position (y-coordinate) at which to place the image data in the destination canvas.
	 * @param {number} [dirtyX=0] Horizontal position (x-coordinate). The x coordinate of the top left hand corner of your Image data. Defaults to 0.
	 * @param {number} [dirtyY=0] Vertical position (y-coordinate). The y coordinate of the top left hand corner of your Image data. Defaults to 0.
	 * @param {number} [dirtyWidth] Width of the rectangle to be painted. Defaults to the width of the image data.
	 * @param {number} [dirtyHeight] Height of the rectangle to be painted. Defaults to the height of the image data.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
	 */
	putImageData(...args) {
		this.context.putImageData(...args);
		return this;
	}

	/**
	 * Fills the current or given path with the current fill style using the non-zero or even-odd winding rule.
	 * @param {any} path A Path2D path to fill.
	 * @param {('nonzero'|'evenodd')} fillRule The algorithm by which to determine if a point is inside a path or
	 * outside a path.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fill
	 */
	fill(path, fillRule) {
		this.context.fill(path, fillRule);
		return this;
	}

	/**
	 * Add a text.
	 * @param {string} text The text to write.
	 * @param {number} x The position x to start drawing the element.
	 * @param {number} y The position y to start drawing the element.
	 * @param {number} [maxWidth] The maximum width to draw. If specified, and the string is computed to be wider than
	 * this width, the font is adjusted to use a more horizontally condensed font.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText
	 */
	addText(text, x, y, maxWidth) {
		this.context.fillText(text, x, y, maxWidth);
		return this;
	}

	/**
	 * Add responsive text
	 * @param {string} text The text to write.
	 * @param {number} x The position x to start drawing the element.
	 * @param {number} y The position y to start drawing the element.
	 * @param {number} maxWidth The max length in pixels for the text.
	 * @returns {this}
	 * @chainable
	 * @example
	 * new Canvas(400, 300)
	 *     .setTextFont('40px Tahoma')
	 *     .addResponsiveText('Hello World', 30, 30, 50)
	 *     .toBuffer();
	 */
	addResponsiveText(text, x, y, maxWidth) {
		const [, style = '', size, font] = /(\w+ )?(\d+)(.+)/.exec(this.context.font);
		const currentSize = parseInt(size);
		const { width } = this.measureText(text);
		const newLength = maxWidth > width ? currentSize : (maxWidth / width) * currentSize;
		return this
			.setTextFont(style + newLength + font)
			.addText(text, x, y);
	}

	/**
	 * Add responsive text
	 * @param {string} text The text to write.
	 * @param {number} x The position x to start drawing the element.
	 * @param {number} y The position y to start drawing the element.
	 * @param {number} maxWidth The max length in pixels for the text.
	 * @param {number} lineHeight The line's height.
	 * @returns {this}
	 * @chainable
	 * @example
	 * new Canvas(400, 300)
	 *     .setTextFont('25px Tahoma')
	 *     .addMultilineText('This is a really long text!', 139, 360, 156, 28)
	 *     .toBuffer();
	 */
	addMultilineText(text, x, y, maxWidth, lineHeight) {
		const words = text.split(' '), wordLength = words.length;
		let line = words[0];

		for (let n = 1; n < wordLength; n++) {
			const testLine = `${line} ${words[n]}`;
			if (this.measureText(testLine).width > maxWidth) {
				this.addText(line, x, y);
				line = `${words[n]} `;
				y += lineHeight;
			} else {
				line = testLine;
			}
		}
		return line.length ? this.addText(line, x, y) : this;
	}

	/**
	 * Strokes the current or given path with the current stroke style using the non-zero winding rule.
	 * @param {any} path A Path2D path to stroke.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke
	 */
	stroke(path) {
		this.context.stroke(path);
		return this;
	}

	/**
	 * Paints a rectangle which has a starting point at (x, y) and has a w width and an h height onto the canvas, using
	 * the current stroke style.
	 * @param {number} x The x axis of the coordinate for the rectangle starting point.
	 * @param {number} y The y axis of the coordinate for the rectangle starting point.
	 * @param {number} width The rectangle's width.
	 * @param {number} height The rectangle's height.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeRect
	 */
	addStrokeRect(x, y, width, height) {
		this.context.strokeRect(x, y, width, height);
		return this;
	}

	/**
	 * Add stroked text.
	 * @param {string} text The text to write.
	 * @param {number} x The position x to start drawing the element.
	 * @param {number} y The position y to start drawing the element.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeText
	 */
	addStrokeText(text, x, y) {
		this.context.strokeText(text, x, y);
		return this;
	}

	/**
	 * Measure a text's width given a string.
	 * If a callback is not passed, this method will not be chainable, and it will return an integer instead.
	 * @param {string} text The text to measure.
	 * @param {Function} callback The callback, if not specified, this method won't be chainable as it will return a
	 * number. If you use an arrow function, you might want to use the second argument which is the instance of the
	 * class. Otherwise, the keyword this is binded to the class instance itself, so you can use it safely.
	 * @returns {(CanvasConstructor|number)}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/measureText
	 * @example
	 * new Canvas(500, 400)
	 *     .setTextFont('40px Tahoma')
	 *     .measureText('Hello World!', function(size) {
	 *         const newSize = size.width < 500 ? 40 : (500 / size.width) * 40;
	 *         this.setTextFont(`${newSize}px Tahoma`);
	 *     })
	 *     .addText('Hello World!', 30, 50)
	 *     .toBuffer(); // Returns a Buffer
	 * @example
	 * new Canvas(500, 400)
	 *     .setTextFont('40px Tahoma')
	 *     .measureText('Hello World!', (size, inst) => {
	 *         const newSize = size.width < 500 ? 40 : (500 / size.width) * 40;
	 *         inst.setTextFont(`${newSize}px`);
	 *     })
	 *     .addText('Hello World!', 30, 50)
	 *     .toBuffer(); // Returns a Buffer
	 * @example
	 * const size = new Canvas(500, 400)
	 *     .setTextFont('40px Tahoma')
	 *     .measureText('Hello World!'); // Returns a number
	 *
	 * const newSize = size.width < 500 ? 40 : (500 / size.width) * 40;
	 *
	 * new Canvas(500, 400)
	 *     .setTextFont(`${newSize}px Tahoma`)
	 *     .addText('Hello World!', 30, 50)
	 *     .toBuffer(); // Returns a Buffer
	 */
	measureText(text, callback) {
		if (callback) {
			if (typeof callback !== 'function') throw new TypeError('Callback must be a function.');
			callback.bind(this)(this.context.measureText(text), this);
			return this;
		}
		return this.context.measureText(text);
	}

	/**
	 * Specifies the color or style to use for the lines around shapes. The default is #000000 (black).
	 * @param {string} [color='#000000'] A canvas' color resolvable.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle
	 */
	setStroke(color = '#000000') {
		this.context.strokeStyle = color;
		return this;
	}

	/**
	 * Sets the thickness of lines in space units.
	 * @param {number} [width=1] A number specifying the line width in space units.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth
	 */
	setLineWidth(width = 1) {
		this.context.lineWidth = width;
		return this;
	}

	setStrokeWidth(width) {
		return this.setLineWidth(width);
	}

	/**
	 * Sets the line dash pattern offset or "phase" to achieve a "marching ants" effect
	 * @param {number} value A float specifying the amount of the offset. Initially 0.0.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
	 */
	setLineDashOffset(value) {
		this.context.lineDashOffset = value;
		return this;
	}

	/**
	 * Determines how two connecting segments (of lines, arcs or curves) with non-zero lengths in a shape are joined
	 * together (degenerate segments with zero lengths, whose specified endpoints and control points are exactly at the
	 * same position, are skipped).
	 * @param {('bevel'|'round'|'miter')} value The line join type.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
	 */
	setLineJoin(value) {
		this.context.lineJoin = value;
		return this;
	}

	/**
	 * Determines how the end points of every line are drawn. There are three possible values for this property and
	 * those are: butt, round and square. By default this property is set to butt.
	 * @param {('butt'|'round'|'square')} value The line join type.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap
	 */
	setLineCap(value) {
		this.context.lineCap = value;
		return this;
	}

	/**
	 * Sets the line dash pattern used when stroking lines, using an array of values which specify alternating lengths
	 * of lines and gaps which describe the pattern.
	 * @param {number[]} segments An Array of numbers which specify distances to alternately draw a line and a gap (in
	 * coordinate space units). If the number of elements in the array is odd, the elements of the array get copied and
	 * concatenated. For example, [5, 15, 25] will become [5, 15, 25, 5, 15, 25]. If the array is empty, the line dash
	 * list is cleared and line strokes return to being solid.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
	 */
	setLineDash(segments) {
		this.context.setLineDash(segments);
		return this;
	}

	/**
	 * Add an image.
	 * @param {Image|Buffer} imageOrBuffer The image's buffer.
	 * @param {number} x The position x to start drawing the element.
	 * @param {number} y The position y to start drawing the element.
	 * @param {number} width The width of the element.
	 * @param {number} height The heigth of the element.
	 * @param {Object} options Options.
	 * @param {number} options.radius The radius for the new image.
	 * @param {'round'|'bevel'} options.type The type for the new image.
	 * @param {boolean} options.restore Whether this method should restore the drawing state. Use this when you use options.type
	 * @returns {this}
	 * @chainable
	 */
	addImage(imageOrBuffer, x, y, width, height, options = {}) {
		if (options.restore) this.save();
		if (options.type) {
			if (isNaN(options.radius)) options.radius = 10;
			if (options.type === 'round') this.createRoundClip(x + options.radius, y + options.radius, options.radius);
			else if (options.type === 'bevel') this.createBeveledClip(x, y, width, height, options.radius);
		}
		this._resolveImage(imageOrBuffer, (image) => this.context.drawImage(image, x, y, width, height));
		if (options.restore) this.restore();
		return this;
	}

	/**
	 * Add a round image.
	 * @param {Image|Buffer} imageOrBuffer The image's buffer.
	 * @param {number} x The position x to start drawing the element.
	 * @param {number} y The position y to start drawing the element.
	 * @param {number} width The width of the element.
	 * @param {number} height The heigth of the element.
	 * @param {number} [radius=10] The radius for the new image.
	 * @returns {this}
	 * @chainable
	 */
	addRoundImage(imageOrBuffer, x, y, width, height, radius = 10) {
		return this.addImage(imageOrBuffer, x, y, width, height, { type: 'round', radius });
	}

	/**
	 * Add a beveled image.
	 * @param {Image|Buffer} imageOrBuffer The image's buffer.
	 * @param {number} x The position x to start drawing the element.
	 * @param {number} y The position y to start drawing the element.
	 * @param {number} width The width of the element.
	 * @param {number} height The heigth of the element.
	 * @param {number} [radius=10] The radius for the new image.
	 * @returns {this}
	 * @chainable
	 */
	addBevelImage(imageOrBuffer, x, y, width, height, radius = 10) {
		return this.addImage(imageOrBuffer, x, y, width, height, { type: 'bevel', radius });
	}

	/**
	 * Add a circle or semi circle.
	 * @param {number} x The position x in the center of the circle.
	 * @param {number} y The position y in the center of the ircle.
	 * @param {number} radius The radius for the clip.
	 * @returns {this}
	 * @chainable
	 */
	addCircle(x, y, radius) {
		return this.save().createRoundPath(x, y, radius).fill().restore();
	}

	/**
	 * Add a rectangle.
	 * @param {number} x The position x to start drawing the element.
	 * @param {number} y The position y to start drawing the element.
	 * @param {number} width  The width of the element.
	 * @param {number} height The heigth of the element.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect
	 */
	addRect(x, y, width, height) {
		this.context.fillRect(x, y, width, height);
		return this;
	}

	/**
	 * Add a beveled rectangle.
	 * @param {number} x The position x to start drawing the element.
	 * @param {number} y The position y to start drawing the element.
	 * @param {number} width  The width of the element.
	 * @param {number} height The heigth of the element.
	 * @param {number} [radius=10] The radius for the bevels.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect
	 */
	addBeveledRect(x, y, width, height, radius = 10) {
		return this.save().createBeveledPath(x, y, width, height, radius).fill().restore();
	}

	/**
	 * Create a round path.
	 * @param {number} x The position x in the center of the clip's circle.
	 * @param {number} y The position y in the center of the clip's circle.
	 * @param {number} radius The radius for the clip.
	 * @param {number} [start=0] The degree in radians to start drawing the circle.
	 * @param {number} [angle=Math.PI * 2] The degree in radians to finish drawing the circle, defaults to a full circle.
	 * @returns {this}
	 * @chainable
	 */
	createRoundPath(x, y, radius, start = 0, angle = Math.PI * 2) {
		this.context.beginPath();
		this.context.arc(x, y, radius, start, angle, false);
		return this;
	}

	/**
	 * Create a round clip.
	 * @param {number} x The position x in the center of the clip's circle.
	 * @param {number} y The position y in the center of the clip's circle.
	 * @param {number} radius The radius for the clip.
	 * @param {number} [start=0] The degree in radians to start drawing the circle.
	 * @param {number} [angle=Math.PI * 2] The degree in radians to finish drawing the circle, defaults to a full circle.
	 * @returns {this}
	 * @chainable
	 */
	createRoundClip(x, y, radius, start = 0, angle = Math.PI * 2) {
		return this.createRoundPath(x, y, radius, start, angle).clip();
	}

	/**
	 * Create a rectangle path.
	 * @param {number} x The position x in the left corner.
	 * @param {number} y The position y in the upper corner.
	 * @param {number} width The width of the rectangle.
	 * @param {number} height The height of the rectangle.
	 * @returns {this}
	 * @chainable
	 */
	createRectPath(x, y, width, height) {
		this.context.rect(x, y, width, height);
		return this;
	}

	/**
	 * Create a rectangle clip.
	 * @param {number} x The position x in the left corner.
	 * @param {number} y The position y in the upper corner.
	 * @param {number} width The width of the rectangle.
	 * @param {number} height The height of the rectangle.
	 * @returns {this}
	 * @chainable
	 */
	createRectClip(x, y, width, height) {
		return this.createRectPath(x, y, width, height).clip();
	}

	/**
	 * Create a beveled path.
	 * @param {number} x The position x to start drawing clip.
	 * @param {number} y The position y to start drawing clip.
	 * @param {number} width The width of clip.
	 * @param {number} height The heigth of clip.
	 * @param {number} radius The radius for clip's rounded borders.
	 * @returns {this}
	 * @chainable
	 */
	createBeveledPath(x, y, width, height, radius) {
		if (width > 0 && height > 0) {
			radius = Math.min(radius, width / 2, height / 2);
			this.context.beginPath();
			this.context.moveTo(x + radius, y);
			this.context.lineTo(x + width - radius, y);
			this.context.quadraticCurveTo(x + width, y, x + width, y + radius);
			this.context.lineTo(x + width, y + height - radius);
			this.context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
			this.context.lineTo(x + radius, y + height);
			this.context.quadraticCurveTo(x, y + height, x, y + height - radius);
			this.context.lineTo(x, y + radius);
			this.context.quadraticCurveTo(x, y, x + radius, y);
			this.context.closePath();
			this.context.clip();
		}
		return this;
	}

	/**
	 * Create a beveled clip.
	 * @param {number} x The position x to start drawing clip.
	 * @param {number} y The position y to start drawing clip.
	 * @param {number} width The width of clip.
	 * @param {number} height The heigth of clip.
	 * @param {number} radius The radius for clip's rounded borders.
	 * @returns {this}
	 * @chainable
	 */
	createBeveledClip(x, y, width, height, radius) {
		return this.createBeveledPath(x, y, width, height, radius).clip();
	}

	/**
	 * Set a color for the canvas' context.
	 * @param {string|CanvasGradient} color A canvas' color resolvable.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
	 */
	setColor(color) {
		this.context.fillStyle = color;
		return this;
	}

	/**
	 * Change the font.
	 * @param {string} font The font's name to set.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font
	 */
	setTextFont(font) {
		this.context.font = font;
		return this;
	}

	/**
	 * Change the font alignment.
	 * @param {('left'|'center'|'right'|'start'|'end')} align The font's alignment to set.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign
	 */
	setTextAlign(align) {
		this.context.textAlign = align;
		return this;
	}

	/**
	 * Change the font's baseline.
	 * @param {('top'|'hanging'|'middle'|'alphabetic'|'ideographic'|'bottom')} baseline The font's baseline to set.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline
	 */
	setTextBaseline(baseline) {
		this.context.textBaseline = baseline;
		return this;
	}

	/**
	 * Starts a new path by emptying the list of sub-paths.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath
	 */
	beginPath() {
		this.context.beginPath();
		return this;
	}

	/**
	 * Causes the point of the pen to move back to the start of the current sub-path.
	 * If the shape has already been closed or has only one point, this function does nothing.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/closePath
	 */
	closePath() {
		this.context.closePath();
		return this;
	}

	/**
	 * Creates a pattern using the specified image. It repeats the source in the directions specified by the repetition
	 * argument.
	 * @param {Image} imageOrBuffer A Canvas Image to be used as the image to repeat.
	 * @param {('repeat'|'repeat-x'|'repeat-y'|'no-repeat')} repetition The repeat mode.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createPattern
	 */
	createPattern(imageOrBuffer, repetition) {
		this._resolveImage(imageOrBuffer, (image) => this.context.createPattern(image, repetition));
		return this;
	}

	/**
	 * Creates a gradient along the line given by the coordinates represented by the parameters.
	 * The coordinates are global, the second point does not rely on the position of the first and vice versa.
	 * @param {number} x0 The x axis of the coordinate of the start point.
	 * @param {number} y0 The y axis of the coordinate of the start point.
	 * @param {number} x1 The x axis of the coordinate of the end point.
	 * @param {number} y1 The y axis of the coordinate of the end point.
	 * @param {GradientStep[]} [steps=[]] The steps.
	 * @returns {CanvasGradient}
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient
	 */
	createLinearGradient(x0, y0, x1, y1, steps = []) {
		const gradient = this.context.createLinearGradient(x0, y0, x1, y1);
		for (let i = 0; i < steps.length; i++)
			gradient.addColorStop(steps[i].position, steps[i].color);

		return gradient;
	}

	/**
	 * Creates a gradient along the line given by the coordinates represented by the parameters.
	 * The coordinates are global, the second point does not rely on the position of the first and vice versa. This
	 * method is chainable and calls setColor after creating the gradient.
	 * @param {number} x0 The x axis of the coordinate of the start point.
	 * @param {number} y0 The y axis of the coordinate of the start point.
	 * @param {number} x1 The x axis of the coordinate of the end point.
	 * @param {number} y1 The y axis of the coordinate of the end point.
	 * @param {GradientStep[]} [steps=[]] The steps.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient
	 * @example
	 * new Canvas(200, 200)
	 *     .printLinearGradient(0, 0, 200, 50, [
	 *         { position: 0, color: 'white' },
	 *         { position: 0.25, color: 'red' },
	 *         { position: 0.5, color: 'blue' }
	 *     ])
	 *     .addRect(10, 10, 200, 100)
	 */
	printLinearGradient(x0, y0, x1, y1, steps) {
		const gradient = this.createLinearGradient(x0, y0, x1, y1, steps);
		return this.setColor(gradient);
	}

	/**
	 * Creates a radial gradient given by the coordinates of the two circles represented by the parameters.
	 * @param {number} x0 The x axis of the coordinate of the start circle.
	 * @param {number} y0 The y axis of the coordinate of the start circle.
	 * @param {number} r0 The radius of the start circle.
	 * @param {number} x1 The x axis of the coordinate of the end circle.
	 * @param {number} y1 The y axis of the coordinate of the end circle.
	 * @param {number} r1 The radius of the end circle.
	 * @param {GradientStep[]} [steps=[]] The steps.
	 * @returns {CanvasGradient}
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
	 */
	createRadialGradient(x0, y0, r0, x1, y1, r1, steps = []) {
		const gradient = this.context.createRadialGradient(x0, y0, r0, x1, y1, r1);
		for (let i = 0; i < steps.length; i++)
			gradient.addColorStop(steps[i].position, steps[i].color);

		return gradient;
	}

	/**
	 * Creates a radial gradient given by the coordinates of the two circles represented by the parameters. This
	 * method is chainable and calls setColor after creating the gradient.
	 * @param {number} x0 The x axis of the coordinate of the start circle.
	 * @param {number} y0 The y axis of the coordinate of the start circle.
	 * @param {number} r0 The radius of the start circle.
	 * @param {number} x1 The x axis of the coordinate of the end circle.
	 * @param {number} y1 The y axis of the coordinate of the end circle.
	 * @param {number} r1 The radius of the end circle.
	 * @param {GradientStep[]} steps The steps.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
	 */
	printRadialGradient(x0, y0, r0, x1, y1, r1, steps) {
		const gradient = this.createRadialGradient(x0, y0, r0, x1, y1, r1, steps);
		return this.setColor(gradient);
	}

	/**
	 * Adds an ellipse to the path which is centered at (x, y) position with the radius radiusX and radiusY starting at
	 * startAngle and ending at endAngle going in the given direction by anticlockwise (defaulting to clockwise).
	 * @param {number} x The x axis of the coordinate for the ellipse's center.
	 * @param {number} y The y axis of the coordinate for the ellipse's center.
	 * @param {number} radiusX The ellipse's major-axis radius.
	 * @param {number} radiusY The ellipse's minor-axis radius.
	 * @param {number} rotation The rotation for this ellipse, expressed in radians.
	 * @param {number} [startAngle=0] The starting point, measured from the x axis, from which it will be drawn, expressed
	 * in radians.
	 * @param {number} [endAngle=Math.PI * 2] The end ellipse's angle to which it will be drawn, expressed in radians.
	 * @param {boolean} [anticlockwise=false] An optional Boolean which, if true, draws the ellipse anticlockwise
	 * (counter-clockwise), otherwise in a clockwise direction.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/ellipse
	 */
	createEllipse(x, y, radiusX, radiusY, rotation, startAngle = 0, endAngle = Math.PI * 2, anticlockwise) {
		this.context.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
		return this;
	}

	/**
	 * Adds an arc to the path which is centered at (x, y) position with radius r starting at startAngle and ending at
	 * endAngle going in the given direction by anticlockwise (defaulting to clockwise).
	 * @param {number} x The x coordinate of the arc's center.
	 * @param {number} y The y coordinate of the arc's center.
	 * @param {number} radius The arc's radius.
	 * @param {number} [startAngle=0] The angle at which the arc starts, measured clockwise from the positive x axis and
	 * expressed in radians.
	 * @param {number} [endAngle=Math.PI * 2] The angle at which the arc ends, measured clockwise from the positive x axis and
	 * expressed in radians.
	 * @param {boolean} [anticlockwise=false] An optional Boolean which, if true, causes the arc to be drawn
	 * counter-clockwise between the two angles. By default it is drawn clockwise.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
	 */
	arc(x, y, radius, startAngle = 0, endAngle = Math.PI * 2, anticlockwise = false) {
		this.context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
		return this;
	}

	/**
	 * Adds an arc to the path with the given control points and radius, connected to the previous point by a straight line.
	 * @param {number} x1 The x axis of the coordinate for the first control point.
	 * @param {number} y1 The y axis of the coordinate for the first control point.
	 * @param {number} x2 The x axis of the coordinate for the second control point.
	 * @param {number} y2 The y axis of the coordinate for the second control point.
	 * @param {number} radius The arc's radius.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arcTo
	 */
	arcTo(x1, y1, x2, y2, radius) {
		this.context.arcTo(x1, y1, x2, y2, radius);
		return this;
	}

	/**
	 * Adds a quadratic Bézier curve to the path. It requires two points. The first point is a control point and the
	 * second one is the end point. The starting point is the last point in the current path, which can be changed using
	 * moveTo() before creating the quadratic Bézier curve.
	 * @param {number} cpx The x axis of the coordinate for the control point.
	 * @param {number} cpy The y axis of the coordinate for the control point.
	 * @param {number} x The x axis of the coordinate for the end point.
	 * @param {number} y The y axis of the coordinate for the end point.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo
	 */
	quadraticCurveTo(cpx, cpy, x, y) {
		this.context.quadraticCurveTo(cpx, cpy, x, y);
		return this;
	}

	/**
	 * Adds a cubic Bézier curve to the path. It requires three points. The first two points are control points and the
	 * third one is the end point. The starting point is the last point in the current path, which can be changed using
	 * moveTo() before creating the Bézier curve.
	 * @param {number} cp1x The x axis of the coordinate for the first control point.
	 * @param {number} cp1y The y axis of the coordinate for first control point.
	 * @param {number} cp2x The x axis of the coordinate for the second control point.
	 * @param {number} cp2y The y axis of the coordinate for the second control point.
	 * @param {number} x The x axis of the coordinate for the end point.
	 * @param {number} y The y axis of the coordinate for the end point.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/bezierCurveTo
	 */
	bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
		this.context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
		return this;
	}

	/**
	 * Connects the last point in the sub-path to the x, y coordinates with a straight line
	 * @param {number} x The x axis of the coordinate for the end of the line.
	 * @param {number} y The y axis of the coordinate for the end of the line.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo
	 */
	lineTo(x, y) {
		this.context.lineTo(x, y);
		return this;
	}

	/**
	 * Moves the starting point of a new sub-path to the (x, y) coordinates.
	 * @param {number} x The x axis of the point.
	 * @param {number} y The y axis of the point.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/moveTo
	 */
	moveTo(x, y) {
		this.context.moveTo(x, y);
		return this;
	}

	/**
	 * Set the shadow's blur.
	 * @param {number} radius The shadow's blur radius to set.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowBlur
	 */
	setShadowBlur(radius) {
		this.context.shadowBlur = radius;
		return this;
	}

	/**
	 * Set the shadow's color.
	 * @param {string} color A canvas' color resolvable to set as shadow's color.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor
	 */
	setShadowColor(color) {
		this.context.shadowColor = color;
		return this;
	}

	/**
	 * Set the property that specifies the distance that the shadow will be offset in horizontal distance.
	 * @param {number} value The value in pixels for the distance.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX
	 */
	setShadowOffsetX(value) {
		this.context.shadowOffsetX = value;
		return this;
	}

	/**
	 * Set the property that specifies the distance that the shadow will be offset in vertical distance.
	 * @param {number} value The value in pixels for the distance.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY
	 */
	setShadowOffsetY(value) {
		this.context.shadowOffsetY = value;
		return this;
	}

	/**
	 * Sets the miter limit ratio in space units. When getting, it returns the current value (10.0 by default). When
	 * setting, zero, negative, Infinity and NaN values are ignored; otherwise the current value is set to the new value.
	 * @param {number} value A number specifying the miter limit ratio in space units. Zero, negative, Infinity and NaN
	 * values are ignored.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/miterLimit
	 */
	setMiterLimit(value) {
		this.context.miterLimit = value;
		return this;
	}

	/**
	 * Change the pattern quality
	 * @param {('fast'|'good'|'best'|'nearest'|'bilinear')} pattern The pattern quality.
	 * @returns {this}
	 * @chainable
	 */
	setPatternQuality(pattern) {
		this.context.patternQuality = pattern;
		return this;
	}

	/**
	 * Set the text drawing mode. Using glyph is much faster than path for drawing, and when using a PDF context will
	 * embed the text natively, so will be selectable and lower filesize. The downside is that cairo does not have any
	 * subpixel precision for glyph, so this will be noticeably lower quality for text positioning in cases such as
	 * rotated text. Also, strokeText in glyph will act the same as fillText, except using the stroke style for the fill.
	 * @param {('path'|'glyph')} mode The drawing mode.
	 * @returns {this}
	 * @chainable
	 */
	setTextDrawingMode(mode) {
		this.context.textDrawingMode = mode;
		return this;
	}

	/**
	 * Set anti-aliasing mode.
	 * @param {('default'|'none'|'gray'|'subpixel')} antialias The antialias mode.
	 * @returns {this}
	 * @chainable
	 */
	setAntialiasing(antialias) {
		this.context.antialias = antialias;
		return this;
	}

	/**
	 * Sets the type of compositing operation to apply when drawing new shapes, where type is a string identifying which
	 * of the compositing or blending mode operations to use.
	 * @param {('source-over'|'source-in'|'source-out'|'source-atop'|'destination-over'|'destination-in'|'destination-out'|'destination-atop'|'lighter'|'copy'|'xor'|'darken'|'lighten'|'color-dodge'|'color-burn'|'difference'|'exclusion'|'hue'|'saturation'|'color'|'luminosity'|'multiply'|'screen'|'overlay'|'hard-light'|'soft-light'|'hsl-hue'|'hsl-saturation'|'hsl-color'|'hsl-luminosity')} type The global composite operation mode.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
	 */
	setGlobalCompositeOperation(type) {
		this.context.globalCompositeOperation = type;
		return this;
	}

	/**
	 * Modify the alpha value that is applied to shapes and images before they are drawn into the canvas.
	 * @param {number} value The alpha value, from 0.0 (fully transparent) to 1.0 (fully opaque)
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
	 */
	setGlobalAlpha(value) {
		this.context.globalAlpha = value;
		return this;
	}

	/**
	 * Reset the canvas' shadows.
	 * @returns {this}
	 * @chainable
	 */
	resetShadows() {
		return this
			.setShadowBlur(0)
			.setShadowColor('#000000');
	}

	/**
	 * Clear a circle.
	 * @param {number} x The position x in the center of the clip's circle.
	 * @param {number} y The position y in the center of the clip's circle.
	 * @param {number} radius The radius for the clip.
	 * @param {number} [start=0] The degree in radians to start drawing the circle.
	 * @param {number} [angle=Math.PI * 2] The degree in radians to finish drawing the circle, defaults to a full circle.
	 * @returns {this}
	 * @chainable
	 */
	clearCircle(x, y, radius, start = 0, angle = Math.PI * 2) {
		return this
			.createRoundClip(x, y, radius, start, angle)
			.clearPixels(x - radius, y - radius, radius * 2, radius * 2);
	}

	/**
	 * Clear an area.
	 * @param {number} [x=0] The position x to start drawing the element.
	 * @param {number} [y=0] The position y to start drawing the element.
	 * @param {number} [width=this.width] The width of the element.
	 * @param {number} [height=this.heigth] The heigth of the element.
	 * @returns {this}
	 * @chainable
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
	 */
	clearPixels(x = 0, y = 0, width = this.width, height = this.height) {
		this.context.clearRect(x, y, width, height);
		return this;
	}

	/**
	 * @returns {number[]} An Array. A list of numbers that specifies distances to alternately draw a line and a gap (in
	 * coordinate space units). If the number, when setting the elements, was odd, the elements of the array get copied
	 * and concatenated. For example, setting the line dash to [5, 15, 25] will result in getting back [5, 15, 25, 5, 15,
	 * 25].
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
	getLineDash() {
		return this.context.getLineDash();
	}

	/**
	 * @returns {number[]}
	 * @readonly
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getLineDash
	 */
	get lineDash() {
		return this.getLineDash();
	}

	/**
	 * Reports whether or not the specified point is contained in the current path.
	 * @param {number} x The X coordinate of the point to check.
	 * @param {number} y The Y coordinate of the point to check.
	 * @param {('nonzero'|'evenodd')} fillRule The algorithm by which to determine if a point is inside a path or
	 * outside a path.
	 * @returns {boolean}
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInPath
	 */
	isPointInPath(x, y, fillRule) {
		return this.context.isPointInPath(x, y, fillRule);
	}

	/**
	 * Reports whether or not the specified point is inside the area contained by the stroking of a path.
	 * @param {number} x The X coordinate of the point to check.
	 * @param {number} y The Y coordinate of the point to check.
	 * @returns {boolean}
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInStroke
	 */
	isPointInStroke(x, y) {
		return this.context.isPointInStroke(x, y);
	}

	/**
	 * Process data with this as the context
	 * @param {Function} fn A callback function
	 * @returns {this}
	 */
	process(fn) {
		fn.call(this, this);
		return this;
	}

	/**
	 * Register a new font (Canvas 1.6.x).
	 * @param {string} path   The path for the font.
	 * @param {string} family The font's family name.
	 * @returns {this}
	 * @chainable
	 */
	addTextFont(path, family) {
		if (isNotConstructor) CanvasConstructor.registerFont(path, family);
		else this.context.addFont(new Canvas.Font(family, path));
		return this;
	}

	/**
	 * Render the canvas into a buffer.
	 * @param {any[]} args The render's options.
	 * @returns {Buffer}
	 */
	toBuffer(...args) {
		return this.canvas.toBuffer(...args);
	}

	/**
	 * Render the canvas into a buffer using a Promise.
	 * @returns {Promise<Buffer>}
	 */
	toBufferAsync() {
		return new Promise((resolve, reject) => this.canvas.toBuffer((err, res) => {
			if (err) reject(err);
			else resolve(res);
		}));
	}

	/**
	 * Render the canvas into a Data URL.
	 * @param {string} type the standard MIME type for the image format to return. If you do not specify this parameter, the default value is PNG.
	 * @param {any[]} args Extra arguments
	 * @returns {string}
	 * @see https://github.com/Automattic/node-canvas#canvastodataurl-sync-and-async
	 */
	toDataURL(type, ...args) {
		return this.canvas.toDataURL(type, ...args);
	}

	/**
	 * Render the canvas into a Data URL using a Promise.
	 * @param {string} type the standard MIME type for the image format to return. If you do not specify this parameter, the default value is PNG.
	 * @returns {Promise<string>}
	 */
	toDataURLAsync(type) {
		return new Promise((resolve, reject) => this.canvas.toDataURL(type, (err, url) => {
			if (err) reject(err);
			else resolve(url);
		}));
	}

	/**
	 * Resolves an Image or Buffer
	 * @param {(Image|Buffer)} imageOrBuffer An Image instance or a buffer
	 * @param {Function} cb The callback
	 * @returns {Image}
	 * @private
	 */
	_resolveImage(imageOrBuffer, cb) {
		if (imageOrBuffer instanceof Canvas.Image) {
			cb(imageOrBuffer);
			return imageOrBuffer;
		}

		const image = new Canvas.Image();
		image.onload = cb.bind(null, image);
		image.src = imageOrBuffer;

		return image;
	}

	static getCanvas() {
		return Canvas;
	}

	/**
	 * Register a new font (Canvas 2.x).
	 * @param {string} path   The path for the font.
	 * @param {string} family The font's family name.
	 * @returns {CanvasConstructor}
	 */
	static registerFont(path, family) {
		if (family && typeof family === 'object' && Array.isArray(family) === false && 'family' in family)
			Canvas.registerFont(path, family);
		else
			Canvas.registerFont(path, { family });

		return CanvasConstructor;
	}

	/**
	 * @typedef {object} GradientStep
	 * @property {number} position Position of the step.
	 * @property {string} color A colour resolvable.
	 */

	/**
	 * @typedef {object} CanvasGradient
	 * @property {Function} addColorStop Position of the step.
	 */

}

module.exports = CanvasConstructor;
