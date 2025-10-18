import {
	type ActionReducerMapBuilder,
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";
import { artistsService } from "../../api/services/artists.service";
import type { Artist } from "../../types/artists.type";
import type { SpotifyTopArtistsResponse } from "../../types/spotify.types";

type ArtistsState = {
	list: Artist[];
	albums: Artist[];
	loading: boolean;
	error: string | null;
};

const initialState: ArtistsState = {
	list: [],
	albums: [],
	loading: false,
	error: null,
};

export const getArtists = createAsyncThunk<
	Artist[],
	{ range: string; limit: number; offset: number },
	{ state: { artists: ArtistsState }; rejectValue: string }
>(
	"artists/getArtists",
	async ({ range, limit, offset }, { getState, rejectWithValue }) => {
		const state = getState();
		const alreadyLoaded = state.artists.list.length > 0;

		if (alreadyLoaded) {
			return state.artists.list;
		}

		try {
			const response: SpotifyTopArtistsResponse =
				await artistsService.getArtists({
					range,
					limit,
					offset,
				});

			const artists: Artist[] = response.items.map((artist) => ({
				id: artist.id,
				name: artist.name,
				image: artist.images[0]?.url || "",
				date: "",
			}));

			return artists;
		} catch (error) {
			return rejectWithValue("Erro ao buscar artistas");
		}
	},
);

export const getAlbumsArtist = createAsyncThunk<
	Artist[],
	string,
	{ state: { artists: ArtistsState }; rejectValue: string }
>("artists/getAlbumsArtist", async (id, { rejectWithValue }) => {
	try {
		const albums = await artistsService.getAlbumsArtist(id);
		return albums.items.map((album) => ({
			id: album.id,
			name: album.name,
			image: album.images[0]?.url || "",
			date: album.release_date,
		}));
	} catch (error) {
		return rejectWithValue("Erro ao buscar detalhes do artista");
	}
});

const builderGetArtist = (builder: ActionReducerMapBuilder<ArtistsState>) => {
	builder
		.addCase(getArtists.pending, (state) => {
			state.loading = true;
			state.error = null;
		})
		.addCase(getArtists.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		})
		.addCase(getArtists.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload ?? "Erro desconhecido";
		});
};

const builderGetAlbumsArtist = (
	builder: ActionReducerMapBuilder<ArtistsState>,
) => {
	builder
		.addCase(getAlbumsArtist.pending, (state: ArtistsState) => {
			state.loading = true;
			state.error = null;
		})
		.addCase(
			getAlbumsArtist.fulfilled,
			(state: ArtistsState, action: PayloadAction<Artist[]>) => {
				state.loading = false;
				state.albums = action.payload;
			},
		)
		.addCase(getAlbumsArtist.rejected, (state: ArtistsState, action) => {
			state.loading = false;
			state.error = action.payload ?? "Erro desconhecido";
		});
};

const artistsSlice = createSlice({
	name: "artists",
	initialState,
	reducers: {
		setArtists(state, action: PayloadAction<Artist[]>) {
			state.list = action.payload;
		},
	},
	extraReducers: (builder) => {
		builderGetArtist(builder);
		builderGetAlbumsArtist(builder);
	},
});

export const { setArtists } = artistsSlice.actions;
export default artistsSlice.reducer;

export type { Artist, ArtistsState };
