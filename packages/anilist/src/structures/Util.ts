import type { Query } from '../types/Anilist.js';
import { fetch } from 'undici';

export class Util {
	public async fetch(options: { query: string; variables: unknown }) {
		const { query, variables } = options;

		const response = await fetch('https://graphql.anilist.co', {
			method: 'POST',
			body: JSON.stringify({ query, variables }),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});

		if (response.ok) {
			const result = await response.json().then<Query>((res: any) => res.data);
			return result;
		}

		if (response.statusText) {
			throw new Error(`Received status ${response.status} (${response.statusText})`);
		}

		throw new Error(`Received status ${response.status}`);
	}
}
