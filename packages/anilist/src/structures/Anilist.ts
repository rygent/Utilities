import type { Query } from '../types/Anilist.js';
import { AnimeQuery, MangaQuery } from '../query/MediaQuery.js';
import { formatMedia } from '../util/functions.js';
import { Util } from './Util.js';

type SearchType = 'anime' | 'manga';

export class Anilist {
	private readonly utils: Util;

	public constructor() {
		this.utils = new Util();
	}

	public async search(variables: {
		type: SearchType;
		search: string;
		page?: number;
		perPage?: number;
	}): Promise<Query> {
		const { type, search, page = 1, perPage = 20 } = variables;

		const response = await this.utils.fetch({
			query: resolveQueryFragment(type),
			variables: { search, page, perPage }
		});

		if (response.Page) {
			if (response.Page.media) {
				response.Page.media.forEach((media) => {
					if (media) {
						formatMedia(media);
					}
				});
			}
		}

		return response;
	}
}

function resolveQueryFragment(type: SearchType): string {
	switch (type) {
		case 'anime':
			return AnimeQuery;
		case 'manga':
			return MangaQuery;
		default:
			return '';
	}
}
