// src/components/Sidebar.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMenuItems, selectActiveItem, setActiveItem } from "../store/slices/menusSlice";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Button } from "@mui/material";
import * as Icons from "@mui/icons-material";
import { Link } from "react-router-dom";
import type { RootState } from "../store";
import type { MenuItem } from "../types/menu.types";

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
            const Icon = (Icons as any)[item.icon];
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
        <Icons.Download sx={{ mr: 1 }} />
        Instalar PWA
      </Button>
    </Box>
  );
};

export default Sidebar;
