import { useMemo } from "react";

interface GoldParticlesProps {
  density?: "low" | "medium" | "high";
  className?: string;
}

export const GoldParticles = ({ density = "medium", className = "" }: GoldParticlesProps) => {
  const count = density === "low" ? 20 : density === "high" ? 60 : 35;

  // Deterministic positions/timings so SSR and client agree, and animations don't reshuffle on re-render
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 7919) % 100}%`,
        top: `${(i * 3779) % 100}%`,
        size: 1 + ((i * 3) % 3),
        opacity: 0.25 + ((i * 13) % 5) / 10,
        // Drift parameters — each particle drifts a small unique amount
        driftX: ((i * 17) % 12) - 6,
        driftY: ((i * 23) % 14) - 8,
        duration: 6 + ((i * 7) % 8),
        delay: ((i * 11) % 5),
      })),
    [count]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(212, 166, 74, 0.18) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(212, 166, 74, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, rgba(212, 166, 74, 0.08) 0%, transparent 60%)",
        }}
      />
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-particle-drift"
          style={
            {
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: "#d4a64a",
              boxShadow: "0 0 6px rgba(212, 166, 74, 0.6)",
              "--p-opacity": p.opacity,
              "--drift-x": `${p.driftX}px`,
              "--drift-y": `${p.driftY}px`,
              "--drift-duration": `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};
