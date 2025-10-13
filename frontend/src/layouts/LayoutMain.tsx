import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";

const LayoutMain = () => {
	return (
		<Box display="flex">
			<Sidebar />
			<Box flexGrow={1} p={2}>
				<Outlet />
			</Box>
		</Box>
	);
};

export default LayoutMain;