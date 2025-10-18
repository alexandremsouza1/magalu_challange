import type { ReactNode } from "react";

export interface MenuItem {
	id: string;
	label: string;
	path: string;
	icon?: ReactNode;
}

export interface NavigationStore {
	activeItem: MenuItem;
	menuItems: MenuItem[];
	setActive: (item: MenuItem) => void;
	isMenuOpen: boolean;
	toggleMenu: () => void;
}

export interface LoadingState {
	loading: boolean;
	setLoading: (value: boolean) => void;
}
