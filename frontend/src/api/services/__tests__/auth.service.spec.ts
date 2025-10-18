// __tests__/auth.service.test.ts

import { api } from "../../client";
import { authService } from "../auth.service";

jest.mock("../../client"); // Mocka o axios

describe("authService", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("getCode", () => {
		const originalLocation = window.location;

		beforeEach(() => {
			Object.defineProperty(window, "location", {
				configurable: true,
				value: {
					...window.location,
					assign: jest.fn(),
				},
			});
		});

		afterEach(() => {
			Object.defineProperty(window, "location", {
				configurable: true,
				value: originalLocation,
			});

			jest.resetAllMocks();
		});

		it("should redirect to Spotify auth URL", async () => {
			const mockUrl = "https://spotify.com/auth";

			// @ts-expect-error
			api.get.mockResolvedValue({ data: { url: mockUrl } });

			await authService.getCode();

			expect(api.get).toHaveBeenCalledWith("v1/auth/spotify");
			expect(window.location.assign).toHaveBeenCalledWith(mockUrl);
		});
	});

	describe("callback", () => {
		it("should return the token from Spotify callback", async () => {
			const code = "12345";
			const token = "abcde-token";

			// @ts-expect-error
			api.get.mockResolvedValue({ data: { token } });

			const result = await authService.callback(code);

			expect(api.get).toHaveBeenCalledWith(
				`v1/auth/spotify/callback?code=${code}`,
			);
			expect(result).toBe(token);
		});
	});

	describe("getProfile", () => {
		it("should fetch the user profile", async () => {
			const mockProfile = {
				display_name: "Alexandre Magno",
				email: "xande.mgds@yahoo.com.br",
				external_urls: {
					spotify: "https://open.spotify.com/user/22zbghmqn35hb2q5b2lgpumca",
				},
				followers: {
					href: null,
					total: 17,
				},
				href: "https://api.spotify.com/v1/users/22zbghmqn35hb2q5b2lgpumca",
				id: "22zbghmqn35hb2q5b2lgpumca",
				images: [
					{
						height: 300,
						url: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1111754702240692&height=300&width=300&ext=1763318159&hash=AT_V8re4QVv-v1i-yY9rImis",
						width: 300,
					},
					{
						height: 64,
						url: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1111754702240692&height=50&width=50&ext=1763318159&hash=AT8GKAUH1ywELdsnsETXiiSF",
						width: 64,
					},
				],
				type: "user",
				uri: "spotify:user:22zbghmqn35hb2q5b2lgpumca",
			};

			// @ts-expect-error
			api.get.mockResolvedValue({ data: mockProfile });

			const result = await authService.getProfile();

			expect(api.get).toHaveBeenCalledWith("/v1/user/profile");
			expect(result).toEqual(mockProfile);
		});
	});
});
