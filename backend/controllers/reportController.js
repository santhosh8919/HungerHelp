const Donation = require("../models/Donation");
const User = require("../models/User");
const Report = require("../models/Report");

// Get quick stats: food rescued, meals served, partner hotels, charities
exports.getQuickStats = async (req, res) => {
  try {
    const totalDonations = await Donation.countDocuments();
    const totalFoodRescued = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: { $toDouble: "$quantity" } } } },
    ]);
    const partnerHotels = await User.countDocuments({
      role: "hotel",
      approved: true,
    });
    const partnerCharities = await User.countDocuments({
      role: "charity",
      approved: true,
    });
    res.json({
      totalDonations,
      totalFoodRescued: totalFoodRescued[0]?.total || 0,
      partnerHotels,
      partnerCharities,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Generate report (admin)
exports.generateReport = async (req, res) => {
  try {
    const { type } = req.body;
    let data = {};
    if (type === "food_saved") {
      data = await Donation.aggregate([
        { $group: { _id: null, total: { $sum: { $toDouble: "$quantity" } } } },
      ]);
    } else if (type === "participants") {
      data = {
        hotels: await User.countDocuments({ role: "hotel", approved: true }),
        charities: await User.countDocuments({
          role: "charity",
          approved: true,
        }),
      };
    }
    const report = new Report({ type, data });
    await report.save();
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all reports (admin)
exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ generatedAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
