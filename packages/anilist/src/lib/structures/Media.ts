import { MediaType } from '../types/Anilist.js';
import { AnimeFragment, MangaFragment, MediaFragment } from '../fragments/MediaFragment.js';
import { gql, parseHtmlEntity } from '../utils/functions.js';
import { Util } from './Util.js';

export class Media {
	private readonly utils: Util;

	public constructor() {
		this.utils = new Util();
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
}
