import type { ESBuildOptions } from 'vite';
import { defineConfig, type UserConfig } from 'vitest/config';

export function createVitestConfig(options: UserConfig = {}) {
	return defineConfig({
		...options,
		test: {
			...options.test,
			globals: true,
			coverage: {
				...options.test?.coverage,
				provider: 'v8',
				enabled: true,
				reporter: ['text', 'lcov'],
				exclude: [...(options.test?.coverage?.exclude ?? []), '**/node_modules/**', '**/dist/**', '**/tests/**']
			}
		},
		esbuild: {
			...options?.esbuild,
			target: (options?.esbuild as ESBuildOptions | undefined)?.target ?? 'es2022'
		}
	});
}
