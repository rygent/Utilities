import type { AnilistResponse, SearchType } from './lib/types/Anilist.js';
import { AnimeFragment, MangaFragment } from './lib/constants.js';
import axios, { AxiosError } from 'axios';

export class Anilist {
	public async search(variables: {
		type: SearchType;
		search: string;
		page?: number;
		perPage?: number;
	}): Promise<AnilistResponse> {
		const { type, search, page = 1, perPage = 10 } = variables;

		try {
			const body = JSON.stringify({ query: resolveQueryFragment(type), variables: { search, page, perPage } });
			const response = await axios.post('https://graphql.anilist.co/', body, {
				headers: { 'Content-Type': 'application/json' }
			});

			return response.data as AnilistResponse;
		} catch (error: unknown) {
			throw new Error(`Received status ${(error as AxiosError).status} (${(error as AxiosError).message})`);
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
