import { AnimatedBackground } from "@/components/animated-background";
import { Navbar } from "@/components/navbar";
import { CheckInCard } from "@/components/check-in-card";
import { Shield, Lock, Trash2 } from "lucide-react";

const features = [
  { icon: Shield, label: "100% Anonymous" },
  { icon: Lock, label: "AES-256 Encrypted" },
  { icon: Trash2, label: "Delete Anytime" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4 text-balance">
            How are you feeling today?
          </h1>
          <p className="text-lg text-mindpulse-muted mb-6">
            30 seconds. Anonymous. No judgment.
          </p>
          
          {/* Encrypted Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-mindpulse-muted glow-purple">
            <Lock className="w-4 h-4 text-mindpulse-purple" />
            <span>End-to-end encrypted</span>
          </div>
        </div>

        {/* Check-in Card */}
        <CheckInCard />

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mt-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {features.map((feature) => (
            <div
              key={feature.label}
              className="glass-card flex items-center gap-2 px-4 py-2.5 rounded-full"
            >
              <feature.icon className="w-4 h-4 text-mindpulse-purple" />
              <span className="text-sm text-mindpulse-muted">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
