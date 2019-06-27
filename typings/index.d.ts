/// <reference types="node" />
/// <reference lib="esnext" />
/// <reference lib="dom" />

declare module 'canvas-constructor' {

	import { Image } from 'canvas';

	export function invert(canvas: Canvas): Canvas;
	export function greyscale(canvas: Canvas): Canvas;
	export function sepia(canvas: Canvas): Canvas;
	export function silhouette(canvas: Canvas): Canvas;
	export function threshold(canvas: Canvas, threshold: number): Canvas;
	export function invertedThreshold(canvas: Canvas, threshold: number): Canvas;
	export function sharpen(canvas: Canvas, amounts: [number, number]): Canvas;
	export function blur(canvas: Canvas, amount: number): Canvas;
	export function convolute(canvas: Canvas, weights: number[]): Canvas;

	type BufferOrImage = Image | Buffer;

	export class Canvas {

		public constructor(dWidth: number, dHeight: number, type?: CanvasType);
		public width: number;
		public height: number;
		public readonly lineDash: number[];
		public canvas: HTMLCanvasElement;
		public context: CanvasRenderingContext2D;

		public addBeveledRect(dx: number, dy: number, dWidth: number, dHeight: number, radius?: BeveledRadiusOptions | number): this;
		public addBeveledImage(bufferOrImage: BufferOrImage, dx: number, dy: number, dWidth: number, dHeight: number, radius?: BeveledRadiusOptions | number, restore?: boolean): this;
		public addCircle(dx: number, dy: number, radius: number): this;
		public addCircularImage(bufferOrImage: BufferOrImage, dx: number, dy: number, radius: number, restore?: boolean): this;
		public addImage(bufferOrImage: BufferOrImage, dx: number, dy: number, options?: AddImageOptions): this;
		public addImage(bufferOrImage: BufferOrImage, dx: number, dy: number, dWidth: number, dHeight: number, options?: AddImageOptions): this;
		public addImage(bufferOrImage: BufferOrImage, sx: number, sy: number, sWidth: number, sHeight: number, dx: number, dy: number, dWidth: number, dHeight: number, options?: AddImageOptions): this;
		public addMultilineText(text: string, dx: number, dy: number): this;
		public addWrappedText(text: string, dx: number, dy: number, wrapWidth: number): this;
		public addRect(dx: number, dy: number, dWidth: number, dHeight: number): this;
		public addResponsiveText(text: string, dx: number, dy: number, maxWidth: number): this;
		public addRoundImage(bufferOrImage: BufferOrImage, dx: number, dy: number, dWidth: number, dHeight: number, radius?: number, restore?: boolean): this;
		public addRoundImage(bufferOrImage: BufferOrImage, dx: number, dy: number, dWidth: number, dHeight: number, restore?: boolean): this;
		public addStrokeRect(dx: number, dy: number, dWidth: number, dHeight: number): this;
		public addStrokeText(text: string, dx: number, dy: number): this;
		public addText(text: string, dx: number, dy: number, maxWidth?: number): this;
		public addTextFont(path: string, family: string | FontFaceType): this;
		public arc(dx: number, dy: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): this;
		public arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): this;
		public arcTo(x1: number, y1: number, x2: number, y2: number, radiusX: number, radiusY: number, rotation: number): this;
		public beginPath(): this;
		public bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, dx: number, dy: number): this;
		public changeCanvasHeight(dHeight: number): this;
		public changeCanvasSize(dWidth?: number, dHeight?: number): this;
		public changeCanvasWidth(dWidth: number): this;
		public clearCircle(dx: number, dy: number, radius: number, start?: number, angle?: number): this;
		public clearPixels(dx?: number, dy?: number, dWidth?: number, dHeight?: number): this;
		public clip(fillRule?: FillRuleType): this;
		public clip(path?: any, fillRule?: FillRuleType): this;
		public closePath(): this;
		public createBeveledClip(dx: number, dy: number, dWidth: number, dHeight: number, radius: BeveledRadiusOptions | number): this;
		public createBeveledPath(dx: number, dy: number, dWidth: number, dHeight: number, radius: BeveledRadiusOptions | number): this;
		public createEllipse(dx: number, dy: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean): this;
		public createLinearGradient(x0: number, y0: number, x1: number, y1: number, steps?: GradientStep[]): CanvasGradient;
		public createPattern(bufferOrImage: BufferOrImage, repetition: PatternRepetition): this;
		public createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number, steps?: GradientStep[]): CanvasGradient;
		public createRectClip(dx: number, dy: number, dWidth: number, dHeight: number): this;
		public createRectPath(dx: number, dy: number, dWidth: number, dHeight: number): this;
		public createRoundClip(dx: number, dy: number, radius: number, start?: number, angle?: number): this;
		public createRoundPath(dx: number, dy: number, radius: number, start?: number, angle?: number): this;
		public fill(fillRule?: FillRuleType): this;
		public getImageData(cb: (data: ImageData, instance: this) => unknown): this;
		public getImageData(dx: number, dy: number, dWidth: number, dHeight: number, cb: (data: ImageData, instance: this) => unknown): this;
		public getImageData(dx?: number, dy?: number, dWidth?: number, dHeight?: number): ImageData;
		public getLineDash(): number[];
		public isPointInPath(dx: number, dy: number, fillRule: FillRuleType): boolean;
		public isPointInStroke(dx: number, dy: number): boolean;
		public lineTo(dx: number, dy: number): this;
		public measureText(text: string): number;
		public measureText(text: string, callback: (metrics: TextMetrics, instance: this) => unknown): this;
		public moveTo(dx: number, dy: number): this;
		public printLinearGradient(x0: number, y0: number, x1: number, y1: number, steps?: GradientStep[]): this;
		public printRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number, steps?: GradientStep[]): this;
		public process<T extends unknown[]>(fn: (instance: this, ...args: T) => unknown, ...args: T): this;
		public putImageData(imageData: ImageData, dx: number, dy: number, dirtyX?: number, dirtyY?: number, dirtyWidth?: number, dirtyHeight?: number): this;
		public quadraticCurveTo(cpx: number, cpy: number, dx: number, dy: number): this;
		public resetShadows(): this;
		public resetTransformation(): this;
		public restore(): this;
		public rotate(angle: number): this;
		public save(): this;
		public scale(dx: number, dy: number): this;
		public setAntialiasing(antialias: AntialiasType): this;
		public setColor(color: string | CanvasGradient): this;
		public setGlobalAlpha(value: number): this;
		public setGlobalCompositeOperation(type: GlobalCompositeOperation): this;
		public setLineCap(value: LineCapValue): this;
		public setLineDash(segments: number[]): this;
		public setLineDashOffset(value: number): this;
		public setLineJoin(value: LineJoinValue): this;
		public setLineWidth(dWidth?: number): this;
		public setMiterLimit(value: number): this;
		public setPatternQuality(pattern: PatternQuality): this;
		public setShadowBlur(radius: number): this;
		public setShadowColor(color: string): this;
		public setShadowOffsetX(value: number): this;
		public setShadowOffsetY(value: number): this;
		public setStroke(color: string): this;
		public setStrokeWidth(dWidth: number): this;
		public setTextAlign(align: TextAlignType): this;
		public setTextBaseline(baseline: TextBaselineType): this;
		public setTextDrawingMode(mode: TextDrawingMode): this;
		public setTextFont(font: string): this;
		public setTextSize(size: number): this;
		public setTransform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): this;
		public stroke(path?: any): this;
		public toBuffer(...args: any[]): Buffer;
		public toBufferAsync(): Promise<Buffer>;
		public toDataURL(type: string, ...args: any[]): string;
		public toDataURLAsync(type: string): Promise<string>;
		public toBlob(callback: (blob: any) => unknown, mimeType?: string, qualityArgument?: number): void;
		public toBlobAsync(mimeType?: string, qualityArgument?: number): Promise<any>;
		public translate(dx: number, dy: number): this;
		public wrapText(text: string, wrapWidth: number, cb: (wrappedText: string, instance: this) => unknown): this;
		public wrapText(text: string, wrapWidth: number): string;

		private _resolveImage(imageOrBuffer: BufferOrImage): Image;

		public static from(canvas: any): Canvas;
		public static readonly internalCanvas: any;
		public static registerFont(path: string, family: string | FontFaceType): typeof Canvas;
	}

	export interface BeveledRadiusOptions {
		tl?: number;
		tr?: number;
		br?: number;
		bl?: number;
	}

	export type CanvasType = 'pdf' | 'svg';

	export type FillRuleType = 'nonzero' | 'evenodd';

	export type LineCapValue = 'butt' | 'round' | 'square';

	export type LineJoinValue = 'bevel' | 'round' | 'miter';

	export interface AddImageOptions {
		radius?: number;
		type?: RoundType;
		restore?: boolean;
	}

	export type AntialiasType = 'default'
		| 'none'
		| 'gray'
		| 'subpixel';

	export type PatternQuality = 'fast'
		| 'good'
		| 'best'
		| 'nearest'
		| 'bilinear';

	export type PatternRepetition = 'repeat'
		| 'repeat-x'
		| 'repeat-y'
		| 'no-repeat';

	export type RoundType = 'round' | 'bevel';

	export type TextAlignType = 'left'
		| 'center'
		| 'right'
		| 'start'
		| 'end';

	export type TextBaselineType = 'alphabetic'
		| 'bottom'
		| 'hanging'
		| 'ideographic'
		| 'middle'
		| 'top';

	export type TextDrawingMode = 'path' | 'glyph';

	export type GlobalCompositeOperation = 'color-burn'
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

	export interface FontFaceType {
		family: string;
		style?: string;
		weight?: string;
	}

	export interface GradientStep {
		position: number;
		color: string;
	}

	export interface CanvasGradient {
		addColorStop: (offset: number, color: string) => unknown;
	}

	class ImageData {
		public constructor(width: number, height: number);
		public constructor(array: Uint8ClampedArray, width: number, height: number);
		public readonly data: Uint8ClampedArray;
		public readonly height: number;
		public readonly width: number;
	}

	class TextMetrics {
		public constructor();
		public readonly actualBoundingBoxAscent: number;
		public readonly actualBoundingBoxDescent: number;
		public readonly actualBoundingBoxLeft: number;
		public readonly actualBoundingBoxRight: number;
		public readonly alphabeticBaseline: number;
		public readonly emHeightAscent: number;
		public readonly emHeightDescent: number;
		public readonly fontBoundingBoxAscent: number;
		public readonly fontBoundingBoxDescent: number;
		public readonly hangingBaseline: number;
		public readonly ideographicBaseline: number;
		public readonly width: number;
	}

}

declare module 'canvas' {

	export class Image {
		public constructor(width?: number, height?: number);
		public src: string | Buffer;
		public onload: () => unknown | null;
		public onerror: (error: Error) => unknown | null;
		public complete: boolean;
		public width: number;
		public height: number;
		public naturalWidth: number;
		public naturalHeight: number;
		public dataMode: number;
		public static MODE_IMAGE: number;
		public static MODE_MIME: number;
	}

}
