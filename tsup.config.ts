import { defineConfig, type Options } from 'tsup';

export const createTsupConfig = ({
	globalName = undefined,
	format = ['esm', 'cjs', 'iife'],
	target = 'es2022',
	sourcemap = true,
	splitting = true,
	bundle = true,
	dts = true
}: ConfigOptions = {}) =>
	defineConfig({
		bundle,
		clean: true,
		dts,
		entry: ['src/index.ts'],
		format,
		keepNames: true,
		minify: false,
		platform: 'node',
		skipNodeModulesBundle: true,
		sourcemap,
		splitting,
		target,
		treeshake: true,
		globalName: globalName
			?.replace(/@/g, '')
			.split(/[\\/-]/g)
			.map((l) => l[0]?.toUpperCase() + l.slice(1))
			.join('')
	});

type ConfigOptions = Pick<Options, 'globalName' | 'format' | 'target' | 'sourcemap' | 'splitting' | 'bundle' | 'dts'>;
