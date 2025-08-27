import CharityDashboard from "./pages/CharityDashboard";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HotelDashboard from "./pages/HotelDashboard";
import AdminPanel from "./pages/AdminPanel";

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          HungerHelp
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/register">
          Register
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        {/* Dashboard and Admin Panel buttons removed from NavBar */}
      </Toolbar>
    </AppBar>
  );
}

export default function App() {
  return (
    <Router>
      <NavBar />
      <Box mt={2}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hotel-dashboard" element={<HotelDashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/charity-dashboard" element={<CharityDashboard />} />
        </Routes>
      </Box>
    </Router>
  );
}
