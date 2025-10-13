// src/features/menu/menuSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MenuItem } from "../../types/menu.types";

interface MenuState {
  items: MenuItem[];
  activeItem: string;
}

const initialState: MenuState = {
  items: [
    { name: "Home", icon: "Home", route: "/" },
    { name: "Artistas", icon: "Album", route: "/artistas" },
    { name: "Playlists", icon: "PlayCircle", route: "/playlists" },
    { name: "Perfil", icon: "Person", route: "/perfil" },
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
});

export const { setActiveItem, addMenuItem, removeMenuItem } = menuSlice.actions;
export const selectMenuItems = (state: { menu: MenuState }) => state.menu.items;
export const selectActiveItem = (state: { menu: MenuState }) => state.menu.activeItem;
export default menuSlice.reducer;
