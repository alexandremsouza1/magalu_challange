import {
	type ActionReducerMapBuilder,
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";
import { playlistService } from "../../api/services/playlist.service";
import type { SpotifyPlaylist } from "../../types/spotify.types";

export type Playlist = {
	id: string;
	name: string;
	image: string;
	owner: string;
	tracksCount: number;
};

type PlaylistsState = {
	list: Playlist[];
	loading: boolean;
	error: string | null;
};

const initialState: PlaylistsState = {
	list: [],
	loading: false,
	error: null,
};

export const getPlaylists = createAsyncThunk<
	Playlist[],
	void,
	{ state: { playlists: PlaylistsState }; rejectValue: string }
>("playlists/getPlaylists", async (_, { getState, rejectWithValue }) => {
	const state = getState();
	const alreadyLoaded = state.playlists.list.length > 0;

	if (alreadyLoaded) {
		console.info("✅ Playlists já carregadas — evitando nova chamada.");
		return state.playlists.list;
	}

	try {
		const response = await playlistService.getPlaylists();

		const playlists: Playlist[] = response.items.map(
			(playlist: SpotifyPlaylist) => ({
				id: playlist.id,
				name: playlist.name,
				image: playlist.images?.[0]?.url || "",
				owner: playlist.owner?.display_name ?? "Desconhecido",
				tracksCount: playlist.tracks?.total ?? 0,
			}),
		);

		return playlists;
	} catch (error) {
		console.error("Error fetching playlists:", error);
		return rejectWithValue("Erro ao buscar playlists");
	}
});

export const addPlaylist = createAsyncThunk<
	Playlist,
	string,
	{ rejectValue: string }
>("playlists/addPlaylist", async (name: string, { rejectWithValue }) => {
	try {
		const playlist = await playlistService.addPlaylist(name);
		return playlist;
	} catch (error) {
		console.error("Error adding playlist:", error);
		return rejectWithValue("Erro ao adicionar playlist no servidor");
	}
});

const getPlaylistBuilder = (
	builder: ActionReducerMapBuilder<PlaylistsState>,
) => {
	builder
		.addCase(getPlaylists.pending, (state) => {
			state.loading = true;
			state.error = null;
		})
		.addCase(getPlaylists.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		})
		.addCase(getPlaylists.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload ?? "Erro desconhecido";
		});
};

const addPlaylistBuilder = (
	builder: ActionReducerMapBuilder<PlaylistsState>,
) => {
	builder
		.addCase(addPlaylist.pending, (state, action) => {
			state.list.push({
				id: `temp-id-${Date.now()}`,
				name: action.meta.arg,
				image: "",
				owner: "Você",
				tracksCount: 0,
			});
			state.error = null;
			if (state.list.length === 1) {
				state.loading = true;
			}
		})
		.addCase(addPlaylist.fulfilled, (state) => {
			state.loading = false;
			console.info("✅ Playlist sincronizada com o servidor");
		})
		.addCase(addPlaylist.rejected, (state, action) => {
			const failedPlaylistId = action.meta.arg;
			state.list = state.list.filter((p) => p.id !== failedPlaylistId);
			state.error = action.payload ?? "Erro ao sincronizar playlist";
			state.loading = false;
		});
};

const playlistsSlice = createSlice({
	name: "playlists",
	initialState,
	reducers: {
		setPlaylists(state, action: PayloadAction<Playlist[]>) {
			state.list = action.payload;
		},
	},
	extraReducers: (builder) => {
		getPlaylistBuilder(builder);
		addPlaylistBuilder(builder);
	},
});

export const { setPlaylists } = playlistsSlice.actions;
export default playlistsSlice.reducer;
