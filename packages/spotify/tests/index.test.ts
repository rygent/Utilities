import { Spotify } from '../src';
import { isClass } from '@sapphire/utilities';

const spotify = new Spotify({ id: process.env.SPOTIFY_ID!, secret: process.env.SPOTIFY_SECRET! });

describe('Spotify', () => {
	test('Spotify should be a class', () => {
		expect(isClass(Spotify)).toBe(true);
	});

	test('Searching for the track "Happier Than Ever" should be defined', async () => {
		const response = await spotify.search({ type: 'track', query: 'Happier Than Ever' });

		expect(response.tracks?.items[0]).toBeDefined();
	});

	test('Searching for the artist "Billie Eilish" should be defined', async () => {
		const response = await spotify.search({ type: 'artist', query: 'Billie Eilish' });

		expect(response.artists?.items[0]).toBeDefined();
	});

	test('Searching for the album "Happier Than Ever" should be defined', async () => {
		const response = await spotify.search({ type: 'album', query: 'Happier Than Ever' });

		expect(response.albums?.items[0]).toBeDefined();
	});
});
