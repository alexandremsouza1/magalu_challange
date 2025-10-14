import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LayoutMain from "./layouts/LayoutMain";
import Artists from "./pages/Artists";
import Home from "./pages/Home";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Playlists from "./pages/Playlists";
import Profile from "./pages/Profile";
import { store } from "./store";
import theme from "./theme";

const App = () => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<BrowserRouter>
					<Routes>
						{/* Rota pública */}
						<Route path="/login" element={<Index />} />

						{/* Rotas protegidas */}
						<Route element={<ProtectedRoute />}>
							<Route element={<LayoutMain />}>
								<Route path="/" element={<Home />} />
								<Route path="/artists" element={<Artists />} />
								<Route path="/playlists" element={<Playlists />} />
								<Route path="/profile" element={<Profile />} />
							</Route>
						</Route>

						{/* 404 */}
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
