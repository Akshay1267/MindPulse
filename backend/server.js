const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ── Middleware ────────────────────────────────────────────────────
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://v0-mind-pulse-web-app.vercel.app",
  ],
  credentials: true,
}));
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────
app.use("/api/checkin", require("./routes/checkin"));
app.use("/api/dashboard", require("./routes/dashboard"));

// ── Health Check ──────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    status: "MindPulse API is running 🧠",
    version: "1.0.0",
    endpoints: [
      "POST /api/checkin",
      "GET  /api/checkin/history/:tokenId",
      "GET  /api/dashboard",
      "POST /api/dashboard/resolve/:alertId",
      "POST /api/dashboard/message",
      "GET  /api/dashboard/analytics",
    ],
  });
});

// ── Connect DB + Start Server ─────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
