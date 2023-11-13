import { Anilist } from '../dist/index';
import { isClass } from '@sapphire/utilities';

const anilist = new Anilist();

describe('Anilist', () => {
	test('Anilist should be a class', () => {
		expect(isClass(Anilist)).toBe(true);
	});

	test('Searching for the anime "Cowboy Bebop" should be defined', async () => {
		const response = await anilist.search({ type: 'anime', search: 'Cowboy Bebop' });

		expect(response.data.Page.media![0]).toBeDefined();
	});

	test('Getting the "Cowboy Bebop" anime should be defined', async () => {
		const response = await anilist.getAnime({ id: 1 });

		expect(response.data.Media).toBeDefined();
	});

	test('Searching for the manga "Naruto" should be defined', async () => {
		const response = await anilist.search({ type: 'manga', search: 'Naruto' });

		expect(response.data.Page.media![0]).toBeDefined();
	});

	test('Getting the "Naruto" manga should be defined', async () => {
		const response = await anilist.getManga({ id: 30011 });

		expect(response.data.Media).toBeDefined();
	});
});
