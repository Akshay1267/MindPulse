const express = require("express");
const router = express.Router();
const Checkin = require("../models/Checkin");
const Alert = require("../models/Alert");

// ── GET /api/dashboard ────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalCheckins = await Checkin.countDocuments({
      createdAt: { $gte: today },
    });

    const atRiskCount = await Alert.countDocuments({ resolved: false });

    const todayCheckins = await Checkin.find({ createdAt: { $gte: today } });
    const avgMood =
      todayCheckins.length > 0
        ? (todayCheckins.reduce((sum, c) => sum + c.mood, 0) / todayCheckins.length).toFixed(1)
        : 0;

    const recentCheckins = await Checkin.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("tokenId department mood stress sleep createdAt");

    const alerts = await Alert.find({ resolved: false })
      .sort({ severity: -1, createdAt: -1 })
      .limit(10);

    // Mood trend last 14 days
    const moodTrend = [];
    for (let i = 13; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const dayCheckins = await Checkin.find({
        createdAt: { $gte: date, $lt: nextDate },
      });

      const dayAvg =
        dayCheckins.length > 0
          ? parseFloat((dayCheckins.reduce((s, c) => s + c.mood, 0) / dayCheckins.length).toFixed(2))
          : null;

      moodTrend.push({
        date: date.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
        mood: dayAvg,
        threshold: 2.5,
      });
    }

    res.json({
      success: true,
      stats: {
        totalCheckins,
        atRiskCount,
        avgMood,
        interventions: await Alert.countDocuments({ resolved: true }),
      },
      recentCheckins,
      alerts,
      moodTrend,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ── POST /api/dashboard/resolve/:alertId ─────────────────────────
router.post("/resolve/:alertId", async (req, res) => {
  try {
    await Alert.findByIdAndUpdate(req.params.alertId, { resolved: true });
    res.json({ success: true, message: "Alert resolved" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ── POST /api/dashboard/message ──────────────────────────────────
router.post("/message", async (req, res) => {
  try {
    const { tokenId, message, urgent } = req.body;

    if (!tokenId || !message) {
      return res.status(400).json({ error: "tokenId and message are required" });
    }

    const alert = await Alert.findOne({ tokenId, resolved: false });
    if (alert) {
      alert.message = message;
      if (urgent) alert.severity = "high";
      await alert.save();
    }

    res.json({ success: true, message: "Message sent anonymously" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ── GET /api/dashboard/analytics ─────────────────────────────────
router.get("/analytics", async (req, res) => {
  try {
    const departments = ["Computer Science", "Engineering", "Medicine", "Law", "Psychology", "Business"];
    const moodByDept = [];

    for (const dept of departments) {
      const checkins = await Checkin.find({ department: dept }).limit(50);
      if (checkins.length > 0) {
        const avg = checkins.reduce((s, c) => s + c.mood, 0) / checkins.length;
        moodByDept.push({ department: dept.split(" ")[0], avgMood: parseFloat(avg.toFixed(2)) });
      } else {
        moodByDept.push({ department: dept.split(" ")[0], avgMood: 0 });
      }
    }

    const totalCheckins = await Checkin.countDocuments();
    const totalResolved = await Alert.countDocuments({ resolved: true });

    res.json({
      success: true,
      moodByDept,
      totalCheckins,
      totalResolved,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
