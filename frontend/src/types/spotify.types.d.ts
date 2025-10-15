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
