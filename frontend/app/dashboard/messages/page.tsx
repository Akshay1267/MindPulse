export default function MessagesPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-mindpulse-text mb-2">Messages</h1>
      <p className="text-mindpulse-muted mb-8">Anonymous messages sent to students.</p>
      <div className="glass-card rounded-xl p-12 flex flex-col items-center justify-center text-center">
        <span className="text-5xl mb-4">💬</span>
        <h2 className="text-xl font-semibold text-mindpulse-text mb-2">No messages yet</h2>
        <p className="text-mindpulse-muted">Messages sent from the dashboard alerts will appear here.</p>
      </div>
    </div>
  );
}