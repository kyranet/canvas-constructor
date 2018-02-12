exports.invert = (canvas) => canvas
    .save()
    .setGlobalCompositeOperation('difference')
    .setColor('white')
    .addRect(0, 0, canvas.width, canvas.height)
    .restore();

exports.greyscale = (canvas) => canvas
    .save()
    .setGlobalCompositeOperation('hsl-saturation')
    .setColor('white')
    .addRect(0, 0, canvas.width, canvas.height)
    .restore();

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

exports.threshold = (canvas, threshold) => {
    const imageData = canvas.getImageData();
    const { data } = imageData;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i + 1] = data[i + 2] = (0.2126 * data[i]) + (0.7152 * data[i + 1]) + (0.0722 * data[i + 2]) >= threshold ? 255 : 0;
    }
    return canvas.putImageData(imageData, 0, 0);
};

exports.invertThreshold = (canvas, threshold) => {
    const imageData = canvas.getImageData();
    const { data } = imageData;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i + 1] = data[i + 2] = (0.2126 * data[i]) + (0.7152 * data[i + 1]) + (0.0722 * data[i + 2]) >= threshold ? 0 : 255;
    }
    return canvas.putImageData(imageData, 0, 0);
};

