import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
	'./packages/anilist/vitest.config.ts',
	'./packages/igdb/vitest.config.ts',
	'./packages/spotify/vitest.config.ts'
]);
