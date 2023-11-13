import { Anilist } from '../dist/index';
import { isClass } from '@sapphire/utilities';

describe('Anilist', () => {
	test('Anilist should be a class', () => {
		expect(isClass(Anilist)).toBe(true);
	});

	test('Search anime "Cowboy Bebop" should be defined', async () => {
		const anilist = new Anilist();
		const response = await anilist.search({ type: 'anime', search: 'Cowboy Bebop' });

		expect(response.data.Page.media![0]).toBeDefined();
	});

	test('Search manga "Naruto" should be defined', async () => {
		const anilist = new Anilist();
		const response = await anilist.search({ type: 'manga', search: 'Naruto' });

		expect(response.data.Page.media![0]).toBeDefined();
	});
});
