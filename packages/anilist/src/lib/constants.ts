import { gql } from './util.js';

const MediaFragment = gql`
	fragment MediaFragment on Media {
		id
		idMal
		title {
			english
			romaji
			native
		}
		format
		status(version: 2)
		description
		startDate {
			month
			day
			year
		}
		endDate {
			month
			day
			year
		}
		countryOfOrigin
		source(version: 3)
		genres
		synonyms
		averageScore
		popularity
		favourites
		characters(sort: RELEVANCE) {
			nodes {
				name {
					full
					native
				}
			}
		}
		isAdult
		externalLinks {
			type
			url
			site
		}
		siteUrl
	}
`;

export const AnimeFragment = gql`
	${MediaFragment}
	query ($search: String!, $page: Int, $perPage: Int) {
		Page(page: $page, perPage: $perPage) {
			media(search: $search, type: ANIME) {
				...MediaFragment
				season
				seasonYear
				episodes
				duration
				studios(sort: NAME, isMain: true) {
					nodes {
						name
						isAnimationStudio
					}
				}
				nextAiringEpisode {
					airingAt
					episode
				}
			}
		}
	}
`;

export const MangaFragment = gql`
	${MediaFragment}
	query ($search: String!, $page: Int, $perPage: Int) {
		Page(page: $page, perPage: $perPage) {
			media(search: $search, type: MANGA) {
				...MediaFragment
				chapters
				volumes
			}
		}
	}
`;

export const BaseEndpoint = 'https://graphql.anilist.co/';
