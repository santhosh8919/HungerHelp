import React, { useEffect, useState } from "react";
import DonationChat from "../components/DonationChat";
import {
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

function HotelDashboard() {
  const [tab, setTab] = useState(0);
  const [donations, setDonations] = useState([]);
  const [history, setHistory] = useState([]);
  const [form, setForm] = useState({
    foodType: "",
    quantity: "",
    pickupLocation: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (tab === 1) fetchActiveDonations();
    if (tab === 2) fetchDonationHistory();
    // eslint-disable-next-line
  }, [tab]);

  async function fetchActiveDonations() {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/donations/active`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setDonations(data);
    } catch (err) {
      setError("Failed to fetch donations");
    }
    setLoading(false);
  }

  async function fetchDonationHistory() {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/donations/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      setError("Failed to fetch history");
    }
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/donations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data._id) {
        setMessage("Donation posted successfully!");
        setForm({ foodType: "", quantity: "", pickupLocation: "" });
        fetchActiveDonations();
      } else {
        setError(data.message || "Failed to post donation");
      }
    } catch (err) {
      setError("Failed to post donation");
    }
    setLoading(false);
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="lg">
      <Box mt={6} mb={4}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Hotel/Restaurant Dashboard
          </Typography>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
            <Tab label="Donation Form" />
            <Tab label="Active Donations" />
            <Tab label="Donation History" />
          </Tabs>
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
          {loading && <CircularProgress sx={{ mt: 2 }} />}
          {/* Donation Form */}
          {tab === 0 && (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                label="Food Type"
                name="foodType"
                value={form.foodType}
                onChange={handleChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Quantity"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Pickup Location"
                name="pickupLocation"
                value={form.pickupLocation}
                onChange={handleChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}>
                {loading ? "Posting..." : "Post Donation"}
              </Button>
            </Box>
          )}
          {/* Active Donations */}
          {tab === 1 && (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Food Type</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Pickup Location</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Recipient</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {donations.map((donation) => (
                    <TableRow key={donation._id}>
                      <TableCell>{donation.foodType}</TableCell>
                      <TableCell>{donation.quantity}</TableCell>
                      <TableCell>{donation.pickupLocation}</TableCell>
                      <TableCell>{donation.status}</TableCell>
                      <TableCell>{donation.recipient?.name || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {/* Donation History with Chat */}
          {tab === 2 && (
            <>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Food Type</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Pickup Location</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Recipient</TableCell>
                      <TableCell>Claimed At</TableCell>
                      <TableCell>Chat</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history.map((donation) => (
                      <TableRow key={donation._id}>
                        <TableCell>{donation.foodType}</TableCell>
                        <TableCell>{donation.quantity}</TableCell>
                        <TableCell>{donation.pickupLocation}</TableCell>
                        <TableCell>{donation.status}</TableCell>
                        <TableCell>{donation.recipient?.name || "-"}</TableCell>
                        <TableCell>
                          {donation.claimedAt
                            ? new Date(donation.claimedAt).toLocaleString()
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {donation.status === "claimed" && (
                            <DonationChat
                              donationId={donation._id}
                              hotelId={localStorage.getItem("userId")}
                              charityId={
                                donation.recipient?._id || donation.recipient
                              }
                              userId={localStorage.getItem("userId")}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default HotelDashboard;
