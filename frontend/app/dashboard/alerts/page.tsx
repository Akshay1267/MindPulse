export default function AlertsPage() {
  const alerts = [
    { id: "STU-7291", department: "Engineering", severity: "high", message: "Mood score 1.5 for 3 consecutive days" },
    { id: "STU-4823", department: "Psychology", severity: "high", message: "Stress level 10/10, sleep under 4h" },
    { id: "STU-9156", department: "Business", severity: "medium", message: "Declining mood trend over 5 days" },
    { id: "STU-3847", department: "Arts", severity: "medium", message: "High stress during exam period" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-mindpulse-text mb-2">🚨 Active Alerts</h1>
      <p className="text-mindpulse-muted mb-8">Students flagged by the AI risk detection system.</p>
      <div className="space-y-4">
        {alerts.map((alert, i) => (
          <div key={i} className={`glass-card rounded-xl p-5 border-l-4 ${
            alert.severity === "high" ? "border-l-mindpulse-coral" : "border-l-mindpulse-amber"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <code className="font-mono text-mindpulse-text">{alert.id}</code>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                alert.severity === "high"
                  ? "bg-mindpulse-coral/20 text-mindpulse-coral"
                  : "bg-mindpulse-amber/20 text-mindpulse-amber"
              }`}>{alert.severity.toUpperCase()}</span>
            </div>
            <p className="text-sm text-mindpulse-muted mb-1">{alert.department}</p>
            <p className="text-sm text-mindpulse-text">{alert.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}