import { Container, Grid } from "@mui/material";
import { features } from "../data";
import { SectionHeading } from "./section-heading";
import { FeatureCard } from "./feature-card";

export function FeaturesSection() {
  return (
    <Container
      component="section"
      id="features"
      maxWidth="lg"
      sx={{ py: 8, px: 3 }}
    >
      <SectionHeading
        title="How PhiloSophia Teaches"
        subtitle="Four pillars of philosophical education, powered by AI"
      />
      <Grid container spacing={2.5}>
        {features.map((f) => (
          <Grid key={f.title} size={{ xs: 12, sm: 6, md: 3 }}>
            <FeatureCard feature={f} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
