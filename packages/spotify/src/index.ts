import type { SearchResponse, SearchType, SpotifyBearerToken, SpotifyOauth2Result } from './lib/types/Spotify.js';
import { request, errors } from 'undici';

export class Spotify {
	private readonly endpoint = 'https://api.spotify.com/v1/';
	private readonly oauth2 = 'https://accounts.spotify.com/api/token/';

	private readonly clientId: string;
	private readonly clientSecret: string;

	private bearer: SpotifyBearerToken = {
		expire: null,
		token: null
	};

	public constructor(configuration: { id: string; secret: string }) {
		this.clientId = configuration.id;
		this.clientSecret = configuration.secret;
	}

	public async search(variable: {
		type: SearchType;
		query: string;
		offset?: number;
		limit?: number;
	}): Promise<SearchResponse> {
		const { type, query, offset = 0, limit = 10 } = variable;
		try {
			const { body } = await request(
				`${this.endpoint}search?q=${encodeURIComponent(query)}&type=${type}&offset=${offset}&limit=${limit}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${await this.getAccessToken()}`
					}
				}
			);

			return body.json() as SearchResponse;
		} catch (error: unknown) {
			throw new Error(
				`Received status ${(error as errors.ResponseStatusCodeError).status} (${
					(error as errors.ResponseStatusCodeError).message
				})`
			);
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
			const { body } = await request(this.oauth2, {
				method: 'POST',
				body: `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.clientSecret}`,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});

			const response = (await body.json()) as SpotifyOauth2Result;
			this.bearer = { token: response.access_token, expire: Date.now() + response.expires_in * 1e3 };
			return response.access_token;
		} catch (error: unknown) {
			throw new Error(
				`Received status ${(error as errors.ResponseStatusCodeError).status} (${
					(error as errors.ResponseStatusCodeError).message
				})`
			);
		}
	}
}
