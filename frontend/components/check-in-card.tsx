"use client";

import { useState } from "react";
import { ArrowRight, Copy, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";

function generateToken(): string {
  const digits = Math.floor(1000 + Math.random() * 9000);
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `MP-${digits}-${letter}`;
}

const moods = [
  { emoji: "😢", label: "Struggling", value: 1 },
  { emoji: "😔", label: "Down", value: 2 },
  { emoji: "😐", label: "Okay", value: 3 },
  { emoji: "🙂", label: "Good", value: 4 },
  { emoji: "😊", label: "Great", value: 5 },
];

export function CheckInCard() {
  const [token, setToken] = useState("");
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [sleep, setSleep] = useState(7);
  const [stress, setStress] = useState(5);
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tokenGenerated, setTokenGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateToken = () => {
    const newToken = generateToken();
    setToken(newToken);
    setTokenGenerated(true);
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!selectedMood || !token) return;
  setIsSubmitting(true);
  try {
      await fetch("https://mindpulse-a403.onrender.com/api/checkin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tokenId: token,
        mood: selectedMood,
        sleep,
        stress,
        note: notes,        
        department: "General",
      }),
    });
  } catch (err) {
    console.error("Failed to submit:", err);
  }
  setIsSubmitting(false);
  setIsSubmitted(true);
};

  if (isSubmitted) {
    return (
      <div className="glass-card rounded-2xl p-8 md:p-12 max-w-[520px] w-full mx-auto animate-fade-in-up">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-mindpulse-teal/20 to-mindpulse-purple/20 flex items-center justify-center glow-teal">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" stroke="#00D4AA" strokeWidth="2" opacity="0.3" />
              <path
                d="M14 24L21 31L34 18"
                stroke="#00D4AA"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-center gradient-text mb-3">
          {"You're seen. You're heard."} 💚
        </h2>
        <p className="text-mindpulse-muted text-center mb-2">
          Your check-in was recorded anonymously. No one knows it was you.
        </p>
        <p className="text-mindpulse-teal text-center text-sm mb-8">
          🔥 Keep checking in daily — early patterns help us help you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/resources"
            className="flex-1 gradient-btn text-white font-medium py-3 px-6 rounded-xl text-center transition-all duration-200"
          >
            View Resources
          </Link>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setSelectedMood(null);
              setToken("");
              setNotes("");
              setSleep(7);
              setStress(5);
              setTokenGenerated(false);
            }}
            className="flex-1 border border-white/10 text-mindpulse-text font-medium py-3 px-6 rounded-xl hover:bg-white/5 transition-all duration-200"
          >
            New Check-in
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card rounded-2xl p-6 md:p-10 max-w-[520px] w-full mx-auto animate-fade-in-up"
    >
      {/* Token Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-mindpulse-muted mb-2">
          Your Anonymous Token
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Click 'Generate' to get your token"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-mindpulse-text placeholder:text-mindpulse-muted/50 focus:outline-none focus:ring-2 focus:ring-mindpulse-purple/50 focus:border-transparent transition-all duration-200 font-mono"
              readOnly={tokenGenerated}
            />
            {token && (
              <button
                type="button"
                onClick={handleCopyToken}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-mindpulse-muted hover:text-mindpulse-teal transition-colors"
              >
                {copied
                  ? <CheckCircle2 className="w-4 h-4 text-mindpulse-teal" />
                  : <Copy className="w-4 h-4" />
                }
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={handleGenerateToken}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-mindpulse-purple to-mindpulse-teal text-white text-sm font-medium hover:opacity-90 transition-all whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" />
            Generate
          </button>
        </div>
        {tokenGenerated && (
          <p className="mt-2 text-xs text-mindpulse-teal flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Token generated! Save this — you&apos;ll need it to view your mood history.
          </p>
        )}
        {copied && (
          <p className="mt-1 text-xs text-mindpulse-teal">Copied to clipboard!</p>
        )}
      </div>

      {/* Mood Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-mindpulse-muted mb-3">
          How are you feeling?
        </label>
        <div className="flex justify-between gap-2">
          {moods.map((mood) => (
            <button
              key={mood.value}
              type="button"
              onClick={() => setSelectedMood(mood.value)}
              className={`flex-1 aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                selectedMood === mood.value
                  ? "bg-gradient-to-br from-mindpulse-purple to-mindpulse-teal scale-105 glow-purple"
                  : "bg-white/5 hover:bg-white/10 border border-white/10"
              }`}
            >
              <span className="text-2xl md:text-3xl">{mood.emoji}</span>
              <span className="text-[10px] md:text-xs text-mindpulse-muted">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sleep Slider */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-mindpulse-muted">Hours of Sleep</label>
          <span className="text-sm font-semibold text-mindpulse-text">{sleep}h</span>
        </div>
        <input
          type="range"
          min="0"
          max="12"
          value={sleep}
          onChange={(e) => setSleep(Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-mindpulse-purple [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-mindpulse-purple [&::-webkit-slider-thumb]:to-mindpulse-teal"
          style={{
            background: `linear-gradient(to right, #6C63FF 0%, #00D4AA ${(sleep / 12) * 100}%, rgba(255,255,255,0.1) ${(sleep / 12) * 100}%)`,
          }}
        />
      </div>

      {/* Stress Slider */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-mindpulse-muted">Academic Stress Level</label>
          <span className="text-sm font-semibold text-mindpulse-text">{stress}/10</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={stress}
          onChange={(e) => setStress(Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-mindpulse-purple [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-mindpulse-purple [&::-webkit-slider-thumb]:to-mindpulse-teal"
          style={{
            background: `linear-gradient(to right, #6C63FF 0%, #00D4AA ${((stress - 1) / 9) * 100}%, rgba(255,255,255,0.1) ${((stress - 1) / 9) * 100}%)`,
          }}
        />
      </div>

      {/* Notes */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-mindpulse-muted mb-2">
          Anything else? (Optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Share what's on your mind..."
          rows={3}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-mindpulse-text placeholder:text-mindpulse-muted/50 focus:outline-none focus:ring-2 focus:ring-mindpulse-purple/50 focus:border-transparent transition-all duration-200 resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!selectedMood || isSubmitting}
        className="w-full gradient-btn text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
      >
        <span className="relative z-10">
          {isSubmitting ? "Submitting..." : "Submit Check-in"}
        </span>
        {!isSubmitting && (
          <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
        )}
      </button>
    </form>
  );
}