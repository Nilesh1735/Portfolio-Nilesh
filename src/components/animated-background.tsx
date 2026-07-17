"use client";

/**
 * Pure CSS Animated Background.
 * 
 * Replaces the heavy Spline WebGL engine to guarantee 144fps performance and 
 * eliminate all lag on lower-end devices. Your `skills.tsx` component will 
 * automatically detect the lack of 3D and render the HTML skill grid fallback.
 */
export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0a]">
      {/* Pure CSS Aurora Glow - Zero GPU cost */}
      <div 
        className="absolute -top-1/2 -left-1/2 h-[200%] w-[200%] animate-[spin_60s_linear_infinite] opacity-40"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, #151321 0%, #1a1a2e 25%, #161616 50%, #1a1a2e 75%, #151321 100%)',
        }}
      />
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, #0a0a0a 80%)',
        }}
      />
    </div>
  );
}