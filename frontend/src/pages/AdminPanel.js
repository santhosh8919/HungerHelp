import React, { useEffect, useState } from "react";
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
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AdminPanel() {
  const [tab, setTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (tab === 0) fetchUsers();
    if (tab === 1) fetchDonations();
    if (tab === 2) fetchReports();
    // eslint-disable-next-line
  }, [tab]);

  async function fetchUsers() {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError("Failed to fetch users");
    }
    setLoading(false);
  }

  async function approveUser(id, approved) {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/admin/user/${id}/approve`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ approved }),
      });
      fetchUsers();
    } catch (err) {
      setError("Failed to update user");
      setLoading(false);
    }
  }

  async function fetchDonations() {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/admin/donations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setDonations(data);
    } catch (err) {
      setError("Failed to fetch donations");
    }
    setLoading(false);
  }

  async function flagDonation(id) {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/admin/donation/${id}/flag`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDonations();
    } catch (err) {
      setError("Failed to flag donation");
      setLoading(false);
    }
  }

  async function fetchReports() {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/report`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setReports(data);
    } catch (err) {
      setError("Failed to fetch reports");
    }
    setLoading(false);
  }

  async function generateReport(type) {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/report/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ type }),
      });
      fetchReports();
    } catch (err) {
      setError("Failed to generate report");
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="lg">
      <Box mt={6} mb={4}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Admin Panel
          </Typography>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
            <Tab label="User Management" />
            <Tab label="Donation Monitoring" />
            <Tab label="Reports & Analytics" />
          </Tabs>
          {error && <Alert severity="error">{error}</Alert>}
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          )}
          {/* User Management Tab */}
          {tab === 0 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Users
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Organization</TableCell>
                      <TableCell>Approved</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.organization}</TableCell>
                        <TableCell>{user.approved ? "Yes" : "No"}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color={user.approved ? "secondary" : "primary"}
                            size="small"
                            onClick={() =>
                              approveUser(user._id, !user.approved)
                            }>
                            {user.approved ? "Revoke" : "Approve"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
          {/* Donation Monitoring Tab */}
          {tab === 1 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Donations
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Donor</TableCell>
                      <TableCell>Food Type</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Pickup Location</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Recipient</TableCell>
                      <TableCell>Claimed At</TableCell>
                      <TableCell>Action</TableCell>
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
                        <TableCell>{donation.recipient?.name || "-"}</TableCell>
                        <TableCell>
                          {donation.claimedAt
                            ? new Date(donation.claimedAt).toLocaleString()
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={() => flagDonation(donation._id)}>
                            Flag
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
          {/* Reports & Analytics Tab */}
          {tab === 2 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Reports & Analytics
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 2, mb: 2 }}
                onClick={() => generateReport("food_saved")}>
                Generate Food Saved Report
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mb: 2 }}
                onClick={() => generateReport("participants")}>
                Generate Participants Report
              </Button>
              {/* Bar chart for analytics */}
              {reports.length > 0 && (
                <Box sx={{ maxWidth: 600, mb: 4 }}>
                  <Bar
                    data={{
                      labels: reports.map((r) => r.type),
                      datasets: [
                        {
                          label: "Food Saved",
                          data: reports
                            .filter((r) => r.type === "food_saved")
                            .map((r) => r.data[0]?.total || 0),
                          backgroundColor: "rgba(75,192,192,0.6)",
                        },
                        {
                          label: "Hotels",
                          data: reports
                            .filter((r) => r.type === "participants")
                            .map((r) => r.data.hotels || 0),
                          backgroundColor: "rgba(255,99,132,0.6)",
                        },
                        {
                          label: "Charities",
                          data: reports
                            .filter((r) => r.type === "participants")
                            .map((r) => r.data.charities || 0),
                          backgroundColor: "rgba(54,162,235,0.6)",
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { position: "top" },
                        title: { display: true, text: "Analytics Overview" },
                      },
                    }}
                  />
                </Box>
              )}
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell>Data</TableCell>
                      <TableCell>Generated At</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report._id}>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>
                          <pre style={{ margin: 0 }}>
                            {JSON.stringify(report.data, null, 2)}
                          </pre>
                        </TableCell>
                        <TableCell>
                          {new Date(report.generatedAt).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Show all users and donations history */}
              <Typography variant="h6" sx={{ mt: 4 }}>
                All Users
              </Typography>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Organization</TableCell>
                      <TableCell>Approved</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.organization}</TableCell>
                        <TableCell>{user.approved ? "Yes" : "No"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="h6" sx={{ mt: 4 }}>
                All Donations
              </Typography>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Donor</TableCell>
                      <TableCell>Food Type</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Pickup Location</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Recipient</TableCell>
                      <TableCell>Claimed At</TableCell>
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
                        <TableCell>{donation.recipient?.name || "-"}</TableCell>
                        <TableCell>
                          {donation.claimedAt
                            ? new Date(donation.claimedAt).toLocaleString()
                            : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default AdminPanel;
