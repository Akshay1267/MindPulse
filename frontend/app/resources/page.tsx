"use client";

import { useState } from "react";
import { AnimatedBackground } from "@/components/animated-background";
import { Navbar } from "@/components/navbar";
import { Wind, Phone, BookOpen, Heart, Music, Dumbbell, Users, ArrowRight, MessageCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

const tabs = [
  { id: "instant", label: "Instant Relief" },
  { id: "talk", label: "Talk to Someone" },
  { id: "academic", label: "Academic Stress" },
];

const resources = {
  instant: [
    { 
      icon: Wind, 
      title: "Breathing Exercise", 
      description: "4-7-8 technique to calm your nervous system in 60 seconds.",
      gradient: "from-blue-500 to-cyan-400"
    },
    { 
      icon: Music, 
      title: "Calm Sounds", 
      description: "Curated playlists for focus, sleep, and relaxation.",
      gradient: "from-purple-500 to-pink-400"
    },
    { 
      icon: Heart, 
      title: "Grounding Exercise", 
      description: "5-4-3-2-1 sensory technique to stay present.",
      gradient: "from-rose-500 to-orange-400"
    },
    { 
      icon: Dumbbell, 
      title: "Quick Movement", 
      description: "5-minute desk stretches to release tension.",
      gradient: "from-green-500 to-emerald-400"
    },
  ],
  talk: [
    { 
      icon: Phone, 
      title: "24/7 Crisis Hotline", 
      description: "Speak to a trained counselor anytime, anywhere.",
      gradient: "from-red-500 to-rose-400"
    },
    { 
      icon: MessageCircle, 
      title: "Text Support", 
      description: "Text HOME to 741741 for crisis text line support.",
      gradient: "from-indigo-500 to-purple-400"
    },
    { 
      icon: Users, 
      title: "Peer Support Groups", 
      description: "Connect with students who understand what you're going through.",
      gradient: "from-teal-500 to-cyan-400"
    },
    { 
      icon: Heart, 
      title: "Schedule Counseling", 
      description: "Book a confidential session with a campus counselor.",
      gradient: "from-pink-500 to-rose-400"
    },
  ],
  academic: [
    { 
      icon: BookOpen, 
      title: "Study Techniques", 
      description: "Evidence-based methods for effective learning and retention.",
      gradient: "from-amber-500 to-yellow-400"
    },
    { 
      icon: Wind, 
      title: "Exam Anxiety Guide", 
      description: "Strategies to manage pre-exam stress and perform your best.",
      gradient: "from-blue-500 to-indigo-400"
    },
    { 
      icon: Users, 
      title: "Study Groups", 
      description: "Find peers in your courses for collaborative learning.",
      gradient: "from-green-500 to-teal-400"
    },
    { 
      icon: Heart, 
      title: "Academic Coaching", 
      description: "One-on-one support for time management and goal setting.",
      gradient: "from-purple-500 to-violet-400"
    },
  ],
};

const moodHistory = [
  { day: "Mon", score: 3.5, color: "#FFB347" },
  { day: "Tue", score: 2.8, color: "#FF6B6B" },
  { day: "Wed", score: 3.2, color: "#FFB347" },
  { day: "Thu", score: 4.1, color: "#00D4AA" },
  { day: "Fri", score: 3.8, color: "#FFB347" },
  { day: "Sat", score: 4.5, color: "#00D4AA" },
  { day: "Sun", score: 4.2, color: "#00D4AA" },
];

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState("instant");

  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />

      <div className="relative z-10 pt-24 pb-12 px-4">
        {/* Hero Banner */}
        <div 
          className="max-w-6xl mx-auto rounded-2xl p-8 md:p-12 mb-12 animate-fade-in-up"
          style={{
            background: "linear-gradient(135deg, rgba(108, 99, 255, 0.2) 0%, rgba(0, 212, 170, 0.2) 100%)",
          }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-mindpulse-text mb-4 text-balance">
            {"You're not alone."}
          </h1>
          <p className="text-lg text-mindpulse-muted max-w-2xl">
            Curated tools to help you feel better, right now.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="max-w-6xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="inline-flex gap-2 p-1.5 bg-white/5 rounded-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "gradient-btn text-white"
                    : "text-mindpulse-muted hover:text-mindpulse-text"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Resource Cards Grid */}
        <div 
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 animate-fade-in-up" 
          style={{ animationDelay: "0.2s" }}
        >
          {resources[activeTab as keyof typeof resources].map((resource, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-6 group hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-mindpulse-purple/10"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${resource.gradient} flex items-center justify-center mb-4`}>
                <resource.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-mindpulse-text mb-2">
                {resource.title}
              </h3>
              <p className="text-sm text-mindpulse-muted mb-4">
                {resource.description}
              </p>
              <button className="flex items-center gap-2 text-sm font-medium text-mindpulse-purple group-hover:text-mindpulse-teal transition-colors">
                Try Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Counselor CTA Banner */}
        <div 
          className="max-w-6xl mx-auto mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div 
            className="glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{
              border: "1px solid transparent",
              backgroundImage: "linear-gradient(#0F1729, #0F1729), linear-gradient(135deg, #6C63FF, #00D4AA)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
          >
            <div>
              <h3 className="text-xl font-semibold text-mindpulse-text mb-2">
                Want to speak with your counsellor?
              </h3>
              <p className="text-mindpulse-muted">
                {"It's still anonymous. Your privacy is our priority."}
              </p>
            </div>
            <button className="gradient-btn text-white font-medium px-6 py-3 rounded-xl flex items-center gap-2 whitespace-nowrap">
              Schedule a Session
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mood History Section */}
        <div 
          className="max-w-6xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-mindpulse-text mb-6">
              Your Mood This Week
            </h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={moodHistory} barSize={40}>
                  <XAxis 
                    dataKey="day" 
                    stroke="#8B8FA8" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#8B8FA8" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 5]}
                    ticks={[1, 2, 3, 4, 5]}
                  />
                  <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                    {moodHistory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-mindpulse-coral" />
                <span className="text-mindpulse-muted">Low (1-2.5)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-mindpulse-amber" />
                <span className="text-mindpulse-muted">Okay (2.5-4)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-mindpulse-teal" />
                <span className="text-mindpulse-muted">Good (4-5)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
