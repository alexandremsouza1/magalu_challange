import type { FastifyReply } from "fastify";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as spotifyLib from "../../libs/spotify/tokens";
import type {
	SpotifyArtistAlbumsResponse,
	SpotifyTopArtistsResponse,
} from "../../libs/spotify/types";
import type { AuthenticatedRequest } from "../../types";
import { getAlbumsArtist, getTopArtists } from "../artists";

describe("Spotify Controller", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const mockReply = (): FastifyReply =>
		({
			status: vi.fn().mockReturnThis(),
			send: vi.fn().mockReturnThis(),
		}) as Partial<FastifyReply> as unknown as FastifyReply;

	describe("getTopArtists", () => {
		it("should return 401 if authentication is missing", async () => {
			const request = { auth: null } as unknown as AuthenticatedRequest;
			const reply = mockReply();

			await getTopArtists(request, reply);

			expect(reply.status).toHaveBeenCalledWith(401);
			expect(reply.send).toHaveBeenCalledWith({
				success: false,
				error: "Invalid authentication data",
			});
		});

		it("should return 200 and Spotify artists data on success", async () => {
			const mockData = {
				href: "string",
				limit: 10,
				next: "string",
				offset: 0,
				previous: "string",
				total: 100,
				items: [
					{
						id: "1",
						name: "Artist 1",
						external_urls: { spotify: "url" },
						followers: { total: 1000 },
						genres: ["pop"],
						href: "url",
						images: [],
						popularity: 80,
						type: "artist",
						uri: "uri",
						collaborative: false,
						description: "desc",
						owner: {
							display_name: "owner",
							external_urls: { spotify: "url" },
							href: "href",
							id: "owner_id",
							type: "user",
							uri: "uri",
						},
						primary_color: null,
						public: true,
						snapshot_id: "snap",
						tracks: { href: "tracks_url", total: 10 },
					},
				],
			} as unknown as SpotifyTopArtistsResponse;

			const request = {
				auth: { access_token: "fake_token" },
			} as unknown as AuthenticatedRequest;
			const reply = mockReply();

			vi.spyOn(spotifyLib, "getSpotifyTopArtists").mockResolvedValue(mockData);

			await getTopArtists(request, reply);

			expect(reply.status).toHaveBeenCalledWith(200);
			expect(reply.send).toHaveBeenCalledWith({
				success: true,
				data: mockData,
			});
		});

		it("should return 500 if an internal error occurs", async () => {
			const request = {
				auth: { access_token: "fake_token" },
			} as unknown as AuthenticatedRequest;
			const reply = mockReply();

			vi.spyOn(spotifyLib, "getSpotifyTopArtists").mockRejectedValue(
				new Error("API error"),
			);

			await getTopArtists(request, reply);

			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith({
				success: false,
				error: "Failed to fetch artists",
			});
		});
	});

	describe("getAlbumsArtist", () => {
		it("should return 401 if authentication is missing", async () => {
			const request = {
				auth: null,
				params: { id: "123" },
			} as unknown as AuthenticatedRequest;
			const reply = mockReply();

			await getAlbumsArtist(request, reply);

			expect(reply.status).toHaveBeenCalledWith(401);
			expect(reply.send).toHaveBeenCalledWith({
				success: false,
				error: "Invalid authentication data",
			});
		});

		it("should return 200 and albums data on success", async () => {
			const mockData = {
				href: "https://api.spotify.com/v1/artists/123/albums",
				limit: 10,
				next: null,
				offset: 0,
				previous: null,
				total: 1,
				items: [
					{
						album_type: "album",
						total_tracks: 10,
						available_markets: ["US", "BR"],
						external_urls: { spotify: "https://open.spotify.com/album/abc123" },
						href: "https://api.spotify.com/v1/albums/abc123",
						id: "abc123",
						images: [
							{
								height: 640,
								width: 640,
								url: "https://i.scdn.co/image/mockimage",
							},
						],
						name: "Mock Album",
						release_date: "2024-10-01",
						release_date_precision: "day",
						type: "album",
						uri: "spotify:album:abc123",
						artists: [
							{
								id: "artist123",
								name: "Mock Artist",
								href: "https://api.spotify.com/v1/artists/artist123",
								external_urls: {
									spotify: "https://open.spotify.com/artist/artist123",
								},
								type: "artist",
								uri: "spotify:artist:artist123",
							},
						],
						album_group: "album",
					},
				],
			} as unknown as SpotifyArtistAlbumsResponse;

			const request = {
				auth: { access_token: "fake_token" },
				params: { id: "123" },
			} as unknown as AuthenticatedRequest;

			const reply = mockReply();

			vi.spyOn(spotifyLib, "getSpotifyArtistAlbums").mockResolvedValue(
				mockData,
			);

			await getAlbumsArtist(request, reply);

			expect(reply.status).toHaveBeenCalledWith(200);
			expect(reply.send).toHaveBeenCalledWith({
				success: true,
				data: mockData,
			});
		});

		it("should return 500 if an internal error occurs", async () => {
			const request = {
				auth: { access_token: "fake_token" },
				params: { id: "123" },
			} as unknown as AuthenticatedRequest;
			const reply = mockReply();

			vi.spyOn(spotifyLib, "getSpotifyArtistAlbums").mockRejectedValue(
				new Error("API error"),
			);

			await getAlbumsArtist(request, reply);

			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith({
				success: false,
				error: "Failed to fetch artist albums",
			});
		});
	});
});
