const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const email = "admin@gmail.com";
    const password = "admin123";
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("Admin user already exists.");
      process.exit();
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new User({
      name: "Admin",
      email,
      password: hashedPassword,
      role: "admin",
      organization: "HungerHelp",
      address: "Admin Office",
      phone: "0000000000",
      approved: true,
    });
    await admin.save();
    console.log("Admin user created:", email);
    process.exit();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });
