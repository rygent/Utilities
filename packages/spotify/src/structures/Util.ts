import type { SpotifyBearerToken, SpotifyOauth2Result } from '../types/Spotify.js';

export class Util {
	private clientId: string;
	private clientSecret: string;

	private bearer: SpotifyBearerToken = {
		expire: null,
		token: null
	};

	public constructor(options: { id: string; secret: string }) {
		this.clientId = options.id;
		this.clientSecret = options.secret;
	}

	public async fetch<T extends string>(options: { endpoint: T; params?: string }) {
		const { endpoint, params } = options;

		try {
			const response = await fetch(`https://api.spotify.com/v1${endpoint}${params}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${await this.getAccessToken()}`
				}
			});

			if (response.status === 200) {
				const result = await response.json();
				return result;
			}

			throw new Error(`Received status ${response.status} (${response.statusText})`);
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
		const params = `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.clientSecret}`;

		try {
			const response = await fetch('https://accounts.spotify.com/api/token', {
				method: 'POST',
				body: params,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});

			if (response.status === 200) {
				const result: SpotifyOauth2Result = await response.json();
				this.bearer = { token: result.access_token, expire: Date.now() + result.expires_in * 1e3 };
				return result.access_token;
			}

			throw new Error(`Received status ${response.status} (${response.statusText})`);
		} catch (error) {
			throw error;
		}
	}
}
