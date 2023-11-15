import { Anilist } from '../dist/index';
import { isClass } from '@sapphire/utilities';

const anilist = new Anilist();

describe('Anilist', () => {
	test('Anilist should be a class', () => {
		expect(isClass(Anilist)).toBe(true);
	});

	test('Searching for the anime "Cowboy Bebop" should be defined', async () => {
		const response = await anilist.media.search({ type: 'Anime', search: 'Cowboy Bebop' });

		expect(response[0]).toBeDefined();
	});

	test('Getting the "Cowboy Bebop" anime should be defined', async () => {
		const response = await anilist.media.anime({ id: 1 });

		expect(response).toBeDefined();
	});

	test('Searching for the manga "Naruto" should be defined', async () => {
		const response = await anilist.media.search({ type: 'Manga', search: 'Naruto' });

		expect(response[0]).toBeDefined();
	});

	test('Getting the "Naruto" manga should be defined', async () => {
		const response = await anilist.media.manga({ id: 30011 });

		expect(response).toBeDefined();
	});
});
