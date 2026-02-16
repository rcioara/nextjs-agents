import { Card, CardContent, Typography } from "@mui/material";
import type { Feature } from "../data";

export function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <Card>
      <CardContent sx={{ p: 3.5 }}>
        <Typography sx={{ fontSize: 36, mb: 1 }}>{feature.icon}</Typography>
        <Typography variant="h6" sx={{ color: "#c4b5fd", mb: 1, fontSize: 18 }}>
          {feature.title}
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            color: "#94a3b8",
            lineHeight: 1.65,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {feature.desc}
        </Typography>
      </CardContent>
    </Card>
  );
}
