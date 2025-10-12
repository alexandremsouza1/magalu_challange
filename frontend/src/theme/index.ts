import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1DB954",
    },
    background: {
      default: "#191414",
      paper: "#191414",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B3B3B3",
    },
  },
  typography: {
    fontFamily: '"Circular Std", "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "500px",
          textTransform: "none",
          fontSize: "16px",
          fontWeight: 700,
          padding: "14px 48px",
          "&:hover": {
            transform: "scale(1.04)",
            backgroundColor: "#1ed760",
          },
          transition: "all 0.3s ease",
        },
      },
    },
  },
});

export default theme;