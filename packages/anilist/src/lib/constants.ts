import { AnimeMediaFragment, MangaMediaFragment } from './fragments.js';
import { gql } from './util.js';

export const endpoint = 'https://graphql.anilist.co/';

export const AnimeFragment = gql`
	${AnimeMediaFragment}
	query ($id: Int, $search: String, $page: Int, $perPage: Int) {
		Page(page: $page, perPage: $perPage) {
			media(id: $id, search: $search, type: ANIME) {
				...AnimeMediaFragment
			}
		}
	}
`;

export const MangaFragment = gql`
	${MangaMediaFragment}
	query ($id: Int, $search: String, $page: Int, $perPage: Int) {
		Page(page: $page, perPage: $perPage) {
			media(id: $id, search: $search, type: MANGA) {
				...MangaMediaFragment
			}
		}
	}
`;
