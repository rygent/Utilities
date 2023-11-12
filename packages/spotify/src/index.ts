import type { SearchType, SpotifyBearerToken, SpotifyOauth2Result } from './lib/types/Spotify.js';
import { endpoint, oauth2 } from './lib/constants.js';
import axios, { AxiosError } from 'axios';

export class Spotify {
	private clientId: string;
	private clientSecret: string;

	private bearer: SpotifyBearerToken = {
		expire: null,
		token: null
	};

	public constructor(configuration: { id: string; secret: string }) {
		this.clientId = configuration.id;
		this.clientSecret = configuration.secret;
	}

	public async search<Type extends SearchType>(variable: {
		type: Type;
		query: string;
		offset?: number;
		limit?: number;
	}): Promise<SpotifyApi.SearchResponse> {
		const { type, query, offset = 0, limit = 10 } = variable;

		try {
			const response = await axios.get(`${endpoint}search?q=${encodeURIComponent(query)}&type=${type}&offset=${offset}&limit=${limit}`, {
				headers: { Authorization: `Bearer ${await this.getAccessToken()}` }
			});

			return response.data as SpotifyApi.SearchResponse;
		} catch (error: unknown) {
			throw new Error(`Received status ${(error as AxiosError).status} (${(error as AxiosError).message})`);
		}
	}

	private getAccessToken(): string | Promise<string> {
		const { token, expire } = this.bearer;
		if (!expire || !token) return this.generateBearerToken();
		if (Date.now() > expire) return this.generateBearerToken();
		return token;
	}

	private async generateBearerToken(): Promise<string> {
		try {
			const body = `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.clientSecret}`;
			const response = await axios.post(oauth2, body, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

			const data = response.data as SpotifyOauth2Result;
			this.bearer = { token: data.access_token, expire: Date.now() + data.expires_in * 1e3 };
			return data.access_token;
		} catch (error: unknown) {
			throw new Error(`Received status ${(error as AxiosError).status} (${(error as AxiosError).message})`);
		}
	}
}
