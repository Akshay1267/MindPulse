"use client";

import { useState } from "react";
import { Users, AlertTriangle, TrendingUp, Heart, ArrowUp, ArrowDown, Send, X, CheckCircle2 } from "lucide-react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Line } from "recharts";

// ── Types ──────────────────────────────────────────────────────────
type Alert = {
  id: string;
  department: string;
  severity: string;
  message: string;
};

// ── Send Message Modal ─────────────────────────────────────────────
function SendMessageModal({ alert, onClose }: { alert: Alert | null; onClose: () => void }) {
  const [message, setMessage] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [sent, setSent] = useState(false);

  if (!alert) return null;

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setMessage("");
      setUrgent(false);
      onClose();
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md glass-card rounded-2xl p-6 border border-white/10 animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-mindpulse-text">Send Anonymous Message</h3>
            <p className="text-xs text-mindpulse-muted mt-0.5">
              Student won&apos;t know it&apos;s from you directly
            </p>
          </div>
          <button onClick={onClose} className="text-mindpulse-muted hover:text-mindpulse-text transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Info */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 mb-4">
          <code className="text-sm font-mono text-mindpulse-text">{alert.id}</code>
          <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-mindpulse-muted">
            {alert.department}
          </span>
          <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${
            alert.severity === "high"
              ? "bg-mindpulse-coral/20 text-mindpulse-coral"
              : "bg-mindpulse-amber/20 text-mindpulse-amber"
          }`}>
            {alert.severity}
          </span>
        </div>

        {sent ? (
          <div className="flex flex-col items-center py-8 gap-3">
            <CheckCircle2 className="w-12 h-12 text-mindpulse-teal" />
            <p className="text-mindpulse-teal font-semibold">Message sent anonymously ✓</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-mindpulse-muted mb-2">
                Your Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 300))}
                placeholder="e.g. Hey, we noticed you might be going through something tough. We're here whenever you're ready to talk — no pressure at all. 💚"
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-mindpulse-text placeholder:text-mindpulse-muted/40 focus:outline-none focus:ring-2 focus:ring-mindpulse-purple/50 text-sm resize-none transition-all"
              />
              <div className="text-right text-xs text-mindpulse-muted mt-1">
                {message.length}/300
              </div>
            </div>

            {/* Urgent checkbox */}
            <label className="flex items-center gap-3 mb-5 cursor-pointer group">
              <div
                onClick={() => setUrgent(!urgent)}
                className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                  urgent ? "bg-mindpulse-coral border-mindpulse-coral" : "border-white/20 bg-white/5"
                }`}
              >
                {urgent && <CheckCircle2 className="w-3 h-3 text-white" />}
              </div>
              <span className="text-sm text-mindpulse-muted group-hover:text-mindpulse-text transition-colors">
                Flag for urgent in-person follow-up
              </span>
            </label>

            <div className="flex gap-3">
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-mindpulse-purple to-mindpulse-teal text-white font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-all"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-xl border border-white/10 text-mindpulse-muted hover:text-mindpulse-text hover:bg-white/5 text-sm transition-all"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Data ───────────────────────────────────────────────────────────
const stats = [
  { label: "Total Check-ins", value: "142", trend: "+12%", trendUp: true, icon: Users, gradient: "from-mindpulse-purple to-blue-500" },
  { label: "At-Risk Students", value: "7", trend: "+2", trendUp: true, icon: AlertTriangle, gradient: "from-mindpulse-coral to-red-600", isAlert: true },
  { label: "Avg Campus Mood", value: "3.2/5", trend: "-0.3", trendUp: false, icon: TrendingUp, gradient: "from-mindpulse-amber to-orange-500" },
  { label: "Interventions", value: "4", trend: "+1", trendUp: true, icon: Heart, gradient: "from-mindpulse-teal to-green-500" },
];

const moodData = [
  { date: "Mar 1", mood: 3.5, threshold: 2.5 },
  { date: "Mar 2", mood: 3.2, threshold: 2.5 },
  { date: "Mar 3", mood: 3.8, threshold: 2.5 },
  { date: "Mar 4", mood: 3.1, threshold: 2.5 },
  { date: "Mar 5", mood: 2.9, threshold: 2.5 },
  { date: "Mar 6", mood: 3.0, threshold: 2.5 },
  { date: "Mar 7", mood: 3.4, threshold: 2.5 },
  { date: "Mar 8", mood: 3.6, threshold: 2.5 },
  { date: "Mar 9", mood: 3.2, threshold: 2.5 },
  { date: "Mar 10", mood: 2.8, threshold: 2.5 },
  { date: "Mar 11", mood: 3.1, threshold: 2.5 },
  { date: "Mar 12", mood: 3.3, threshold: 2.5 },
  { date: "Mar 13", mood: 3.5, threshold: 2.5 },
  { date: "Mar 14", mood: 3.2, threshold: 2.5 },
];

