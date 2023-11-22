import { MediaType } from '../types/Anilist.js';
import { AnimeFragment, MangaFragment, MediaFragment } from '../fragments/MediaFragment.js';
import { gql, parseHtmlEntity } from '../utils/functions.js';
import { Util } from './Util.js';

export class Search {
	private readonly utils: Util;

	public constructor() {
		this.utils = new Util();
	}

	public async anime(options: { search: string; page?: number; perPage?: number }) {
		const { search, page = 1, perPage = 20 } = options;

		const query = gql`
			${MediaFragment} ${AnimeFragment}
			query ($search: String!, $page: Int, $perPage: Int) {
				Page(page: $page, perPage: $perPage) {
					media(search: $search, type: ${MediaType.Anime}) {
						...MediaFragment
						...AnimeFragment
					}
				}
			}
		`;

		const result = await this.utils.fetch({ query, variables: { search, page, perPage } });

		result.Page!.media!.forEach((item) => {
			item!.description = parseHtmlEntity(item!.description);
		});

		return result.Page!.media!;
	}

	public async manga(options: { search: string; page?: number; perPage?: number }) {
		const { search, page = 1, perPage = 20 } = options;

		const query = gql`
			${MediaFragment} ${MangaFragment}
			query ($search: String!, $page: Int, $perPage: Int) {
				Page(page: $page, perPage: $perPage) {
					media(search: $search, type: ${MediaType.Manga}) {
						...MediaFragment
						...MangaFragment
					}
				}
			}
		`;

		const result = await this.utils.fetch({ query, variables: { search, page, perPage } });

		result.Page!.media!.forEach((item) => {
			item!.description = parseHtmlEntity(item!.description);
		});

		return result.Page!.media!;
	}
}
