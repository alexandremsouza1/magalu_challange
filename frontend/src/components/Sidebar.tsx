import {
	Album,
	Download,
	Home,
	Menu as MenuIcon,
	Person,
	PlayCircle,
} from "@mui/icons-material";
import {
	Box,
	Button,
	Drawer,
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
} from "@mui/material";
import type React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import type { RootState } from "../store";
import {
	selectActiveItem,
	selectMenuItems,
	setActiveItem,
} from "../store/slices/menusSlice";
import type { MenuItem, MenuItemIcon } from "../types/menu.types";

export const iconMap: Record<MenuItemIcon, React.ElementType> = {
	Home,
	Album,
	PlayCircle,
	Person,
};

type SidebarProps = {
	isMobile: boolean;
};

const drawerWidth = 240;

const Sidebar = ({ isMobile }: SidebarProps) => {
	const dispatch = useDispatch();
	const items = useSelector((state: RootState) => selectMenuItems(state));
	const activeItem = useSelector((state: RootState) => selectActiveItem(state));
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

	const handleClick = (name: string) => {
		dispatch(setActiveItem(name));
		if (isMobile) setMobileOpen(false);
	};

	const drawerContent = (
		<Box
			sx={{
				width: drawerWidth,
				height: "100vh",
				bgcolor: "#000",
				color: "white",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				p: 2,
			}}
		>
			<Box>
				{!isMobile && (
					<img
						src={logo}
						alt="Logo"
						style={{ width: "100%", marginBottom: "16px" }}
					/>
				)}
				<List>
					{items.map((item: MenuItem) => {
						const Icon = iconMap[item.icon];
						const isActive = activeItem === item.name;
						return (
							<ListItemButton
								key={item.name}
								component={Link}
								to={item.route}
								onClick={() => handleClick(item.name)}
								sx={{
									color: isActive ? "#1DB954" : "white",
									bgcolor: isActive ? "#111" : "transparent",
									"&:hover": { bgcolor: "#111" },
								}}
							>
								<ListItemIcon sx={{ color: isActive ? "#1DB954" : "white" }}>
									<Icon />
								</ListItemIcon>
								<ListItemText primary={item.name} />
							</ListItemButton>
						);
					})}
				</List>
			</Box>

			<Button
				variant="text"
				sx={{
					color: "white",
					justifyContent: "flex-start",
					textTransform: "none",
				}}
			>
				<Download sx={{ mr: 1 }} />
				Instalar PWA
			</Button>
		</Box>
	);

	if (isMobile) {
		return (
			<>
				<Toolbar
					sx={{
						position: "fixed",
						top: 0,
						left: 0,
						zIndex: 1201,
						bgcolor: "#000",
						width: "100%",
					}}
				>
					<IconButton onClick={handleDrawerToggle} color="inherit">
						<MenuIcon />
					</IconButton>
					<Box component="span" sx={{ ml: 1, fontWeight: "bold" }}>
						Menu
					</Box>
				</Toolbar>

				<Drawer
					anchor="left"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{ keepMounted: true }}
					slotProps={{
						paper: {
							sx: { bgcolor: "#000", color: "white", width: drawerWidth },
						},
					}}
				>
					<Toolbar />
					{drawerContent}
				</Drawer>
			</>
		);
	}

	return (
		<Box
			sx={{
				width: drawerWidth,
				height: "100vh",
				bgcolor: "#000",
				color: "white",
			}}
		>
			{drawerContent}
		</Box>
	);
};

export default Sidebar;
