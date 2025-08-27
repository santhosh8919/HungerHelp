const Donation = require("../models/Donation");
const User = require("../models/User");

// Create donation (Hotel/Restaurant)
exports.createDonation = async (req, res) => {
  try {
    const { foodType, quantity, pickupLocation } = req.body;
    const donation = new Donation({
      donor: req.user.id,
      foodType,
      quantity,
      pickupLocation,
    });
    await donation.save();
    res.status(201).json(donation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get active donations (for all, or by donor)
exports.getActiveDonations = async (req, res) => {
  try {
    const filter =
      req.user.role === "hotel" ? { donor: req.user.id } : { status: "active" };
    const donations = await Donation.find(filter).populate(
      "donor",
      "name organization"
    );
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Claim donation (Charity/NGO)
exports.claimDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation || donation.status !== "active")
      return res.status(404).json({ message: "Donation not available" });
    donation.status = "claimed";
    donation.recipient = req.user.id;
    donation.claimedAt = Date.now();
    await donation.save();
    res.json(donation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get donation history (by user)
exports.getDonationHistory = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === "hotel") filter.donor = req.user.id;
    if (req.user.role === "charity") filter.recipient = req.user.id;
    const donations = await Donation.find(filter).populate(
      "donor recipient",
      "name organization"
    );
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
