export type MenuItemIcon = "Home" | "Album" | "PlayCircle" | "Person";

export type MenuItem = {
	name: string;
	icon: MenuItemIcon;
	route: string;
};


export type MenuState = {
	items: MenuItem[];
	activeItem: string;
}