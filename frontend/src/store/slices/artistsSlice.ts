import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";
import { artistsService } from "../../api/services/artists.service";
import type { SpotifyTopArtistsResponse } from "../../types/spotify.types";

export type Artist = {
	id: string;
	name: string;
	image: string;
};

type ArtistsState = {
	list: Artist[];
	loading: boolean;
	error: string | null;
};

const initialState: ArtistsState = {
	list: [],
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
			}));

			return artists;
		} catch (error) {
			console.error("Error fetching artists:", error);
			return rejectWithValue("Erro ao buscar artistas");
		}
	},
);

const artistsSlice = createSlice({
	name: "artists",
	initialState,
	reducers: {
		setArtists(state, action: PayloadAction<Artist[]>) {
			state.list = action.payload;
		},
	},
	extraReducers: (builder) => {
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
	},
});

export const { setArtists } = artistsSlice.actions;
export default artistsSlice.reducer;
