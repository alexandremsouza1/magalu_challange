import type { FastifyReply, FastifyRequest } from "fastify";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as spotifyAuth from "../../libs/spotify/auth";
import * as spotifyTokens from "../../libs/spotify/tokens";
import type { SpotifyProfile } from "../../libs/spotify/types";
import type { AuthenticatedRequest, SpotifyCallbackQuery } from "../../types";
import * as jwtUtils from "../../utils/jwt";

// Mock environment before importing controllers
vi.mock("../../utils/autoLoad", () => ({
	getEnvVariable: vi.fn((key: string) => {
		const mockEnv: Record<string, string> = {
			SPOTIFY_CLIENT_ID: "client_id",
			SPOTIFY_CLIENT_SECRET: "client_secret",
			SPOTIFY_REDIRECT_URI: "http://localhost/callback",
			FRONTEND_URL: "http://localhost:5173",
		};

		if (!mockEnv[key]) {
			throw new Error(`Environment variable ${key} is not set.`);
		}

		return mockEnv[key];
	}),
}));

import { authSpotify, authSpotifyCallback, getUserProfile } from "../auth";

describe("Spotify Auth Controller", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const mockReply = (): FastifyReply =>
		({
			status: vi.fn().mockReturnThis(),
			send: vi.fn().mockReturnThis(),
			redirect: vi.fn().mockReturnThis(),
		}) as Partial<FastifyReply> as FastifyReply;

	// ==========================================================
	// authSpotify
	// ==========================================================
	describe("authSpotify", () => {
		it("should redirect to Spotify auth URL", async () => {
			const mockUrl = "https://spotify.com/auth";
			vi.spyOn(spotifyAuth, "getSpotifyAuthUrl").mockReturnValue(mockUrl);

			const reply = mockReply();
			await authSpotify({} as FastifyRequest, reply);

			expect(reply.redirect).toHaveBeenCalledWith(mockUrl);
		});

		it("should return 500 if URL generation fails", async () => {
			vi.spyOn(spotifyAuth, "getSpotifyAuthUrl").mockImplementation(() => {
				throw new Error("URL error");
			});

			const reply = mockReply();
			await authSpotify({} as FastifyRequest, reply);

			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith({
				success: false,
				error: "Failed to generate authentication URL",
			});
		});
	});

	// ==========================================================
	// authSpotifyCallback
	// ==========================================================
	describe("authSpotifyCallback", () => {
		it("should return 400 if authorization error is present", async () => {
			const request = {
				query: { error: "access_denied" },
			} as unknown as FastifyRequest<{
				Querystring: { code?: string; error?: string };
			}>;
			const reply = mockReply();

			await authSpotifyCallback(request, reply);

			expect(reply.status).toHaveBeenCalledWith(400);
			expect(reply.send).toHaveBeenCalledWith({
				success: false,
				error: "Spotify authorization error: access_denied",
			});
		});

		it("should return 400 if code is missing", async () => {
			const request = { query: {} } as unknown as FastifyRequest<{
				Querystring: { code?: string; error?: string };
			}>;
			const reply = mockReply();

			await authSpotifyCallback(request, reply);

			expect(reply.status).toHaveBeenCalledWith(400);
			expect(reply.send).toHaveBeenCalledWith({
				success: false,
				error: "Authorization code not provided",
			});
		});

		it("should redirect with JWT token on success", async () => {
			const mockTokens = {
				access_token: "a",
				refresh_token: "r",
				token_type: "Bearer",
				expires_in: 3600,
				scope: "user-read-private",
			};

			const mockJwt = "jwt123";

			vi.spyOn(spotifyTokens, "getSpotifyTokens").mockResolvedValue(mockTokens);
			vi.spyOn(jwtUtils, "createToken").mockReturnValue(mockJwt);

			const request = {
				query: { code: "123" },
			} as unknown as FastifyRequest<{
				Querystring: { code?: string; error?: string };
			}>;
			const reply = mockReply();

			await authSpotifyCallback(request, reply);

			expect(reply.redirect).toHaveBeenCalledWith(
				"http://localhost:5173/authCallback?token=jwt123",
			);
		});

		it("should return 500 on internal error", async () => {
			vi.spyOn(spotifyTokens, "getSpotifyTokens").mockRejectedValue(
				new Error("API fail"),
			);

			const request = {
				query: { code: "123" },
			} as unknown as FastifyRequest<{ Querystring: SpotifyCallbackQuery }>;

			const reply = mockReply();

			await authSpotifyCallback(request, reply);

			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith({
				success: false,
				error: "Failed to complete Spotify authentication",
			});
		});
	});

	// ==========================================================
	// getUserProfile
	// ==========================================================
	describe("getUserProfile", () => {
		it("should return 401 if auth is missing", async () => {
			const request = { auth: null } as unknown as AuthenticatedRequest;
			const reply = mockReply();

			await getUserProfile(request, reply);

			expect(reply.status).toHaveBeenCalledWith(401);
			expect(reply.send).toHaveBeenCalledWith({
				success: false,
				error: "Invalid authentication data",
			});
		});

		it("should return 200 with user profile", async () => {
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

			vi.spyOn(spotifyTokens, "getSpotifyProfile").mockResolvedValue(
				mockProfile,
			);

			const request = {
				auth: { access_token: "token" },
			} as unknown as AuthenticatedRequest;

			const reply = mockReply();

			await getUserProfile(request, reply);

			expect(reply.status).toHaveBeenCalledWith(200);
			expect(reply.send).toHaveBeenCalledWith({
				success: true,
				data: mockProfile,
			});
		});

		it("should return 500 if fetching profile fails", async () => {
			vi.spyOn(spotifyTokens, "getSpotifyProfile").mockRejectedValue(
				new Error("error"),
			);

			const request = {
				auth: { access_token: "token" },
			} as unknown as AuthenticatedRequest;
			const reply = mockReply();

			await getUserProfile(request, reply);

			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith({
				success: false,
				error: "Failed to fetch user profile",
			});
		});
	});
});
