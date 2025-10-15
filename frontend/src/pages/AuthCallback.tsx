import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/services/auth.service";
import { setUser } from "../store/slices/userSlice";

const AuthCallback = () => {
	const params = new URLSearchParams(window.location.search);
	const token = params.get("token");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const authenticate = async () => {
			if (token) {
				try {
					localStorage.setItem("token", token);
					const { email, display_name, images } =
						await authService.getProfile();
					const avatarUrl = images.length > 0 ? images[0].url : "";
					dispatch(
						setUser({
							name: display_name,
							email,
							avatarUrl,
						}),
					);
					navigate("/");
				} catch (error) {
					console.error("Authentication failed", error);
					navigate("/login");
				}
			} else {
				navigate("/login");
			}
		};
		authenticate();
	}, [token, navigate, dispatch]);

	return <div>Authenticating...</div>;
};

export default AuthCallback;
