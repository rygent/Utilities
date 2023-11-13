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

export const AnimeMediaFragment = gql`
	${MediaFragment}
	fragment AnimeMediaFragment on Media {
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
`;

export const MangaMediaFragment = gql`
	${MediaFragment}
	fragment MangaMediaFragment on Media {
		...MediaFragment
		chapters
		volumes
	}
`;
