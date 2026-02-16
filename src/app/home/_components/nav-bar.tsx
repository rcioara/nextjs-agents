import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { navItems } from "../data";

export function NavBar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(20px)",
        background: "rgba(3,0,20,0.7)",
        borderBottom: "1px solid rgba(124,58,237,0.15)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
          <Typography component="span" sx={{ fontSize: 24 }}>
            🏛️
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            PhiloSophia
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 3.5 }}>
          {navItems.map((item) => (
            <Typography
              key={item}
              component="a"
              href={`#${item.toLowerCase().replace(" ", "")}`}
              sx={{
                color: "#a5b4fc",
                textDecoration: "none",
                fontSize: 14,
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "0.5px",
                "&:hover": { color: "#c4b5fd" },
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
