const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

// Registration
router.post("/register", authController.register);
// Login
router.post("/login", authController.login);
// Profile
router.get("/profile", auth, authController.getProfile);

module.exports = router;
