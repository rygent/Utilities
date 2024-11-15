import { Spotify } from '../src';
import { isClass } from '@sapphire/utilities';

describe('Spotify', () => {
	test('Spotify should be a class', () => {
		expect(isClass(Spotify)).toBe(true);
	});

	test('Track search should be defined', async () => {
		const spotify = new Spotify({ id: process.env.SPOTIFY_ID!, secret: process.env.SPOTIFY_SECRET! });
		const response = await spotify.search({ type: 'track', query: 'Happier Than Ever' });

		expect(response.tracks?.items[0]).toBeDefined();
	});

	test('Artist search should be defined', async () => {
		const spotify = new Spotify({ id: process.env.SPOTIFY_ID!, secret: process.env.SPOTIFY_SECRET! });
		const response = await spotify.search({ type: 'artist', query: 'Billie Eilish' });

		expect(response.artists?.items[0]).toBeDefined();
	});

	test('Album search should be defined', async () => {
		const spotify = new Spotify({ id: process.env.SPOTIFY_ID!, secret: process.env.SPOTIFY_SECRET! });
		const response = await spotify.search({ type: 'album', query: 'Happier Than Ever' });

		expect(response.albums?.items[0]).toBeDefined();
	});
});
