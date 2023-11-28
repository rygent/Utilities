import type { AnilistResponse, SearchType } from './lib/types/Anilist.js';
import { AnimeFragment, MangaFragment } from './lib/constants.js';
import { request, errors } from 'undici';

export class Anilist {
	private readonly endpoint = 'https://graphql.anilist.co/';

	public async search(variables: {
		type: SearchType;
		search: string;
		page?: number;
		perPage?: number;
	}): Promise<AnilistResponse> {
		const { type, search, page = 1, perPage = 10 } = variables;
		try {
			const { body } = await request(this.endpoint, {
				method: 'POST',
				body: JSON.stringify({ query: resolveQueryFragment(type), variables: { search, page, perPage } }),
				headers: { 'Content-Type': 'application/json' }
			});

			return (await body.json()) as AnilistResponse;
		} catch (error: unknown) {
			throw new Error(
				`Received status ${(error as errors.ResponseStatusCodeError).status} (${
					(error as errors.ResponseStatusCodeError).message
				})`
			);
		}
	}
}

function resolveQueryFragment(type: SearchType): string {
	switch (type) {
		case 'anime':
			return AnimeFragment;
		case 'manga':
			return MangaFragment;
		default:
			return '';
	}
}

export { parseDescription } from './lib/util.js';
export * from './lib/types/Anilist.js';
