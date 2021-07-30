// eslint-disable-next-line spaced-comment
/// <reference lib="dom" />

/* eslint-disable @typescript-eslint/unified-signatures */
import { BaseCanvas } from './lib/BaseCanvas';

export * from './lib/Filter';
export * from './lib/Util';

export class Canvas extends BaseCanvas<HTMLCanvasElement, CanvasRenderingContext2D, CanvasImageSource> {
	/**
	 * Initialize canvas-constructor in a browser.
	 * @param canvas An HTMLCanvasElement.
	 * <script type="text/javascript" src="canvasconstructor.main.min.js"></script>
	 * <script type="text/javascript">
	 * const canvasElement = document.getElementById('canvas');
	 * new CanvasConstructor.Canvas(canvasElement)
	 *     .setColor('green')
	 *     .printRectangle(10, 10, 100, 100);
	 * </script>
	 */
	public constructor(canvas: HTMLCanvasElement, context?: CanvasRenderingContext2D) {
		super(canvas, context);
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
		return this.canvas.toDataURL(...args);
	}

	/**
	 * <warn>This is for web usage only, node-canvas does not support this</warn>
	 * Render the canvas into a Blob object representing the image contained in the canvas
	 * @param callback A callback function with the resulting `Blob` object as a single argument.
	 * @param type A string indicating the image format. The default type is `image/png`.
	 * @param quality A number between 0 and 1 indicating image quality if the requested type is `image/jpeg` or `image/webp`.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
	 */
	public toBlob(callback: BlobCallback, type?: string, quality?: any): void {
		return this.canvas.toBlob(callback, type, quality);
	}

	/**
	 * <warn>This is for web usage only, node-canvas does not support this</warn>
	 * Render the canvas into a Blob object representing the image contained in the canvas
	 * @param type A string indicating the image format. The default type is `image/png`.
	 * @param quality A number between 0 and 1 indicating image quality if the requested type is `image/jpeg` or `image/webp`.
	 */
	public toBlobAsync(type?: string, quality?: any): Promise<Blob | null> {
		return new Promise<Blob | null>((resolve) => this.canvas.toBlob(resolve, type, quality));
	}
}

export const Image = HTMLImageElement;
export function resolveImage(src: string, options?: Partial<HTMLImageElement>): Promise<HTMLImageElement> {
	return new Promise<HTMLImageElement>((resolve, reject) => {
		// eslint-disable-next-line no-undef
		const image = Object.assign(document.createElement('img'), options) as HTMLImageElement;

		function cleanup() {
			image.onload = null;
			image.onerror = null;
		}

		image.onload = () => {
			cleanup();
			resolve(image);
		};
		image.onerror = () => {
			cleanup();
			reject(new Error(`Failed to load the image "${src}"`));
		};

		image.src = src;
	});
}
