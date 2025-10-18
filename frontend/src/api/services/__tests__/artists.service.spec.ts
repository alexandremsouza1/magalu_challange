import type { GetArtists } from "../../../types/artists.type";
import type {
	SpotifyArtist,
	SpotifyTopArtistsResponse,
} from "../../../types/spotify.types";
import { api } from "../../client";
import { artistsService } from "../artists.service";

jest.mock("../../client"); // Mocka a instância do axios

describe("artistsService", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("getArtists", () => {
		it("should fetch top artists with correct query params", async () => {
			const mockArtists: SpotifyArtist[] = [
				{
					external_urls: { spotify: "https://spotify.com/artist/1" },
					followers: { total: 1000, href: null },
					genres: ["pop"],
					href: "https://api.spotify.com/v1/artists/1",
					id: "1",
					images: [{ url: "https://image.com/1.jpg", height: 640, width: 640 }],
					name: "Artist 1",
					popularity: 80,
					type: "artist",
					uri: "spotify:artist:1",
				},
				{
					external_urls: { spotify: "https://spotify.com/artist/2" },
					followers: { total: 500, href: null },
					genres: ["rock"],
					href: "https://api.spotify.com/v1/artists/2",
					id: "2",
					images: [{ url: "https://image.com/2.jpg", height: 640, width: 640 }],
					name: "Artist 2",
					popularity: 70,
					type: "artist",
					uri: "spotify:artist:2",
				},
			];

			const mockData: SpotifyTopArtistsResponse = {
				items: mockArtists,
				total: 2,
				limit: 2,
				offset: 0,
				href: "https://api.spotify.com/v1/artists?range=short_term&limit=2&offset=0",
				next: null,
				previous: null,
			};

			// @ts-expect-error
			api.get.mockResolvedValue({ data: mockData });

			const params: GetArtists = { range: "short_term", limit: 2, offset: 0 };
			const response = await artistsService.getArtists(params);

			expect(api.get).toHaveBeenCalledWith(
				"/v1/artists?range=short_term&limit=2&offset=0",
			);
			expect(response).toEqual(mockData);
		});
	});

	describe("getAlbumsArtist", () => {
		it("should fetch albums for given artist id", async () => {
			const artistId = "123";
			const mockAlbums: SpotifyTopArtistsResponse = {
				items: [
					{
						external_urls: {
							spotify: "https://open.spotify.com/artist/7nO8nW0yv69zkzGCCrJCBW",
						},
						followers: { href: null, total: 797 },
						genres: [],
						href: "https://api.spotify.com/v1/artists/7nO8nW0yv69zkzGCCrJCBW",
						id: "7nO8nW0yv69zkzGCCrJCBW",
						images: [
							{
								height: 640,
								url: "https://i.scdn.co/image/ab67616d0000b27390be575d447d89ba514bcf25",
								width: 640,
							},
							{
								height: 300,
								url: "https://i.scdn.co/image/ab67616d00001e0290be575d447d89ba514bcf25",
								width: 300,
							},
							{
								height: 64,
								url: "https://i.scdn.co/image/ab67616d0000485190be575d447d89ba514bcf25",
								width: 64,
							},
						],
						name: "Mano Deyvin",
						popularity: 4,
						type: "artist",
						uri: "spotify:artist:7nO8nW0yv69zkzGCCrJCBW",
					},
					{
						external_urls: {
							spotify: "https://open.spotify.com/artist/6XyY86QOPPrYVGvF9ch6wz",
						},
						followers: { href: null, total: 31627936 },
						genres: ["nu metal", "rap metal", "rock", "alternative metal"],
						href: "https://api.spotify.com/v1/artists/6XyY86QOPPrYVGvF9ch6wz",
						id: "6XyY86QOPPrYVGvF9ch6wz",
						images: [
							{
								height: 640,
								url: "https://i.scdn.co/image/ab6761610000e5eb527d95dabbe8b8b527e8136f",
								width: 640,
							},
							{
								height: 320,
								url: "https://i.scdn.co/image/ab67616100005174527d95dabbe8b8b527e8136f",
								width: 320,
							},
							{
								height: 160,
								url: "https://i.scdn.co/image/ab6761610000f178527d95dabbe8b8b527e8136f",
								width: 160,
							},
						],
						name: "Linkin Park",
						popularity: 87,
						type: "artist",
						uri: "spotify:artist:6XyY86QOPPrYVGvF9ch6wz",
					},
				],
				total: 2,
				limit: 2,
				offset: 0,
				href: "https://api.spotify.com/v1/artists?limit=2&offset=0",
				next: null,
				previous: null,
			};

			// @ts-expect-error
			api.get.mockResolvedValue({ data: mockAlbums });

			const response = await artistsService.getAlbumsArtist(artistId);

			expect(api.get).toHaveBeenCalledWith(`/v1/artists/${artistId}/albums`);
			expect(response).toEqual(mockAlbums);
		});
	});
});
