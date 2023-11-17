import type { Query } from '../types/Anilist.js';

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

		if (response.status === 200) {
			const result = await response.json();
			return result.data as Query;
		}

		throw new Error(`Received status ${response.status} (${response.statusText})`);
	}
}
