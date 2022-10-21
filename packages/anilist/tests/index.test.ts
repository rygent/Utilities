import { Anilist } from '../dist/index';
import { isClass } from '@sapphire/utilities';

describe('Anilist', () => {
	test('Anilist should be a class', () => {
		expect(isClass(Anilist)).toBe(true);
	});

	test('Anime search should be defined', async () => {
		const anilist = new Anilist();
		const response = await anilist.search({ type: 'anime', search: 'Cowboy Bebop' });

		expect(response.data.Page.media![0]).toBeDefined();
	});

	test('Manga search should be defined', async () => {
		const anilist = new Anilist();
		const response = await anilist.search({ type: 'manga', search: 'Chainsaw Man' });

		expect(response.data.Page.media![0]).toBeDefined();
	});
});
