import type { AnilistResponse, SearchType } from './lib/types/Anilist.js';
import { AnimeFragment, MangaFragment } from './lib/constants.js';
import { fetch } from 'undici';

export class Anilist {
	public async search(variables: {
		type: SearchType;
		search: string;
		page?: number;
		perPage?: number;
	}): Promise<AnilistResponse> {
		const { type, search, page = 1, perPage = 20 } = variables;

		const response = await fetch('https://graphql.anilist.co/', {
			method: 'POST',
			body: JSON.stringify({ query: resolveQueryFragment(type), variables: { search, page, perPage } }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			const data = await response.json();
			return data as AnilistResponse;
		}

		throw new Error(`Received status ${response.status} (${response.statusText})`);
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
