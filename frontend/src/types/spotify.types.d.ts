export interface SpotifyTopArtistsResponse {
	items: SpotifyArtist[];
	total: number;
	limit: number;
	offset: number;
	href: string;
	next: string | null;
	previous: string | null;
}

export interface SpotifyArtist {
	external_urls: SpotifyExternalUrls;
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

export interface SpotifyFollowers {
	href: string | null;
	total: number;
}

export interface SpotifyImage {
	height: number;
	url: string;
	width: number;
}

export type SpotifyExternalUrls = {
	spotify: string;
};

export type SpotifyUser = {
	display_name: string;
	external_urls: SpotifyExternalUrls;
	href: string;
	id: string;
	type: "user";
	uri: string;
};

export type SpotifyPlaylistTracks = {
	href: string;
	total: number;
};

export type SpotifyPlaylist = {
	collaborative: boolean;
	description: string;
	external_urls: SpotifyExternalUrls;
	href: string;
	id: string;
	images: SpotifyImage[];
	name: string;
	owner: SpotifyUser;
	primary_color: string | null;
	public: boolean;
	snapshot_id: string;
	tracks: SpotifyPlaylistTracks;
	type: "playlist";
	uri: string;
};

export interface SpotifyArtistAlbumsResponse {
	href: string;
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
	items: SpotifyAlbum[];
}

export interface SpotifyAlbum {
	album_type: string;
	total_tracks: number;
	available_markets: string[];
	external_urls: SpotifyExternalUrls;
	href: string;
	id: string;
	images: SpotifyImage[];
	name: string;
	release_date: string;
	release_date_precision: "year" | "month" | "day";
	type: string;
	uri: string;
	artists: SpotifyArtistSummary[];
	album_group: string;
}

export interface SpotifyImage {
	url: string;
	height: number;
	width: number;
}

export interface SpotifyArtistSummary {
	external_urls: SpotifyExternalUrls;
	href: string;
	id: string;
	name: string;
	type: "artist";
	uri: string;
}
