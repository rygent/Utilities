import { defineConfig, type UserConfig } from 'vitest/config';

export function createVitestConfig(options?: UserConfig) {
	return defineConfig({
		...options,
		test: {
			...options?.test,
			globals: true,
			coverage: {
				...options?.test?.coverage,
				enabled: true,
				reporter: ['text', 'lcov'],
				provider: 'v8',
				exclude: [
					...(options?.test?.coverage?.exclude ?? []),
					'**/node_modules/**',
					'**/dist/**',
					'**/tests/**',
					'**/prettier.config.ts',
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
