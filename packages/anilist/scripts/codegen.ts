import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'https://graphql.anilist.co',
	overwrite: true,
	hooks: { afterOneFileWrite: ['prettier --write'] },
	generates: {
		'./src/types/Anilist.ts': {
			plugins: ['typescript', 'typescript-operations'],
			config: {
				flattenGeneratedTypes: true,
				flattenGeneratedTypesIncludeFragments: true
			}
		}
	}
};

export default config;
