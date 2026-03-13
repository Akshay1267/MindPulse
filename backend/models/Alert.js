const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema({
  tokenId: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    default: "General",
  },
  severity: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  reason: {
    type: String,
    default: "",
  },
  avgMood: {
    type: Number,
  },
  resolved: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Alert", AlertSchema);
