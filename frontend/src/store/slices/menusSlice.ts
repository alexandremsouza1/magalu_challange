import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { MenuItem, MenuState } from "../../types/menu.types";
import { setUser } from "./userSlice";

const initialState: MenuState = {
	items: [
		{ name: "Home", icon: "Home", route: "/" },
		{ name: "Artistas", icon: "Album", route: "/artists" },
		{ name: "Playlists", icon: "PlayCircle", route: "/playlists" },
		{ name: "Perfil", icon: "Person", route: "/profile" },
	],
	activeItem: "Home",
};

const menuSlice = createSlice({
	name: "menu",
	initialState,
	reducers: {
		setActiveItem(state, action: PayloadAction<string>) {
			state.activeItem = action.payload;
		},
		addMenuItem(state, action: PayloadAction<MenuItem>) {
			state.items.push(action.payload);
		},
		removeMenuItem(state, action: PayloadAction<string>) {
			state.items = state.items.filter((item) => item.name !== action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(setUser, (state) => {
			state.activeItem = "Home";
		});
	},
});

export const { setActiveItem, addMenuItem, removeMenuItem } = menuSlice.actions;
export const selectMenuItems = (state: { menu: MenuState }) => state.menu.items;
export const selectActiveItem = (state: { menu: MenuState }) =>
	state.menu.activeItem;
export default menuSlice.reducer;
