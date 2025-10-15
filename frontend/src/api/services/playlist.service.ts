import { api } from "../client";

export const playlistService = {
	getPlaylists: async () => {
		const response = await api.get("/v1/user/playlists?offset=0&limit=10");
		return response.data;
	},
};
