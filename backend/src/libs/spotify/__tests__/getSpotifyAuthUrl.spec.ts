import { beforeAll, describe, expect, it, vi } from "vitest";
import { getSpotifyAuthUrl } from "../auth.js";

describe("getSpotifyAuthUrl", () => {
	beforeAll(() => {
		vi.mock("../envs", () => ({
			SPOTIFY_AUTH_URL: "https://accounts.spotify.com/authorize",
		}));
	});

	it("should build a valid Spotify auth URL with all parameters", () => {
		const url = getSpotifyAuthUrl({
			clientId: "client123",
			redirectUri: "http://localhost:4000/callback",
			scope: ["user-read-email", "playlist-read-private"],
			showDialog: true,
		});

		expect(url.startsWith("https://accounts.spotify.com/authorize?")).toBe(
			true,
		);

		const queryString = url.split("?")[1];
		const params = Object.fromEntries(new URLSearchParams(queryString));

		expect(params).toEqual({
			response_type: "code",
			client_id: "client123",
			redirect_uri: "http://localhost:4000/callback",
			scope: "user-read-email playlist-read-private",
			show_dialog: "true",
		});
	});

	it("should handle empty scope and default showDialog = false", () => {
		const url = getSpotifyAuthUrl({
			clientId: "client123",
			redirectUri: "http://localhost:4000/callback",
		});

		const queryString = url.split("?")[1];
		const params = Object.fromEntries(new URLSearchParams(queryString));

		expect(params.scope).toBe(""); // escopo vazio
		expect(params.show_dialog).toBe("false"); // padrão
		expect(params.client_id).toBe("client123");
		expect(params.redirect_uri).toBe("http://localhost:4000/callback");
	});
});
