import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Error } from "./pages/Error";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Doner } from "./pages/Doner";
import { Receiver } from "./pages/Receiver";
import { Donation } from "./pages/Donation";
import { useState } from "react";

const App = () => {
  // Shared state for donations
  const [donations, setDonations] = useState([]);

  // Function to add a new donation
  const addDonation = (newDonation) => {
    setDonations((prevDonations) => [...prevDonations, newDonation]);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
          {/* Pass shared donations state and addDonation function to components */}
          <Route path="/doner" element={<Doner donations={donations} />} />
          <Route path="/receiver" element={<Receiver receiverData={donations} />} />
          <Route path="/donation" element={<Donation addDonation={addDonation} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