const alerts: Alert[] = [
  { id: "STU-7291", department: "Engineering", severity: "high", message: "Mood score 1.5 for 3 consecutive days" },
  { id: "STU-4823", department: "Psychology", severity: "high", message: "Stress level 10/10, sleep under 4h" },
  { id: "STU-9156", department: "Business", severity: "medium", message: "Declining mood trend over 5 days" },
  { id: "STU-3847", department: "Arts", severity: "medium", message: "High stress during exam period" },
];

const recentCheckins = [
  { id: "STU-8372", department: "Computer Science", mood: 4.2, time: "2 min ago" },
  { id: "STU-1924", department: "Medicine", mood: 2.8, time: "5 min ago" },
  { id: "STU-5638", department: "Law", mood: 3.5, time: "12 min ago" },
  { id: "STU-7291", department: "Engineering", mood: 1.8, time: "18 min ago" },
  { id: "STU-4102", department: "Psychology", mood: 4.0, time: "25 min ago" },
];

function getMoodColor(mood: number) {
  if (mood >= 4) return "bg-mindpulse-teal";
  if (mood >= 3) return "bg-mindpulse-amber";
  return "bg-mindpulse-coral";
}

// ── Page ───────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [activeAlert, setActiveAlert] = useState<Alert | null>(null);

  return (
    <div className="p-8">
      {/* Modal */}
      {activeAlert && (
        <SendMessageModal alert={activeAlert} onClose={() => setActiveAlert(null)} />
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-mindpulse-text mb-2">
          Good morning, Dr. Sharma 👋
        </h1>
        <p className="text-mindpulse-muted">Here&apos;s your campus wellness snapshot.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.trendUp ? (stat.isAlert ? "text-mindpulse-coral" : "text-mindpulse-teal") : "text-mindpulse-coral"
              }`}>
                {stat.trendUp ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {stat.trend}
              </div>
            </div>
            <p className={`text-3xl font-bold mb-1 ${stat.isAlert ? "text-mindpulse-coral" : "gradient-text"}`}>
              {stat.value}
            </p>
            <p className="text-sm text-mindpulse-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
        {/* Mood Chart */}
        <div className="lg:col-span-3 glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold text-mindpulse-text mb-4">
            Mood Trend — Last 14 Days
          </h2>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={moodData}>
                <defs>
                  <linearGradient id="moodGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6C63FF" />
                    <stop offset="100%" stopColor="#00D4AA" />
                  </linearGradient>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6C63FF" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#00D4AA" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" stroke="#8B8FA8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#8B8FA8" fontSize={12} tickLine={false} axisLine={false} domain={[1, 5]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F1729",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#F0F0FF",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="threshold"
                  stroke="#FF6B6B"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={false}
                  name="Crisis Threshold"
                />
                <Area
                  type="monotone"
                  dataKey="mood"
                  stroke="url(#moodGradient)"
                  strokeWidth={3}
                  fill="url(#areaGradient)"
                  name="Average Mood"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-mindpulse-purple to-mindpulse-teal" />
              <span className="text-mindpulse-muted">Average Mood</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-mindpulse-coral" style={{ backgroundImage: "repeating-linear-gradient(90deg, #FF6B6B 0, #FF6B6B 5px, transparent 5px, transparent 10px)" }} />
              <span className="text-mindpulse-muted">Crisis Threshold</span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-mindpulse-text">🚨 Active Alerts</h2>
          <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`glass-card rounded-xl p-4 border-l-4 ${
                  alert.severity === "high" ? "border-l-mindpulse-coral" : "border-l-mindpulse-amber"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <code className="text-sm font-mono text-mindpulse-text">{alert.id}</code>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    alert.severity === "high"
                      ? "bg-mindpulse-coral/20 text-mindpulse-coral"
                      : "bg-mindpulse-amber/20 text-mindpulse-amber"
                  }`}>
                    {alert.severity}
                  </span>
                </div>
                <span className="inline-block px-2 py-0.5 text-xs rounded bg-white/5 text-mindpulse-muted mb-2">
                  {alert.department}
                </span>
                <p className="text-sm text-mindpulse-muted mb-3">{alert.message}</p>
                <button
                  onClick={() => setActiveAlert(alert)}
                  className="flex items-center gap-2 text-sm font-medium text-mindpulse-purple hover:text-mindpulse-teal transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Check-ins Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-semibold text-mindpulse-text">Recent Check-ins</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-left text-sm font-medium text-mindpulse-muted">Student ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-mindpulse-muted">Department</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-mindpulse-muted">Mood Score</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-mindpulse-muted">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentCheckins.map((checkin, index) => (
                <tr
                  key={index}
                  className="border-b border-white/5 hover:bg-mindpulse-purple/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <code className="text-sm font-mono text-mindpulse-text">{checkin.id}</code>
                  </td>
                  <td className="px-6 py-4 text-sm text-mindpulse-muted">{checkin.department}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${getMoodColor(checkin.mood)}`} />
                      <span className="text-sm text-mindpulse-text">{checkin.mood}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-mindpulse-muted">{checkin.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}