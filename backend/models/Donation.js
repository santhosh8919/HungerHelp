const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    foodType: { type: String, required: true },
    quantity: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "claimed", "completed", "flagged"],
      default: "active",
    },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    claimedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);
