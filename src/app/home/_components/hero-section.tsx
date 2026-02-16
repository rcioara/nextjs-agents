import { Box, Container, Typography } from "@mui/material";
import { CreationOfAdamSVG } from "./creation-of-adam-svg";

export function HeroSection({ heroVisible }: { heroVisible: boolean }) {
  return (
    <Box
      component="section"
      id="about"
      sx={{ position: "relative", overflow: "hidden", py: 5, px: 3 }}
    >
      <Container
        maxWidth="lg"
        sx={{
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 2.5 }}>
          <Typography
            sx={{
              fontFamily: "system-ui, sans-serif",
              fontSize: 13,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#7c3aed",
              mb: 1.5,
            }}
          >
            Where Human Curiosity Meets Artificial Wisdom
          </Typography>
          <Typography
            variant="h1"
            sx={{ fontSize: "clamp(32px, 5vw, 56px)", mb: 2 }}
          >
            <Box
              component="span"
              sx={{
                background:
                  "linear-gradient(135deg, #e2e8f0 0%, #a78bfa 50%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              The Creation of
            </Box>
            <br />
            <Box
              component="span"
              sx={{
                background:
                  "linear-gradient(135deg, #7c3aed 0%, #a78bfa 40%, #fbbf24 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Understanding
            </Box>
          </Typography>
          <Typography
            sx={{
              color: "#94a3b8",
              maxWidth: 600,
              mx: "auto",
              fontSize: 16,
              lineHeight: 1.7,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            An AI philosophy teacher that guides you through 2,500 years of
            human thought — from the Allegory of the Cave to the Simulation
            Hypothesis.
          </Typography>
        </Box>

        <Box
          sx={{
            maxWidth: 900,
            mx: "auto",
            borderRadius: 5,
            overflow: "hidden",
            border: "1px solid rgba(124,58,237,0.2)",
            background: "rgba(10,5,32,0.5)",
          }}
        >
          <CreationOfAdamSVG />
        </Box>

        <Typography
          sx={{
            textAlign: "center",
            fontStyle: "italic",
            color: "#7c3aed",
            fontSize: 13,
            mt: 1.2,
            opacity: 0.7,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          &ldquo;The Creation of Understanding&rdquo; &mdash; AI
          reinterpretation of Michelangelo&rsquo;s masterpiece
        </Typography>
      </Container>
    </Box>
  );
}
