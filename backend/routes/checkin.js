const express = require("express");
const router = express.Router();
const Checkin = require("../models/Checkin");
const Alert = require("../models/Alert");
const Token = require("../models/Token");

const COOKIE_NAME = "mindpulse_token";
const COOKIE_OPTIONS = {
  httpOnly: true,           // not accessible by JS — XSS safe
  secure: process.env.NODE_ENV === "production", // HTTPS only in prod
  sameSite: "none",         // required for cross-origin (Vercel + Render)
  maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
};

// ── Risk Detection ────────────────────────────────────────────────
async function detectAndSaveRisk(tokenId, department) {
  const recent = await Checkin.find({ tokenId })
    .sort({ createdAt: -1 })
    .limit(7);

  if (recent.length < 3) return;

  const avgMood = recent.reduce((s, c) => s + c.mood, 0) / recent.length;
  const avgStress = recent.reduce((s, c) => s + c.stress, 0) / recent.length;
  const avgSleep = recent.reduce((s, c) => s + c.sleep, 0) / recent.length;

  let consecutiveLow = 0;
  for (const c of recent) {
    if (c.mood <= 2) consecutiveLow++;
    else break;
  }

  let severity = null;
  let reason = "";

  if (avgMood < 2 || consecutiveLow >= 3) {
    severity = "high";
    reason = `Mood score ${avgMood.toFixed(1)} for ${consecutiveLow} consecutive days`;
  } else if (avgMood < 2.8 || (avgStress > 8 && avgSleep < 4)) {
    severity = "medium";
    reason = `Declining mood trend over ${recent.length} days`;
  }

  if (severity) {
    const existing = await Alert.findOne({ tokenId, resolved: false });
    if (!existing) {
      await Alert.create({ tokenId, department, severity, reason, avgMood });
    } else {
      existing.severity = severity;
      existing.reason = reason;
      existing.avgMood = avgMood;
      await existing.save();
    }
  }
}

// ── POST /api/checkin/register ────────────────────────────────────
// Generate + register a new token, set cookie
router.post("/register", async (req, res) => {
  try {
    // Check if cookie already exists
    const existingCookie = req.cookies[COOKIE_NAME];
    if (existingCookie) {
      // Update lastSeen
      await Token.findOneAndUpdate(
        { tokenId: existingCookie },
        { lastSeen: new Date() }
      );
      return res.json({
        success: true,
        tokenId: existingCookie,
        isNew: false,
        message: "Existing token restored",
      });
    }

    // Get tokenId from body (generated on frontend)
    const { tokenId, department } = req.body;
    if (!tokenId) {
      return res.status(400).json({ error: "tokenId required" });
    }

    // Save token to MongoDB
    await Token.create({
      tokenId,
      department: department || "General",
    });

    // Set HTTP-only cookie
    res.cookie(COOKIE_NAME, tokenId, COOKIE_OPTIONS);

    res.json({
      success: true,
      tokenId,
      isNew: true,
      message: "Token registered successfully",
    });
  } catch (err) {
    // Token already exists (duplicate key)
    if (err.code === 11000) {
      res.cookie(COOKIE_NAME, req.body.tokenId, COOKIE_OPTIONS);
      return res.json({
        success: true,
        tokenId: req.body.tokenId,
        isNew: false,
      });
    }
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/checkin/me ───────────────────────────────────────────
// Get current student's token from cookie
router.get("/me", async (req, res) => {
  try {
    const tokenId = req.cookies[COOKIE_NAME];
    if (!tokenId) {
      return res.json({ success: false, tokenId: null });
    }

    // Update lastSeen
    await Token.findOneAndUpdate(
      { tokenId },
      { lastSeen: new Date() }
    );

    res.json({ success: true, tokenId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/checkin ─────────────────────────────────────────────
// Submit a new mood check-in
router.post("/", async (req, res) => {
  try {
    const { tokenId, mood, sleep, stress, note, department, year } = req.body;

    if (!tokenId || !mood || sleep === undefined || stress === undefined) {
      return res.status(400).json({
        error: "Missing required fields",
        received: { tokenId, mood, sleep, stress },
      });
    }

    const checkin = await Checkin.create({
      tokenId,
      mood: Number(mood),
      sleep: Number(sleep),
      stress: Number(stress),
      note: note || "",
      department: department || "General",
      year: year || 1,
    });

    // Update token lastSeen
    await Token.findOneAndUpdate(
      { tokenId },
      { lastSeen: new Date() }
    );

    detectAndSaveRisk(tokenId, department || "General");

    res.status(201).json({
      success: true,
      message: "Check-in recorded successfully",
      checkin,
    });
  } catch (err) {
    console.error("Checkin error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/checkin/history/:tokenId ────────────────────────────
// Get mood history for a token
router.get("/history/:tokenId", async (req, res) => {
  try {
    const { tokenId } = req.params;

    const checkins = await Checkin.find({ tokenId })
      .sort({ createdAt: 1 })
      .limit(30);

    if (checkins.length === 0) {
      return res.json({
        success: true,
        tokenId,
        checkins: [],
        totalCheckins: 0,
        stats: { avgMood: "0", avgSleep: "0", avgStress: "0" },
        message: null,
      });
    }

    const avgMood = (checkins.reduce((s, c) => s + c.mood, 0) / checkins.length).toFixed(1);
    const avgSleep = (checkins.reduce((s, c) => s + c.sleep, 0) / checkins.length).toFixed(1);
    const avgStress = (checkins.reduce((s, c) => s + c.stress, 0) / checkins.length).toFixed(1);

    // Get counsellor message if any
    const alert = await Alert.findOne({ tokenId, resolved: false });

    res.json({
      success: true,
      tokenId,
      totalCheckins: checkins.length,
      stats: { avgMood, avgSleep, avgStress },
      message: alert?.message || null,
      checkins,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
