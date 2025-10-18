import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";

jest.mock("react-redux", () => ({
	useSelector: jest.fn(),
}));

describe("ProtectedRoute", () => {
	const mockedUseSelector = useSelector as unknown as jest.Mock;

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("redirects to /login if user is not logged in", () => {
		mockedUseSelector.mockReturnValue({ name: "", email: "" });

		render(
			<MemoryRouter initialEntries={["/protected"]}>
				<Routes>
					<Route element={<ProtectedRoute />}>
						<Route path="/protected" element={<div>Protected Content</div>} />
					</Route>
					<Route path="/login" element={<div>Login Page</div>} />
				</Routes>
			</MemoryRouter>,
		);

		expect(screen.getByText("Login Page")).toBeInTheDocument();
		expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
	});

	it("renders the protected content if user is logged in", () => {
		mockedUseSelector.mockReturnValue({
			name: "John",
			email: "john@example.com",
		});

		render(
			<MemoryRouter initialEntries={["/protected"]}>
				<Routes>
					<Route element={<ProtectedRoute />}>
						<Route path="/protected" element={<div>Protected Content</div>} />
					</Route>
					<Route path="/login" element={<div>Login Page</div>} />
				</Routes>
			</MemoryRouter>,
		);

		expect(screen.getByText("Protected Content")).toBeInTheDocument();
		expect(screen.queryByText("Login Page")).not.toBeInTheDocument();
	});
});
