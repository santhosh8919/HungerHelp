import React from "react";
import { useNavigate } from "react-router-dom";
import "./Receiver.css";

// Default data for the receiver dashboard
const defaultReceiverData = [
  {
    name: "Ramsingh Dharavath",
    date: "2024-12-01",
    foodType: "Rice",
    foodQuantity: 50,
    address: "123 Trust Lane, City A",
    contactNumber: "9876543210",
  },
  {
    name: "Rajesh Boda",
    date: "2024-12-01",
    foodType: "Wheat",
    foodQuantity: 30,
    address: "456 Charity Blvd, City B",
    contactNumber: "8765432109",
  },
  {
    name: "Nagaraju Badavath",
    date: "2024-12-02",
    foodType: "Vegetables",
    foodQuantity: 70,
    address: "789 Care St, City C",
    contactNumber: "7654321098",
  },
  {
    name: "Narsimha Bhukya",
    date: "2024-12-03",
    foodType: "Fruits",
    foodQuantity: 100,
    address: "321 Community Rd, City D",
    contactNumber: "6543210987",
  },
  {
    name: "Santhosh Mudavath",
    date: "2024-12-04",
    foodType: "Bread",
    foodQuantity: 60,
    address: "654 Network Ave, City E",
    contactNumber: "5432109876",
  },
  
];

export const Receiver = ({ receiverData }) => {
  const navigate = useNavigate();

  // Use provided data or fallback to default data
  const dataToDisplay = receiverData && receiverData.length > 0 ? receiverData : defaultReceiverData;

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Receiver Dashboard</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>
      <div className="receiver-data-container">
        {dataToDisplay.map((data, index) => (
          <div key={index} className="receiver-data-card">
            <h3>Donor Name: {data.name}</h3>
            <p><strong>Date:</strong> {data.date}</p>
            <p><strong>Food Type:</strong> {data.foodType}</p>
            <p><strong>Quantity:</strong> {data.foodQuantity} Kgs</p>
            <p><strong>Address:</strong> {data.address}</p>
            <p><strong>Contact:</strong> {data.contactNumber}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
