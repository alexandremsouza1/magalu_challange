// src/App.tsx
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Artists from "./pages/Artists";
import Profile from "./pages/Profile";
import Playlists from "./pages/Playlists";
import NotFound from "./pages/NotFound";
import theme from "./theme";
import { store } from "./store";
import ProtectedRoute from "./components/ProtectedRoute";
import LayoutMain from "./layouts/LayoutMain";

const App = () => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<BrowserRouter>
					<Routes>
						<Route path="/login" element={<Index />} />

        	<Route element={(
            <ProtectedRoute>
              <LayoutMain />
            </ProtectedRoute>
          )}>
            <Route path="/" element={<Index />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
