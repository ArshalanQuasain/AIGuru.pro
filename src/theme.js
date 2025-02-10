// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // modern blue
      light: "#63a4ff",
      contrastText: "#fff",
    },
    secondary: {
      main: "#26a69a", // teal-ish accent
      contrastText: "#fff",
    },
    background: {
      default: "#f4f6f8", // light gray background
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
