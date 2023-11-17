import { describe, expect, test } from 'vitest';
import { isClass } from '@sapphire/utilities';
import { Spotify } from '../dist/index';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const spotify = new Spotify({ id: process.env.SPOTIFY_ID!, secret: process.env.SPOTIFY_SECRET! });

describe('Spotify', () => {
	test('Spotify should be a class', () => {
		expect(isClass(Spotify)).toBe(true);
	});

	test('Searching for the track "Happier Than Ever" should be defined', async () => {
		const response = await spotify.search({ type: 'track', q: 'Happier Than Ever' });

		expect(response.tracks?.items[0]).toBeDefined();
	});

	test('Searching for the artist "Billie Eilish" should be defined', async () => {
		const response = await spotify.search({ type: 'artist', q: 'Billie Eilish' });

		expect(response.artists?.items[0]).toBeDefined();
	});

	test('Searching for the album "Happier Than Ever" should be defined', async () => {
		const response = await spotify.search({ type: 'album', q: 'Happier Than Ever' });

		expect(response.albums?.items[0]).toBeDefined();
	});
});
