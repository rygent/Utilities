import { findFilesRecursivelyStringEndsWith } from '@sapphire/node-utilities';
import { bold, green } from 'colorette';
import { rename } from 'node:fs/promises';
import { join } from 'node:path';

async function main() {
	const inputPath = 'dist/esm/';

	const fullInputPathUrl = join(process.cwd(), inputPath);

	for await (const file of findFilesRecursivelyStringEndsWith(fullInputPathUrl, '.d.ts')) {
		await rename(file, file.replace(/\.d\.ts$/, '.d.mts'));
	}

	console.log(green(`✅ Renamed .d.ts files in ${bold(fullInputPathUrl)} to .d.mts`));
}

void main();
