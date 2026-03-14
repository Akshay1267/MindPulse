"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

const VALID_EMAIL = "counsellor@miet.ac.in";
const VALID_PASSWORD = "mindpulse123";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      localStorage.setItem("mindpulse_auth", "true");
      router.push("/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-15 bg-mindpulse-purple animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-15 bg-mindpulse-teal animate-pulse" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-3xl">🧠</span>
            <span className="text-2xl font-bold gradient-text">MindPulse</span>
          </div>
          <p className="text-mindpulse-muted text-sm">Counsellor & Admin Portal</p>
          <p className="text-xs text-mindpulse-muted/60 mt-1">
            Student check-in is on the{" "}
            <a href="/" className="text-mindpulse-teal hover:underline">main page →</a>
          </p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8 border border-white/10">
          <h2 className="text-xl font-semibold text-mindpulse-text mb-6 text-center">
            Sign In
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-mindpulse-muted mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mindpulse-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="counsellor@miet.ac.in"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-mindpulse-text placeholder:text-mindpulse-muted/50 focus:outline-none focus:ring-2 focus:ring-mindpulse-purple/50 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-mindpulse-muted mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mindpulse-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-mindpulse-text placeholder:text-mindpulse-muted/50 focus:outline-none focus:ring-2 focus:ring-mindpulse-purple/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-mindpulse-muted hover:text-mindpulse-text transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-mindpulse-coral text-sm text-center bg-mindpulse-coral/10 py-2 px-4 rounded-lg">
                ❌ {error}
              </p>
            )}

            {/* Demo credentials hint */}
            <div className="bg-white/5 rounded-lg p-3 text-xs text-mindpulse-muted text-center">
              Demo login: <span className="text-mindpulse-teal">counsellor@miet.ac.in</span> / <span className="text-mindpulse-teal">mindpulse123</span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-btn text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Sign In →"
              )}
            </button>
          </form>

          <p className="text-center text-xs text-mindpulse-muted mt-6">
            Admin access? Contact your IT department.
          </p>
        </div>
      </div>
    </div>
  );
}