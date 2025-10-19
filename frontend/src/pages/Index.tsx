import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { CALLBACK_URL } from "../config/env";

const Index = () => {
	const navigate = useNavigate();

	const handleSpotifyLogin = () => {
		window.location.href = CALLBACK_URL;
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			navigate("/");
		}
	}, [navigate]);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "100vh",
				gap: 1,
				px: 2,
			}}
		>
			<Box sx={{ color: "white", mb: 2 }}>
				<img
					src={logo}
					alt="Logo do Spotify"
					style={{ width: "300px", height: "100px", objectFit: "contain" }}
				/>
			</Box>

			<Typography
				variant="h6"
				sx={{ color: "white", textAlign: "center", fontSize: "20px" }}
			>
				Entre com sua conta Spotify clicando no botão abaixo
			</Typography>

			<Button
				variant="contained"
				color="primary"
				size="large"
				onClick={handleSpotifyLogin}
				sx={{ mt: 2 }}
			>
				Entrar
			</Button>
		</Box>
	);
};

export default Index;
