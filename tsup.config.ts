import { defineConfig, type Options } from 'tsup';

const baseOptions: Options = {
	clean: true,
	dts: true,
	entry: ['src/browser.ts', 'src/cairo.ts', 'src/napi-rs.ts', 'src/skia.ts'],
	minify: false,
	sourcemap: true,
	target: 'es2020',
	tsconfig: 'src/tsconfig.json',
	keepNames: true,
	treeshake: true,
	external: ['node:util', 'canvas', 'skia-canvas', '@napi-rs/canvas']
};

export default [
	defineConfig({
		...baseOptions,
		outDir: 'dist/cjs',
		format: 'cjs',
		outExtension: () => ({ js: '.cjs' })
	}),
	defineConfig({
		...baseOptions,
		outDir: 'dist/esm',
		format: 'esm',
		outExtension: () => ({ js: '.mjs' })
	}),
	defineConfig({
		...baseOptions,
		entry: ['src/browser.ts'],
		globalName: 'CanvasConstructor',
		dts: false,
		minify: 'terser',
		outDir: 'dist/iife',
		format: 'iife'
	})
];
