import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Donation.css";

export const Donation = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    date: new Date().toISOString().split("T")[0], // Default to today's date
    trustName: "",
    foodType: "",
    foodQuantity: "",
    address: "",
    contactNumber: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct donation object
    const donation = {
      ...formData,
      foodQuantity: Number(formData.foodQuantity), // Ensure quantity is a number
    };

    // Navigate back to Donor Dashboard with donation data
    navigate("/doner", { state: { newDonation: donation, success: true } });
  };

  // Handle go back button
  const handleGoBack = () => {
    navigate("/doner");
  };

  return (
    <div className="donation-container">
      <h2>Donate Some Food</h2>
      <form className="donation-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </label>
        <label>
          Trust Name:
          <input type="text" name="trustName" value={formData.trustName} onChange={handleChange} required />
        </label>
        <label>
          Food Type:
          <input type="text" name="foodType" value={formData.foodType} onChange={handleChange} required />
        </label>
        <label>
          Food Quantity (Kgs):
          <input type="number" name="foodQuantity" value={formData.foodQuantity} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <label>
          Contact Number:
          <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
        </label>
        <div className="form-buttons">
          <button type="button" className="go-back-button" onClick={handleGoBack}>Go Back</button>
          <button className="donate-now-button" type="submit">Donate Now</button>
        </div>
      </form>
    </div>
  );
};
