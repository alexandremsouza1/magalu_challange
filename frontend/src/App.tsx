import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import theme from "./theme";


const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
