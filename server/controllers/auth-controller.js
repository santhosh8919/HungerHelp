const User = require("../models/user-model");

// *-------------------
// Home Logic
// *-------------------
const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.error("Error in home route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// *-------------------------------
// User Registration Logic 📝
// *-------------------------------
const register = async (req, res) => {
  try {
    console.log("Registration request data:", req.body);

    const { username, email, phone, password, address, role } = req.body;

    // Check if the email is already registered
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // Create the new user in the database
    const userCreated = await User.create({
      username,
      email,
      phone,
      password, // Storing plain-text password for now
      address,
      role,
    });

    // Respond with success and generated token
    res.status(201).json({
      msg: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// *-------------------------------
// User Login Logic 📝
// *-------------------------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("Stored email in DB:", userExist.email);
    console.log("Stored password in DB:", userExist.password);
    console.log("Received password:", password);

    // Compare the plain-text password
    const isPasswordValid = password === userExist.password;
    console.log("Password Match:", isPasswordValid);

    if (isPasswordValid) {
      const { role } = userExist; // Fetch the role from the user document

      // Respond with the necessary data but no redirect info
      res.status(200).json({
        message: "Login Successful",
        role: role,
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }};

module.exports = { home, register, login };
