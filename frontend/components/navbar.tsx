"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain } from "lucide-react";

const navLinks = [
  { href: "/", label: "Check-in" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-mindpulse-purple to-mindpulse-teal flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">MindPulse</span>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                pathname === link.href
                  ? "text-mindpulse-text"
                  : "text-mindpulse-muted hover:text-mindpulse-text"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Counsellor Login Button */}
        <Link
          href="/login"
          className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg group"
          style={{
            background: "linear-gradient(#0F1729, #0F1729) padding-box, linear-gradient(135deg, #6C63FF, #00D4AA) border-box",
            border: "1px solid transparent",
          }}
        >
          <span className="text-mindpulse-text group-hover:text-white transition-colors">
            Counsellor Login
          </span>
        </Link>
      </div>
    </nav>
  );
}
