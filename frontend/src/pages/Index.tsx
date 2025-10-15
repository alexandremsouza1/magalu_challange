import { Box, Button, Typography } from "@mui/material";
import logo from "../assets/logo.png";

const Index = () => {
	const handleSpotifyLogin = () => {
		window.location.href = "http://127.0.0.1:9095/v1/auth/spotify";
	};

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
