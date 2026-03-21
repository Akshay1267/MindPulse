const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// ── Middleware ────────────────────────────────────────────────────
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://mind-pulse-iota.vercel.app",
  ],
  credentials: true, // ← required for cookies
}));
app.use(express.json());
app.use(cookieParser());

// ── Routes ────────────────────────────────────────────────────────
app.use("/api/checkin", require("./routes/checkin"));
app.use("/api/dashboard", require("./routes/dashboard"));

// ── Health Check ──────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    status: "MindPulse API is running 🧠",
    version: "1.0.0",
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
