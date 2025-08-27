const User = require("../models/User");
const Donation = require("../models/Donation");

// Approve or reject user (hotel/charity)
exports.approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.approved = req.body.approved;
    await user.save();
    res.json({
      message: `User ${req.body.approved ? "approved" : "rejected"}`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List all users (hotels/charities)
exports.listUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["hotel", "charity"] } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Monitor donations
exports.monitorDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate(
      "donor recipient",
      "name organization"
    );
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Flag donation
exports.flagDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation)
      return res.status(404).json({ message: "Donation not found" });
    donation.status = "flagged";
    await donation.save();
    res.json({ message: "Donation flagged" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
