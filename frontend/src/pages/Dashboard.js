import React from "react";
import { Container, Typography, Box } from "@mui/material";

export default function Dashboard() {
  return (
    <Container maxWidth="md">
      <Box mt={6} mb={4}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1">
          Welcome to your dashboard. Here you can manage donations, view stats,
          and more.
        </Typography>
      </Box>
    </Container>
  );
}
