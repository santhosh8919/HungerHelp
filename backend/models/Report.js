const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    type: { type: String, required: true }, // e.g. 'food_saved', 'participants'
    data: { type: mongoose.Schema.Types.Mixed },
    generatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
