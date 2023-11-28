import type { TwitchHelixBearerToken, TwitchHelixOauth2Result } from './lib/types/Twitch.js';
import type { Game } from './lib/types/Igdb.js';
import { BaseEndpoint, BaseOAuth2, BaseFields } from './lib/constants.js';
import { URLSearchParams } from 'node:url';
import { fetch } from 'undici';

export class Igdb {
	private readonly clientId: string;
	private readonly clientSecret: string;

	private bearer: TwitchHelixBearerToken = {
		expire: null,
		token: null
	};

	public constructor(configuration: { id: string; secret: string }) {
		this.clientId = configuration.id;
		this.clientSecret = configuration.secret;
	}

	public async search(variable: { game: string; offset?: number; limit?: number }): Promise<Game[]> {
		const { game, offset = 0, limit = 10 } = variable;
		// eslint-disable-next-line no-useless-catch
		try {
			const res = await fetch(`${BaseEndpoint}/games`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${await this.getAccessToken()}`,
					'Client-ID': this.clientId,
					'Content-Type': 'text/plain'
				},
				body: `search: "${game}"; fields ${BaseFields}; offset ${offset}; limit ${limit};`
			});

			if (res.status === 200) {
				return res.json().then<Game[]>();
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

		// eslint-disable-next-line no-useless-catch
		try {
			const res = await fetch(BaseOAuth2, {
				method: 'POST',
				body: params,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			});

			if (res.status === 200) {
				const response = await res.json().then<TwitchHelixOauth2Result>();
				this.bearer = { token: response.access_token, expire: Date.now() + response.expires_in * 1000 };
				return response.access_token;
			}

			throw new Error(`Received status ${res.status} (${res.statusText})`);
		} catch (error) {
			throw error;
		}
	}
}
