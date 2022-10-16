import { fileURLToPath } from 'node:url';
import { defineConfig } from 'rollup';
import cleaner from 'rollup-plugin-cleaner';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const pluginsCleaner = cleaner({ targets: ['./dist/'] });
const pluginsTypeScript = typescript({ tsconfig: fileURLToPath(new URL('src/tsconfig.json', import.meta.url)) });
const pluginsTerser = terser({
	ecma: 2019,
	// This will ensure that whenever Rollup is in watch (dev) mode, console logs will not be removed
	compress: { drop_console: !Reflect.has(process.env, 'ROLLUP_WATCH') },
	output: { comments: false }
});

export default defineConfig([
	{
		input: 'src/browser.ts',
		output: [
			{
				file: './dist/browser.umd.js',
				format: 'umd',
				name: 'CanvasConstructor',
				strict: true,
				sourcemap: true
			}
		],
		plugins: [pluginsCleaner, pluginsTypeScript, pluginsTerser]
	},
	{
		input: {
			browser: 'src/browser.ts',
			cairo: 'src/cairo.ts',
			'napi-rs': 'src/napi-rs.ts',
			skia: 'src/skia.ts'
		},
		output: [
			{
				entryFileNames: '[name].js',
				dir: './dist',
				format: 'cjs',
				exports: 'named',
				sourcemap: true,
				strict: true,
				compact: false
			},
			{
				entryFileNames: '[name].mjs',
				dir: './dist',
				format: 'es',
				exports: 'named',
				sourcemap: true,
				strict: true,
				compact: false
			}
		],
		plugins: [pluginsTypeScript, pluginsTerser],
		external: ['node:util', 'canvas', 'skia-canvas', '@napi-rs/canvas']
	}
]);
