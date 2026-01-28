import { motion, useScroll, useTransform } from "framer-motion";

export const ScrollBackground = () => {
  const { scrollYProgress } = useScroll();

  // Interpolate background color based on scroll position
  // 0-70%: dark to cream transition
  // 70-85%: cream (main content area)
  // 85-100%: back to dark for footer
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.55, 0.85, 1],
    [
      "hsl(220, 15%, 12%)",   // Dark at start
      "hsl(220, 12%, 18%)",   // Slightly lighter charcoal
      "hsl(220, 10%, 28%)",   // Warm dark gray in the middle
      "hsl(220, 10%, 28%)",   // Stay warm gray
      "hsl(220, 15%, 12%)"    // Back to dark for footer
    ]
  );

  return (
    <motion.div
      className="fixed inset-0 -z-10"
      style={{ backgroundColor }}
    />
  );
};
