const { Canvas } = require('../index.js');
const { readFile, writeFile } = require('fs-nextra');

async function invertImage() {
    const plate = await readFile('./test/images/york-normal.jpg');
    const buff = new Canvas(512, 512)
        .addImage(plate, 0, 0, 512, 512)
        .getImageData(0, 0, 512, 512, function (imageData) { // eslint-disable-line func-names
            for (let i = 0; i < imageData.data.length; i += 4) {
                imageData.data[i] = 255 - imageData.data[i];
                imageData.data[i + 1] = 255 - imageData.data[i + 1];
                imageData.data[i + 2] = 255 - imageData.data[i + 2];
            }
            this.putImageData(imageData, 0, 0); // eslint-disable-line no-invalid-this
        })
        .toBuffer();
    await writeFile('./test/images/york-inverted.jpg', buff);
}

invertImage();
