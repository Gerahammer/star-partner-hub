import { useMemo } from "react";

/**
 * Global animated background layer.
 *
 * Layers (back → front):
 *   1. Faint moving gold grid (depth)
 *   2. 3 large aurora glow blobs that slowly drift
 *   3. ~10 floating gold stars that rise across the viewport
 *   4. ~14 small twinkling stars (sparkle accents)
 *
 * Sits at z-0 so all content (z-10+) renders above it.
 * `pointer-events-none` so it never blocks clicks.
 * Honours prefers-reduced-motion via the global rule already in index.css.
 */

const StarSvg = ({ size, opacity }: { size: number; opacity: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id={`star-grad-${size}-${Math.round(opacity * 100)}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fce8a8" />
        <stop offset="50%" stopColor="#d4a64a" />
        <stop offset="100%" stopColor="#9a7322" />
      </linearGradient>
    </defs>
    <path
      d="M12 2 L14.39 8.36 L21 9.27 L16 13.97 L17.45 20.5 L12 17.27 L6.55 20.5 L8 13.97 L3 9.27 L9.61 8.36 Z"
      fill={`url(#star-grad-${size}-${Math.round(opacity * 100)})`}
      stroke="rgba(212, 166, 74, 0.4)"
      strokeWidth="0.5"
    />
  </svg>
);

export const BackgroundFX = () => {
  // Larger floating stars (drift up across viewport)
  const floatingStars = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => {
        const size = 16 + ((i * 7) % 18); // 16–34 px
        return {
          left: `${(i * 9.7 + 5) % 95}%`,
          bottom: `-${10 + (i * 5) % 30}vh`,
          size,
          duration: 22 + ((i * 5) % 18), // 22–40s (slow!)
          delay: (i * 3) % 14,
          opacity: 0.18 + ((i * 3) % 4) / 30,
          driftX: ((i * 17) % 80) - 40,
        };
      }),
    []
  );

  // Smaller twinkling stars (static position, just sparkle)
  const twinklingStars = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: `${(i * 7919 + 113) % 100}%`,
        top: `${(i * 4513 + 71) % 100}%`,
        size: 6 + ((i * 3) % 6),
        duration: 2.5 + ((i * 7) % 30) / 10,
        delay: (i * 0.7) % 4,
        opacity: 0.25 + ((i * 11) % 5) / 20,
      })),
    []
  );

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Layer 1: faint moving grid */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Layer 2: aurora glow blobs */}
      <div
        className="aurora-blob"
        style={{
          top: "5%",
          left: "10%",
          width: "560px",
          height: "560px",
          background: "radial-gradient(circle, rgba(212, 166, 74, 0.18) 0%, rgba(212, 166, 74, 0) 70%)",
          ["--aurora-duration" as any]: "38s",
          ["--ax" as any]: "120px",
          ["--ay" as any]: "60px",
        }}
      />
      <div
        className="aurora-blob"
        style={{
          top: "40%",
          right: "5%",
          width: "640px",
          height: "640px",
          background: "radial-gradient(circle, rgba(184, 134, 43, 0.15) 0%, rgba(184, 134, 43, 0) 70%)",
          ["--aurora-duration" as any]: "44s",
          ["--ax" as any]: "-90px",
          ["--ay" as any]: "70px",
          animationDelay: "-12s",
        }}
      />
      <div
        className="aurora-blob"
        style={{
          bottom: "10%",
          left: "30%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(252, 232, 168, 0.10) 0%, rgba(252, 232, 168, 0) 70%)",
          ["--aurora-duration" as any]: "50s",
          ["--ax" as any]: "60px",
          ["--ay" as any]: "-100px",
          animationDelay: "-22s",
        }}
      />

      {/* Layer 3: floating stars rising */}
      {floatingStars.map((s, i) => (
        <div
          key={`float-${i}`}
          className="floating-star"
          style={
            {
              left: s.left,
              bottom: s.bottom,
              filter: "drop-shadow(0 0 6px rgba(212, 166, 74, 0.5))",
              ["--star-duration" as any]: `${s.duration}s`,
              ["--star-opacity" as any]: s.opacity,
              ["--star-x" as any]: `${s.driftX}px`,
              animationDelay: `${s.delay}s`,
            } as React.CSSProperties
          }
        >
          <StarSvg size={s.size} opacity={s.opacity} />
        </div>
      ))}

      {/* Layer 4: small twinkling stars */}
      {twinklingStars.map((s, i) => (
        <div
          key={`twink-${i}`}
          className="absolute star-twinkle"
          style={{
            left: s.left,
            top: s.top,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            filter: "drop-shadow(0 0 4px rgba(252, 232, 168, 0.7))",
          }}
        >
          <StarSvg size={s.size} opacity={s.opacity} />
        </div>
      ))}
    </div>
  );
};
