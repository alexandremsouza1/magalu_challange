import { Box, Button, Typography } from "@mui/material";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

const Index = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogin = () => {
		const name = "Usuário Exemplo";
		const email = "usuario@example.com";
		dispatch(setUser({ name, email }));
		navigate("/home");
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
					style={{
						width: "300px",
						height: "100px",
						objectFit: "contain",
					}}
				/>
			</Box>

			<Typography
				variant="h6"
				sx={{
					color: "white",
					textAlign: "center",
					fontSize: "20px",
					whiteSpace: "nowrap",
				}}
			>
				Entra com sua conta Spotify clicando no botão abaixo
			</Typography>

			<Button
				variant="contained"
				color="primary"
				size="large"
				onClick={handleLogin}
				sx={{ mt: 2 }}
			>
				Entrar
			</Button>
		</Box>
	);
};

export default Index;
