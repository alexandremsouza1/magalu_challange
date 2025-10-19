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

export interface SimplifiedAlbum {
	album_type: "album" | "single" | "compilation";
	total_tracks: number;
	available_markets: string[];
	external_urls: ExternalUrls;
	href: string;
	id: string;
	images: SpotifyImage[];
	name: string;
	release_date: string;
	release_date_precision: "day" | "month" | "year";
	type: "album";
	uri: string;
	artists: SimplifiedArtist[];
	album_group: "album" | "single" | "compilation" | "appears_on";
}

export interface SpotifyPlaylist {
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

interface SpotifyPaginatedResponse<T> {
	href: string;
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
	items: T[];
}

export interface SpotifyArtistAlbumsResponse
	extends SpotifyPaginatedResponse<SimplifiedAlbum> {}

export interface SpotifyTopArtistsResponse
  extends SpotifyPaginatedResponse<SpotifyArtist> { }
  
export interface SpotifyUserPlaylistsResponse
  extends SpotifyPaginatedResponse<SpotifyPlaylist> {}
