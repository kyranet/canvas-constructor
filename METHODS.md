# This package has the following methods:

|               Method | Parameters
|---------------------:|-----------
| changeCanvasSize     | `width`, `height`
| changeCanvasWidth    | `width`
| changeCanvasHeigth   | `height`
| save                 | 
| restore              | 
| rotate               | `angle`
| scale                | `x`, `y`
| traslate             | `x`, `y`
| fill                 | `path`, `fillRule`
| addRect              | `x`, `y`, `width`, `height`
| addText              | `text`, `x`, `y`, `maxWidth`
| stroke               | `path`
| addStrokeRect        | `x`, `y`, `width`, `height`
| addStrokeText        | `text`, `x`, `y`
| measureText          | `text`, `callback`
| setStroke            | `color = '#000000'`
| setStrokeWidth       | `width = 1`
| addImage             | `buffer`, `x`, `y`, `width`, `height`, `options = {}`
| addRoundImage        | `buffer`, `x`, `y`, `width`, `height`, `radius = 10`
| addBevelImage        | `buffer`, `x`, `y`, `width`, `height`, `radius = 10`
| createRoundClip      | `x`, `y`, `radius`, `start = 0`, `angle = Math.PI * 2`
| createBeveledClip    | `x`, `y`, `width`, `height`, `radius`
| addTextFont          | `path`, `family`
| setColor             | `color`
| setTextFont          | `font`
| setTextAlign         | `align`
| setTextBaseline      | `baseline`
| beginPath            | 
| closePath            | 
| createLinearGradient | `x0`, `y0`, `x1`, `y1`
| createRadialGradient | `x0`, `y0`, `r0`, `x1`, `y1`, `r1`
| arc                  | `x`, `y`, `radius`, `startAngle`, `endAngle`, `anticlockwise = false`
| arcTo                | `x1`, `y1`, `x2`, `y2`, `radius`
| quadraticCurveTo     | `cpx`, `cpy`, `x`, `y`
| bezierCurveTo        | `cp1x`, `cp1y`, `cp2x`, `cp2y`, `x`, `y`
| lineTo               | `x`, `y`
| moveTo               | `x`, `y`
| setShadowBlur        | `radius`
| setShadowColor       | `color`
| setShadowOffsetX     | `value`
| setShadowOffsetY     | `value`
| setGlobalAlpha       | `value`
| resetShadows         | 
| clearCircle          | `x`, `y`, `radius`, `start = 0`, `angle = Math.PI * 2`
| clearPixels          | `x = 0`, `y = 0`, `width = this.width`, `height = this.height`
| toBuffer             | `options`
