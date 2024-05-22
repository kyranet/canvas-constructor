import { green } from 'colorette';
import { rename } from 'node:fs/promises';
import { resolve } from 'node:path';

const indexes = ['browser', 'cairo', 'napi-rs', 'skia'];

for (const index of indexes) {
	const input = resolve(`dist/esm/${index}.d.ts`);
	const output = resolve(`dist/esm/${index}.d.mts`);

	await rename(input, output);
	console.log(green(`✅ Renamed ${index}.d.ts to ${index}.d.mts`));
}
