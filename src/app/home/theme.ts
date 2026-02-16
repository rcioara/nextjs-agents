import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#7c3aed" },
    secondary: { main: "#a78bfa" },
    background: {
      default: "#030014",
      paper: "rgba(124,58,237,0.06)",
    },
  },
  typography: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    h1: { fontWeight: 700, lineHeight: 1.1 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(124,58,237,0.06)",
          border: "1px solid rgba(124,58,237,0.15)",
          borderRadius: 16,
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: "rgba(124,58,237,0.4)",
            transform: "translateY(-4px)",
            boxShadow: "0 12px 40px rgba(124,58,237,0.15)",
          },
        },
      },
    },
  },
});
