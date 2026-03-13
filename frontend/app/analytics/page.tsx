"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Calendar, ChevronDown, Lightbulb, ArrowRight, TrendingUp, Users, AlertTriangle } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend, Area, AreaChart 
} from "recharts";

const departmentMoodData = [
  { department: "Engineering", mood: 3.2 },
  { department: "Psychology", mood: 3.8 },
  { department: "Business", mood: 2.9 },
  { department: "Medicine", mood: 2.5 },
  { department: "Arts", mood: 4.1 },
  { department: "Law", mood: 3.0 },
  { department: "Sciences", mood: 3.5 },
];

const moodVsAttendanceData = [
  { week: "Week 1", mood: 3.8, attendance: 92 },
  { week: "Week 2", mood: 3.5, attendance: 88 },
  { week: "Week 3", mood: 3.2, attendance: 85 },
  { week: "Week 4", mood: 2.8, attendance: 78, isExam: true },
  { week: "Week 5", mood: 2.5, attendance: 72, isExam: true },
  { week: "Week 6", mood: 3.4, attendance: 86 },
  { week: "Week 7", mood: 3.6, attendance: 89 },
  { week: "Week 8", mood: 3.9, attendance: 91 },
];

const weeklyStressData = [
  { time: "6AM", Mon: 2, Tue: 3, Wed: 2, Thu: 4, Fri: 3, Sat: 1, Sun: 1 },
  { time: "9AM", Mon: 5, Tue: 6, Wed: 7, Thu: 8, Fri: 6, Sat: 2, Sun: 2 },
  { time: "12PM", Mon: 4, Tue: 5, Wed: 6, Thu: 7, Fri: 5, Sat: 3, Sun: 2 },
  { time: "3PM", Mon: 6, Tue: 7, Wed: 8, Thu: 9, Fri: 7, Sat: 3, Sun: 3 },
  { time: "6PM", Mon: 5, Tue: 6, Wed: 7, Thu: 8, Fri: 4, Sat: 4, Sun: 4 },
  { time: "9PM", Mon: 7, Tue: 8, Wed: 8, Thu: 9, Fri: 5, Sat: 5, Sun: 5 },
];

const sparklineData = [
  { value: 35 }, { value: 42 }, { value: 38 }, { value: 45 }, 
  { value: 52 }, { value: 48 }, { value: 55 }
];

const metricCards = [
  { 
    label: "Weekly Check-ins", 
    value: "487", 
    change: "+18%", 
    isPositive: true,
    icon: Users,
    gradient: "from-mindpulse-purple to-blue-500"
  },
  { 
    label: "Avg Mood Score", 
    value: "3.4", 
    change: "+0.2", 
    isPositive: true,
    icon: TrendingUp,
    gradient: "from-mindpulse-teal to-green-500"
  },
  { 
    label: "High Risk Alerts", 
    value: "12", 
    change: "-3", 
    isPositive: true,
    icon: AlertTriangle,
    gradient: "from-mindpulse-amber to-orange-500"
  },
];

const insights = [
  {
    title: "Exam Period Impact",
    description: "Mood scores dropped 28% during exam weeks 4-5. Consider implementing additional support resources before the next exam period.",
    gradient: "from-mindpulse-coral to-red-600"
  },
  {
    title: "Medicine Department Alert",
    description: "Medicine department has the lowest average mood (2.5). Recommend targeted wellness program for medical students.",
    gradient: "from-mindpulse-amber to-orange-500"
  },
  {
    title: "Evening Stress Peak",
    description: "Stress levels peak between 6-9 PM on weekdays. Consider extending counseling hours or adding evening support options.",
    gradient: "from-mindpulse-purple to-indigo-500"
  },
];

