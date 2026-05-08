import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  /** Final numeric value to count to. */
  value: number;
  /** Optional prefix (e.g., "€"). */
  prefix?: string;
  /** Optional suffix (e.g., "M+", "+"). */
  suffix?: string;
  /** Number of decimal places. */
  decimals?: number;
  /** Animation duration in ms. */
  duration?: number;
  /** Locale for number formatting. */
  locale?: string;
}

/**
 * Counts up from 0 to the target `value` when scrolled into view.
 * Uses requestAnimationFrame and easeOutCubic for smooth motion.
 */
export const AnimatedCounter = ({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1800,
  locale = "en-US",
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              // easeOutCubic
              const eased = 1 - Math.pow(1 - t, 3);
              setDisplay(value * eased);
              if (t < 1) requestAnimationFrame(tick);
              else setDisplay(value);
            };
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(display);

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};
