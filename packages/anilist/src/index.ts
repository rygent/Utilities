import type { AnilistResponse, Maybe, Media } from './lib/types/Anilist.js';
import { AnimeFragment, BaseEndpoint, MangaFragment } from './lib/constants.js';
import { fetch } from 'undici';

export async function getAnime(variables: { search: string; page?: number; perPage?: number }): Promise<readonly Maybe<Media>[] | null | undefined> {
	const { search, page = 1, perPage = 10 } = variables;
	try {
		const body = JSON.stringify({ query: AnimeFragment, variables: { search, page, perPage } });
		const headers = { 'Content-Type': 'application/json' };
		const res = await fetch(BaseEndpoint, { method: 'POST', body, headers });

		if (res.status === 200) {
			return res
				.json()
				.then<AnilistResponse>()
				.then(({ data: { Page } }) => Page.media);
		}

		throw new Error(`Received status ${res.status} (${res.statusText})`);
	} catch (error) {
		throw error;
	}
}

export async function getManga(variables: { search: string; page?: number; perPage?: number }): Promise<readonly Maybe<Media>[] | null | undefined> {
	const { search, page = 1, perPage = 10 } = variables;
	try {
		const body = JSON.stringify({ query: MangaFragment, variables: { search, page, perPage } });
		const headers = { 'Content-Type': 'application/json' };
		const res = await fetch(BaseEndpoint, { method: 'POST', body, headers });

		if (res.status === 200) {
			return res
				.json()
				.then<AnilistResponse>()
				.then(({ data: { Page } }) => Page.media);
		}

		throw new Error(`Received status ${res.status} (${res.statusText})`);
	} catch (error) {
		throw error;
	}
}

export { parseDescription } from './lib/util.js';
