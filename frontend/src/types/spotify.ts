export type SpotifyParams = {
	limit: number;
	offset: number;
};

export type GetTopArtists = {
	time_range: string;
} & SpotifyParams;

export type GetArtistAlbum = {
	include_groups: string;
	market: string;
} & SpotifyParams;

export interface SpotifyImage {
	url: string;
	height: number;
	width: number;
}

export interface SpotifyExternalUrl {
	spotify: string;
}

export interface SpotifyFollowers {
	href: string;
	total: number;
}

export interface CreatePlaylist {
	name: string;
	description?: string;
	public?: boolean;
	collaborative?: boolean;
}

export interface GetUserProfile {
	country: string;
	display_name: string;
	email: string;
	explicit_content: {
		filter_enabled: boolean;
		filter_locked: boolean;
	};
	external_urls: SpotifyExternalUrl;
	followers: SpotifyFollowers;
	href: string;
	id: string;
	images: SpotifyImage[];
	product: string;
	type: string;
	uri: string;
}

export interface GetUserPlaylistsResponse {
	collaborative: boolean;
	description: string;
	external_urls: SpotifyExternalUrl;
	href: string;
	id: string;
	images: SpotifyImage[];
	name: string;
	owner: {
		external_urls: SpotifyExternalUrl;
		href: string;
		id: string;
		type: string;
		uri: string;
		display_name: string;
	};
	public: boolean;
	snapshot_id: string;
	tracks: SpotifyFollowers;
	type: string;
	uri: string;
}

export interface GetTopArtistsResponse {
	external_urls: SpotifyExternalUrl;
	followers: SpotifyFollowers;
	genres: string[];
	href: string;
	id: string;
	images: SpotifyImage[];
	name: string;
	popularity: number;
	type: string;
	uri: string;
}

export interface GetArtistAlbumResponse {
	album_type: string;
	total_tracks: 16;
	available_markets: string[];
	external_urls: SpotifyExternalUrl;
	href: string;
	id: string;
	images: SpotifyImage[];
	name: string;
	release_date: string;
	release_date_precision: string;
	type: string;
	uri: string;
	artists: {
		external_urls: SpotifyExternalUrl;
		href: string;
		id: string;
		name: string;
		type: string;
		uri: string;
	}[];
	album_group: string;
}

export interface GetSpotifyResponse<T> {
	href: string;
	limit: number;
	next?: string;
	offset: number;
	previous?: string;
	total: number;
	items: T[];
}
