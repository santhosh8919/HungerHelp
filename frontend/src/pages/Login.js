import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { loginUser } from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const res = await loginUser(form);
      if (res.token) {
        setMessage("Login successful!");
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.user?.role || "");
        // Redirect based on role
        if (res.user?.role === "admin") {
          window.location.href = "/admin";
        } else if (res.user?.role === "hotel") {
          window.location.href = "/hotel-dashboard";
        } else if (res.user?.role === "charity") {
          window.location.href = "/charity-dashboard";
        } else {
          window.location.href = "/dashboard";
        }
      } else {
        setError(res.message || "Login failed");
      }
    } catch (err) {
      setError("Login failed");
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={6} mb={4}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {message && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            type="email"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            type="password"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}
