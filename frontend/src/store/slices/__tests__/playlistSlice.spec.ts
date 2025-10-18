import { configureStore } from "@reduxjs/toolkit";
import { playlistService } from "../../../api/services/playlist.service";
import reducer, {
	addPlaylist,
	getPlaylists,
	type Playlist,
	setPlaylists,
} from "../playlistSlice";

jest.mock("../../../api/services/playlist.service");

describe("playlistsSlice", () => {
	const initialState = {
		list: [],
		loading: false,
		error: null,
	};

	const mockPlaylists: Playlist[] = [
		{
			id: "1",
			name: "Minha Playlist",
			image: "url1",
			owner: "Você",
			tracksCount: 10,
		},
		{
			id: "2",
			name: "Favoritas",
			image: "url2",
			owner: "Você",
			tracksCount: 5,
		},
	];

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should return the initial state", () => {
		expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
	});

	it("should handle setPlaylists", () => {
		const nextState = reducer(initialState, setPlaylists(mockPlaylists));
		expect(nextState.list).toEqual(mockPlaylists);
	});

	describe("getPlaylists thunk", () => {
		it("should fetch playlists and update state on success", async () => {
			(playlistService.getPlaylists as jest.Mock).mockResolvedValue({
				items: mockPlaylists.map((p) => ({
					...p,
					images: [{ url: p.image }],
					owner: { display_name: p.owner },
					tracks: { total: p.tracksCount },
				})),
			});

			const store = configureStore({
				reducer: { playlists: reducer },
				preloadedState: { playlists: initialState },
			});

			await store.dispatch(getPlaylists());
			const state = store.getState().playlists;

			expect(state.list).toEqual(mockPlaylists);
			expect(state.loading).toBe(false);
			expect(state.error).toBeNull();
		});

		it("should avoid fetching if playlists already exist", async () => {
			const preloadedState = {
				list: mockPlaylists,
				loading: false,
				error: null,
			};

			const store = configureStore({
				reducer: { playlists: reducer },
				preloadedState: { playlists: preloadedState },
			});

			const spy = jest.spyOn(playlistService, "getPlaylists");

			await store.dispatch(getPlaylists());

			// 🚫 Garante que o serviço NÃO foi chamado novamente
			expect(spy).not.toHaveBeenCalled();

			// ✅ Garante que o estado se manteve igual
			const state = store.getState().playlists;
			expect(state.list).toEqual(mockPlaylists);
			expect(state.loading).toBe(false);
			expect(state.error).toBeNull();

			spy.mockRestore();
		});

		it("should handle error when fetching playlists fails", async () => {
			(playlistService.getPlaylists as jest.Mock).mockRejectedValue(
				new Error("Network error"),
			);

			const store = configureStore({
				reducer: { playlists: reducer },
				preloadedState: { playlists: initialState },
			});

			await store.dispatch(getPlaylists());
			const state = store.getState().playlists;

			expect(state.list).toEqual([]);
			expect(state.loading).toBe(false);
			expect(state.error).toBe("Erro ao buscar playlists");
		});
	});

	describe("addPlaylist thunk", () => {
		it("should add playlist optimistically and mark loading", async () => {
			(playlistService.addPlaylist as jest.Mock).mockResolvedValue(
				mockPlaylists[0],
			);

			const store = configureStore({
				reducer: { playlists: reducer },
				preloadedState: { playlists: initialState },
			});

			const name = "Nova Playlist";

			const promise = store.dispatch(addPlaylist(name));

			// Estado intermediário (optimistic update)
			let state = store.getState().playlists;
			expect(state.list.length).toBe(1);
			expect(state.list[0].name).toBe(name);
			expect(state.loading).toBe(true);

			await promise;

			state = store.getState().playlists;
			expect(state.loading).toBe(false);
			expect(state.error).toBeNull();
		});

		it("should handle error when adding playlist fails", async () => {
			(playlistService.addPlaylist as jest.Mock).mockRejectedValue(
				new Error("Failed to add"),
			);

			const store = configureStore({
				reducer: { playlists: reducer },
				preloadedState: { playlists: initialState },
			});

			const name = "Erro Playlist";
			await store.dispatch(addPlaylist(name));
			const state = store.getState().playlists;

			expect(state.list).toEqual([]); // deve remover o item otimista
			expect(state.error).toBe("Erro ao adicionar playlist no servidor");
			expect(state.loading).toBe(false);
		});
	});
});
