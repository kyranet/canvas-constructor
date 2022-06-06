<div align="center">

![CanvasConstructor Logo](https://cdn.discordapp.com/emojis/451438332375728128.png?v=1)

# canvas-constructor

**An ES6 chainable class for node-canvas with built-in utilities.**

[![npm](https://img.shields.io/npm/v/canvas-constructor.svg?maxAge=3600)](https://www.npmjs.com/package/canvas-constructor)
[![npm](https://img.shields.io/npm/dt/canvas-constructor.svg?maxAge=3600)](https://www.npmjs.com/package/canvas-constructor)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/kyranet/canvas-constructor.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/kyranet/canvas-constructor/alerts/)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/kyranet/canvas-constructor/master/LICENSE)

[![Support Server](https://discord.com/api/guilds/437335547711848458/embed.png?style=banner2)](https://discord.gg/taNgb9d)

</div>

---

## Installation

This module requires one of the following packages to be installed for Node.js:

-   [`@napi-rs/canvas`](https://www.npmjs.com/package/@napi-rs/canvas)
-   [`skia-canvas`](https://www.npmjs.com/package/skia-canvas)
-   [`canvas`](https://www.npmjs.com/package/canvas)

> **Note**: If you are building a website, no extra dependencies are required.

---

How to use it:

**Node.js**:

```js
const { Canvas } = require('canvas-constructor/napi-rs');
// or `canvas-constructor/cairo` if you are using `canvas`

new Canvas(300, 300)
	.setColor('#AEFD54')
	.printRectangle(5, 5, 290, 290)
	.setColor('#FFAE23')
	.setTextFont('28px Impact')
	.printText('Hello World!', 130, 150)
	.png();
```

**Browser**:

```html
<script type="text/javascript" src="https://unpkg.com/canvas-constructor"></script>
<script type="text/javascript">
	const canvasElement = document.getElementById('canvas');
	new CanvasConstructor.Canvas(canvasElement)
		.setColor('#AEFD54')
		.printRectangle(5, 5, 290, 290)
		.setColor('#FFAE23')
		.setTextFont('28px Impact')
		.printText('Hello World!', 130, 150);
</script>
```

-   That will create a canvas with size of 300 pixels width, 300 pixels height.
-   Set the color to #AEFD54
-   Draw a rectangle with the previous color, covering all the pixels from (5, 5) to (290 + 5, 290 + 5)
-   Set the color to #FFAE23
-   Set the font size to 28 pixels with font Impact.
-   Write the text 'Hello World!' in the position (130, 150)
-   Return a buffer.

Now, let's suppose we want to add images, we'll use `Canvas.loadImage`, which works in both Node.js and browser:

```js
const { readFile } = require('node:fs');
const { Canvas, loadImage } = require('canvas-constructor/napi-rs');

async function createCanvas() {
	const image = await loadImage(await readFile('./images/kitten.png'));

	return new Canvas(300, 400)
		.printImage(image, 0, 0, 300, 400)
		.setColor('#FFAE23')
		.setTextFont('28px Impact')
		.setTextAlign('center')
		.printText('Kitten!', 150, 370)
		.pngAsync();
}
```

-   That will create a canvas with size of 300 pixels width, 400 pixels height.
-   Draw an image, given a Buffer (the image from the images folder).
-   Set the color to #FFAE23
-   Set the font size to 28 pixels with font Impact.
-   Set the text alignment to center.
-   Write the text 'Kitten!' in the position (150, 370)
-   Return a buffer.

And now, you have created an image with a kitten in the background and some centred text in the bottom of it.

If you experience issues with `@napi-rs/canvas`, `skia-canvas`, or `canvas`, please refer to their respective package repositories, this
package is just a convenient wrapper for the three.
