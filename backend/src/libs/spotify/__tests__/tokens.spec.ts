import { beforeEach, describe, expect, it, vi } from "vitest";
import * as spotifyLib from "../tokens";
import type {
	CreatePlaylistBody,
	SpotifyArtistAlbumsResponse,
	SpotifyProfile,
	SpotifyTokenResponse,
	SpotifyTopArtistsResponse,
	SpotifyUserPlaylistsResponse,
} from "../types";

describe("Spotify Lib", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	// Mock global fetch
	const mockFetch = (data: unknown, ok = true) =>
		vi.fn().mockResolvedValue({
			ok,
			status: ok ? 200 : 400,
			json: async () => data,
		});

	// ---------- getSpotifyTokens ----------
	it("should return tokens with valid parameters", async () => {
		const mockData: SpotifyTokenResponse = {
			access_token: "access123",
			token_type: "Bearer",
			expires_in: 3600,
			refresh_token: "refresh123",
			scope: "user-read-email",
		};
		global.fetch = mockFetch(mockData);

		const res = await spotifyLib.getSpotifyTokens({
			code: "code123",
			clientId: "client123",
			clientSecret: "secret123",
			redirectUri: "http://localhost/callback",
		});

		expect(res).toEqual(mockData);
	});

	it("should throw error if missing parameters", async () => {
		await expect(
			spotifyLib.getSpotifyTokens({
				code: "",
				clientId: "client123",
				clientSecret: "secret123",
				redirectUri: "http://localhost/callback",
			}),
		).rejects.toThrow("Missing required parameters for Spotify token exchange");
	});

	it("should throw error if fetch fails", async () => {
		global.fetch = mockFetch({ error: "invalid_grant" }, false);

		await expect(
			spotifyLib.getSpotifyTokens({
				code: "code123",
				clientId: "client123",
				clientSecret: "secret123",
				redirectUri: "http://localhost/callback",
			}),
		).rejects.toThrow("Failed to get access token from Spotify");
	});

	// ---------- refreshSpotifyToken ----------
	it("should refresh token successfully", async () => {
		const mockData: SpotifyTokenResponse = {
			access_token: "new_access",
			token_type: "Bearer",
			expires_in: 3600,
			scope: "user-read-email",
			refresh_token: "refresh123",
		};
		global.fetch = mockFetch(mockData);

		const res = await spotifyLib.refreshSpotifyToken({
			refreshToken: "refresh123",
			clientId: "client123",
			clientSecret: "secret123",
		});

		expect(res).toEqual(mockData);
	});

	it("should throw error if refresh fails", async () => {
		global.fetch = mockFetch({}, false);

		await expect(
			spotifyLib.refreshSpotifyToken({
				refreshToken: "refresh123",
				clientId: "client123",
				clientSecret: "secret123",
			}),
		).rejects.toThrow("Failed to refresh Spotify token");
	});

	// ---------- getSpotifyProfile ----------
	it("should return user profile", async () => {
		const mockData: SpotifyProfile = {
			provider: "spotify",
			id: "user123",
			username: "testuser",
			displayName: "Test User",
			email: "test@example.com",
			profileUrl: "https://open.spotify.com/user/user123",
			photos: ["https://i.scdn.co/image/test123"],
			country: "BR",
			followers: 100,
			product: "premium",
			raw: {
				id: "user123",
				display_name: "Test User",
				email: "test@example.com",
				external_urls: { spotify: "https://open.spotify.com/user/user123" },
				images: [
					{
						height: 640,
						width: 640,
						url: "https://i.scdn.co/image/test123",
					},
				],
				country: "BR",
				followers: { total: 100, href: null },
				product: "premium",
			},
		};
		global.fetch = mockFetch(mockData);

		const res = await spotifyLib.getSpotifyProfile("token123");
		expect(res).toEqual(mockData);
	});

	it("should throw error if profile fetch fails", async () => {
		global.fetch = mockFetch({}, false);
		await expect(spotifyLib.getSpotifyProfile("token123")).rejects.toThrow(
			"Failed to fetch user profile",
		);
	});

	// ---------- getSpotifyTopArtists ----------
	it("should return top artists", async () => {
		const mockData: SpotifyTopArtistsResponse = {
			items: [],
			total: 0,
			href: "url",
			limit: 20,
			next: null,
			offset: 0,
			previous: null,
		};
		global.fetch = mockFetch(mockData);

		const res = await spotifyLib.getSpotifyTopArtists("token123");
		expect(res).toEqual(mockData);
	});

	it("should throw error if top artists fetch fails", async () => {
		global.fetch = mockFetch({}, false);
		await expect(spotifyLib.getSpotifyTopArtists("token123")).rejects.toThrow(
			"Failed to fetch top artists",
		);
	});

	// ---------- getSpotifyArtistAlbums ----------
	it("should return artist albums", async () => {
		const mockData: SpotifyArtistAlbumsResponse = {
			items: [],
			total: 0,
			href: "url",
			limit: 20,
			next: null,
			offset: 0,
			previous: null,
		};
		global.fetch = mockFetch(mockData);

		const res = await spotifyLib.getSpotifyArtistAlbums("artist1", "token123");
		expect(res).toEqual(mockData);
	});

	it("should throw error if artist albums fetch fails", async () => {
		global.fetch = mockFetch({}, false);
		await expect(
			spotifyLib.getSpotifyArtistAlbums("artist1", "token123"),
		).rejects.toThrow("Failed to fetch artist albums");
	});

	// ---------- getSpotifyUserPlaylists ----------
	it("should return user playlists", async () => {
		const mockData: SpotifyUserPlaylistsResponse = {
			items: [],
			total: 0,
			href: "url",
			limit: 20,
			next: null,
			offset: 0,
			previous: null,
		};
		global.fetch = mockFetch(mockData);

		const res = await spotifyLib.getSpotifyUserPlaylists("token123");
		expect(res).toEqual(mockData);
	});

	it("should throw error if playlists fetch fails", async () => {
		global.fetch = mockFetch({}, false);
		await expect(
			spotifyLib.getSpotifyUserPlaylists("token123"),
		).rejects.toThrow("Failed to fetch user playlists");
	});

	// ---------- createSpotifyUserPlaylists ----------
	it("should create playlist successfully", async () => {
		const mockProfile: SpotifyProfile = {
			provider: "spotify",
			id: "user123",
			username: "testuser",
			displayName: "Test User",
			email: "test@example.com",
			profileUrl: "https://open.spotify.com/user/user123",
			photos: ["https://i.scdn.co/image/test123"],
			country: "BR",
			followers: 100,
			product: "premium",
			raw: {
				id: "user123",
				display_name: "Test User",
				email: "test@example.com",
				external_urls: { spotify: "https://open.spotify.com/user/user123" },
				images: [
					{
						height: 640,
						width: 640,
						url: "https://i.scdn.co/image/test123",
					},
				],
				country: "BR",
				followers: { total: 100, href: null },
				product: "premium",
			},
		};
		const mockPlaylist: SpotifyUserPlaylistsResponse = {
			items: [],
			total: 0,
			href: "url",
			limit: 20,
			next: null,
			offset: 0,
			previous: null,
		};

		const mockBody: CreatePlaylistBody = { name: "My Playlist" };

		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce({ ok: true, json: async () => mockProfile }) // getSpotifyProfile
			.mockResolvedValueOnce({ ok: true, json: async () => mockPlaylist }); // POST playlist

		global.fetch = fetchMock;

		const res = await spotifyLib.createSpotifyUserPlaylists(
			"token123",
			mockBody,
		);

		expect(res).toEqual(mockPlaylist);
		expect(fetchMock).toHaveBeenCalledTimes(2);
	});

	it("should throw error if create playlist fails", async () => {
		const mockProfile: SpotifyProfile = {
			provider: "spotify",
			id: "user123",
			username: "testuser",
			displayName: "Test User",
			email: "test@example.com",
			profileUrl: "https://open.spotify.com/user/user123",
			photos: ["https://i.scdn.co/image/test123"],
			country: "BR",
			followers: 100,
			product: "premium",
			raw: {
				id: "user123",
				display_name: "Test User",
				email: "test@example.com",
				external_urls: { spotify: "https://open.spotify.com/user/user123" },
				images: [
					{
						height: 640,
						width: 640,
						url: "https://i.scdn.co/image/test123",
					},
				],
				country: "BR",
				followers: { total: 100, href: null },
				product: "premium",
			},
		};

		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce({ ok: true, json: async () => mockProfile }) // profile ok
			.mockResolvedValueOnce({ ok: false, json: async () => ({}) }); // playlist fail

		global.fetch = fetchMock;

		await expect(
			spotifyLib.createSpotifyUserPlaylists("token123", { name: "Fail" }),
		).rejects.toThrow("Failed to create user playlist");
	});
});
