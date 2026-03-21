const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  tokenId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  department: {
    type: String,
    default: "General",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastSeen: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Token", TokenSchema);
