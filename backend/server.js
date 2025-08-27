require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const donationRoutes = require("./routes/donation");
app.use("/api/donations", donationRoutes);

const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);

const reportRoutes = require("./routes/report");
app.use("/api/report", reportRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("HungerHelp API Running");
});

// --- Socket.io Chat Integration ---
const { server: chatServer } = require("./chat");
const PORT = process.env.PORT || 5000;
chatServer.on("request", app); // Share express routes
chatServer.listen(PORT, () => {
  console.log(`API & Chat server running on port ${PORT}`);
});
