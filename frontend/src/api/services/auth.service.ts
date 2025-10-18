import { api } from "../client";

export const authService = {
	getCode: async () => {
		const response = await api.get("v1/auth/spotify");
		window.location.assign(response.data.url);
	},

	callback: async (code: string) => {
		const response = await api.get(`v1/auth/spotify/callback?code=${code}`);
		return response.data.token;
	},

	getProfile: async () => {
		const response = await api.get("/v1/user/profile");
		return response.data;
	},
};
