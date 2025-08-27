const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const auth = require("../middleware/auth");

// Middleware to check admin role
function isAdmin(req, res, next) {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied" });
  next();
}

// Quick stats (public or protected)
router.get("/quick-stats", reportController.getQuickStats);
// Generate report (admin only)
router.post("/generate", auth, isAdmin, reportController.generateReport);
// Get all reports (admin only)
router.get("/", auth, isAdmin, reportController.getReports);

module.exports = router;
