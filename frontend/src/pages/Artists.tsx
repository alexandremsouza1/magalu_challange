// src/pages/Artists.tsx
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ArtistCard from "../components/ArtistCard";
import type { RootState } from "../store";

const Artists = () => {
	const artists = useSelector((state: RootState) => state.artists.list);

	return (
		<Box
			sx={{
				height: "100vh",
				p: 4,
			}}
		>
			<Typography variant="h5" fontWeight="bold">
				Top Artistas
			</Typography>
			<Typography variant="body2" color="gray" mb={4}>
				Aqui você encontra seus artistas preferidos
			</Typography>

			{artists.map((artist) => (
				<ArtistCard key={artist.id} artist={artist} />
			))}
		</Box>
	);
};

export default Artists;
