# Getting Started

Please check {@tutorial InstallingCanvas} for the installation. You **must** have Canvas installed and working before
using this package.

---

How to use it:

**Node.js**:

```js
const { Canvas } = require('canvas-constructor');

new Canvas(300, 300)
    .setColor('#AEFD54')
    .printRectangle(5, 5, 290, 290)
    .setColor('#FFAE23')
    .setTextFont('28px Impact')
    .printText('Hello World!', 130, 150)
    .toBuffer();
```

**Browser**:

```html
<script type="text/javascript" src="canvasconstructor.master.min.js"></script>
<script type="text/javascript">
const canvasElement = document.getElementById('canvas');
CanvasConstructor.Canvas.from(canvasElement)
    .setColor('#AEFD54')
    .printRectangle(5, 5, 290, 290)
    .setColor('#FFAE23')
    .setTextFont('28px Impact')
    .printText('Hello World!', 130, 150);
</script>
```

- That will create a canvas with size of 300 pixels width, 300 pixels height.
- Set the color to #AEFD54
- Draw a rectangle with the previous color, covering all the pixels from (5, 5) to (290 + 5, 290 + 5)
- Set the color to #FFAE23
- Set the font size to 28 pixels with font Impact.
- Write the text 'Hello World!' in the position (130, 150)
- Return a buffer.

![Hello World!](https://raw.githubusercontent.com/kyranet/canvas-constructor/master/guides/assets/getting-started-example-01.png)

Now, let's suppose we want to add images. I'd recommend [fs-nextra](https://github.com/bdistin/fs-nextra), by BDISTIN,
it requires Node.js LTS to work, it is a dependency-free and lightweight package that provides support for
**atomic operations**.

```js
const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');

async function createCanvas() {
    const image = await fsn.readFile('./images/kitten.png');

    return new Canvas(300, 400)
        .printImage(image, 0, 0, 300, 400)
        .setColor('#FFAE23')
        .setTextFont('28px Impact')
        .setTextAlign('center')
        .printText('Kitten!', 150, 370)
        .toBufferAsync();
}
```

- That will create a canvas with size of 300 pixels width, 400 pixels height.
- Draw an image, given a Buffer (the image from the images folder).
- Set the color to #FFAE23
- Set the font size to 28 pixels with font Impact.
- Set the text alignment to center.
- Write the text 'Kitten!' in the position (150, 370)
- Return a buffer.

![Kitten!](https://raw.githubusercontent.com/kyranet/canvas-constructor/master/guides/assets/getting-started-example-02.png)

And now, you have created an image with a kitten in the background and some centered text in the bottom of it.

If you experience issues with **Canvas** or want to install it, please refer to the
[canvas](https://www.npmjs.com/package/canvas) repository, if you feel you found an issue in this package, feel free to
file an issue [here](https://github.com/kyranet/canvas-constructor/issues), or make a
[Pull Request](https://help.github.com/articles/about-pull-requests/) if you have the fix.
