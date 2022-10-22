export const BaseEndpoint = 'https://api.igdb.com/v4';
export const BaseOAuth2 = 'https://id.twitch.tv/oauth2/token';
export const BaseFields = [
	'age_ratings.rating',
	'age_ratings.category',
	'category',
	'cover.url',
	'first_release_date',
	'game_engines.name',
	'game_modes.name',
	'genres.name',
	'involved_companies.company.name',
	'involved_companies.developer',
	'involved_companies.publisher,name',
	'platforms.name',
	'rating',
	'rating_count',
	'screenshots.url',
	'status',
	'storyline',
	'summary',
	'total_rating',
	'total_rating_count',
	'url',
	'websites.category',
	'websites.url'
].join(',');
