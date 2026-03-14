const express = require("express");
const router = express.Router();
const Checkin = require("../models/Checkin");
const Alert = require("../models/Alert");

// ── Risk Detection Logic ──────────────────────────────────────────
async function detectAndSaveRisk(tokenId, department) {
  const recent = await Checkin.find({ tokenId })
    .sort({ createdAt: -1 })
    .limit(7);

  if (recent.length < 3) return;

  const avgMood = recent.reduce((sum, c) => sum + c.mood, 0) / recent.length;
  const avgStress = recent.reduce((sum, c) => sum + c.stress, 0) / recent.length;
  const avgSleep = recent.reduce((sum, c) => sum + c.sleep, 0) / recent.length;

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
  } else if (avgMood < 3.2) {
    severity = "low";
    reason = "Below average mood this week";
  }

  if (severity && severity !== "low") {
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

// ── POST /api/checkin ─────────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    console.log("Received body:", req.body);

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

// ── GET /api/checkin/history/:tokenId ─────────────────────────────
router.get("/history/:tokenId", async (req, res) => {
  try {
    const checkins = await Checkin.find({ tokenId: req.params.tokenId })
      .sort({ createdAt: -1 })
      .limit(30);

    res.json({ success: true, checkins });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;