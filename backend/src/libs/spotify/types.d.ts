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
	[key: string]: unknown;
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

export interface SpotifyArtist {
	collaborative: boolean;
	description: string;
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: Array<{
		height: number | null;
		url: string;
		width: number | null;
	}>;
	name: string;
	owner: {
		display_name: string;
		external_urls: {
			spotify: string;
		};
		href: string;
		id: string;
		type: string;
		uri: string;
	};
	primary_color: string | null;
	public: boolean;
	snapshot_id: string;
	tracks: {
		href: string;
		total: number;
	};
	type: string;
	uri: string;
}

export interface SpotifyTopArtistsResponse {
	items: SpotifyArtist[];
	total: number;
	limit: number;
	offset: number;
	href: string;
	next: string | null;
	previous: string | null;
}
