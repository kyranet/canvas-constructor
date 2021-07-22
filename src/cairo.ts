/* eslint-disable @typescript-eslint/unified-signatures */
import {
	Canvas as CairoCanvas,
	CanvasRenderingContext2D as CairoCanvasRenderingContext2D,
	createCanvas,
	Image as CairoImage,
	JpegConfig,
	JPEGStream,
	loadImage,
	PdfConfig,
	PDFStream,
	PngConfig,
	PNGStream,
	registerFont
} from 'canvas';
import { BaseCanvas } from './lib/BaseCanvas';

export type AntiAlias = CairoCanvasRenderingContext2D['antialias'];
export type TextDrawingMode = CairoCanvasRenderingContext2D['textDrawingMode'];
export type PatternQuality = CairoCanvasRenderingContext2D['patternQuality'];

export class Canvas extends BaseCanvas<CairoCanvas, CairoCanvasRenderingContext2D, CairoCanvas | CairoImage> {
	public constructor(width: number, height: number, type?: 'pdf' | 'svg') {
		super(createCanvas(width, height, type));
	}

	/**
	 * Change the pattern quality
	 * @param pattern The pattern quality.
	 */
	public setPatternQuality(pattern: PatternQuality): this {
		this.context.patternQuality = pattern;
		return this;
	}

	/**
	 * Set the text drawing mode. Using glyph is much faster than path for drawing, and when using a PDF context will
	 * embed the text natively, so will be selectable and lower file size. The downside is that cairo does not have any
	 * subpixel precision for glyph, so this will be noticeably lower quality for text positioning in cases such as
	 * rotated text. Also, strokeText in glyph will act the same as fillText, except using the stroke style for the fill.
	 * @param mode The drawing mode.
	 */
	public setTextDrawingMode(mode: TextDrawingMode): this {
		this.context.textDrawingMode = mode;
		return this;
	}

	/**
	 * Set anti-aliasing mode.
	 * @param antialias The antialias mode.
	 */
	public setAntiAliasing(antialias: AntiAlias): this {
		this.context.antialias = antialias;
		return this;
	}

	/**
	 * For PDF canvases, adds another page.
	 * @param width The width of the new PDF page, defaults to the canvas's initial width.
	 * @param height The height of the new PDF page, defaults to the canvas's initial height.
	 */
	public addPage(width?: number, height?: number): this;
	public addPage(...args: readonly any[]): this {
		this.context.addPage(...args);
		return this;
	}

	public createPNGStream(config?: PngConfig): PNGStream;
	public createPNGStream(config: PngConfig | undefined, cb: (stream: PNGStream) => unknown): this;
	public createPNGStream(config?: PngConfig, cb?: (stream: PNGStream) => unknown): PNGStream | this {
		const stream = this.canvas.createPNGStream(config);
		if (cb) {
			cb(stream);
			return this;
		}
		return stream;
	}

	public createJPEGStream(config?: JpegConfig): JPEGStream;
	public createJPEGStream(config: JpegConfig | undefined, cb: (stream: JPEGStream) => unknown): this;
	public createJPEGStream(config?: JpegConfig, cb?: (stream: PNGStream) => unknown): JPEGStream | this {
		const stream = this.canvas.createJPEGStream(config);
		if (cb) {
			cb(stream);
			return this;
		}
		return stream;
	}

	public createPDFStream(config?: PdfConfig): PDFStream;
	public createPDFStream(config: PdfConfig | undefined, cb: (stream: PDFStream) => unknown): this;
	public createPDFStream(config?: PdfConfig, cb?: (stream: PNGStream) => unknown): PDFStream | this {
		const stream = this.canvas.createPDFStream(config);
		if (cb) {
			cb(stream);
			return this;
		}
		return stream;
	}

	/**
	 * For image canvases, encodes the canvas as a PNG. For PDF canvases, encodes the canvas as a PDF. For SVG canvases,
	 * encodes the canvas as an SVG.
	 */
	public toBuffer(): Buffer;
	/**
	 * Encodes the canvas as a PNG.
	 * @param mimeType the standard MIME type for the image format to return.
	 * @param config The render configuration.
	 */
	public toBuffer(mimeType: 'image/png', config?: PngConfig): Buffer;
	/**
	 * Encodes the canvas as a JPG.
	 * @param mimeType the standard MIME type for the image format to return.
	 * @param config The render configuration.
	 */
	public toBuffer(mimeType: 'image/jpeg', config?: JpegConfig): Buffer;
	/**
	 * Encodes the canvas as a PDF.
	 * @param mimeType the standard MIME type for the image format to return.
	 * @param config The render configuration.
	 */
	public toBuffer(mimeType: 'application/pdf', config?: PdfConfig): Buffer;
	/**
	 * Returns the unencoded pixel data, top-to-bottom. On little-endian (most) systems, the array will be ordered BGRA;
	 * on big-endian systems, it will be ARGB.
	 * @param mimeType the standard MIME type for the image format to return.
	 */
	public toBuffer(mimeType: 'raw'): Buffer;
	public toBuffer(...args: readonly any[]): Buffer {
		// @ts-expect-error: Complains about invalid overload (expects more than 0 overloads).
		return this.canvas.toBuffer(...args);
	}

