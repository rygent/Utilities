import { Anilist } from '../src';
import { isClass } from '@sapphire/utilities';

describe('Anilist', () => {
	test('Anilist should be a class', () => {
		expect(isClass(Anilist)).toBe(true);
	});

	test('Anime search should be defined', async () => {
		const anilist = new Anilist();
		const response = await anilist.search({ type: 'anime', search: 'Cowboy Bebop' });

		if (!response?.length) return;

		expect(response[0]?.title?.english).toBe('Cowboy Bebop');
	});

	test('Manga search should be defined', async () => {
		const anilist = new Anilist();
		const response = await anilist.search({ type: 'manga', search: 'Chainsaw Man' });

		if (!response?.length) return;

		expect(response[0]?.title?.english).toBe('Chainsaw Man');
	});
});
