const mongoose = require("mongoose");

const CheckinSchema = new mongoose.Schema({
  tokenId: {
    type: String,
    required: true,
    trim: true,
  },
  mood: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  sleep: {
    type: Number,
    required: true,
    min: 0,
    max: 12,
  },
  stress: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  note: {
    type: String,
    default: "",
    maxlength: 500,
  },
  department: {
    type: String,
    default: "General",
  },
  year: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Checkin", CheckinSchema);
