import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Doner.css";

export const Doner = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Default data
  const defaultDonations = [
    { name: "Rajesh Boda", date: "2024-12-01", foodType: "Rice", trustName: "Helping Hands", foodQuantity: 50, address: "Hyderabad", contactNumber: "9876543210" },
    { name: "Rajesh Boda", date: "2024-12-03", foodType: "Rice", trustName: "Helping Hands", foodQuantity: 50, address: "Secunderabad", contactNumber: "9123456780" },
    { name: "Rajesh Boda", date: "2024-12-05", foodType: "Rice", trustName: "Helping Hands", foodQuantity: 50, address: "Warangal", contactNumber: "9988776655" },
    { name: "Rajesh Boda", date: "2024-12-07", foodType: "Rice", trustName: "Helping Hands", foodQuantity: 50, address: "Karimnagar", contactNumber: "9876543120" },
    { name: "Rajesh Boda", date: "2024-12-09", foodType: "Rice", trustName: "Helping Hands", foodQuantity: 50, address: "Adilabad", contactNumber: "9234567890" },
    { name: "Rajesh Boda", date: "2024-12-02", foodType: "Wheat", trustName: "Food for All", foodQuantity: 30, address: "Nizamabad", contactNumber: "9998887776" },
  ]

  // State to store all donations
  const [donations, setDonations] = useState(defaultDonations);

  // Check if there is a new donation passed via location state
  React.useEffect(() => {
    if (location.state?.newDonation) {
      setDonations((prev) => [...prev, location.state.newDonation]);
      location.state = null; // Clear state to avoid re-adding the same donation
    }
  }, [location.state]);

  const handleDonateClick = () => {
    navigate("/donation");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Donor Dashboard</h2>
        {location.state?.success && <p className="success-message">Thank you for your donation!</p>}
        <div className="button-group">
          <button onClick={handleDonateClick}>Donate</button>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <table className="donor-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Trust Name</th>
            <th>Food Type</th>
            <th>Food Quantity (Kgs)</th>
            <th>Address</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation, index) => (
            <tr key={index}>
              <td>{donation.name}</td>
              <td>{donation.date}</td>
              <td>{donation.trustName}</td>
              <td>{donation.foodType}</td>
              <td>{donation.foodQuantity}</td>
              <td>{donation.address}</td>
              <td>{donation.contactNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
