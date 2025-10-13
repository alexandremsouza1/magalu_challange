// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { ReactNode } from "react";
import LayoutMain from "../layouts/LayoutMain";

type ProtectedRouteProps = {
	children: ReactNode;
};

const Layout = LayoutMain as React.ComponentType<{ children?: ReactNode }>;

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const user = useSelector((state: any) => state.user);

	if (!user.name || !user.email) {
		return <Navigate to="/login" replace />;
	}

	return <Layout>{children}</Layout>;
};

export default ProtectedRoute;
