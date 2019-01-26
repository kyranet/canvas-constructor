// @ts-nocheck
exports.browser = typeof window !== 'undefined';

exports.InternalCanvas = (() => {
	if (exports.browser) return typeof HTMLCanvasElement !== 'undefined' ? HTMLCanvasElement : null;
	try {
		return require('canvas-prebuilt');
	} catch (_) {
		return require('canvas');
	}
})();

exports.getFontHeight = (() => {
	// node-canvas has its own font parser
	if (!exports.browser && 'parseFont' in exports.InternalCanvas) return (font) => exports.InternalCanvas.parseFont(font).size;

	// Load polyfill
	const REGEX_SIZE = /([\d.]+)(px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q)/i;
	const CACHE = new Map();

	return (font) => {
		// If it was already parsed, do not parse again
		const previous = CACHE.get(font);
		if (previous) return previous;

		// Test for required properties first, return null if the text is invalid
		const sizeFamily = REGEX_SIZE.exec(font);
		if (!sizeFamily) return null;

		let size = Number(sizeFamily[1]);
		const unit = sizeFamily[2];

		switch (unit) {
			case 'pt':
				size /= 0.75;
				break;
			case 'pc':
				size *= 16;
				break;
			case 'in':
				size *= 96;
				break;
			case 'cm':
				size *= 96.0 / 2.54;
				break;
			case 'mm':
				size *= 96.0 / 25.4;
				break;
			case 'em':
			case 'rem':
				size *= 16 / 0.75;
				break;
			case 'q':
				size *= 96 / 25.4 / 4;
				break;
		}

		CACHE.set(font, size);
		return size;
	};
})();
