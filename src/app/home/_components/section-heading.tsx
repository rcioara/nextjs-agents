import { Box, Typography } from "@mui/material";

export function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <Box sx={{ textAlign: "center", mb: 5 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 1,
          background: "linear-gradient(135deg, #c4b5fd, #7c3aed)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: "#64748b",
          fontFamily: "system-ui, sans-serif",
          fontSize: 15,
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}
