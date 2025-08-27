import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Alert,
} from "@mui/material";
import { registerUser } from "../api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    organization: "",
    address: "",
    phone: "",
  });
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
      const res = await registerUser(form);
      if (res.message) setMessage(res.message);
      if (res.error || res.errors) setError(res.error || res.errors);
    } catch (err) {
      setError("Registration failed");
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={6} mb={4}>
        <Typography variant="h4" gutterBottom>
          Register
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
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
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
          <TextField
            select
            fullWidth
            margin="normal"
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            required>
            <MenuItem value="hotel">Hotel/Restaurant</MenuItem>
            <MenuItem value="charity">Charity/NGO</MenuItem>
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            label="Organization"
            name="organization"
            value={form.organization}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}
