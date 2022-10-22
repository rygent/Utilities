import { Igdb } from '../dist/index';
import { isClass } from '@sapphire/utilities';
import 'dotenv/config';

describe('Igdb', () => {
	test('Igdb should be a class', () => {
		expect(isClass(Igdb)).toBe(true);
	});

	test('Game search should be defined', async () => {
		const igdb = new Igdb({ id: process.env.TWITCH_ID!, secret: process.env.TWITCH_SECRET! });
		const response = await igdb.search({ game: 'Fall Guys' });

		expect(response[0]).toBeDefined();
	});
});
