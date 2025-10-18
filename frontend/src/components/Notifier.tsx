import { Alert, Slide } from "@mui/material";
import { useEffect, useState } from "react";

type ErrorNotifierProps = {
	error: string | null;
	onClose?: () => void;
};

interface SuccessNotifierProps {
	message?: string;
	onClose?: () => void;
}

export function ErrorNotifier({ error, onClose }: ErrorNotifierProps) {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (error) {
			setOpen(true);
		}
	}, [error]);

	const handleClose = () => {
		setOpen(false);
		if (onClose) onClose();
	};

	if (!error) return null;

	return (
		<Slide direction="up" in={open} mountOnEnter unmountOnExit>
			<Alert
				severity="error"
				variant="filled"
				onClose={handleClose}
				sx={{
					boxShadow: 3,
					borderRadius: 2,
					fontSize: "0.9rem",
					position: "fixed",
					top: 16,
					right: 16,
					width: "auto",
					maxWidth: "90%",
					minWidth: 200,
					whiteSpace: "nowrap",
				}}
			>
				{error}
			</Alert>
		</Slide>
	);
}

export function SuccessNotifier({ message, onClose }: SuccessNotifierProps) {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (message) {
			setOpen(true);

			const timer = setTimeout(() => {
				setOpen(false);
				if (onClose) onClose();
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [message, onClose]);

	const handleClose = () => {
		setOpen(false);
		if (onClose) onClose();
	};

	if (!message) return null;

	return (
		<Slide direction="up" in={open} mountOnEnter unmountOnExit>
			<Alert
				severity="success"
				variant="filled"
				onClose={handleClose}
				sx={{
					boxShadow: 3,
					borderRadius: 2,
					fontSize: "0.9rem",
					position: "fixed",
					top: 16,
					right: 16,
					width: "auto",
					maxWidth: "90%",
					minWidth: 200,
					whiteSpace: "nowrap",
				}}
			>
				{message}
			</Alert>
		</Slide>
	);
}
