import type { GetArtists } from "../../types/artists.type";
import type {
	SpotifyArtistAlbumsResponse,
	SpotifyTopArtistsResponse,
} from "../../types/spotify.types";
import { api } from "../client";

export const artistsService = {
	getArtists: async (data: GetArtists): Promise<SpotifyTopArtistsResponse> => {
		const response = await api.get(
			"/v1/artists?range=" +
				data.range +
				"&limit=" +
				data.limit +
				"&offset=" +
				data.offset,
		);
		return response.data.data;
	},

	getAlbumsArtist: async (id: string): Promise<SpotifyArtistAlbumsResponse> => {
		const response = await api.get(`/v1/artists/${id}/albums`);
		return response.data.data;
	},
};
