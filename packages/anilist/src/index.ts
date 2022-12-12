import type { AnilistResponse, SearchType } from './lib/types/Anilist.js';
import { AnimeFragment, BaseEndpoint, MangaFragment } from './lib/constants.js';
import { fetch } from 'undici';

export class Anilist {
	public async search(variables: { type: SearchType; search: string; page?: number; perPage?: number }): Promise<AnilistResponse> {
		const { type, search, page = 1, perPage = 10 } = variables;
		try {
			const body = JSON.stringify({ query: resolveQueryFragment(type), variables: { search, page, perPage } });
			const headers = { 'Content-Type': 'application/json' };
			const res = await fetch(BaseEndpoint, { method: 'POST', body, headers });

			if (res.status === 200) {
				return (await res.json()) as AnilistResponse;
			}

			throw new Error(`Received status ${res.status} (${res.statusText})`);
		} catch (error) {
			throw error;
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
