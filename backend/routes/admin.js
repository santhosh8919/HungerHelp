const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const auth = require("../middleware/auth");

// Middleware to check admin role
function isAdmin(req, res, next) {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied" });
  next();
}

// Approve/reject user
router.put("/user/:id/approve", auth, isAdmin, adminController.approveUser);
// List users
router.get("/users", auth, isAdmin, adminController.listUsers);
// Monitor all donations
router.get("/donations", auth, isAdmin, adminController.monitorDonations);
// Flag donation
router.put("/donation/:id/flag", auth, isAdmin, adminController.flagDonation);

module.exports = router;
