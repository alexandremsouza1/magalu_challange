import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../store";

const ProtectedRoute = () => {
	const user = useSelector((state: RootState) => state.user);

	if (!user?.name || !user?.email) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
