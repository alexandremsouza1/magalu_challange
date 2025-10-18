import { configureStore } from "@reduxjs/toolkit";
import type { MenuItem, MenuState } from "../../../types/menu.types";
import reducer, {
	addMenuItem,
	removeMenuItem,
	selectActiveItem,
	selectMenuItems,
	setActiveItem,
} from "../menusSlice";

describe("menuSlice", () => {
	const initialState: MenuState = {
		items: [
			{ name: "Home", icon: "Home", route: "/" },
			{ name: "Artistas", icon: "Album", route: "/artists" },
			{ name: "Playlists", icon: "PlayCircle", route: "/playlists" },
			{ name: "Perfil", icon: "Person", route: "/profile" },
		],
		activeItem: "Home",
	};

	const mockItem: MenuItem = {
		name: "Home",
		icon: "Home",
		route: "/",
	};

	it("should return the initial state", () => {
		expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
	});

	it("should handle setActiveItem", () => {
		const nextState = reducer(initialState, setActiveItem("Playlists"));
		expect(nextState.activeItem).toBe("Playlists");
	});

	it("should handle addMenuItem", () => {
		const nextState = reducer(initialState, addMenuItem(mockItem));
		expect(nextState.items).toContainEqual(mockItem);
		expect(nextState.items).toHaveLength(initialState.items.length + 1);
	});

	it("should handle removeMenuItem", () => {
		const stateWithExtraItem = reducer(initialState, addMenuItem(mockItem));
		const nextState = reducer(stateWithExtraItem, removeMenuItem("Home"));
		expect(nextState.items).not.toContainEqual(mockItem);
		expect(nextState.items).toHaveLength(initialState.items.length - 1);
	});

	describe("selectors", () => {
		const store = configureStore({
			reducer: { menu: reducer },
			preloadedState: { menu: initialState },
		});

		it("should select menu items", () => {
			const items = selectMenuItems(store.getState());
			expect(items).toEqual(initialState.items);
		});

		it("should select active item", () => {
			const active = selectActiveItem(store.getState());
			expect(active).toBe("Home");
		});
	});
});
