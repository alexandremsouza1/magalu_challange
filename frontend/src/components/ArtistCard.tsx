import { Avatar, Box, Typography } from "@mui/material";
import type { Artist } from "../store/slices/artistsSlice";

type Props = {
	artist: Artist;
};

const ArtistCard = ({ artist }: Props) => {
	return (
		<Box display="flex" alignItems="center" gap={2} mb={2}>
			<Avatar
				src={artist.image}
				alt={artist.name}
				sx={{ width: 60, height: 60 }}
			/>
			<Typography variant="body1">{artist.name}</Typography>
		</Box>
	);
};

export default ArtistCard;
