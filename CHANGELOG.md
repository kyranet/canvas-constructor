# Changelog

All notable changes to this project will be documented in this file.

# [7.0.1](https://github.com/kyranet/canvas-constructor/compare/v7.0.0...v7.0.1) - (2023-05-19)

## 🐛 Bug Fixes

- Update tslib dependency ([0ad6c4c](https://github.com/kyranet/canvas-constructor/commit/0ad6c4ce9e176ebc2113fe2f5bee4280300af479))
- **browser:** Access from `globalThis` (#560) ([a83af48](https://github.com/kyranet/canvas-constructor/commit/a83af481b5222ab1a1f155a1bfb71d8e971f56e3))
- Update dependencies (#553) ([f043125](https://github.com/kyranet/canvas-constructor/commit/f04312550bee4be1b43b0ff4ee1b969293dc590c))

## 📝 Documentation

- Fix some issues in the README (#524) ([505658d](https://github.com/kyranet/canvas-constructor/commit/505658d1203a05a4af2100fdb4c479e8f92e31ed))
- Change name ([02c7910](https://github.com/kyranet/canvas-constructor/commit/02c7910a6117b7fdb2f0e67c979c10af7e5d3ee0))

# [7.0.0](https://github.com/kyranet/canvas-constructor/compare/v6.0.2...v7.0.0) - (2022-09-01)

## 🏠 Refactor

- Re-export async `loadImage` from `@napi-rs/canvas` (#516) ([c5ad068](https://github.com/kyranet/canvas-constructor/commit/c5ad0689a37a0b5920b14d0c579dd88844444051))
  - 💥 **BREAKING CHANGE:** When using @napi/rs loader the `loadImage` function is now an async function returning a `Promise`

# [6.0.2](https://github.com/kyranet/canvas-constructor/compare/v6.0.1...v6.0.2) - (2022-07-12)

## 🐛 Bug Fixes

- Export loadFont for /cairo (#497) ([74d3e81](https://github.com/kyranet/canvas-constructor/commit/74d3e8112e0b2aab55ea086975879bb3b968c73c))

# [6.0.1](https://github.com/kyranet/canvas-constructor/compare/v6.0.0...v6.0.1) - (2022-06-06)

## 🐛 Bug Fixes

- Re-add export files (#486) ([d27a04a](https://github.com/kyranet/canvas-constructor/commit/d27a04ae3f19fac8ed9e364f8dbcc28b16368ead))
- Resolved infinite recursion in `resetTransform` ([352a24e](https://github.com/kyranet/canvas-constructor/commit/352a24e203c028e13e8186623526d83b81de4191))
- **browser:** Export `loadImage` rather than `resolveImage` ([ef0be31](https://github.com/kyranet/canvas-constructor/commit/ef0be313bf9e69fe99c5b1c882f6f145963a2354))

## 📝 Documentation

- Include napi-rs to typedoc entry points ([fad3d6e](https://github.com/kyranet/canvas-constructor/commit/fad3d6e56328f478dad963beb214d20b859a8c3a))
- Mention `@napi-rs/canvas` ([3ddf9f6](https://github.com/kyranet/canvas-constructor/commit/3ddf9f64464430f42e3af10c026f4c45d0fd6a44))

# [6.0.0](https://github.com/kyranet/canvas-constructor/compare/v5.0.2...v6.0.0) - (2022-06-01)

## 🏠 Refactor

- Renamed `registerFont` to `loadFont` ([0019ee7](https://github.com/kyranet/canvas-constructor/commit/0019ee791ea0b3b3367cc770a93d6b3773a70339))
- Renamed `resolveImage` to `loadImage` ([a0db7bb](https://github.com/kyranet/canvas-constructor/commit/a0db7bba65d3c04329f977848619f17f1d31b2aa))

## 📝 Documentation

- Add `@note`s defining which methods are engine-specific ([54dcb08](https://github.com/kyranet/canvas-constructor/commit/54dcb08ca39850f2a52238ec1352133a0e2812e9))

## 🚀 Features

- **skia:** Added `svgAsync()` ([ff40a27](https://github.com/kyranet/canvas-constructor/commit/ff40a27bad5ec5fd5a30870d7561e074fc93ac94))
- **skia:** Added `pngAsync()` ([7b78a77](https://github.com/kyranet/canvas-constructor/commit/7b78a774ec270922e0e2f17cfce634167d84ddc7))
- **skia:** Added `pdfAsync()` ([dbe42de](https://github.com/kyranet/canvas-constructor/commit/dbe42dea167a691c88dd8a513c42dc43edcfc8d2))
- **skia:** Added `jpegAsync()` ([8eed23c](https://github.com/kyranet/canvas-constructor/commit/8eed23c90abd73f039dadf2d72ffef190cca7d29))
- **cairo:** Added `pngAsync()` ([1b83681](https://github.com/kyranet/canvas-constructor/commit/1b836816f92a208323c7e1c6cbf5bba8ab703b64))
- **cairo:** Added `png()` ([1f6d30f](https://github.com/kyranet/canvas-constructor/commit/1f6d30f9cf85f231a2931415c7dda4b585c2987f))
- **cairo:** Added `pdfAsync()` ([d799c0e](https://github.com/kyranet/canvas-constructor/commit/d799c0e5c6b2f858b17f5fcbe46dfdc7ed2307e8))
- **cairo:** Added `pdf()` ([f6759c4](https://github.com/kyranet/canvas-constructor/commit/f6759c4a16229c5d4a37d2dc9b0fe21bd0da108d))
- **cairo:** Added `jpegAsync()` ([0073dce](https://github.com/kyranet/canvas-constructor/commit/0073dce190615edc42c11af1a8b66e4748ea4632))
- **cairo:** Added `jpeg()` ([6f023f9](https://github.com/kyranet/canvas-constructor/commit/6f023f9bb9fd5484ebd6c14f9a2e156582fed5e5))
- Added `printConicStrokeGradient()` ([955f8ba](https://github.com/kyranet/canvas-constructor/commit/955f8baaf0877b1cb2ac08357d1bcc7594d06e3e))
- Added `printConicColorGradient()` ([e50a13e](https://github.com/kyranet/canvas-constructor/commit/e50a13e65943514f4139d9e1266a43b9948a87ba))
- Added `createConicGradient()` ([90ccf01](https://github.com/kyranet/canvas-constructor/commit/90ccf014a45b2762ff86aa32f6b12ec4e75a1b76))
- Added `createImageData()` ([1783a3a](https://github.com/kyranet/canvas-constructor/commit/1783a3aaf9c9a01e45e9fd401aa705ba8782dca8))
- Added `/napi-rs` engine (#480) ([22047df](https://github.com/kyranet/canvas-constructor/commit/22047df59ffc116c317c433c27c59eb91e1f39c3))

   ### 💥 Breaking Changes:
   - removed `cb` parameter in `getImageData()`
   - removed `cb` parameter in `measureText()`
   - removed `cb` parameter in `createPattern()`
   - removed `cb` parameter in `wrapText()`
   - renamed `createJPEGStream()` to `jpegStream()`
   - renamed `createPDFStream()` to `pdfStream()`
   - renamed `createPNGStream()` to `pngStream()`
   - renamed `setAntiAliasing()` to `setAntialiasMode()`
   - `jpg()` now returns a synchronous response
   - `pdf()` now returns a synchronous response
   - `png()` now returns a synchronous response
   - `svg()` now returns a synchronous response
   - removed `cb` parameter in `getFontVariant()`
   - removed `cb` parameter in `getTextTracking()`
   - removed `cb` parameter in `getTextWrap()`
   - renamed `getPages()` to `get pages`
   - renamed `jpg()` to `jpeg()`
   - renamed `newPages()` to `addPage()`


### [5.0.2](https://github.com/kyranet/canvas-constructor/compare/v5.0.1...v5.0.2) (2022-01-22)

### Bug Fixes

-   **deps:** ensure compatibility with latest skia-canvas ([#439](https://github.com/kyranet/canvas-constructor/issues/439)) ([481ba6f](https://github.com/kyranet/canvas-constructor/commit/481ba6fbd843d8fe270219a81ed4691d5af867ce))
-   restore state in `printResponsiveText` ([#388](https://github.com/kyranet/canvas-constructor/issues/388)) ([08c3418](https://github.com/kyranet/canvas-constructor/commit/08c341826eb420edd4d1c84459d827f7b30abeab))

### [5.0.1](https://github.com/kyranet/canvas-constructor/compare/v5.0.0...v5.0.1) (2021-07-30)

### Bug Fixes

-   include DOM types ([#378](https://github.com/kyranet/canvas-constructor/issues/378)) ([3414108](https://github.com/kyranet/canvas-constructor/commit/341410863d0c35af5dc9c288775e546cda670bcb))
-   write export files for custom loaders ([#377](https://github.com/kyranet/canvas-constructor/issues/377)) ([be298b2](https://github.com/kyranet/canvas-constructor/commit/be298b22075316ca61bef6d3cadcc5df6c0eda06))

## [5.0.0](https://github.com/kyranet/canvas-constructor/compare/v4.1.0...v5.0.0) (2021-07-27)

### ⚠ BREAKING CHANGES

-   Removed main export at `canvas-constructor`.
-   Dropped Node 8, 10, and 12 support

-   specify breaking changes ([3a2aece](https://github.com/kyranet/canvas-constructor/commit/3a2aece1a1e844b7edfd316da00a0162f88a1b35))

## 4.1.0

### Added

-   Added `options.fit` in `Canvas#printCircularImage`.

## 4.0.0

### Added

-   Added `hex` util to format hexadecimal strings into a valid color string.
-   Added `rgb` util to format the parameters into a valid color string.
-   Added `rgba` util to format the parameters into a valid color string.
-   Added `hsl` util to format the parameters into a valid color string.
-   Added `hsla` util to format the parameters into a valid color string.
-   Added `color` util to provide type safety when picking colors.
-   Added `Canvas#createEllipseClip`.
-   Added better types for `Canvas#process`.
-   Added better types for `Canvas#toBuffer{Async}`.
-   Added better types for `Canvas#toDataURL{Async}`.
-   Added better types for `Canvas#toBlob{Async}`.
-   Added ESM support.
-   Added treeshaking support for web bundles.
-   Added lots of documentation and examples.

### Changed

-   Renamed `createRectClip` to `createRectangleClip`.
-   Renamed `clearPixels` to `clearRectangle`.
-   Renamed `addRect` to `printRectangle`.
-   Renamed `addStrokeRect` to `printStrokeRectangle`.
-   Renamed `addCircle` to `printCircle`.
-   Renamed `addText` to `printText`.
-   Renamed `addStrokeText` to `printStrokeText`.
-   Renamed `addWrappedText` to `printWrappedText`.
-   Renamed `addResponsiveText` to `printResponsiveText`.
-   Renamed `addBeveledRect` to `printRoundedRectangle`.
-   Renamed `addCircularImage` to `printCircularImage`.
-   Renamed `addBeveledImage` to `printRoundedImage`.
-   Renamed `addPattern` to `printPattern`.
-   Renamed `createRoundPath` to `createCircularPath`.
-   Renamed `createRoundClip` to `createCircularClip`.
-   Renamed `createRectPath` to `createRectanglePath`.
-   Renamed `createRectClip` to `createRectangleClip`.
-   Renamed `createBeveledPath` to `createRoundedPath`.
-   Renamed `createBeveledClip` to `createRoundedClip`.
-   Renamed `addLinearColorGradient` to `printLinearColorGradient`.
-   Renamed `addLinearStrokeGradient` to `printLinearStrokeGradient`.
-   Renamed `addRadialColorGradient` to `printRadialColorGradient`.
-   Renamed `addRadialStrokeGradient` to `printRadialStrokeGradient`.
-   Renamed `createEllipse` to `createEllipsePath`.
-   Renamed `addImage` to `printImage`.
-   Modified `addImage` to take `Image | Canvas` instead of `Buffer | Image`, you must use `loadImage`.
-   Modified `addCircularImage` to take `Image | Canvas` instead of `Buffer | Image`, you must use `loadImage`.
-   Modified `addBeveledImage` to take `Image | Canvas` instead of `Buffer | Image`, you must use `loadImage`.
-   Modified `addPattern` to take `Image | Canvas` instead of `Buffer | Image`, you must use `loadImage`.
-   Modified `createPattern` to take `Image | Canvas` instead of `Buffer | Image`, you must use `loadImage`.
-   Modified `printPattern` to take `Image | Canvas` instead of `Buffer | Image`, you must use `loadImage`.
-   Changed website, we are now using a typedoc generated one rather than the half-broken one.
-   Changed bundler from webpack to rollup.
-   Rewritten the library to strict TypeScript.

### Fixed

-   Browser support is now fully operational.
-   Fixed typing conflicts with `canvas`, since they added typings recently.
-   Fixed interface callback types, the `this` parameter is now typed.

### Removed

-   Removed options in `addImage`. Use `printCircularImage` or `printRoundedImage` instead.
-   Removed `addRoundImage`. Use `printCircularImage` instead, beware that (x, y) is the centre and not top-left.
-   Removed `registerFont` from `Canvas`, use the export from `canvas` instead.
-   Removed support for `canvas-prebuilt`. `canvas` already comes with them.

## 3.0.3

### Fixed

-   Resolved security vulnerability by upgrading to `handlebars@4.1.2`.

## 3.0.2

### Fixed

-   `Canvas#resetShadows()` not clearing shadows.

## 3.0.1

### Fixed

-   Publish not running the browser build, thus missing it sometimes or deploying old versions.

## 3.0.0

### Added

-   Added `Canvas#wrapText()`.

### Changed

-   Make `Canvas#addMultilineText()` not wrap lines.
-   Renamed `Canvas.getCanvas()` to `Canvas.internalCanvas`.
-   Renamed `Canvas.fromCanvas()` to `Canvas.from()`.
-   Changed the word wrap algorithm to respect newlines while also being slightly faster.
-   Changed callback return types in typings from `void` to `unknown` for strict rules to allow return.

## 2.1.1

### Fixed

-   Webpack builds in unpkg.

## 2.1.0

### Added

-   `Canvas#{toBlob,toBlobAsync}` for browser support.
-   `Canvas.fromCanvas()` for browser support (this is a must in browsers as you can't construct `HTMLCanvasElement`).
-   Examples for usage in web.

### Fixed

-   Webpack builds.
-   Guides being stale.

## 2.0.0

### Changed

-   The `restore` argument now default to `true` instead of `false`, the previous default kept functionality from pre-releases and 1.x but I couldn't change it under a minor version, only with a major one. But now I decided it's enough, and made it default to the intuitive, and very often most-wanted choice: `true`.

### Fixed

-   Fixed `addCircularImage()` adding the circular clip in the wrong center.
-   Fixed text not rendering in `canvas@2.x`.
-   Typings.

### Removed

-   `addBevelImage` has been removed. As per the deprecation added over 2 months ago, it has been renamed to `addBeveledImage`.

## 1.1.2

### Fixed

-   Fixed `addCircularImage()` adding the circular clip in the wrong center.

## 1.1.1

### Fixed

-   Fixed `addCircularImage()` not adding a circular clip before adding the image.

## 1.1.0

### Added

-   Added `toDataURL()` and `toDataURLAsync()`.
-   Added `addCircularImage()`, similar to `addCircle()`.
-   Added `setTextSize()`, similar to `setTextFont()` but changes the font size only (not the font itself).
-   Added all overloads for `addImage()`.
-   (Documentation) Added MDN link for `addImage()`.

### Changed

-   `createBeveledPath()` now accepts an object type `BeveledRadiusOptions`.
-   Renamed `addBevelImage()` to `addBeveledImage()` to prevent confusions (naming inconsistency). The old method is still available but it's deprecated and will be removed in the next major update.

## 1.0.0

### Added

-   Support for canvas 1.6.x and 2.x.
-   `addTextFont()` for canvas 1.6.x compatibility.

### Removed

-   `METHODS.md` in favor of the new docs.

## 0.4.0

### Added

-   `addMultilineText()` to print texts that are too long to be displayed.

## 0.3.1

### Added

-   Both `printLinearGradient()` and `printRadialGradient()` to have chainable methods.
-   Added a new parameter for both `createLinearGradient()` and `createRadialGradient()`, steps, which is typeof `GradientStep[]`.

### Changed

-   Both `createLinearGradient()` and `createRadialGradient()` are not longer chainable, they'll return `CanvasGradient` instead.

## 0.3.0

### Added

-   **Typings**. This package will also work in TypeScript.
-   `createBeveledPath()` same usage as `createBeveledClip()`, but does not create clips (so you can use shadows and fill to colorize it).
-   `createRoundPath()` same usage as `createRoundClip()`, but does not create clips (so you can use shadows and fill to colorize it).
-   `clip()` (how come this was not implemented?).

### Changed

-   **Canvas** has been moved from dependency to **peer dependency**.

## 0.2.0

### Changed

-   `addResponsiveText()` changed the parser to be passive, faster, and more accurate.

### Removed

-   Two private methods that were being used in `setTextFont()`.

## 0.1.7

### Added

-   `changeCanvasSize()` to change the canvas' width/height.
-   `changeCanvasWidth()` to change the canvas' width.
-   `changeCanvasHeigth()` to change the canvas' height.

### Removed

-   `registerTextFont()` as canvas-constructor relies on `canvas@1.6.6`, this method is useless.

## 0.1.6

### Added

-   `setStrokeWidth()` to change stroke/line's width.
-   `beginPath()` to start making paths.
-   `closePath()` to start closing paths.
-   `createLinearGradient()` to create linear gradients.
-   `createRadialGradient()` to create radial gradients.
-   `arc()` and `arcTo()`, to create arcs.
-   `quadraticCurveTo()` to create quadratic Bèzier curves.
-   `bezierCurveTo()` to create cubic Bèzier curves.
-   `lineTo()` to connect lines.
-   `moveTo()` to move the starting point of a path to any (x, y) coordinates.

### Changed

-   Added default `'#000000'` for the `setStroke()` method.
-   `addImage()` removed `this.save()` and `this.restore()` so users can use their own paths.

### Fixed

-   Examples for `measureText()`.

## 0.1.5

### Added

-   `save()` To save the current state onto a stack.
-   `rotate()` To add a rotation to the transformation matrix.
-   `scale()` To perform scaling transformations.
-   `traslate()` To perform translating transformations.
-   `fill()` To fill the current/given path.
-   `stroke()` To stroke the current/given path.
-   `addStrokeText()` To add stroked text.
-   `measureText()` To measure in pixels a text. Be **careful**, if you do not provide a callback (second argument), this method will return an Integer value instead of being chainable.
-   `setTextBaseline()` To set the text's baseline.
-   `setShadowOffsetX()` To set the shadow offset for the axis X.
-   `setShadowOffsetY()` To set the shadow offset for the axis Y.
-   `setGlobalAlpha()` To set the global alpha value for the next elements.
-   `clearCircle()` To clear the pixels with a circle shape.
-   `clearPixels()` To clear the pixels with a rectangle shape. (Usage is
    identical to `addRect()`).

### Changed

-   **Breaking** | `fillRect()` -> `addRect()` | To keep consistency.
-   `addText()` now accepts a third argument: `maxWidth`.
-   `addImage()` now saves and restores the context.

### Fixed

-   `addRoundImage()` now points to `addImage()` with the correct arguments.
-   `addBevelImage()` now points to `addImage()` with the correct arguments.

## 0.1.4

### Changed

-   Updated `README.md`.

## 0.1.3

### Fixed

-   Fix a weird bug with the `in` operator in `addImage()`

## 0.1.0

### Added

-   Added `addFont()` method for retro-compatibility with old versions of Canvas.
    (Thanks to [York](https://github.com/YorkAARGH) in
    [PR#1](https://github.com/kyranet/canvas-constructor/pull/1))

### Changed

-   Better `README.md`.

### Fixed

-   Bugs in the `options` argument for `addImage()`.
