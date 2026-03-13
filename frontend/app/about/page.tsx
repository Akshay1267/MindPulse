import { AnimatedBackground } from "@/components/animated-background";
import { Navbar } from "@/components/navbar";
import { Shield, Lock, Heart, Users, Zap, Globe } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "100% Anonymous",
    description: "Your identity is never stored. We use anonymous tokens so you can express yourself freely without fear.",
  },
  {
    icon: Lock,
    title: "AES-256 Encrypted",
    description: "Military-grade encryption protects your data. Even we cannot read your personal notes.",
  },
  {
    icon: Zap,
    title: "Real-time Alerts",
    description: "Our system identifies students who may need support and alerts counselors immediately.",
  },
  {
    icon: Heart,
    title: "Evidence-Based",
    description: "Built with guidance from mental health professionals using proven intervention strategies.",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with peers and professionals who understand what you are going through.",
  },
  {
    icon: Globe,
    title: "Always Available",
    description: "Access resources and support 24/7, whenever you need it most.",
  },
];

const stats = [
  { value: "50K+", label: "Students Helped" },
  { value: "98%", label: "Privacy Rating" },
  { value: "24/7", label: "Support Available" },
  { value: "200+", label: "Universities" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />

      <div className="relative z-10 pt-24 pb-16 px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6 text-balance">
            Mental health support that puts students first
          </h1>
          <p className="text-lg md:text-xl text-mindpulse-muted max-w-2xl mx-auto leading-relaxed">
            MindPulse is an early warning system designed to support student mental health through anonymous check-ins, 
            real-time analytics, and proactive intervention.
          </p>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto mb-16 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card rounded-xl p-6 text-center">
                <p className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-mindpulse-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-mindpulse-text text-center mb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Why MindPulse?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass-card rounded-xl p-6 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${0.1 * (index + 3)}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mindpulse-purple to-mindpulse-teal flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-mindpulse-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-mindpulse-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <div 
            className="glass-card rounded-2xl p-8 md:p-12 text-center"
            style={{
              border: "1px solid transparent",
              backgroundImage: "linear-gradient(#0F1729, #0F1729), linear-gradient(135deg, #6C63FF, #00D4AA)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-mindpulse-text mb-4">
              Our Mission
            </h2>
            <p className="text-mindpulse-muted leading-relaxed max-w-2xl mx-auto">
              We believe every student deserves access to mental health support without stigma or barriers. 
              MindPulse bridges the gap between students and counselors, enabling early intervention and 
              creating a culture of wellness on campus. Together, we can transform how universities support 
              student mental health.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
