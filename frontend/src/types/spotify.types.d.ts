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
	type: "artist";
	uri: string;
}

export interface SpotifyExternalUrls {
	spotify: string;
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

export type SpotifyImage = {
    height: number | null;
    url: string;
    width: number | null;
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
