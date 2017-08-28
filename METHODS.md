# This package has the following methods:

|                      Method | Parameters
|----------------------------:|-----------
| changeCanvasSize            | `width`, `height`
| changeCanvasWidth           | `width`
| changeCanvasHeigth          | `height`
| setTransform                | `a`, `b`, `c`, `d`, `e`, `f`
| resetTransformation         |
| save                        |
| restore                     |
| rotate                      | `angle`
| scale                       | `x`, `y`
| traslate                    | `x`, `y`
| fill                        | `path`, `fillRule`
| addRect                     | `x`, `y`, `width`, `height`
| addText                     | `text`, `x`, `y`, `maxWidth`
| addResponsiveText           | `text`, `x`, `y`, `maxWidth`, `options`
| addCircle                   | `x`, `y`, `radius`
| stroke                      | `path`
| addStrokeRect               | `x`, `y`, `width`, `height`
| addStrokeText               | `text`, `x`, `y`
| measureText                 | `text`, `callback`
| setStroke                   | `color = '#000000'`
| setLineWidth                | `width = 1`
| setStrokeWidth              | Alias of `setLineWidth()`
| setLineDashOffset           | `value`
| setLineJoin                 | `value`
| setLineCap                  | `value`
| setLineDash                 | `segments`
| addImage                    | `buffer`, `x`, `y`, `width`, `height`, `options = {}`
| addRoundImage               | `buffer`, `x`, `y`, `width`, `height`, `radius = 10`
| addBevelImage               | `buffer`, `x`, `y`, `width`, `height`, `radius = 10`
| createRoundClip             | `x`, `y`, `radius`, `start = 0`, `angle = Math.PI * 2`
| createBeveledClip           | `x`, `y`, `width`, `height`, `radius`
| addTextFont                 | `path`, `family`
| setColor                    | `color`
| setTextFont                 | `font`
| setTextAlign                | `align`
| setTextBaseline             | `baseline`
| beginPath                   |
| closePath                   |
| createPattern               | `image`, `repetition`
| createLinearGradient        | `x0`, `y0`, `x1`, `y1`
| createRadialGradient        | `x0`, `y0`, `r0`, `x1`, `y1`, `r1`
| createEllipse               | `x`, `y`, `radiusX`, `radiusY`, `rotation`, `startAngle`, `endAngle`, `anticlockwise = false`
| arc                         | `x`, `y`, `radius`, `startAngle`, `endAngle`, `anticlockwise = false`
| arcTo                       | `x1`, `y1`, `x2`, `y2`, `radius`
| quadraticCurveTo            | `cpx`, `cpy`, `x`, `y`
| bezierCurveTo               | `cp1x`, `cp1y`, `cp2x`, `cp2y`, `x`, `y`
| lineTo                      | `x`, `y`
| moveTo                      | `x`, `y`
| setShadowBlur               | `radius`
| setShadowColor              | `color`
| setShadowOffsetX            | `value`
| setShadowOffsetY            | `value`
| setMiterLimit               | `value`
| setPatternQuality           | `pattern`
| setTextDrawingMode          | `mode`
| setAntialiasing             | `antialias`
| setGlobalCompositeOperation | `type`
| setGlobalAlpha              | `value`
| resetShadows                |
| clearCircle                 | `x`, `y`, `radius`, `start = 0`, `angle = Math.PI * 2`
| clearPixels                 | `x = 0`, `y = 0`, `width = this.width`, `height = this.height`
| getLineDash                 |
| isPointInPath               | `x`, `y`, `fillRule`
| isPointInStroke             | `x`, `y`
| toBuffer                    | `options`
| toBufferAsync               |

## Getters

- **lineDash**

## Static

|       Method | Parameters
|-------------:|-----------
| getCanvas    |
