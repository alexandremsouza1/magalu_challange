import CloseIcon from "@mui/icons-material/Close";
import {
	Box,
	Button,
	Dialog,
	DialogContent,
	IconButton,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";

type CreatePlaylistDialogProps = {
	open: boolean;
	onClose: () => void;
	onCreate: (name: string) => void;
};

const CreatePlaylistDialog = ({
	open,
	onClose,
	onCreate,
}: CreatePlaylistDialogProps) => {
	const [name, setName] = useState("Minha playlist #1");

	const handleCreate = () => {
		if (name.trim()) {
			onCreate(name.trim());
			onClose();
		}
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			PaperProps={{
				sx: {
					backgroundColor: "#282828",
					borderRadius: 3,
					color: "#fff",
					width: 400,
					textAlign: "center",
					p: 2,
				},
			}}
		>
			<IconButton
				onClick={onClose}
				sx={{
					position: "absolute",
					right: 16,
					top: 16,
					color: "#fff",
				}}
			>
				<CloseIcon />
			</IconButton>

			<DialogContent>
				<Typography variant="body1" mb={2}>
					Dê um nome a sua playlist
				</Typography>

				<TextField
					fullWidth
					variant="standard"
					value={name}
					onChange={(e) => setName(e.target.value)}
					InputProps={{
						disableUnderline: false,
						style: {
							color: "#fff",
							fontWeight: 600,
							fontSize: "1.2rem",
							textAlign: "center",
						},
					}}
					inputProps={{ style: { textAlign: "center" } }}
				/>

				<Box mt={4}>
					<Button
						onClick={handleCreate}
						variant="contained"
						sx={{
							backgroundColor: "#1DB954",
							color: "#000",
							textTransform: "none",
							fontWeight: 600,
							borderRadius: "50px",
							px: 4,
							"&:hover": {
								backgroundColor: "#1ed760",
							},
						}}
					>
						Criar
					</Button>
				</Box>
			</DialogContent>
		</Dialog>
	);
};

export default CreatePlaylistDialog;
