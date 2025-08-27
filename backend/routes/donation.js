const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");
const auth = require("../middleware/auth");

// Create donation (Hotel/Restaurant)
router.post("/", auth, donationController.createDonation);
// Get active donations (for all, or by donor)
router.get("/active", auth, donationController.getActiveDonations);
// Claim donation (Charity/NGO)
router.post("/claim/:id", auth, donationController.claimDonation);
// Get donation history (by user)
router.get("/history", auth, donationController.getDonationHistory);

module.exports = router;
