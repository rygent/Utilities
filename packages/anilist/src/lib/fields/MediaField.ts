import { MediaType } from '../types/Anilist.js';
import { AnimeFragment, MangaFragment, MediaFragment } from '../fragments/MediaFragment.js';
import { type Util } from '../structures/Util.js';
import { gql, parseHtmlEntity } from '../utils/functions.js';

export class MediaField {
	private readonly utils: Util;

	public constructor(utils: Util) {
		this.utils = utils;
	}

	public async anime(options: { id: number }) {
		const { id } = options;

		const query = gql`
			${MediaFragment} ${AnimeFragment}
			query ($id: Int) {
				Media(id: $id, type: ${MediaType.Anime}) {
					...MediaFragment
					...AnimeFragment
				}
			}
		`;

		const result = await this.utils.fetch({ query, variables: { id } });

		result.Media!.description = parseHtmlEntity(result.Media!.description);

		return result.Media!;
	}

	public async manga(options: { id: number }) {
		const { id } = options;

		const query = gql`
			${MediaFragment} ${MangaFragment}
			query ($id: Int) {
				Media(id: $id, type: ${MediaType.Manga}) {
					...MediaFragment
					...MangaFragment
				}
			}
		`;

		const result = await this.utils.fetch({ query, variables: { id } });

		result.Media!.description = parseHtmlEntity(result.Media!.description);

		return result.Media!;
	}

	public async search<T extends keyof typeof MediaType>(options: {
		type: T;
		search: string;
		page?: number;
		perPage?: number;
	}) {
		const { type, search, page = 1, perPage = 20 } = options;

		const query = gql`
			${MediaFragment} ${AnimeFragment} ${MangaFragment}
			query ($search: String!, $page: Int, $perPage: Int) {
				Page(page: $page, perPage: $perPage) {
					media(search: $search, type: ${MediaType[type]}) {
						...MediaFragment
						...AnimeFragment
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
