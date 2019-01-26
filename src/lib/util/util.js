// @ts-nocheck
const browser = typeof window !== 'undefined';

const InternalCanvas = (() => {
	if (browser) return typeof HTMLCanvasElement !== 'undefined' ? HTMLCanvasElement : null;
	try {
		return require('canvas-prebuilt');
	} catch (_) {
		return require('canvas');
	}
})();

exports.browser = browser;
exports.InternalCanvas = InternalCanvas;
