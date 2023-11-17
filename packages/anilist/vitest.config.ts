import { createVitestConfig } from '../../vitest.config';

export default createVitestConfig({ esbuild: { target: 'es2022' } });