	/**
	 * For image canvases, encodes the canvas as a PNG. For PDF canvases, encodes the canvas as a PDF. For SVG canvases,
	 * encodes the canvas as an SVG.
	 */
	public toBufferAsync(): Promise<Buffer>;
	/**
	 * Encodes the canvas as a PNG.
	 * @param mimeType the standard MIME type for the image format to return.
	 * @param config The render configuration.
	 */
	public toBufferAsync(mimeType: 'image/png', config?: PngConfig): Promise<Buffer>;
	/**
	 * Encodes the canvas as a JPG.
	 * @param mimeType the standard MIME type for the image format to return.
	 * @param config The render configuration.
	 */
	public toBufferAsync(mimeType: 'image/jpeg', config?: JpegConfig): Promise<Buffer>;
	/**
	 * Encodes the canvas as a PDF.
	 * @param mimeType the standard MIME type for the image format to return.
	 * @param config The render configuration.
	 */
	public toBufferAsync(mimeType: 'application/pdf', config?: PdfConfig): Promise<Buffer>;
	public toBufferAsync(...args: readonly any[]): Promise<Buffer> {
		return new Promise<Buffer>((resolve, reject) =>
			// @ts-expect-error: Complains about invalid overload (expects more than 0 overloads).
			this.canvas.toBuffer((error: Error | null, buffer: Buffer | null): void => {
				if (error) reject(error);
				else resolve(buffer!);
			}, ...args)
		);
	}

	/**
	 * Render the canvas into a PNG Data URL.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
	 */
	public toDataURL(): string;
	/**
	 * Render the canvas into a PNG Data URL.
	 * @param type the standard MIME type for the image format to return.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
	 */
	public toDataURL(mimeType: 'image/png'): string;
	/**
	 * Render the canvas into a JPEG Data URL.
	 * @param type the standard MIME type for the image format to return.
	 * @param quality The quality for the JPEG.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
	 */
	public toDataURL(mimeType: 'image/jpeg', quality?: number): string;
	public toDataURL(...args: readonly any[]): string {
		// @ts-expect-error: Complains about invalid overload (expects more than 0 overloads).
		return this.canvas.toDataURL(...args);
	}

	/**
	 * Render the canvas into a PNG Data URL.
	 * @see https://github.com/Automattic/node-canvas#canvastodataurl-sync-and-async
	 */
	public toDataURLAsync(): Promise<string>;
	/**
	 * Render the canvas into a PNG Data URL.
	 * @param type the standard MIME type for the image format to return.
	 * @see https://github.com/Automattic/node-canvas#canvastodataurl-sync-and-async
	 */
	public toDataURLAsync(mimeType: 'image/png'): Promise<string>;
	/**
	 * Render the canvas into a JPEG Data URL.
	 * @param type the standard MIME type for the image format to return.
	 * @param quality The quality for the JPEG.
	 * @see https://github.com/Automattic/node-canvas#canvastodataurl-sync-and-async
	 */
	public toDataURLAsync(mimeType: 'image/jpeg'): Promise<string>;
	/**
	 * Render the canvas into a JPEG Data URL.
	 * @param type the standard MIME type for the image format to return.
	 * @param config The render configuration.
	 * @see https://github.com/Automattic/node-canvas#canvastodataurl-sync-and-async
	 */
	public toDataURLAsync(mimeType: 'image/jpeg', config: import('canvas').JpegConfig): Promise<string>;
	/**
	 * Render the canvas into a JPEG Data URL.
	 * @param type the standard MIME type for the image format to return.
	 * @param quality The quality for the JPEG.
	 * @see https://github.com/Automattic/node-canvas#canvastodataurl-sync-and-async
	 */
	public toDataURLAsync(mimeType: 'image/jpeg', quality: number): Promise<string>;
	public toDataURLAsync(...args: readonly any[]): Promise<string> {
		return new Promise<string>((resolve, reject) =>
			// @ts-expect-error: Complains about invalid overload (expects more than 0 overloads).
			this.canvas.toDataURL(...args, (error, url) => {
				if (error) reject(error);
				else resolve(url);
			})
		);
	}
}

export { BeveledRadiusOptions, GlobalCompositeOperation, GradientStop, PatternRepeat, PrintCircularOptions } from './lib/BaseCanvas';
export * from './lib/Filter';
export * from './lib/Util';
export { registerFont, CairoImage as Image };
export const resolveImage = loadImage;
