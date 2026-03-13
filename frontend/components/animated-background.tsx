"use client";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Dot Pattern Overlay */}
      <div className="absolute inset-0 dot-pattern" />
      
      {/* Animated Gradient Blobs */}
      <div 
        className="blob-1 absolute w-[600px] h-[600px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)",
          filter: "blur(120px)",
          top: "10%",
          left: "20%",
        }}
      />
      <div 
        className="blob-2 absolute w-[500px] h-[500px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #00D4AA 0%, transparent 70%)",
          filter: "blur(120px)",
          top: "50%",
          right: "10%",
        }}
      />
      <div 
        className="blob-3 absolute w-[550px] h-[550px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #4338CA 0%, transparent 70%)",
          filter: "blur(120px)",
          bottom: "10%",
          left: "40%",
        }}
      />
    </div>
  );
}
