import type { AnilistResponse, SearchType } from './lib/types/Anilist.js';
import { endpoint } from './lib/constants.js';
import { resolveQueryFragment } from './lib/util.js';
import axios, { AxiosError } from 'axios';

export class Anilist {
	public async search<Type extends SearchType>(variables: {
		type: Type;
		search: string;
		page?: number;
		perPage?: number;
	}): Promise<AnilistResponse> {
		const { type, search, page = 1, perPage = 10 } = variables;

		try {
			const body = JSON.stringify({ query: resolveQueryFragment(type), variables: { search, page, perPage } });
			const response = await axios.post(endpoint, body, { headers: { 'Content-Type': 'application/json' } });

			return response.data as AnilistResponse;
		} catch (error: unknown) {
			throw new Error(`Received status ${(error as AxiosError).status} (${(error as AxiosError).message})`);
		}
	}
}

export { parseDescription } from './lib/util.js';
export * from './lib/types/Anilist.js';
