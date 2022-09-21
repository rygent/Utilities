import type { SearchResponse, SearchType, SpotifyBearerToken, SpotifyOauth2Result } from './lib/types/Spotify.js';
import { BaseEndpoint, BaseOAuth2 } from './lib/constants.js';
import { URLSearchParams } from 'node:url';
import { fetch } from 'undici';

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

	public async search(variable: { type: SearchType; query: string; offset?: number; limit?: number }): Promise<SearchResponse> {
		const { type, query, offset = 0, limit = 10 } = variable;
		try {
			const res = await fetch(`${BaseEndpoint}/search?q=${encodeURIComponent(query)}&type=${type}&offset=${offset}&limit=${limit}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${await this.getAccessToken()}`
				}
			});

			if (res.status === 200) {
				return res.json().then<SearchResponse>();
			}

			throw new Error(`Received status ${res.status} (${res.statusText})`);
		} catch (error) {
			throw error;
		}
	}

	private getAccessToken(): string | Promise<string> {
		const { token, expire } = this.bearer;
		if (!expire || !token) return this.generateBearerToken();
		if (Date.now() > expire) return this.generateBearerToken();
		return token;
	}

	private async generateBearerToken(): Promise<string> {
		const params = new URLSearchParams();
		params.append('grant_type', 'client_credentials');
		params.append('client_id', this.clientId);
		params.append('client_secret', this.clientSecret);

		try {
			const res = await fetch(BaseOAuth2, {
				method: 'POST',
				body: params,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			});

			if (res.status === 200) {
				const response = await res.json().then<SpotifyOauth2Result>();
				this.bearer = { token: response.access_token, expire: Date.now() + response.expires_in * 1000 };
				return response.access_token;
			}

			throw new Error(`Received status ${res.status} (${res.statusText})`);
		} catch (error) {
			throw error;
		}
	}
}
