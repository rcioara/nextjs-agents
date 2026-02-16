import { Card, CardActionArea, Typography, alpha } from "@mui/material";
import type { Philosopher } from "../data";

export function PhilosopherCard({
  philosopher,
  onClick,
}: {
  philosopher: Philosopher;
  onClick: () => void;
}) {
  return (
    <Card
      sx={{
        "&:hover": {
          transform: "scale(1.03)",
          borderColor: alpha("#a78bfa", 0.5),
          background: "rgba(124,58,237,0.15)",
        },
      }}
    >
      <CardActionArea onClick={onClick} sx={{ p: 2.5, textAlign: "center" }}>
        <Typography sx={{ fontSize: 32, mb: 0.75 }}>
          {philosopher.emoji}
        </Typography>
        <Typography sx={{ fontWeight: 600, fontSize: 15, color: "#c4b5fd" }}>
          {philosopher.name}
        </Typography>
        <Typography
          sx={{
            fontSize: 11,
            color: "#7c3aed",
            mt: 0.5,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {philosopher.era}
        </Typography>
      </CardActionArea>
    </Card>
  );
}
