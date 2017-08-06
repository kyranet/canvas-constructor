const Canvas = require('canvas');

class CanvasConstructor {

    constructor(width, height) {
        this.canvas = new Canvas(width, height);
        this.context = this.canvas.getContext('2d');

        this.width = width;
        this.height = height;
    }

    /**
     * Save the entire state of the canvas by pushing the current state onto a stack.
     * @returns {CanvasConstructor}
     * @chainable
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
     */
    save() {
        this.context.save();
        return this;
    }

    /**
     * Restores the most recently saved canvas by popping the top entry in the drawing state stack. If there is no saved state, this method does nothing.
     * @returns {CanvasConstructor}
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
     * @returns {CanvasConstructor}
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
     * @returns {CanvasConstructor}
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
     * @returns {CanvasConstructor}
     * @chainable
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate
     */
    traslate(x, y) {
        this.context.traslate(x, y);
        return this;
    }

    /**
     * Fills the current or given path with the current fill style using the non-zero or even-odd winding rule.
     * @param {any} path A Path2D path to fill.
     * @param {('nonzero'|'evenodd')} fillRule The algorithm by which to determine if a point is inside a path or
     * outside a path.
     * @returns {CanvasConstructor}
     * @chainable
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fill
     */
    fill(path, fillRule) {
        this.context.fill(path, fillRule);
        return this;
    }

    /**
     * Add a rectangle.
     * @param {number} x      The position x to start drawing the element.
     * @param {number} y      The position y to start drawing the element.
     * @param {number} width  The width of the element.
     * @param {number} height The heigth of the element.
     * @returns {CanvasConstructor}
     * @chainable
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect
     */
    addRect(x, y, width, height) {
        this.context.fillRect(x, y, width, height);
        return this;
    }

    /**
     * Add a text.
     * @param {string} text The text to write.
     * @param {number} x    The position x to start drawing the element.
     * @param {number} y    The position y to start drawing the element.
     * @param {number} maxWidth The maximum width to draw. If specified, and the string is computed to be wider than
     * this width, the font is adjusted to use a more horizontally condensed font.
     * @returns {CanvasConstructor}
     * @chainable
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText
     */
    addText(text, x, y, maxWidth) {
        this.context.fillText(text, x, y, maxWidth);
        return this;
    }

    /**
     * Strokes the current or given path with the current stroke style using the non-zero winding rule.
     * @param {any} path A Path2D path to stroke.
     * @returns {CanvasConstructor}
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
     * @param {number} x      The x axis of the coordinate for the rectangle starting point.
     * @param {number} y      The y axis of the coordinate for the rectangle starting point.
     * @param {number} width  The rectangle's width.
     * @param {number} height The rectangle's height.
     * @returns {CanvasConstructor}
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
     * @param {number} x    The position x to start drawing the element.
     * @param {number} y    The position y to start drawing the element.
     * @returns {CanvasConstructor}
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
     * @param {string}   text     The text to measure.
     * @param {Function} callback The callback, if not specified, this method won't be chainable as it will return a
     * number.
     * @returns {(CanvasConstructor|number)}
     * @chainable
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/measureText
     * @example
     * new Canvas(500, 400)
     *     .setTextFont('40px Tahoma')
     *     .measureText('Hello World!', function(size) {
     *         this.setTextFont(`${size}px`);
     *     })
     *     .addText('Hello World!', 30, 50)
     *     .toBuffer(); // Returns a Buffer
     * @example
     * const size = new Canvas(500, 400)
     *     .setTextFont('40px Tahoma')
     *     .measureText('Hello World!'); // Returns a number
     *
     * new Canvas(500, 400)
     *     .setTextFont(`${size}px Tahoma`)
     *     .addText('Hello World!', 30, 50)
     *     .toBuffer(); // Returns a Buffer
     */
    measureText(text, callback) {
        if (callback) {
            if (typeof callback !== 'function') throw new TypeError('Callback must be a function.');
            callback(this.context.measureText(text));
            return this;
        }
        return this.context.measureText(text);
    }

    /**
     * Set a color for the canvas' context.
     * @param {string} color A canvas' color resolvable.
     * @returns {CanvasConstructor}
     * @chainable
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle
     */
    setStroke(color) {
        this.context.strokeStyle = color;
        return this;
    }

    /**
     * Add an image.
     * @param {Buffer} buffer  The image's buffer.
     * @param {number} x       The position x to start drawing the element.
     * @param {number} y       The position y to start drawing the element.
     * @param {number} width   The width of the element.
     * @param {number} height  The heigth of the element.
     * @param {Object} options Options.
     * @param {number} options.radius The radius for the new image.
     * @param {'round'|'bevel'} options.type   The type for the new image.
     * @returns {CanvasConstructor}
     * @chainable
     */
    addImage(buffer, x, y, width, height, options = {}) {
        if (options.type) {
            if (options.type === 'round') return this.addRoundImage(buffer, x, y, width, height, options.radius);
            if (options.type === 'bevel') return this.addBevelImage(buffer, x, y, width, height, options.radius);
        }
        this.save();
        const image = new Canvas.Image();
        image.onload = () => this.context.drawImage(image, x, y, width, height);
        image.src = buffer;
        return this.restore();
    }

