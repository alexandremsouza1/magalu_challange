import HttpClient from "../core/http";
import type {
	CreatePlaylist,
	GetArtistAlbum,
	GetArtistAlbumResponse,
	GetSpotifyResponse,
	GetTopArtists,
	GetTopArtistsResponse,
	GetUserPlaylistsResponse,
	GetUserProfile,
	SpotifyParams,
} from "../types/spotify";

export default class BackendService {
	private http: HttpClient;
	private baseUrl: string = process.env.VITE_API_URL || "";

	constructor() {
		this.http = new HttpClient({
			baseURL: this.baseUrl,
		});
	}

	login(): string {
		return `${this.baseUrl}/v1/auth/spotify`;
	}

	async getProfile(): Promise<GetUserProfile> {
		const { data } = await this.http.send({
			url: "/v1/user/profile",
		});
		return data;
	}

	async postPlaylists(data: CreatePlaylist): Promise<void> {
		await this.http.send({
			method: "POST",
			url: "/v1/user/playlists",
			data: {
				...data,
				public: true,
				description: " ",
			},
		});
	}

	async getPlaylists(
		params: Partial<SpotifyParams> = {},
	): Promise<GetSpotifyResponse<GetUserPlaylistsResponse>> {
		const { data } = await this.http.send({
			url: "/v1/user/playlists",
			params,
		});
		return data;
	}

	async getTopArtists(
		params: Partial<GetTopArtists> = {},
	): Promise<GetSpotifyResponse<GetTopArtistsResponse>> {
		const { data } = await this.http.send({
			url: "/v1/artists",
			params,
		});
		return data;
	}

	async getArtistAlbums(
		id: string,
		params: Partial<GetArtistAlbum> = {},
	): Promise<GetSpotifyResponse<GetArtistAlbumResponse>> {
		const { data } = await this.http.send({
			url: `/v1/artists/${id}/albums`,
			params,
		});
		return data;
	}
}
