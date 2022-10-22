export interface TwitchHelixBearerToken {
	expire: number | null;
	token: string | null;
}

export interface TwitchHelixOauth2Result {
	access_token: string;
	expires_in: number;
	token_type: string;
}
