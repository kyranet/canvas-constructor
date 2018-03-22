# This package has the following methods:

|                      Method | Parameters
|----------------------------:|-----------
| changeCanvasSize            | `width`, `height`
| changeCanvasWidth           | `width`
| changeCanvasHeight          | `height`
| setTransform                | `a`, `b`, `c`, `d`, `e`, `f`
| resetTransformation         |
| save                        |
| restore                     |
| rotate                      | `angle`
| scale                       | `x`, `y`
| traslate                    | `x`, `y`
| clip                        | `path`, `fillRule`
| fill                        | `path`, `fillRule`
| addRect                     | `x`, `y`, `width`, `height`
| addText                     | `text`, `x`, `y`, `maxWidth`
| addCircle                   | `x`, `y`, `radius`
| addResponsiveText           | `text`, `x`, `y`, `maxWidth`, `options`
| addMultilineText            | `text`, `x`, `y`, `maxWidth`, `lineHeight`
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
| createRoundPath             | `x`, `y`, `radius`, `start = 0`, `angle = Math.PI * 2`
| createRoundClip             | `x`, `y`, `radius`, `start = 0`, `angle = Math.PI * 2`
| createRectPath              | `x`, `y`, `width`, `height`
| createRectClip              | `x`, `y`, `width`, `height`
| createBeveledPath           | `x`, `y`, `width`, `height`, `radius`
| createBeveledClip           | `x`, `y`, `width`, `height`, `radius`
| setColor                    | `color`
| setTextFont                 | `font`
| setTextAlign                | `align`
| setTextBaseline             | `baseline`
| beginPath                   |
| closePath                   |
| createPattern               | `image`, `repetition`
| createLinearGradient        | `x0`, `y0`, `x1`, `y1`, `steps`
| printLinearGradient         | `x0`, `y0`, `x1`, `y1`, `steps`
| createRadialGradient        | `x0`, `y0`, `r0`, `x1`, `y1`, `r1`, `steps`
| printRadialGradient         | `x0`, `y0`, `r0`, `x1`, `y1`, `r1`, `steps`
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
| registerFont | `path`, `family`
