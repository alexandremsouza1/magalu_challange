import { fireEvent, render, screen } from "@testing-library/react";
import CreatePlaylistDialog from "../CreatePlaylistDialog";

describe("CreatePlaylistDialog", () => {
	const mockOnClose = jest.fn();
	const mockOnCreate = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		render(
			<CreatePlaylistDialog
				open={true}
				onClose={mockOnClose}
				onCreate={mockOnCreate}
			/>,
		);
	});

	it("renders the modal with correct elements", () => {
		expect(screen.getByText("Dê um nome a sua playlist")).toBeInTheDocument();
		expect(screen.getByDisplayValue("Minha playlist #1")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Criar" })).toBeInTheDocument();
	});

	it("closes the modal when the close button is clicked", () => {
		const closeButton = screen.getByTestId("close-button");
		fireEvent.click(closeButton);
		expect(mockOnClose).toHaveBeenCalled();
	});

	it("calls onCreate with the playlist name when valid", () => {
		const input = screen.getByDisplayValue("Minha playlist #1");
		fireEvent.change(input, { target: { value: "My New Playlist" } });
		fireEvent.click(screen.getByRole("button", { name: "Criar" }));
		expect(mockOnCreate).toHaveBeenCalledWith("My New Playlist");
		expect(mockOnClose).toHaveBeenCalled();
	});

	it("does not call onCreate if input is empty", () => {
		const input = screen.getByDisplayValue("Minha playlist #1");
		fireEvent.change(input, { target: { value: " " } });
		fireEvent.click(screen.getByRole("button", { name: "Criar" }));
		expect(mockOnCreate).not.toHaveBeenCalled();
		expect(mockOnClose).not.toHaveBeenCalled();
	});
});
