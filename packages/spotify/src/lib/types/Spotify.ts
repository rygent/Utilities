export interface SpotifyBearerToken {
	expire: number | null;
	token: string | null;
}

export interface SpotifyOauth2Result {
	access_token: string;
	expires_in: number;
	token_type: string;
}

export type SearchType = 'artist' | 'album' | 'track' | 'playlist' | 'show' | 'episode';
