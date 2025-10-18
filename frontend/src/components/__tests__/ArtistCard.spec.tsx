import { render, screen } from "@testing-library/react";
import type { Artist } from "../../store/slices/artistsSlice";
import ArtistCard from "../ArtistCard";

describe("ArtistCard", () => {
	const mockArtist: Artist = {
		id: "1",
		name: "Taylor Swift",
		image: "https://example.com/taylor-swift.jpg",
		date: "2020-12-13",
	};

	it("should render artist name", () => {
		render(<ArtistCard artist={mockArtist} />);

		expect(screen.getByText("Taylor Swift")).toBeInTheDocument();
	});

	it("should render artist avatar with correct image", () => {
		render(<ArtistCard artist={mockArtist} />);

		const avatar = screen.getByAltText("Taylor Swift");
		expect(avatar).toBeInTheDocument();
		expect(avatar).toHaveAttribute(
			"src",
			"https://example.com/taylor-swift.jpg",
		);
	});

	it("should render avatar with correct dimensions", () => {
		render(<ArtistCard artist={mockArtist} />);

		const avatar = screen.getByAltText("Taylor Swift");
		const computedStyle = window.getComputedStyle(avatar);

		expect(computedStyle.width).toBe("100%");
		expect(computedStyle.height).toBe("100%");
	});

	it("should render with correct layout structure", () => {
		const { container } = render(<ArtistCard artist={mockArtist} />);

		const boxElement = container.firstChild as HTMLElement;
		const computedStyle = window.getComputedStyle(boxElement);

		expect(computedStyle.display).toBe("flex");
		expect(computedStyle.alignItems).toBe("center");
	});

	it("should handle artist without image", () => {
		const artistWithoutImage: Artist = {
			id: "2",
			name: "Ed Sheeran",
			image: "",
			date: "2019-11-12",
		};

		render(<ArtistCard artist={artistWithoutImage} />);

		expect(screen.getByText("Ed Sheeran")).toBeInTheDocument();

		expect(screen.getByTestId("PersonIcon")).toBeInTheDocument();
	});
});
