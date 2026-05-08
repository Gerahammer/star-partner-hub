import { useMemo } from "react";

/**
 * Global animated background layer.
 *
 * Layers (back → front):
 *   1. Faint moving gold grid (depth)
 *   2. 3 large aurora glow blobs that slowly drift
 *   3. ~10 small gold diamonds floating upward
 *
 * Sits at z-0 so all content (z-10+) renders above it.
 * `pointer-events-none` so it never blocks clicks.
 * Honours prefers-reduced-motion via the global rule already in index.css.
 */
export const BackgroundFX = () => {
  // Deterministic diamond positions/sizes
  const diamonds = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => {
        const size = 12 + ((i * 7) % 18); // 12–30 px
        return {
          left: `${(i * 9.7 + 5) % 95}%`,
          bottom: `-${10 + (i * 5) % 30}vh`, // start below viewport
          size,
          duration: 18 + ((i * 5) % 14), // 18–32s
          delay: (i * 2.5) % 12,
          opacity: 0.12 + ((i * 3) % 4) / 30,
          driftX: ((i * 17) % 80) - 40,
        };
      }),
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

      {/* Layer 3: floating diamonds */}
      {diamonds.map((d, i) => (
        <div
          key={i}
          className="floating-diamond"
          style={
            {
              left: d.left,
              bottom: d.bottom,
              width: `${d.size}px`,
              height: `${d.size}px`,
              background: "linear-gradient(135deg, rgba(252, 232, 168, 0.5) 0%, rgba(212, 166, 74, 0.25) 50%, rgba(154, 115, 34, 0.08) 100%)",
              border: "1px solid rgba(212, 166, 74, 0.3)",
              boxShadow: "0 0 18px rgba(212, 166, 74, 0.15)",
              ["--diamond-duration" as any]: `${d.duration}s`,
              ["--diamond-opacity" as any]: d.opacity,
              ["--diamond-x" as any]: `${d.driftX}px`,
              animationDelay: `${d.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};
