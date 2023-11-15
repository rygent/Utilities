import { CharacterSort, StudioSort } from '../types/Anilist.js';
import { gql } from '../utils/functions.js';

export const MediaFragment = gql`
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
		characters(sort: ${CharacterSort.Relevance}) {
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
	fragment AnimeFragment on Media {
		season
		seasonYear
		episodes
		duration
		studios(sort: ${StudioSort.Name}, isMain: true) {
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

export const MangaFragment = gql`
	fragment MangaFragment on Media {
		chapters
		volumes
	}
`;
