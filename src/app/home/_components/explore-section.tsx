import { Container, Grid } from "@mui/material";
import { philosophers, type Philosopher } from "../data";
import { SectionHeading } from "./section-heading";
import { PhilosopherCard } from "./philosopher-card";

export function ExploreSection({
  onPhilosopherClick,
}: {
  onPhilosopherClick: (philosopher: Philosopher) => void;
}) {
  return (
    <Container
      component="section"
      id="explore"
      maxWidth="lg"
      sx={{ py: 5, pb: 8, px: 3 }}
    >
      <SectionHeading
        title="Explore Thinkers"
        subtitle="Click a philosopher to start a conversation about their ideas"
      />
      <Grid container spacing={1.75}>
        {philosophers.map((p) => (
          <Grid key={p.name} size={{ xs: 6, sm: 4, md: 2 }}>
            <PhilosopherCard
              philosopher={p}
              onClick={() => onPhilosopherClick(p)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
