// src/pages/Artists.tsx

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
	Box,
	CircularProgress,
	Grid,
	IconButton,
	Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ArtistCard from "../components/ArtistCard";
import ErrorNotifier from "../components/ErrorNotifier";
import type { AppDispatch, RootState } from "../store";
import { getAlbumsArtist, getArtists } from "../store/slices/artistsSlice";

const Artists = () => {
	const { id } = useParams();
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const { list, albums, loading, error } = useSelector(
		(state: RootState) => state.artists,
	);

	useEffect(() => {
		if (id) {
			dispatch(getAlbumsArtist(id));
		} else {
			dispatch(getArtists({ range: "short_term", limit: 10, offset: 0 }));
		}
	}, [dispatch, id]);

	if (loading) {
		return (
			<Box
				sx={{
					height: "100vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<CircularProgress color="inherit" />
			</Box>
		);
	}

	if (error) {
		return <ErrorNotifier error={error} />;
	}

	return (
		<Box
			sx={{ height: "100vh", p: 4, display: "flex", flexDirection: "column", overflow: "auto" }}
		>
			{id && albums ? (
				<>
					<Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
						<IconButton
							onClick={() => navigate(-1)}
							sx={{ color: "white", mr: 2 }}
						>
							<ArrowBackIcon />
						</IconButton>
					</Box>

					<Grid container spacing={3} sx={{ flex: 1 }}>
						{albums?.map((album) => (
							<Grid
								key={album.id}
								size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}
							>
								<img
									src={album.image}
									alt={album.name}
									style={{
										width: "100%",
										aspectRatio: "1/1",
										borderRadius: 8,
										objectFit: "cover",
									}}
								/>
								<Typography
									variant="subtitle2"
									mt={1}
									sx={{
										width: "100%",
										textAlign: "center",
										overflow: "hidden",
										textOverflow: "ellipsis",
										display: "-webkit-box",
										WebkitLineClamp: 1,
										WebkitBoxOrient: "vertical",
										color: "white",
									}}
								>
									{album.name}
								</Typography>
								<Typography
									variant="caption"
									color="gray"
									sx={{
										width: "100%",
										textAlign: "center",
										overflow: "hidden",
										textOverflow: "ellipsis",
									}}
								>
									{album.date}
								</Typography>
							</Grid>
						))}
					</Grid>
				</>
			) : (
				<>
					<Typography variant="h5" fontWeight="bold" color="white">
						Top Artistas
					</Typography>
					<Typography variant="body2" color="gray" mb={4}>
						Aqui você encontra seus artistas preferidos
					</Typography>

					<Box sx={{ flex: 1, overflow: "auto" }}>
						{list.map((artist) => (
							<Box
								key={artist.id}
								onClick={() => navigate(`/artists/${artist.id}`)}
								sx={{ cursor: "pointer" }}
							>
								<ArtistCard artist={artist} />
							</Box>
						))}
					</Box>
				</>
			)}
		</Box>
	);
};

export default Artists;
