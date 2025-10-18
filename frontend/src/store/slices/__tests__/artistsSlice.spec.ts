import type { UnknownAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { artistsService } from "../../../api/services/artists.service";
import reducer, {
	type Artist,
	type ArtistsState,
	getAlbumsArtist,
	getArtists,
	setArtists,
} from "../artistsSlice";

jest.mock("../../../api/services/artists.service");

describe("artistsSlice", () => {
	const initialState: ArtistsState = {
		list: [],
		albums: [],
		loading: false,
		error: null,
	};

	const mockArtists: Artist[] = [
		{ id: "1", name: "Artist 1", image: "url1", date: "" },
		{ id: "2", name: "Artist 2", image: "url2", date: "" },
	];

	const mockAlbums: Artist[] = [
		{ id: "a1", name: "Album 1", image: "urlA1", date: "2025-01-01" },
	];

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should return the initial state", () => {
		expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
	});

	it("should handle setArtists", () => {
		const nextState = reducer(initialState, setArtists(mockArtists));
		expect(nextState.list).toEqual(mockArtists);
	});

	describe("getArtists thunk", () => {
		it("should fetch artists and update state on success", async () => {
			(artistsService.getArtists as jest.Mock).mockResolvedValue({
				items: mockArtists.map((a) => ({ ...a, images: [{ url: a.image }] })),
			});

			const store = configureStore({
				reducer: { artists: reducer },
				preloadedState: { artists: initialState },
			});

			await store.dispatch(
				getArtists({
					range: "short_term",
					limit: 2,
					offset: 0,
				}) as unknown as UnknownAction,
			);

			const state = store.getState().artists;

			expect(state.list).toEqual(mockArtists);
			expect(state.loading).toBe(false);
			expect(state.error).toBeNull();
		});

		it("should handle error when fetching artists fails", async () => {
			(artistsService.getArtists as jest.Mock).mockRejectedValue(
				new Error("Failed"),
			);

			const store = configureStore({
				reducer: { artists: reducer },
				preloadedState: { artists: initialState },
			});

			await store.dispatch(
				getArtists({
					range: "short_term",
					limit: 2,
					offset: 0,
				}) as unknown as UnknownAction,
			);

			const state = store.getState().artists;

			expect(state.list).toEqual([]);
			expect(state.loading).toBe(false);
			expect(state.error).toBe("Erro ao buscar artistas");
		});
	});

	describe("getAlbumsArtist thunk", () => {
		it("should fetch albums and update state on success", async () => {
			(artistsService.getAlbumsArtist as jest.Mock).mockResolvedValue({
				items: mockAlbums.map((a) => ({
					...a,
					images: [{ url: a.image }],
					release_date: a.date, // ← Mudança aqui: date -> release_date
				})),
			});

			const store = configureStore({
				reducer: { artists: reducer },
				preloadedState: { artists: initialState },
			});

			await store.dispatch(getAlbumsArtist("1"));

			const state = store.getState().artists;
			expect(state.albums).toEqual(mockAlbums);
			expect(state.loading).toBe(false);
			expect(state.error).toBeNull();
		});

		it("should handle error when fetching albums fails", async () => {
			(artistsService.getAlbumsArtist as jest.Mock).mockRejectedValue(
				new Error("Failed"),
			);

			const store = configureStore({
				reducer: { artists: reducer },
				preloadedState: { artists: initialState },
			});

			await store.dispatch(getAlbumsArtist("1") as unknown as UnknownAction);

			const state = store.getState().artists;

			expect(state.albums).toEqual([]);
			expect(state.loading).toBe(false);
			expect(state.error).toBe("Erro ao buscar detalhes do artista");
		});
	});
});
