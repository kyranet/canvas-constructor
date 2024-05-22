import { readFile, writeFile } from 'node:fs/promises';
import configuration from '../generator.config.json' assert { type: 'json' };

const root = new URL('../', import.meta.url);
const input = new URL(configuration.main, root);
console.debug(`Input file: '${input.href}'`);

const text = await readFile(input, 'utf8');

await Promise.all(configuration.entries.map((entry) => generateAll(entry)));

/** @param {import('../generator.config.json')['entries'][number]} entry */
function generateAll(entry) {
	return Promise.all([generateCode(entry)]);
}

/** @param {import('../generator.config.json')['entries'][number]} entry */
async function generateCode(entry) {
	const output = new URL(configuration.output.replace('[name]', entry.name), root);

	const content = replaceAll(entry.defines);
	await writeFile(output, content, 'utf8');
	console.info(`Written ${content.length.toLocaleString('en-US')} bytes into`, output.href, '...');
}

/**
 * @param {string} variables The variable to check.
 * @param {string[]} defines
 */
function isIncluded(variables, defines) {
	for (const variable of variables.split(',')) {
		if (variable.startsWith('!')) {
			return !defines.includes(variable.slice(1));
		} else if (defines.includes(variable)) {
			return true;
		}
	}

	return false;
}

/**
 * @param {string} content
 * @param {string} header
 * @returns {string}
 */
function getContent(content, header) {
	return content.includes('\n')
		? content
				.slice(8 + header.length)
				.replaceAll('\\\n', '\n')
				.split('\n')
				.map((line) => line.trimEnd())
				.join('\n')
		: content.slice(8 + header.length).trim();
}

/**
 * @param {string[]} defines
 * @returns {string}
 */
function replaceAll(defines) {
	return text
		.replaceAll(/\/\/ IF\(([A-Z_,!]+)\):([^\n]|(?<=\\)\n)+/g, (match, variables) =>
			isIncluded(variables, defines) ? getContent(match, variables) : ''
		)
		.replaceAll(/\n\n+/g, '\n\n');
}
