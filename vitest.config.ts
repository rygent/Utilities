import { createVitestConfig } from './scripts/vitest.config';

export default createVitestConfig({
	test: {
		coverage: {
			exclude: ['**/scripts/**', 'commitlint.config.js', 'eslint.config.js', 'vitest.workspace.ts']
		}
	},
	esbuild: {
		target: 'esnext'
	}
});
