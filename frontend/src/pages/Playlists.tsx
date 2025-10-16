import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePlaylistDialog from "../components/CreatePlaylistDialog";
import type { AppDispatch, RootState } from "../store";
import { addPlaylist, getPlaylists } from "../store/slices/playlistSlice";

const Playlists = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [open, setOpen] = useState(false);

	const { list, loading, error } = useSelector(
		(state: RootState) => state.playlists,
	);

	const handleCreatePlaylist = (name: string) => {
		dispatch(addPlaylist(name));
		setOpen(false);
	};

	useEffect(() => {
		dispatch(getPlaylists());
	}, [dispatch]);

	return (
		<Box
			sx={{ backgroundColor: "#000", color: "#fff", minHeight: "100vh", p: 4 }}
		>
			<CreatePlaylistDialog
				open={open}
				onClose={() => setOpen(false)}
				onCreate={handleCreatePlaylist}
			/>
			{/* Cabeçalho */}
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mb={4}
			>
				<Box>
					<Typography variant="h5" fontWeight="bold">
						Minhas Playlists
					</Typography>
					<Typography variant="body2" color="gray">
						Sua coleção pessoal de playlists
					</Typography>
				</Box>

				<Button
					variant="contained"
					onClick={() => setOpen(true)}
					sx={{
						backgroundColor: "#1DB954",
						color: "#000",
						textTransform: "none",
						fontWeight: 600,
						borderRadius: "50px",
						"&:hover": { backgroundColor: "#1ed760" },
					}}
				>
					Criar playlist
				</Button>
			</Box>

			{/* Conteúdo */}
			{loading && (
				<Box display="flex" justifyContent="center" alignItems="center" mt={4}>
					<CircularProgress color="success" />
				</Box>
			)}

			{error && (
				<Typography color="error" textAlign="center">
					{error}
				</Typography>
			)}

			{!loading &&
				!error &&
				(list.length === 0 ? (
					<Typography color="gray">Nenhuma playlist encontrada.</Typography>
				) : (
					<List>
						{list.map((playlist) => (
							<ListItem
								key={playlist.id}
								sx={{ "&:hover": { backgroundColor: "#111" }, borderRadius: 1 }}
							>
								<ListItemAvatar>
									<Avatar
										src={playlist.image}
										alt={playlist.name}
										variant="square"
										sx={{ width: 64, height: 64, borderRadius: 1, mr: 2 }}
									/>
								</ListItemAvatar>

								<ListItemText
									primary={
										<Typography fontWeight="medium" color="#fff">
											{playlist.name}
										</Typography>
									}
									secondary={
										<Typography color="gray" variant="body2">
											{playlist.owner}
										</Typography>
									}
								/>
							</ListItem>
						))}
					</List>
				))}
		</Box>
	);
};

export default Playlists;
