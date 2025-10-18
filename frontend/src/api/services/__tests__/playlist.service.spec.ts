// __tests__/playlist.service.test.ts

import { api } from "../../client";
import { playlistService } from "../playlist.service";

jest.mock("../../client"); // Mock da instância do axios

describe("playlistService", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("getPlaylists", () => {
		it("should fetch user playlists", async () => {
			const mockPlaylists = {
				items: [
					{ id: "1", name: "Playlist 1" },
					{ id: "2", name: "Playlist 2" },
				],
				total: 2,
				limit: 10,
				offset: 0,
				href: "/v1/user/playlists?offset=0&limit=10",
				next: null,
				previous: null,
			};

			// @ts-expect-error
			api.get.mockResolvedValue({ data: mockPlaylists });

			const result = await playlistService.getPlaylists();

			expect(api.get).toHaveBeenCalledWith(
				"/v1/user/playlists?offset=0&limit=10",
			);
			expect(result).toEqual(mockPlaylists);
		});
	});

	describe("addPlaylist", () => {
		it("should create a new playlist", async () => {
			const playlistName = "Nova Playlist";
			const mockResponse = {
				id: "123",
				name: playlistName,
				href: "/v1/playlists/123",
				tracks: { total: 0 },
			};

			// @ts-expect-error
			api.post.mockResolvedValue({ data: mockResponse });

			const result = await playlistService.addPlaylist(playlistName);

			expect(api.post).toHaveBeenCalledWith("/v1/user/playlists", {
				name: playlistName,
			});
			expect(result).toEqual(mockResponse);
		});
	});
});