    /**
     * Add a round image.
     * @param {Buffer} buffer The image's buffer.
     * @param {number} x      The position x to start drawing the element.
     * @param {number} y      The position y to start drawing the element.
     * @param {number} width  The width of the element.
     * @param {number} height The heigth of the element.
     * @param {number} radius The radius for the new image.
     * @returns {CanvasConstructor}
     * @chainable
     */
    addRoundImage(buffer, x, y, width, height, radius) {
        this.createRoundClip(x + radius, y + radius, radius);
        return this.addImage(buffer, x, y, width, height, {});
    }

    /**
     * Add a beveled image.
     * @param {Buffer} buffer The image's buffer.
     * @param {number} x      The position x to start drawing the element.
     * @param {number} y      The position y to start drawing the element.
     * @param {number} width  The width of the element.
     * @param {number} height The heigth of the element.
     * @param {number} radius The radius for the new image.
     * @returns {CanvasConstructor}
     * @chainable
     */
    addBevelImage(buffer, x, y, width, height, radius) {
        this.createBeveledClip(x, y, width, height, radius);
        return this.addImage(buffer, x, y, width, height, {});
    }

    /**
     * Create a round clip.
     * @param {number} x                   The position x in the center of the clip's circle.
     * @param {number} y                   The position y in the center of the clip's circle.
     * @param {number} radius              The radius for the clip.
     * @param {number} [start=0]           The degree in radians to start drawing the circle.
     * @param {number} [angle=Math.PI * 2] The degree in radians to finish drawing the circle, defaults to a full circle.
     * @returns {CanvasConstructor}
     * @chainable
     */
    createRoundClip(x, y, radius, start = 0, angle = Math.PI * 2) {
        this.context.save();
        this.context.beginPath();
        this.context.arc(x, y, radius, start, angle, false);
        this.context.clip();
        return this;
    }

    /**
     * Create a round clip.
     * @param {number} x      The position x to start drawing clip.
     * @param {number} y      The position y to start drawing clip.
     * @param {number} width  The width of clip.
     * @param {number} height The heigth of clip.
     * @param {number} radius The radius for clip's rounded borders.
     * @returns {CanvasConstructor}
     * @chainable
     */
    createBeveledClip(x, y, width, height, radius) {
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
     * Register a new font.
     * @param {string} path   The path for the font.
     * @param {string} family The font's family name.
     * @returns {CanvasConstructor}
     * @chainable
     */
    registerTextFont(path, family) {
        Canvas.registerFont(path, { family });
        return this;
    }

    /**
     * Register a new font.
     * @param {string} path   The path for the font.
     * @param {string} family The font's family name.
     * @returns {CanvasConstructor}
     * @chainable
     */
    addTextFont(path, family) {
        this.context.addFont(new Canvas.Font(family, path));
        return this;
    }

    /**
     * Set a color for the canvas' context.
     * @param {string} color A canvas' color resolvable.
     * @returns {CanvasConstructor}
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
     * @returns {CanvasConstructor}
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
     * @returns {CanvasConstructor}
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
     * @returns {CanvasConstructor}
     * @chainable
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline
     */
    setTextBaseline(baseline) {
        this.context.textBaseline = baseline;
        return this;
    }

    /**
     * Set the shadow's blur.
     * @param {number} radius The shadow's blur radius to set.
     * @returns {CanvasConstructor}
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
     * @returns {CanvasConstructor}
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
     * @returns {CanvasConstructor}
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
     * @returns {CanvasConstructor}
     * @chainable
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY
     */
    setShadowOffsetY(value) {
        this.context.shadowOffsetY = value;
        return this;
    }

    /**
     * Modify the alpha value that is applied to shapes and images before they are drawn into the canvas.
     * @param {number} value The alpha value, from 0.0 (fully transparent) to 1.0 (fully opaque)
     * @returns {CanvasConstructor}
     * @chainable
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
     */
    setGlobalAlpha(value) {
        this.context.globalAlpha = value;
        return this;
    }

    /**
     * Reset the canvas' shadows.
     * @returns {CanvasConstructor}
     * @chainable
     */
    resetShadows() {
        return this
            .setShadowBlur(0)
            .setShadowColor('#000000');
    }

    /**
     * Clear a circle.
     * @param {number} x                   The position x in the center of the clip's circle.
     * @param {number} y                   The position y in the center of the clip's circle.
     * @param {number} radius              The radius for the clip.
     * @param {number} [start=0]           The degree in radians to start drawing the circle.
     * @param {number} [angle=Math.PI * 2] The degree in radians to finish drawing the circle, defaults to a full circle.
     * @returns {CanvasConstructor}
     * @chainable
     */
    clearCircle(x, y, radius, start = 0, angle = Math.PI * 2) {
        return this
            .createRoundClip(x, y, radius, start, angle)
            .clearPixels(x - radius, y - radius, radius * 2, radius * 2);
    }

    /**
     * Clear an area.
     * @param {number} [x=0]                The position x to start drawing the element.
     * @param {number} [y=0]                The position y to start drawing the element.
     * @param {number} [width=this.width]   The width of the element.
     * @param {number} [height=this.heigth] The heigth of the element.
     * @returns {CanvasConstructor}
     * @chainable
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
     */
    clearPixels(x = 0, y = 0, width = this.width, height = this.height) {
        this.context.clearRect(x, y, width, height);
        return this;
    }

    /**
     * Render the canvas into a buffer.
     * @param {Object} options The render's options.
     * @returns {Buffer}
     */
    toBuffer(options) {
        return this.canvas.toBuffer(options);
    }

}

module.exports = CanvasConstructor;