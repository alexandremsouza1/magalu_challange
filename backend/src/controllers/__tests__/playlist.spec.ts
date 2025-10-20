import type { FastifyReply } from "fastify";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as spotifyTokens from "../../libs/spotify/tokens";
import type {
	SpotifyPlaylist,
	SpotifyUserPlaylistsResponse,
} from "../../libs/spotify/types";
import type { AuthenticatedRequest } from "../../types";
import { createPlaylist, getUserPlaylists } from "../playlist";

describe("Playlist Controller", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const mockReply = (): FastifyReply => {
		const reply = {
			status: vi.fn().mockReturnThis(),
			send: vi.fn(),
		} as unknown as FastifyReply;

		return reply;
	};

	const mockAuth = {
		access_token: "fake_access_token",
	};

	// ---------- getUserPlaylists ----------
	it("should return playlists when user is authenticated", async () => {
		const reply = mockReply();

		const mockPlaylists: SpotifyUserPlaylistsResponse = {
			href: "https://api.spotify.com/v1/users/user123/playlists",
			limit: 20,
			next: null,
			offset: 0,
			previous: null,
			total: 1,
			items: [
				{
					collaborative: false,
					description: "My favorite songs",
					external_urls: { spotify: "https://open.spotify.com/playlist/1" },
					href: "https://api.spotify.com/v1/playlists/1",
					id: "1",
					images: [
						{
							height: 300,
							url: "https://i.scdn.co/image/playlist1",
							width: 300,
						},
					],
					name: "Test Playlist",
					owner: {
						display_name: "Test User",
						external_urls: { spotify: "https://open.spotify.com/user/1" },
						href: "https://api.spotify.com/v1/users/1",
						id: "1",
						type: "user",
						uri: "spotify:user:1",
					},
					primary_color: null,
					public: true,
					snapshot_id: "snapshot123",
					tracks: {
						href: "https://api.spotify.com/v1/playlists/1/tracks",
						total: 10,
					},
					type: "playlist",
					uri: "spotify:playlist:1",
				},
			],
		};

		vi.spyOn(spotifyTokens, "getSpotifyUserPlaylists").mockResolvedValue(
			mockPlaylists,
		);

		await getUserPlaylists({ auth: mockAuth } as AuthenticatedRequest, reply);

		expect(reply.status).toHaveBeenCalledWith(200);
		expect(reply.send).toHaveBeenCalledWith({
			success: true,
			data: mockPlaylists,
		});
	});

	it("should return 401 when auth is missing (getUserPlaylists)", async () => {
		const reply = mockReply();

		await getUserPlaylists({} as AuthenticatedRequest, reply);

		expect(reply.status).toHaveBeenCalledWith(401);
		expect(reply.send).toHaveBeenCalledWith({
			success: false,
			error: "Invalid authentication data",
		});
	});

	it("should handle errors thrown by getSpotifyUserPlaylists", async () => {
		const reply = mockReply();

		vi.spyOn(spotifyTokens, "getSpotifyUserPlaylists").mockRejectedValue(
			new Error("Spotify API down"),
		);

		await getUserPlaylists({ auth: mockAuth } as AuthenticatedRequest, reply);

		expect(reply.status).toHaveBeenCalledWith(500);
		expect(reply.send).toHaveBeenCalledWith({
			success: false,
			error: "Failed to fetch user playlists",
		});
	});

	// ---------- createPlaylist ----------
	it("should create playlist successfully", async () => {
		const reply = mockReply();
		const mockBody = {
			name: "New Playlist",
			description: "desc",
			public: true,
		};

		const mockPlaylist: SpotifyPlaylist = {
			collaborative: false,
			description: "desc",
			external_urls: { spotify: "https://open.spotify.com/playlist/123" },
			href: "https://api.spotify.com/v1/playlists/123",
			id: "123",
			images: [],
			name: "New Playlist",
			owner: {
				display_name: "Test User",
				external_urls: { spotify: "https://open.spotify.com/user/1" },
				href: "https://api.spotify.com/v1/users/1",
				id: "1",
				type: "user",
				uri: "spotify:user:1",
			},
			primary_color: null,
			public: true,
			snapshot_id: "snapshot123",
			tracks: {
				href: "https://api.spotify.com/v1/playlists/123/tracks",
				total: 0,
			},
			type: "playlist",
			uri: "spotify:playlist:123",
		};

		const mockResponse: SpotifyUserPlaylistsResponse = {
			href: "https://api.spotify.com/v1/users/user123/playlists",
			limit: 20,
			next: null,
			offset: 0,
			previous: null,
			total: 1,
			items: [mockPlaylist],
		};

		vi.spyOn(spotifyTokens, "createSpotifyUserPlaylists").mockResolvedValue(
			mockResponse,
		);

		await createPlaylist(
			{ auth: mockAuth, body: mockBody } as AuthenticatedRequest,
			reply,
		);

		expect(reply.status).toHaveBeenCalledWith(200);
		expect(reply.send).toHaveBeenCalledWith({
			success: true,
			data: mockResponse,
		});
	});

	it("should return 401 when auth is missing (createPlaylist)", async () => {
		const reply = mockReply();

		await createPlaylist({} as AuthenticatedRequest, reply);

		expect(reply.status).toHaveBeenCalledWith(401);
		expect(reply.send).toHaveBeenCalledWith({
			success: false,
			error: "Invalid authentication data",
		});
	});

	it("should handle errors thrown by createSpotifyUserPlaylists", async () => {
		const reply = mockReply();
		const mockBody = { name: "Test" };

		vi.spyOn(spotifyTokens, "createSpotifyUserPlaylists").mockRejectedValue(
			new Error("Spotify API error"),
		);

		await createPlaylist(
			{ auth: mockAuth, body: mockBody } as AuthenticatedRequest,
			reply,
		);

		expect(reply.status).toHaveBeenCalledWith(500);
		expect(reply.send).toHaveBeenCalledWith({
			success: false,
			error: "Failed to create user playlists",
		});
	});
});
