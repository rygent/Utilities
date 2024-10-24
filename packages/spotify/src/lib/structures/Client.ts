import type { SearchForItemParameterObject, SearchResponse } from '../types/Spotify.js';
import { Util } from './Util.js';

export class Client {
	private readonly utils: Util;

	public constructor(options: { id: string; secret: string }) {
		this.utils = new Util({ id: options.id, secret: options.secret });
	}

	public async search(options: Omit<SearchForItemParameterObject, 'market'>) {
		const { type, q, offset = 0, limit = 20 } = options;

		const params = `?q=${encodeURIComponent(q)}&type=${type}&offset=${offset}&limit=${limit}`;
		const response = await this.utils.fetch({ endpoint: '/search', params });

		return response as SearchResponse;
	}
}
