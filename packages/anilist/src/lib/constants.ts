import { AnimeMediaFragment, MangaMediaFragment } from './fragments.js';
import { gql } from './util.js';

export const endpoint = 'https://graphql.anilist.co/';

export const GetAnimeQuery = gql`
	${AnimeMediaFragment}
	query ($id: Int) {
		Media(id: $id, type: ANIME) {
			...AnimeMediaFragment
		}
	}
`;

export const SearchAnimeQuery = gql`
	${AnimeMediaFragment}
	query ($search: String!, $page: Int, $perPage: Int) {
		Page(page: $page, perPage: $perPage) {
			media(search: $search, type: ANIME) {
				...AnimeMediaFragment
			}
		}
	}
`;

export const GetMangaQuery = gql`
	${MangaMediaFragment}
	query ($id: Int) {
		Media(id: $id, type: MANGA) {
			...MangaMediaFragment
		}
	}
`;

export const SearchMangaQuery = gql`
	${MangaMediaFragment}
	query ($search: String!, $page: Int, $perPage: Int) {
		Page(page: $page, perPage: $perPage) {
			media(search: $search, type: MANGA) {
				...MangaMediaFragment
			}
		}
	}
`;