function getHeatmapColor(value: number) {
  if (value <= 2) return "bg-[#1a3a2a]";
  if (value <= 4) return "bg-[#2a3a2a]";
  if (value <= 6) return "bg-[#3a3a2a]";
  if (value <= 8) return "bg-[#4a2a2a]";
  return "bg-[#5a1a1a]";
}

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-mindpulse-bg">
      <DashboardSidebar />
      <main className="ml-[260px] p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-mindpulse-text">
            Campus Wellness Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <button className="glass-card flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-mindpulse-text hover:bg-white/5 transition-colors">
              <Calendar className="w-4 h-4 text-mindpulse-purple" />
              Last 30 Days
              <ChevronDown className="w-4 h-4 text-mindpulse-muted" />
            </button>
            <button className="glass-card flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-mindpulse-text hover:bg-white/5 transition-colors">
              All Departments
              <ChevronDown className="w-4 h-4 text-mindpulse-muted" />
            </button>
          </div>
        </div>

        {/* Top Metric Cards with Sparklines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {metricCards.map((metric, index) => (
            <div key={index} className="glass-card rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-mindpulse-muted mb-1">{metric.label}</p>
                  <p className="text-3xl font-bold gradient-text">{metric.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${metric.gradient} flex items-center justify-center`}>
                  <metric.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${metric.isPositive ? "text-mindpulse-teal" : "text-mindpulse-coral"}`}>
                  {metric.change} vs last period
                </span>
                <div className="w-24 h-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sparklineData}>
                      <defs>
                        <linearGradient id={`sparkline-${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6C63FF" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#6C63FF" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#6C63FF" 
                        strokeWidth={2}
                        fill={`url(#sparkline-${index})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Mood by Department Bar Chart */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-lg font-semibold text-mindpulse-text mb-6">
              Mood by Department
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentMoodData} layout="vertical" barSize={24}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#6C63FF" />
                      <stop offset="100%" stopColor="#00D4AA" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                  <XAxis 
                    type="number" 
                    stroke="#8B8FA8" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 5]}
                  />
                  <YAxis 
                    type="category"
                    dataKey="department" 
                    stroke="#8B8FA8" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    width={90}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0F1729",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "#F0F0FF",
                    }}
                    formatter={(value: number) => [value.toFixed(1), "Avg Mood"]}
                  />
                  <Bar 
                    dataKey="mood" 
                    fill="url(#barGradient)" 
                    radius={[0, 6, 6, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Stress Heatmap */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-lg font-semibold text-mindpulse-text mb-6">
              Weekly Stress Map
            </h2>
            <div className="overflow-x-auto">
              <div className="min-w-[400px]">
                <div className="grid grid-cols-8 gap-1.5 mb-2">
                  <div className="text-xs text-mindpulse-muted" />
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div key={day} className="text-xs text-mindpulse-muted text-center">
                      {day}
                    </div>
                  ))}
                </div>
                {weeklyStressData.map((row) => (
                  <div key={row.time} className="grid grid-cols-8 gap-1.5 mb-1.5">
                    <div className="text-xs text-mindpulse-muted flex items-center">
                      {row.time}
                    </div>
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <div
                        key={`${row.time}-${day}`}
                        className={`aspect-square rounded-md ${getHeatmapColor(row[day as keyof typeof row] as number)} flex items-center justify-center text-xs text-mindpulse-muted/50`}
                        title={`Stress: ${row[day as keyof typeof row]}/10`}
                      />
                    ))}
                  </div>
                ))}
                <div className="flex items-center justify-end gap-2 mt-4">
                  <span className="text-xs text-mindpulse-muted">Low</span>
                  <div className="flex gap-1">
                    {[1, 3, 5, 7, 9].map((v) => (
                      <div key={v} className={`w-4 h-4 rounded ${getHeatmapColor(v)}`} />
                    ))}
                  </div>
                  <span className="text-xs text-mindpulse-muted">High</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mood vs Attendance Chart */}
        <div className="glass-card rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-mindpulse-text mb-6">
            Mood vs Attendance Correlation
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodVsAttendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="week" 
                  stroke="#8B8FA8" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="#8B8FA8" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 5]}
                  label={{ value: 'Mood', angle: -90, position: 'insideLeft', fill: '#8B8FA8', fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="#8B8FA8" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[60, 100]}
                  label={{ value: 'Attendance %', angle: 90, position: 'insideRight', fill: '#8B8FA8', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F1729",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#F0F0FF",
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: "20px" }}
                  formatter={(value) => <span style={{ color: "#8B8FA8" }}>{value}</span>}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#6C63FF" 
                  strokeWidth={3}
                  dot={{ fill: "#6C63FF", strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: "#6C63FF" }}
                  name="Avg Mood"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="#00D4AA" 
                  strokeWidth={3}
                  dot={{ fill: "#00D4AA", strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: "#00D4AA" }}
                  name="Attendance %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-mindpulse-coral/10 border border-mindpulse-coral/20 rounded-lg">
            <p className="text-sm text-mindpulse-muted">
              <span className="font-medium text-mindpulse-coral">Exam Period Alert:</span> Weeks 4-5 show significant drops in both mood (-32%) and attendance (-22%). This coincides with midterm examinations.
            </p>
          </div>
        </div>

        {/* Insights Section */}
        <div>
          <h2 className="text-lg font-semibold text-mindpulse-text mb-6 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-mindpulse-amber" />
            AI-Generated Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((insight, index) => (
              <div 
                key={index}
                className={`glass-card rounded-xl p-6 border-l-4`}
                style={{
                  borderLeftColor: insight.gradient.includes("coral") ? "#FF6B6B" : 
                                   insight.gradient.includes("amber") ? "#FFB347" : "#6C63FF"
                }}
              >
                <h3 className="font-semibold text-mindpulse-text mb-2">
                  {insight.title}
                </h3>
                <p className="text-sm text-mindpulse-muted mb-4">
                  {insight.description}
                </p>
                <button className="flex items-center gap-2 text-sm font-medium text-mindpulse-purple hover:text-mindpulse-teal transition-colors">
                  Take Action
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
