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
  CircularProgress,
  Alert,
} from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

function CharityDashboard() {
  const [tab, setTab] = useState(0);
  const [donations, setDonations] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (tab === 0) fetchAvailableDonations();
    if (tab === 1) fetchClaimedHistory();
    // eslint-disable-next-line
  }, [tab]);

  async function fetchAvailableDonations() {
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

  async function claimDonation(id) {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/donations/claim/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data._id) {
        setMessage("Donation claimed successfully!");
        fetchAvailableDonations();
        fetchClaimedHistory();
      } else {
        setError(data.message || "Failed to claim donation");
      }
    } catch (err) {
      setError("Failed to claim donation");
    }
    setLoading(false);
  }

  async function fetchClaimedHistory() {
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

  return (
    <Container maxWidth="lg">
      <Box mt={6} mb={4}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Charity/NGO Dashboard
          </Typography>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
            <Tab label="Search Donations" />
            <Tab label="Claimed History" />
          </Tabs>
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
          {loading && <CircularProgress sx={{ mt: 2 }} />}
          {/* Search Donations */}
          {tab === 0 && (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Donor</TableCell>
                    <TableCell>Food Type</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Pickup Location</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {donations.map((donation) => (
                    <TableRow key={donation._id}>
                      <TableCell>{donation.donor?.name}</TableCell>
                      <TableCell>{donation.foodType}</TableCell>
                      <TableCell>{donation.quantity}</TableCell>
                      <TableCell>{donation.pickupLocation}</TableCell>
                      <TableCell>{donation.status}</TableCell>
                      <TableCell>
                        {donation.status === "active" && (
                          <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={() => claimDonation(donation._id)}>
                            Claim
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {/* Claimed History with Chat */}
          {tab === 1 && (
            <>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Donor</TableCell>
                      <TableCell>Food Type</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Pickup Location</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Claimed At</TableCell>
                      <TableCell>Chat</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history.map((donation) => (
                      <TableRow key={donation._id}>
                        <TableCell>{donation.donor?.name}</TableCell>
                        <TableCell>{donation.foodType}</TableCell>
                        <TableCell>{donation.quantity}</TableCell>
                        <TableCell>{donation.pickupLocation}</TableCell>
                        <TableCell>{donation.status}</TableCell>
                        <TableCell>
                          {donation.claimedAt
                            ? new Date(donation.claimedAt).toLocaleString()
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {donation.status === "claimed" && (
                            <DonationChat
                              donationId={donation._id}
                              hotelId={donation.donor?._id}
                              charityId={donation.recipient}
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

export default CharityDashboard;
