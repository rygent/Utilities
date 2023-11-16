import type { SearchForItemParameterObject, SearchResponse } from '../types/Spotify.js';
import { Util } from './Util.js';

export class Client {
	private utils: Util;

	public constructor(options: { id: string; secret: string }) {
		this.utils = new Util({ id: options.id, secret: options.secret });
	}

	public async search(options: Omit<SearchForItemParameterObject, 'market'>): Promise<SearchResponse> {
		const { type, query, offset = 0, limit = 20 } = options;

		const params = `?q=${encodeURIComponent(query)}&type=${type.join(',')}&offset=${offset}&limit=${limit}`;
		const response = await this.utils.fetch({ endpoint: '/search', params });

		return response as SearchResponse;
	}
}
