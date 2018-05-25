declare module 'canvas-constructor' {

    export function invert(canvas: Canvas): Canvas;
    export function greyscale(canvas: Canvas): Canvas;
    export function sepia(canvas: Canvas): Canvas;
    export function silhouette(canvas: Canvas): Canvas;
    export function threshold(canvas: Canvas, threshold: number): Canvas;
    export function invertedThreshold(canvas: Canvas, threshold: number): Canvas;
    export function sharpen(canvas: Canvas, amounts: [number, number]): Canvas;
    export function blur(canvas: Canvas, amount: number): Canvas;
    export function convolute(canvas: Canvas, weights: number[]): Canvas;

    export class Canvas {

        public constructor(width: number, height: number, type?: CanvasType);
        public canvas: HTMLCanvasElement;
        public context: CanvasRenderingContext2D;
        public width: number;
        public heigth: number;
        public readonly lineDash: number[];

        public changeCanvasSize(width?: number, height?: number): this;
        public changeCanvasWidth(width: number): this;
        public changeCanvasHeigth(heigth: number): this;
        public save(): this;
        public restore(): this;
        public rotate(angle: number): this;
        public scale(x: number, y: number): this;
        public translate(x: number, y: number): this;
        public clip(path?: any, fillRule?: fillRuleType): this;
        public clip(fillRule?: fillRuleType): this;
        public setTransform(a: number, b: number, c: number, d: number, e: number, f: number): this;
        public resetTransformation(): this;
        public getImageData(x?: number, y?: number, width?: number, height?: number): ImageData;
        public getImageData(x?: number, y?: number, width?: number, height?: number, cb: (data: ImageData, canvas: this) => void): this;
        public getImageData(cb: (data: ImageData, canvas: this) => void): this;
        public putImageData(imageData: ImageData, dx: number, dy: number, dirtyX?: number, dirtyY?: number, dirtyWidth?: number, dirtyHeight?: number): this;
        public fill(path: any, fillRule?: fillRuleType): this;
        public addText(text: string, x: number, y: number, maxWidth?: number): this;
        public addResponsiveText(text: string, x: number, y: number, maxWidth: number): this;
        public addMultilineText(text: string, x: number, y: number, maxWidth: number, lineHeight: number): this;
        public stroke(path?: any): this;
        public addStrokeRect(x: number, y: number, width: number, height: number): this;
        public addStrokeText(text: string, x: number, y: number): this;
        public measureText(text: string, callback?: Function): this|number;
        public setStroke(color: string): this;
        public setLineWidth(width?: number): this;
        public setStrokeWidth(width: number): this;
        public setLineDashOffset(value: number): this;
        public setLineJoin(value: lineJoinValue): this;
        public setLineCap(value: lineCapValue): this;
        public setLineDash(segments: number[]): this;
        public addImage(buffer: Image | Buffer, x: number, y: number, width: number, height: number, options?: addImageOptions): this;
        public addRoundImage(buffer: Image | Buffer, x: number, y: number, width: number, height: number, radius?: number): this;
        public addBevelImage(buffer: Image | Buffer, x: number, y: number, width: number, height: number, radius?: number): this;
        public addRect(x: number, y: number, width: number, height: number): this;
        public addBeveledRect(x: number, y: number, width: number, height: number, radius?: number): this;
        public addCircle(x: number, y: number, radius: number): this;
        public createRoundPath(x: number, y: number, radius: number, start?: number, angle?: number): this;
        public createRoundClip(x: number, y: number, radius: number, start?: number, angle?: number): this;
        public createRectPath(x: number, y: number, width: number, height: number): this;
        public createRectClip(x: number, y: number, width: number, height: number): this;
        public createBeveledPath(x: number, y: number, width: number, height: number, radius: number): this;
        public createBeveledClip(x: number, y: number, width: number, height: number, radius: number): this;
        public setColor(color: string|CanvasGradient): this;
        public setTextFont(font: string): this;
        public setTextAlign(align: textAlignType): this;
        public setTextBaseline(baseline: textBaselineType): this;
        public beginPath(): this;
        public closePath(): this;
        public createPattern(image: Image, repetition: patternRepetition): this;
        public createLinearGradient(x0: number, y0: number, x1: number, y1: number, steps?: GradientStep[]): CanvasGradient;
        public printLinearGradient(x0: number, y0: number, x1: number, y1: number, steps?: GradientStep[]): this;
        public createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number, steps?: GradientStep[]): CanvasGradient;
        public printRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number, steps?: GradientStep[]): this;
        public createEllipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean): this;
        public arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): this;
        public arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): this;
        public quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): this;
        public bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): this;
        public lineTo(x: number, y: number): this;
        public moveTo(x: number, y: number): this;
        public setShadowBlur(radius: number): this;
        public setShadowColor(color: string): this;
        public setShadowOffsetX(value: number): this;
        public setShadowOffsetY(value: number): this;
        public setMiterLimit(value: number): this;
        public setPatternQuality(pattern: patternQuality): this;
        public setTextDrawingMode(mode: textDrawingMode): this;
        public setAntialiasing(antialias: antialiasType): this;
        public setGlobalCompositeOperation(type: globalCompositeOperation): this;
        public setGlobalAlpha(value: number): this;
        public resetShadows(): this;
        public clearCircle(x: number, y: number, radius: number, start?: number, angle?: number): this;
        public clearPixels(x?: number, y?: number, width?: number, height?: number): this;
        public getLineDash(): number[];
        public isPointInPath(x: number, y: number, fillRule: fillRuleType): boolean;
        public isPointInStroke(x: number, y: number): boolean;
        public addTextFont(path: string, family: string | fontFaceType): this;

        public process(fn: (canvas: this) => void): this;

        public toBuffer(...args?: any[]): Buffer;
        public toBufferAsync(): Promise<Buffer>;
        public toDataURL(type: string, ...args: any[]): string;
        public toDataURLAsync(type: string): Promise<string>;

        private _resolveImage(imageOrBuffer: Image | Buffer): Image;

        public static getCanvas(): NodeCanvas;
        public static registerFont(path: string, family: string | fontFaceType);

    }

    export type CanvasType = 'pdf'
        | 'svg';
    export type fillRuleType = 'nonzero'
        | 'evenodd';
    export type lineCapValue = 'butt'
        | 'round'
        | 'square';
    export type lineJoinValue = 'bevel'
        | 'round'
        | 'miter';
    export type addImageOptions = {
        radius?: number;
        type?: roundType;
        restore?: boolean;
    };

    export type antialiasType = 'default'
        | 'none'
        | 'gray'
        | 'subpixel';

    export type patternQuality = 'fast'
        | 'good'
        | 'best'
        | 'nearest'
        | 'bilinear';

    export type patternRepetition = 'repeat'
        | 'repeat-x'
        | 'repeat-y'
        | 'no-repeat';

    export type roundType = 'round'
        | 'bevel';

    export type textAlignType = 'left'
        | 'center'
        | 'right'
        | 'start'
        | 'end';

    export type textBaselineType = 'alphabetic'
        | 'bottom'
        | 'hanging'
        | 'ideographic'
        | 'middle'
        | 'top';

    export type textDrawingMode = 'path'
        | 'glyph';

    export type globalCompositeOperation = 'color-burn'
        | 'color-dodge'
        | 'color'
        | 'copy'
        | 'darken'
        | 'destination-atop'
        | 'destination-in'
        | 'destination-out'
        | 'destination-over'
        | 'difference'
        | 'exclusion'
        | 'hard-light'
        | 'hsl-color'
        | 'hsl-hue'
        | 'hsl-luminosity'
        | 'hsl-saturation'
        | 'hue'
        | 'lighten'
        | 'lighter'
        | 'luminosity'
        | 'multiply'
        | 'overlay'
        | 'saturation'
        | 'screen'
        | 'soft-light'
        | 'source-atop'
        | 'source-in'
        | 'source-out'
        | 'source-over'
        | 'xor';

    export type fontFaceType = {
        family: string;
        style?: string;
        weight?: string;
    };

    export type GradientStep = {
        position: number;
        color: string;
    };

    export type CanvasGradient = {
        addColorStop: (offset: number, color: string) => void;
    };

    // node-canvas related typings.
    export type Image = (width?: number, height?: number) => HTMLImageElement;
    export type NodeCanvas = {
        backends: Object;
        cairoVersion: string;
        Canvas: NodeCanvas;
        Context2d: typeof CanvasRenderingContext2D;
        createCanvas: (width: number, height: number, type: CanvasType) => any;
        createImageData: (array: any[], width: number, heigth: number) => any;
        freetypeVersion: string;
        gifVersion: string;
        Image: typeof Image;
        ImageData: typeof ImageData;
        JPEGStream: CanvasJPEGStream;
        jpegVersion: string;
        loadImage: (src: any) => Promise<any>;
        parseFont: (str: string) => ParsedFont;
        PDFStream: CanvasPDFStream;
        PNGStream: CanvasPNGStream;
        registerFont: (src: string, fontFace: fontFaceType) => any;
        version: string;
    };

    export class CanvasJPEGStream {

        public constructor(canvas: any, options: any);
        public canvas: any;
        public options: any;

        private _read(): void;

    }

    export class CanvasPDFStream {

        public constructor(canvas: any);
        public canvas: any;

        private _read(): void;

    }

    export class CanvasPNGStream {

        public constructor(canvas: any, options: any);
        public canvas: any;
        public options: any;

        private _read(): void;

    }

    export type ParsedFont = {
        weight: number;
        style: string;
        size: number;
        unit: string;
        family: string;
    };

}
