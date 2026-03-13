import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-mindpulse-bg">
      <DashboardSidebar />
      <main className="ml-[260px] min-h-screen">
        {children}
      </main>
    </div>
  );
}
