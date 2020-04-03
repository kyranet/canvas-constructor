// @ts-nocheck
exports.browser = typeof window !== 'undefined';

exports.InternalCanvas = (() => {
	// eslint-disable-next-line no-undef
	if (exports.browser) return typeof HTMLCanvasElement === 'undefined' ? null : HTMLCanvasElement;
	try {
		return require('canvas-prebuilt');
	} catch (_) {
		return require('canvas');
	}
})();

exports.getFontHeight = (() => {
	// node-canvas has its own font parser
	if (!exports.browser && 'parseFont' in exports.InternalCanvas) return font => exports.InternalCanvas.parseFont(font).size;

	// Load polyfill
	const REGEX_SIZE = /([\d.]+)(px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q)/i;
	const CACHE = new Map();

	return font => {
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

exports.textWrap = (canvas, text, wrapWidth) => {
	const result = [];
	const buffer = [];

	const spaceWidth = canvas.context.measureText(' ').width;

	// Run the loop for each line
	for (const line of text.split(/\r?\n/)) {
		let spaceLeft = wrapWidth;

		// Run the loop for each word
		for (const word of line.split(' ')) {
			const wordWidth = canvas.context.measureText(word).width;
			// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
			const wordWidthWithSpace = wordWidth + spaceWidth;

			if (wordWidthWithSpace > spaceLeft) {
				if (buffer.length) {
					result.push(buffer.join(' '));
					buffer.length = 0;
				}
				buffer.push(word);
				spaceLeft = wrapWidth - wordWidth;
			} else {
				spaceLeft -= wordWidthWithSpace;
				buffer.push(word);
			}
		}

		if (buffer.length) {
			result.push(buffer.join(' '));
			buffer.length = 0;
		}
	}

	return result.join('\n');
};
