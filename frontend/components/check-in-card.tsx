"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Copy, CheckCircle2, Sparkles, RefreshCw } from "lucide-react";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL;

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
  const [isReturningUser, setIsReturningUser] = useState(false);

  // Check for existing token via cookie on mount
  useEffect(() => {
    const checkExistingToken = async () => {
      try {
        const res = await fetch(`${API}/api/checkin/me`, {
          credentials: "include", // send cookies
        });
        const data = await res.json();
        if (data.success && data.tokenId) {
          setToken(data.tokenId);
          setTokenGenerated(true);
          setIsReturningUser(true);
        }
      } catch (err) {
        console.error("Could not check existing token:", err);
      }
    };
    checkExistingToken();
  }, []);

  const handleGenerateToken = async () => {
    // First check if cookie already exists
    try {
      const checkRes = await fetch(`${API}/api/checkin/me`, {
        credentials: "include",
      });
      const checkData = await checkRes.json();
      if (checkData.success && checkData.tokenId) {
        setToken(checkData.tokenId);
        setTokenGenerated(true);
        setIsReturningUser(true);
        return;
      }
    } catch {}

    // Generate new token
    const newToken = generateToken();

    try {
      const res = await fetch(`${API}/api/checkin/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // save cookie
        body: JSON.stringify({ tokenId: newToken }),
      });
      const data = await res.json();
      setToken(data.tokenId);
      setTokenGenerated(true);
      setIsReturningUser(false);
    } catch (err) {
      console.error("Registration failed:", err);
      // Fallback — still show token
      setToken(newToken);
      setTokenGenerated(true);
    }
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
      await fetch(`${API}/api/checkin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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
              <path d="M14 24L21 31L34 18" stroke="#00D4AA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-center gradient-text mb-3">
          {"You're seen. You're heard."} 💚
        </h2>
        <p className="text-mindpulse-muted text-center mb-2">
          Your check-in was recorded anonymously.
        </p>
        <p className="text-mindpulse-teal text-center text-sm mb-4">
          🔥 Keep checking in daily — early patterns help us help you.
        </p>
        <div className="bg-white/5 rounded-xl p-3 mb-6 text-center">
          <p className="text-xs text-mindpulse-muted mb-1">Your token (save this as backup)</p>
          <code className="text-sm font-mono text-mindpulse-teal">{token}</code>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/resources"
            className="flex-1 gradient-btn text-white font-medium py-3 px-6 rounded-xl text-center"
          >
            View History & Resources
          </Link>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setSelectedMood(null);
              setNotes("");
              setSleep(7);
              setStress(5);
            }}
            className="flex-1 border border-white/10 text-mindpulse-text font-medium py-3 px-6 rounded-xl hover:bg-white/5 transition-all"
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

        {isReturningUser && (
          <div className="flex items-center gap-2 mb-2 px-3 py-2 rounded-lg bg-mindpulse-teal/10 border border-mindpulse-teal/20">
            <CheckCircle2 className="w-4 h-4 text-mindpulse-teal shrink-0" />
            <p className="text-xs text-mindpulse-teal">
              Welcome back! Your token has been restored from your session.
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Click 'Generate' to get your token"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-mindpulse-text placeholder:text-mindpulse-muted/50 focus:outline-none focus:ring-2 focus:ring-mindpulse-purple/50 transition-all font-mono"
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

          {!tokenGenerated ? (
            <button
              type="button"
              onClick={handleGenerateToken}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-mindpulse-purple to-mindpulse-teal text-white text-sm font-medium hover:opacity-90 transition-all whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              Generate
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCopyToken}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 text-mindpulse-muted hover:text-mindpulse-teal text-sm transition-all whitespace-nowrap"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          )}
        </div>

        {tokenGenerated && !isReturningUser && (
          <p className="mt-2 text-xs text-mindpulse-teal flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Token generated! Copy it as a backup for other devices.
          </p>
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
          type="range" min="0" max="12" value={sleep}
          onChange={(e) => setSleep(Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
          style={{ background: `linear-gradient(to right, #6C63FF 0%, #00D4AA ${(sleep / 12) * 100}%, rgba(255,255,255,0.1) ${(sleep / 12) * 100}%)` }}
        />
      </div>

      {/* Stress Slider */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-mindpulse-muted">Academic Stress Level</label>
          <span className="text-sm font-semibold text-mindpulse-text">{stress}/10</span>
        </div>
        <input
          type="range" min="1" max="10" value={stress}
          onChange={(e) => setStress(Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
          style={{ background: `linear-gradient(to right, #6C63FF 0%, #00D4AA ${((stress - 1) / 9) * 100}%, rgba(255,255,255,0.1) ${((stress - 1) / 9) * 100}%)` }}
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
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-mindpulse-text placeholder:text-mindpulse-muted/50 focus:outline-none focus:ring-2 focus:ring-mindpulse-purple/50 transition-all resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!selectedMood || isSubmitting || !token}
        className="w-full gradient-btn text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        <span>{isSubmitting ? "Submitting..." : "Submit Check-in"}</span>
        {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
      </button>
    </form>
  );
}
