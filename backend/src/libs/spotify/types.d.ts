export interface SpotifyAuthUrlParams {
	clientId: string;
	redirectUri: string;
	scope?: string[];
	showDialog?: boolean;
}

export interface SpotifyTokenParams {
	code: string;
	clientId: string;
	clientSecret: string;
	redirectUri: string;
}

export interface SpotifyRefreshTokenParams {
	refreshToken: string;
	clientId: string;
	clientSecret: string;
}

export interface SpotifyTokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
}

export interface SpotifyImage {
	url: string;
	height: number | null;
	width: number | null;
}

export interface SpotifyFollowers {
	href: string | null;
	total: number;
}

export interface SpotifyExternalUrls {
	spotify: string;
}

export interface SpotifyRawProfile {
	id: string;
	display_name: string;
	email: string;
	external_urls: SpotifyExternalUrls;
	images?: SpotifyImage[];
	country: string;
	followers: SpotifyFollowers;
	product: string;
	[key: string]: any;
}

export interface SpotifyProfile {
	provider: "spotify";
	id: string;
	username: string;
	displayName: string;
	email: string;
	profileUrl: string;
	photos: string[];
	country: string;
	followers: number;
	product: string;
	raw: SpotifyRawProfile;
}
