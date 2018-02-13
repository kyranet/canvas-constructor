/**
 * Invert an image
 * @param {Canvas} canvas The Canvas instance
 * @returns {Canvas}
 */
exports.invert = (canvas) => canvas
    .save()
    .setGlobalCompositeOperation('difference')
    .setColor('white')
    .addRect(0, 0, canvas.width, canvas.height)
    .restore();

/**
 * Greyscale an image
 * @param {Canvas} canvas The Canvas instance
 * @returns {Canvas}
 */
exports.greyscale = (canvas) => canvas
    .save()
    .setGlobalCompositeOperation('hsl-saturation')
    .setColor('white')
    .addRect(0, 0, canvas.width, canvas.height)
    .restore();

/**
 * Invert then greyscale an image
 * @param {Canvas} canvas The Canvas instance
 * @returns {Canvas}
 */
exports.invertGreyscale = (canvas) => canvas
    .save()
    .setGlobalCompositeOperation('hsl-saturation')
    .setColor('white')
    .addRect(0, 0, canvas.width, canvas.height)
    .setGlobalCompositeOperation('difference')
    .setColor('white')
    .addRect(0, 0, canvas.width, canvas.height)
    .restore();

/**
 * Give an image a sepia tone
 * @param {Canvas} canvas The Canvas instance
 * @returns {Canvas}
 */
exports.sepia = (canvas) => {
    const imageData = canvas.getImageData();
    const { data } = imageData;
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i]; // eslint-disable-line id-length
        const g = data[i + 1]; // eslint-disable-line id-length
        const b = data[i + 2];
        data[i] = (r * 0.393) + (g * 0.769) + (b * 0.189);
        data[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
        data[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131);
    }
    return canvas.putImageData(imageData, 0, 0);
};

/**
 * Turn an image into a silhouette
 * @param {Canvas} canvas The Canvas instance
 * @returns {Canvas}
 */
exports.silhouette = (canvas) => {
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
 * @param {Canvas} canvas The Canvas instance
 * @param {number} threshold The threshold to apply in a range of 0 to 255
 * @returns {Canvas}
 */
exports.threshold = (canvas, threshold) => {
    const imageData = canvas.getImageData();
    const { data } = imageData;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i + 1] = data[i + 2] = (0.2126 * data[i]) + (0.7152 * data[i + 1]) + (0.0722 * data[i + 2]) >= threshold ? 255 : 0;
    }
    return canvas.putImageData(imageData, 0, 0);
};

/**
 * Apply an inverted threshold to the image
 * @param {Canvas} canvas The Canvas instance
 * @param {number} threshold The threshold to apply in a range of 0 to 255
 * @returns {Canvas}
 */
exports.invertedThreshold = (canvas, threshold) => {
    const imageData = canvas.getImageData();
    const { data } = imageData;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i + 1] = data[i + 2] = (0.2126 * data[i]) + (0.7152 * data[i + 1]) + (0.0722 * data[i + 2]) >= threshold ? 0 : 255;
    }
    return canvas.putImageData(imageData, 0, 0);
};

// The following filters need an improvement, as they're not working correctly.

/**
 * Sharpen an image
 * @param {Canvas} canvas The Canvas instance
 * @param {number[]} amounts The edge and the center
 * @returns {Canvas}
 */
exports.sharpen = (canvas, [edge, center]) => exports.convolute(canvas, [0, edge, 0, edge, center, edge, 0, edge, 0]);

/**
 * Blur an image
 * @param {Canvas} canvas The Canvas instance
 * @param {number} amount The edge and the center
 * @returns {Canvas}
 */
exports.blur = (canvas, amount) => exports.convolute(canvas, new Array(9).fill(1 / amount));

/**
 * Convolute a image. This filter needs a fix.
 * @param {Canvas} canvas The Canvas instance
 * @param {number[]} weights The weights
 * @returns {Canvas}
 * @see https://www.html5rocks.com/en/tutorials/canvas/imagefilters/
 */
exports.convolute = (canvas, weights) => {
    const side = 3 | 0, halfSide = (3 / 2) | 0; // eslint-disable-line no-bitwise
    const imageData = canvas.getImageData();
    const { data } = imageData;
    const { width, height } = canvas;

    // go through the destination image pixels
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dstOff = ((y * width) + x) * 4;
            // calculate the weighed sum of the source image pixels that
            // fall under the convolution matrix
            let r = 0, g = 0, b = 0; // eslint-disable-line
            for (let cy = 0; cy < side; cy++) {
                for (let cx = 0; cx < side; cx++) {
                    const scy = y + cy - halfSide, scx = x + cx - halfSide;
                    if (scy < 0 || scy >= height || scx < 0 || scx >= width) continue; // eslint-disable-line max-depth
                    const srcOff = ((scy * width) + scx) * 4;
                    const wt = weights[(cy * side) + cx];
                    r += data[srcOff] * wt;
                    g += data[srcOff + 1] * wt;
                    b += data[srcOff + 2] * wt;
                }
            }
            data[dstOff] = r;
            data[dstOff + 1] = g;
            data[dstOff + 2] = b;
        }
    }
    return canvas.putImageData(imageData, 0, 0);
};