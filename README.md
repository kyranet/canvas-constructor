<div align="center">

![CanvasConstructor Logo](https://cdn.discordapp.com/emojis/451438332375728128.png?v=1)

# canvas-constructor

**A utility for Canvas with chainable methods and consistent interface for all environments**

[![npm](https://img.shields.io/npm/v/canvas-constructor.svg?maxAge=3600)](https://www.npmjs.com/package/canvas-constructor)
[![npm](https://img.shields.io/npm/dt/canvas-constructor.svg?maxAge=3600)](https://www.npmjs.com/package/canvas-constructor)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/kyranet/canvas-constructor.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/kyranet/canvas-constructor/alerts/)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/kyranet/canvas-constructor/master/LICENSE)

[![Support Server](https://discord.com/api/guilds/437335547711848458/embed.png?style=banner2)](https://discord.gg/taNgb9d)

</div>

---

## Live Demo

[![Edit on Stackblitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/canvas-constructor-vite?file=main.js)

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
// or 'canvas-constructor/skia' if you are using `skia-canvas`
// or 'canvas-constructor/cairo' if you are using `canvas`

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
<canvas id="canvas" width="300" height="400"></canvas>
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

Alternatively, you can import `canvas-constructor/browser` if you are using a bundler such as Vite, Webpack, or Rollup:

```js
import { Canvas } from 'canvas-constructor/browser';
```

Now, let's suppose we want to add images, we can use the `loadImage` function, which works in all supported environments:

```js
const { Canvas, loadImage } = require('canvas-constructor/napi-rs');

async function createCanvas() {
	const image = await loadImage('./images/kitten.png');

	return new Canvas(300, 400)
		.printImage(image, 0, 0, 300, 400)
		.setColor('#FFAE23')
		.setTextFont('28px Impact')
		.setTextAlign('center')
		.printText('Kitten!', 150, 370)
		.pngAsync();
}
```

And now, you have created an image with a kitten in the background and some centered text at the bottom of it.

If you experience issues with `@napi-rs/canvas`, `skia-canvas`, or `canvas`, please refer to their respective package repositories, this
package is just a convenient wrapper that makes it easier to use the canvas in both Node.js and the browser. And does not modify the
behavior of the underlying canvas implementation.
