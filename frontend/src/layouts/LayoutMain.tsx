import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const LayoutMain = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Box display="flex" height="100vh" overflow="hidden">
			<Sidebar isMobile={isMobile} />
			<Box
				flexGrow={1}
				sx={{
					pt: isMobile ? "64px" : 2,
					bgcolor: "#111",
					color: "white",
				}}
			>
				<Outlet />
			</Box>
		</Box>
	);
};

export default LayoutMain;
