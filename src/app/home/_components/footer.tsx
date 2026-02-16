import { Box, Typography } from "@mui/material";

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid rgba(124,58,237,0.1)",
        py: 4,
        px: 3,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1.2,
          mb: 1.5,
        }}
      >
        <Typography sx={{ fontSize: 20 }}>🏛️</Typography>
        <Typography
          sx={{ fontWeight: 700, fontSize: 18, color: "#7c3aed" }}
        >
          PhiloSophia
        </Typography>
      </Box>
      <Typography
        sx={{
          color: "#475569",
          fontSize: 13,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        γνῶθι σεαυτόν — Know Thyself
      </Typography>
    </Box>
  );
}
