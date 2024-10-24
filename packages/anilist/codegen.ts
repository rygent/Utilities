import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'https://graphql.anilist.co',
	generates: {
		'src/lib/types/Anilist.ts': {
			plugins: ['typescript']
		}
	}
};

export default config;
