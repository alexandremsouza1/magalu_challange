// src/features/menu/menuSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface MenuItem {
  name: string;
  icon: string;
  route: string;
}

interface MenuState {
  items: MenuItem[];
}

const initialState: MenuState = {
  items: [
    { name: "Home", icon: "Home", route: "/" },
    { name: "Artistas", icon: "Album", route: "/artistas" },
    { name: "Playlists", icon: "PlayCircle", route: "/playlists" },
    { name: "Perfil", icon: "Person", route: "/perfil" },
  ],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
});

export const selectMenuItems = (state: { menu: MenuState }) => state.menu.items;
export default menuSlice.reducer;
