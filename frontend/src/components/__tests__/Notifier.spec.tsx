import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorNotifier } from "../Notifier";

describe("Notifier", () => {
	it("should not render when error is null", () => {
		const { container } = render(<ErrorNotifier error={null} />);

		expect(container.firstChild).toBeNull();
	});

	it("should render error message when error is provided", () => {
		render(<ErrorNotifier error="Something went wrong" />);

		expect(screen.getByText("Something went wrong")).toBeInTheDocument();
	});

	it("should render Alert with error severity", () => {
		render(<ErrorNotifier error="Test error" />);

		const alert = screen.getByRole("alert");
		expect(alert).toBeInTheDocument();
		expect(alert).toHaveClass("MuiAlert-filledError");
	});

	it("should show alert when error changes from null to a value", async () => {
		const { rerender } = render(<ErrorNotifier error={null} />);

		expect(screen.queryByRole("alert")).not.toBeInTheDocument();

		rerender(<ErrorNotifier error="New error appeared" />);

		await waitFor(() => {
			expect(screen.getByText("New error appeared")).toBeInTheDocument();
		});
	});

	it("should call onClose when close button is clicked", async () => {
		const handleClose = jest.fn();
		const user = userEvent.setup();

		render(<ErrorNotifier error="Test error" onClose={handleClose} />);

		const closeButton = screen.getByRole("button", { name: /close/i });
		await user.click(closeButton);

		expect(handleClose).toHaveBeenCalledTimes(1);
	});

	it("should close alert when close button is clicked", async () => {
		const user = userEvent.setup();

		render(<ErrorNotifier error="Test error" />);

		expect(screen.getByText("Test error")).toBeInTheDocument();

		const closeButton = screen.getByRole("button", { name: /close/i });
		await user.click(closeButton);

		await waitFor(() => {
			expect(screen.queryByText("Test error")).not.toBeInTheDocument();
		});
	});

	it("should work without onClose callback", async () => {
		const user = userEvent.setup();

		render(<ErrorNotifier error="Test error" />);

		const closeButton = screen.getByRole("button", { name: /close/i });

		// Should not throw error when clicking close without onClose prop
		await expect(user.click(closeButton)).resolves.not.toThrow();
	});

	it("should render with fixed position styling", () => {
		render(<ErrorNotifier error="Test error" />);

		const alert = screen.getByRole("alert");
		const computedStyle = window.getComputedStyle(alert);

		expect(computedStyle.position).toBe("fixed");
	});

	it("should update error message when error prop changes", async () => {
		const { rerender } = render(<ErrorNotifier error="First error" />);

		expect(screen.getByText("First error")).toBeInTheDocument();

		rerender(<ErrorNotifier error="Second error" />);

		await waitFor(() => {
			expect(screen.getByText("Second error")).toBeInTheDocument();
			expect(screen.queryByText("First error")).not.toBeInTheDocument();
		});
	});
});
