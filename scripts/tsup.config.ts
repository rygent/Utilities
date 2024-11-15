import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions';
import { defineConfig, type Options } from 'tsup';
import { relative, resolve } from 'node:path';

const baseOptions: Options = {
	bundle: true,
	clean: true,
	dts: true,
	entry: ['src/index.ts'],
	keepNames: true,
	minify: false,
	platform: 'node',
	skipNodeModulesBundle: true,
	sourcemap: true,
	target: 'esnext',
	treeshake: true,
	tsconfig: relative(__dirname, resolve(process.cwd(), 'tsconfig.json')),
	esbuildPlugins: [esbuildPluginFilePathExtensions()]
};

export function createTsupConfig(options?: EnhancedTsupOptions) {
	return [
		defineConfig({
			...baseOptions,
			outDir: 'dist/cjs',
			format: 'cjs',
			...options?.cjsOptions
		}),
		defineConfig({
			...baseOptions,
			outDir: 'dist/esm',
			format: 'esm',
			outExtension: () => ({ js: '.mjs' }),
			...options?.esmOptions
		})
	];
}

interface EnhancedTsupOptions {
	cjsOptions?: Options;
	esmOptions?: Options;
}
