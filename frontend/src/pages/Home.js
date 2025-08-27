import React from "react";
import { Container, Typography, Box } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box mt={6} mb={4} textAlign="center">
        <Typography variant="h3" gutterBottom>
          HungerHelp
        </Typography>
        <Typography variant="h5" color="textSecondary" gutterBottom>
          Reducing hotel food waste. Feeding those in need.
        </Typography>
        <Typography variant="body1" mt={2}>
          HungerHelp connects hotels and restaurants with charities to rescue
          surplus food and serve meals to the needy. Join us in making a
          difference!
        </Typography>
      </Box>
    </Container>
  );
}
