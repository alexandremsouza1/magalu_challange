import { Box, Button, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import type React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../store";
import { selectActiveItem, selectMenuItems, setActiveItem } from "../store/slices/menusSlice";
import { Home, Album, PlayCircle, Person, Download } from "@mui/icons-material";
import type { MenuItem, MenuItemIcon } from "../types/menu.types";

export const iconMap: Record<MenuItemIcon, React.ElementType> = {
  Home,
  Album,
  PlayCircle,
  Person,
};



const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => selectMenuItems(state));
  const activeItem = useSelector((state: RootState) => selectActiveItem(state));

  const handleClick = (name: string) => {
    dispatch(setActiveItem(name));
  };

  return (
    <Box
      sx={{
        width: 240,
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
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
          Spotify
        </Typography>

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
};

export default Sidebar;
