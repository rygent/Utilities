import type { Query } from './types/Anilist.js';
import { AnimeFragment, MangaFragment } from './lib/constants.js';
import { formatMedia } from './util/functions.js';
import { fetch } from 'undici';

type SearchType = 'anime' | 'manga';

export class Anilist {
	public async search(variables: {
		type: SearchType;
		search: string;
		page?: number;
		perPage?: number;
	}): Promise<Query> {
		const { type, search, page = 1, perPage = 20 } = variables;

		const response = await fetch('https://graphql.anilist.co/', {
			method: 'POST',
			body: JSON.stringify({ query: resolveQueryFragment(type), variables: { search, page, perPage } }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			const data = await response.json().then<Query>((res: any) => res.data);

			if (data.Page) {
				if (data.Page.media) {
					data.Page.media.forEach((media) => {
						if (media) {
							formatMedia(media);
						}
					});
				}
			}

			return data;
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

export { ExternalLinkType, MediaFormat, MediaSeason, MediaSource, MediaStatus, MediaType } from './types/Anilist.js';
