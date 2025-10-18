import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import menuReducer from "../../store/slices/menusSlice";
import type { MenuState } from "../../types/menu.types";
import Sidebar from "../Sidebar";

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useLocation: () => ({
		pathname: "/home",
	}),
	useNavigate: () => mockNavigate,
}));

// Mock initial state
const initialMenuState: MenuState = {
	items: [
		{ name: "Home", icon: "Home", route: "/" },
		{ name: "Artistas", icon: "Album", route: "/artists" },
		{ name: "Playlists", icon: "PlayCircle", route: "/playlists" },
		{ name: "Perfil", icon: "Person", route: "/profile" },
	],
	activeItem: "Home",
};

const createTestStore = (preloadedState?: Partial<{ menu: MenuState }>) => {
	return configureStore({
		reducer: {
			menu: menuReducer,
		},
		preloadedState: {
			menu: preloadedState?.menu || initialMenuState,
		},
	});
};

const renderWithProviders = (
	ui: React.ReactElement,
	store = createTestStore(),
) => {
	return render(
		<Provider store={store}>
			<BrowserRouter>{ui}</BrowserRouter>
		</Provider>,
	);
};

describe("Sidebar Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("Desktop View", () => {
		it("should render all menu items in desktop mode", () => {
			renderWithProviders(<Sidebar isMobile={false} />);

			expect(screen.getByText("Home")).toBeInTheDocument();
			expect(screen.getByText("Artistas")).toBeInTheDocument();
			expect(screen.getByText("Playlists")).toBeInTheDocument();
			expect(screen.getByText("Perfil")).toBeInTheDocument();
		});

		it("should render the logo in desktop mode", () => {
			renderWithProviders(<Sidebar isMobile={false} />);

			const logo = screen.getByAltText("Logo");
			expect(logo).toBeInTheDocument();
		});

		it("should highlight the active item", () => {
			const store = createTestStore({
				menu: { ...initialMenuState, activeItem: "Artistas" },
			});
			renderWithProviders(<Sidebar isMobile={false} />, store);

			const artistasButton = screen.getByText("Artistas").closest("a");
			expect(artistasButton).toHaveStyle({ color: "rgb(29, 185, 84)" }); // #1DB954 em RGB
		});

		it("should update the active item when clicked", async () => {
			const store = createTestStore();
			renderWithProviders(<Sidebar isMobile={false} />, store);

			const playlistsButton = screen.getByText("Playlists");
			fireEvent.click(playlistsButton);

			await waitFor(() => {
				const state = store.getState();
				expect(state.menu.activeItem).toBe("Playlists");
			});
		});

		it("should render the correct icons for each item", () => {
			renderWithProviders(<Sidebar isMobile={false} />);

			const listItems = screen.getAllByRole("link");
			expect(listItems).toHaveLength(4);
		});
	});

	describe("Mobile View", () => {
		it("should render the menu button in mobile mode", () => {
			renderWithProviders(<Sidebar isMobile={true} />);

			const menuButton = screen.getByRole("button");
			expect(menuButton).toBeInTheDocument();
		});

		it("should render the text 'Menu' in the toolbar", () => {
			renderWithProviders(<Sidebar isMobile={true} />);

			expect(screen.getByText("Menu")).toBeInTheDocument();
		});

		it("should not render the logo in mobile mode", () => {
			renderWithProviders(<Sidebar isMobile={true} />);

			const logo = screen.queryByAltText("Logo");
			expect(logo).not.toBeInTheDocument();
		});

		it("should open the drawer when the menu button is clicked", async () => {
			renderWithProviders(<Sidebar isMobile={true} />);

			const menuButton = screen.getByRole("button");
			fireEvent.click(menuButton);

			await waitFor(() => {
				expect(screen.getByText("Home")).toBeVisible();
				expect(screen.getByText("Artistas")).toBeVisible();
			});
		});

		it("should close the drawer when a menu item is clicked", async () => {
			renderWithProviders(<Sidebar isMobile={true} />);

			const menuButton = screen.getByRole("button");
			fireEvent.click(menuButton);

			await waitFor(() => {
				expect(screen.getByText("Home")).toBeVisible();
			});

			const homeButton = screen.getByText("Home");
			fireEvent.click(homeButton);

			await waitFor(() => {
				const homeLink = screen.queryByText("Home");
				expect(homeLink).not.toBeVisible();
			});
		});
	});

	describe("Navigation", () => {
		it("should navigate to the correct route when an item is clicked", () => {
			renderWithProviders(<Sidebar isMobile={false} />);

			const artistasLink = screen.getByText("Artistas").closest("a");
			expect(artistasLink).toHaveAttribute("href", "/artists");
		});

		it("should update the active item based on the current route", () => {
			const store = createTestStore();

			jest
				.spyOn(require("react-router-dom"), "useLocation")
				.mockReturnValue({ pathname: "/artists" });

			renderWithProviders(<Sidebar isMobile={false} />, store);

			waitFor(() => {
				const state = store.getState();
				expect(state.menu.activeItem).toBe("Artistas");
			});
		});
	});

	describe("Edge Cases", () => {
		it("should handle an empty item list", () => {
			const store = createTestStore({
				menu: { items: [], activeItem: "" },
			});
			renderWithProviders(<Sidebar isMobile={false} />, store);

			const listItems = screen.queryAllByRole("link");
			expect(listItems).toHaveLength(0);
		});

		it("should handle a non-existent active item", () => {
			const store = createTestStore({
				menu: { ...initialMenuState, activeItem: "NonExistent" },
			});
			renderWithProviders(<Sidebar isMobile={false} />, store);

			const homeButton = screen.getByText("Home").closest("a");
			expect(homeButton).toHaveStyle({ color: "white" });
		});
	});
});
