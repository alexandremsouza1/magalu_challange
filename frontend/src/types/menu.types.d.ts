export type MenuItemIcon = "Home" | "Album" | "PlayCircle" | "Person";

export type MenuItem = {
	name: string;
	icon: MenuItemIcon;
	route: string;
};
