export default function SettingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-mindpulse-text mb-2">Settings</h1>
      <p className="text-mindpulse-muted mb-8">Manage your counsellor account settings.</p>
      <div className="space-y-4 max-w-lg">
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold text-mindpulse-text mb-4">Profile</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-mindpulse-muted">Name</label>
              <p className="text-mindpulse-text font-medium">Dr. Priya Sharma</p>
            </div>
            <div>
              <label className="text-sm text-mindpulse-muted">Role</label>
              <p className="text-mindpulse-text font-medium">Head Counsellor</p>
            </div>
            <div>
              <label className="text-sm text-mindpulse-muted">College</label>
              <p className="text-mindpulse-text font-medium">MIET</p>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold text-mindpulse-text mb-4">Alert Preferences</h2>
          <div className="space-y-3">
            {["Email alerts for HIGH severity", "Daily wellness summary", "Weekly department report"].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-mindpulse-muted">{item}</span>
                <div className="w-10 h-5 bg-mindpulse-teal rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}