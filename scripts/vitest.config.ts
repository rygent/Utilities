import { defineConfig, type ViteUserConfig } from 'vitest/config';

export function createVitestConfig(options?: ViteUserConfig) {
	return defineConfig({
		...options,
		test: {
			...options?.test,
			globals: true,
			coverage: {
				...options?.test?.coverage,
				enabled: true,
				reporter: ['text', 'lcov', 'cobertura'],
				provider: 'v8',
				exclude: [
					...(options?.test?.coverage?.exclude ?? []),
					'**/coverage/**',
					'**/dist/**',
					'**/node_modules/**',
					'**/tests/**',
					'**/prettier.config.js',
					'**/tsup.config.ts',
					'**/vitest.config.ts'
				]
			}
		},
		esbuild: {
			...options?.esbuild,
			...(options?.esbuild ? { target: options.esbuild.target ?? 'esnext' } : {})
		}
	});
}
