const Canvas = require('canvas');

class CanvasConstructor {

    constructor(width, height) {
        this.canvas = new Canvas(width, height);
        this.context = this.canvas.getContext('2d');
    }

    /**
     * Restore the context changes.
     * @returns {CanvasConstructor}
     * @chainable
     */
    restore() {
        this.context.restore();
        return this;
    }

    /**
     * Add a rectangle.
     * @param {number} x       The position x to start drawing the element.
     * @param {number} y       The position y to start drawing the element.
     * @param {number} width   The width of the element.
     * @param {number} height  The heigth of the element.
     * @returns {CanvasConstructor}
     * @chainable
     */
    fillRect(x, y, width, height) {
        this.context.fillRect(x, y, width, height);
        return this;
    }

    /**
     * Add a text.
     * @param {string} text    The text to write.
     * @param {number} x       The position x to start drawing the element.
     * @param {number} y       The position y to start drawing the element.
     * @returns {CanvasConstructor}
     * @chainable
     */
    addText(text, x, y) {
        this.context.fillText(text, x, y);
        return this;
    }

    /**
     * Add stroked text.
     * @param {string} text    The text to write.
     * @param {number} x       The position x to start drawing the element.
     * @param {number} y       The position y to start drawing the element.
     * @returns {CanvasConstructor}
     * @chainable
     */
    addStrokeText(text, x, y) {
        this.context.strokeText(text, x, y);
        return this;
    }

    /**
     * Set a colour for the canvas' context.
     * @param {string} color A canvas' colour resolvable.
     * @returns {CanvasConstructor}
     * @chainable
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
        if (options.type !== null) {
            if (options.type === 'round') return this.addRoundImage(buffer, x, y, width, height, options.radius);
            if (options.type === 'bevel') return this.addBevelImage(buffer, x, y, width, height, options.radius);
        }
        const image = new Canvas.Image();
        image.onload = () => this.context.drawImage(image, x, y, width, height);
        image.src = buffer;
        return this.restore();
    }

    /**
     * Add a round image.
     * @param {Buffer} buffer  The image's buffer.
     * @param {number} x       The position x to start drawing the element.
     * @param {number} y       The position y to start drawing the element.
     * @param {number} width   The width of the element.
     * @param {number} height  The heigth of the element.
     * @param {number} radius  The radius for the new image.
     * @returns {CanvasConstructor}
     * @chainable
     */
    addRoundImage(buffer, x, y, width, height, radius) {
        this.createRoundClip(x + radius, y + radius, radius);
        return this.addImage(buffer, x, y, width, height, radius, { type: null });
    }

    /**
     * Add a beveled image.
     * @param {Buffer} buffer  The image's buffer.
     * @param {number} x       The position x to start drawing the element.
     * @param {number} y       The position y to start drawing the element.
     * @param {number} width   The width of the element.
     * @param {number} height  The heigth of the element.
     * @param {number} radius  The radius for the new image.
     * @returns {CanvasConstructor}
     * @chainable
     */
    addBevelImage(buffer, x, y, width, height, radius) {
        this.createBeveledClip(x, y, width, height, radius);
        return this.addImage(buffer, x, y, width, height, radius, { type: null });
    }

    /**
     * Create a round clip.
     * @param {number} x       The position x in the center of the clip's circle.
     * @param {number} y       The position y in the center of the clip's circle.
     * @param {number} radius  The radius for the clip.
     * @returns {CanvasConstructor}
     * @chainable
     */
    createRoundClip(x, y, radius) {
        this.context.save();
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, Math.PI * 2, false);
        this.context.clip();
        return this;
    }

    /**
     * Create a round clip.
     * @param {number} x       The position x to start drawing clip.
     * @param {number} y       The position y to start drawing clip.
     * @param {number} width   The width of clip.
     * @param {number} height  The heigth of clip.
     * @param {number} radius  The radius for clip's rounded borders.
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
     * @param {string} path The path for the font.
     * @param {string} family The font's family name.
     * @returns {CanvasConstructor}
     * @chainable
     */
    registerTextFont(path, family) {
        Canvas.registerFont(path, { family });
        return this;
    }

    /**
     * Set a colour for the canvas' context.
     * @param {string} color A canvas' colour resolvable.
     * @returns {CanvasConstructor}
     * @chainable
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
     */
    setTextFont(font) {
        this.context.font = font;
        return this;
    }

    /**
     * Change the font alignment.
     * @param {('left'|'center'|'right'|'justified')} align The font's alignment to set.
     * @returns {CanvasConstructor}
     * @chainable
     */
    setTextAlign(align) {
        this.context.textAlign = align;
        return this;
    }

    /**
     * Set the shadow's blur.
     * @param {number} radius The shadow's blur radius to set.
     * @returns {CanvasConstructor}
     * @chainable
     */
    setShadowBlur(radius) {
        this.context.shadowBlur = radius;
        return this;
    }

    /**
     * Set the shadow's colour.
     * @param {string} colour A canvas' colour resolvable to set as shadow's colour.
     * @returns {CanvasConstructor}
     * @chainable
     */
    setShadowColour(colour) {
        this.context.shadowColor = colour;
        return this;
    }

    /**
     * Reset the canvas' shadows.
     * @returns {CanvasConstructor}
     * @chainable
     */
    resetShadows() {
        return this.setShadowBlur(0).setShadowColour('#000000');
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