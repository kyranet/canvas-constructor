# canvas-constructor
[![npm](https://img.shields.io/npm/v/canvas-constructor.svg?maxAge=3600)](https://www.npmjs.com/package/canvas-constructor)
[![npm](https://img.shields.io/npm/dt/canvas-constructor.svg?maxAge=3600)](https://www.npmjs.com/package/canvas-constructor)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d673cda285b34ce4b8b6601458b29527)](https://www.codacy.com/app/kyranet/canvasConstructor?utm_source=github.com&utm_medium=referral&utm_content=kyranet/canvasConstructor&utm_campaign=badger)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/kyranet/canvasConstructor/master/LICENSE)

A ES6 function for node-canvas with built-in functions and chained methods.

How to use it:

```js
const { Canvas } = require('canvas-constructor');

new Canvas(300, 300)
    .setColor('#AEFD54')
    .addRect(5, 5, 290, 290)
    .setColor('#FFAE23')
    .setTextFont('28px Impact')
    .addText('Hello World!', 130, 150)
    .toBuffer();
```

- That will create a canvas with size of 300 pixels width, 300 pixels height.
- Set the colour to #AEFD54
- Draw a rectangle with the previous colour, covering all the pixels from (5, 5) to (290 + 5, 290 + 5)
- Set the colour to #FFAE23
- Set the font size to 28 pixels with font Impact.
- Write the text 'Hello World!' in the position (130, 150)
- Return a buffer.

Now, let's suppose we want to add images. I'd recommend [fs-nextra](https://github.com/bdistin/fs-nextra), by BDISTIN, it requires Node.js 8.1.0 to work (it promisifies the async fs methods with `Util.promisify()`), it's a dependency-free and lightweight package that provides support for **atomic operations**.

```js
const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');

async function createCanvas() {
    const image = await fsn.readFile('./images/kitten.png');

    new Canvas(300, 400)
        .addImage(image, 0, 0, 300, 400)
        .setColor('#FFAE23')
        .setTextFont('28px Impact')
        .setTextAlign('center')
        .addText('Kitten!', 150, 370)
        .toBuffer();
}
```

- That will create a canvas with size of 300 pixels width, 400 pixels height.
- Draw an image, given a Buffer (the image from the images folder).
- Set the colour to #FFAE23
- Set the font size to 28 pixels with font Impact.
- Set the text alignment to center.
- Write the text 'Kitten!' in the position (150, 370)
- Return a buffer.

And now, you have created an image with a kitten in the background and some centered text in the bottom of it.

If you experience issues with **Canvas** or want to install it, please refer to the [canvas](https://www.npmjs.com/package/canvas) repository, if you feel you found an issue in this package, feel free to file an issue [here](https://github.com/kyranet/canvasConstructor/issues), or make a [Pull Request](https://help.github.com/articles/about-pull-requests/) if you have the fix.
