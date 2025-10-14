import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Artist = {
	id: string;
	name: string;
	image: string;
};

type ArtistsState = {
	list: Artist[];
};

const initialState: ArtistsState = {
	list: [
		{
			id: "1",
			name: "Black Alien",
			image: "https://i.scdn.co/image/ab6761610000e5eb9a1b6e9cb60e3f7f3b8a6f2a",
		},
		{
			id: "2",
			name: "Iguinho e Lulinha",
			image: "https://i.scdn.co/image/ab6761610000e5ebf88a9a3e8cbe40eac16f9839",
		},
		{
			id: "3",
			name: "O Rappa",
			image: "https://i.scdn.co/image/ab6761610000e5eb71bfc81250a6a9a58a34f1b0",
		},
		{
			id: "4",
			name: "NX Zero",
			image: "https://i.scdn.co/image/ab6761610000e5eb3b153cb46e8f84c6d83e05f9",
		},
	],
};

const artistsSlice = createSlice({
	name: "artists",
	initialState,
	reducers: {
		setArtists(state, action: PayloadAction<Artist[]>) {
			state.list = action.payload;
		},
	},
});

export const { setArtists } = artistsSlice.actions;
export default artistsSlice.reducer;
