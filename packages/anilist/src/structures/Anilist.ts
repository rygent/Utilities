import { AnimeQuery, MangaQuery } from '../graphql/MediaQuery.js';
import type { Query } from '../types/Anilist.js';
import { parseHtmlEntity } from '../util/functions.js';
import { fetch } from 'undici';

const endpoint = 'https://graphql.anilist.co/';

export class Anilist {
	public async search({
		type,
		search,
		page = 1,
		perPage = 20
	}: {
		type: 'anime' | 'manga';
		search: string;
		page?: number;
		perPage?: number;
	}) {
		let query;
		if (type === 'anime') {
			query = AnimeQuery;
		} else if (type === 'manga') {
			query = MangaQuery;
		}

		if (!query) {
			throw new Error('Invalid search type');
		}

		const variables = { search, page, perPage };
		const response = await fetch(endpoint, {
			method: 'POST',
			body: JSON.stringify({ query, variables }),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`Received status ${response.status} (${response.statusText})`);
		}

		const result = (await response.json()) as Query;

		result?.Page?.media?.forEach((media) => {
			if (media) {
				media.description = parseHtmlEntity(media.description);
			}
		});

		return result.Page?.media;
	}
}
