import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ArtistCard from "../components/ArtistCard";
import type { AppDispatch, RootState } from "../store";
import { getArtists } from "../store/slices/artistsSlice";
import { useEffect } from "react";

const Artists = () => {
	const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error } = useSelector((state: RootState) => state.artists);

  useEffect(() => {
    dispatch(getArtists({ range: "short_term", limit: 10, offset: 0 }));
  }, [dispatch]);

	if (loading) {
		return <Typography>Carregando...</Typography>;
	}

	if (error) {
		return <Typography color="error">{error}</Typography>;
	}

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
			{list.map((artist) => (
				<ArtistCard key={artist.id} artist={artist} />
			))}
		</Box>
	);
};

export default Artists;
