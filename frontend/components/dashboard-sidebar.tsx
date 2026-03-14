"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Brain, LayoutDashboard, AlertTriangle, MessageSquare, BarChart3, Settings, LogOut } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/alerts", label: "Alerts", icon: AlertTriangle, badge: 7 },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/analytics", label: "Reports", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("mindpulse_auth");
    router.push("/login");
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-mindpulse-sidebar flex flex-col border-r border-white/5">
      {/* Gradient border effect */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[1px]"
        style={{
          background: "linear-gradient(180deg, #6C63FF 0%, transparent 100%)",
          opacity: 0.3,
        }}
      />

      {/* Logo */}
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-mindpulse-purple to-mindpulse-teal flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">MindPulse</span>
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-white/5 text-mindpulse-text"
                      : "text-mindpulse-muted hover:bg-white/5 hover:text-mindpulse-text"
                  }`}
                >
                  {isActive && (
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full bg-mindpulse-purple"
                      style={{ boxShadow: "0 0 12px 2px rgba(108, 99, 255, 0.5)" }}
                    />
                  )}
                  <item.icon className={`w-5 h-5 ${isActive ? "text-mindpulse-purple" : ""}`} />
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto px-2 py-0.5 text-xs font-semibold rounded-full bg-mindpulse-coral text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile + Logout */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mindpulse-purple to-mindpulse-teal flex items-center justify-center text-white font-semibold text-sm">
            PS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-mindpulse-text truncate">Dr. Priya Sharma</p>
            <p className="text-xs text-mindpulse-muted truncate">Head Counsellor</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-mindpulse-muted hover:text-mindpulse-coral hover:bg-mindpulse-coral/10 transition-all duration-200 text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}