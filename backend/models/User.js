const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["hotel", "charity", "admin"], required: true },
    organization: { type: String }, // Hotel/Charity name
    address: { type: String },
    phone: { type: String },
    approved: { type: Boolean, default: false }, // For admin approval
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
