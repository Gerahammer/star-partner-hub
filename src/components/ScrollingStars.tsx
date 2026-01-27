import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";

interface StarData {
  id: number;
  size: number;
  left: string;
  speed: number;
  opacity: number;
  delay: number;
}

const stars: StarData[] = [
  { id: 1, size: 24, left: "5%", speed: 0.3, opacity: 0.4, delay: 0 },
  { id: 2, size: 18, left: "15%", speed: 0.5, opacity: 0.3, delay: 0.5 },
  { id: 3, size: 20, left: "25%", speed: 0.2, opacity: 0.5, delay: 1 },
  { id: 4, size: 14, left: "35%", speed: 0.4, opacity: 0.25, delay: 0.3 },
  { id: 5, size: 28, left: "55%", speed: 0.35, opacity: 0.35, delay: 0.8 },
  { id: 6, size: 16, left: "65%", speed: 0.45, opacity: 0.3, delay: 0.2 },
  { id: 7, size: 22, left: "75%", speed: 0.25, opacity: 0.4, delay: 0.6 },
  { id: 8, size: 24, left: "85%", speed: 0.5, opacity: 0.35, delay: 0.4 },
  { id: 9, size: 14, left: "92%", speed: 0.3, opacity: 0.25, delay: 0.9 },
  { id: 10, size: 18, left: "48%", speed: 0.4, opacity: 0.3, delay: 0.7 },
  { id: 11, size: 12, left: "3%", speed: 0.55, opacity: 0.35, delay: 0.15 },
  { id: 12, size: 20, left: "10%", speed: 0.28, opacity: 0.4, delay: 0.65 },
  { id: 13, size: 16, left: "20%", speed: 0.42, opacity: 0.3, delay: 0.35 },
  { id: 14, size: 26, left: "30%", speed: 0.33, opacity: 0.45, delay: 0.85 },
  { id: 15, size: 14, left: "40%", speed: 0.48, opacity: 0.28, delay: 0.25 },
  { id: 16, size: 22, left: "50%", speed: 0.22, opacity: 0.38, delay: 0.55 },
  { id: 17, size: 18, left: "60%", speed: 0.38, opacity: 0.32, delay: 0.75 },
  { id: 18, size: 24, left: "70%", speed: 0.52, opacity: 0.42, delay: 0.45 },
  { id: 19, size: 16, left: "80%", speed: 0.3, opacity: 0.3, delay: 0.95 },
  { id: 20, size: 20, left: "90%", speed: 0.4, opacity: 0.36, delay: 0.1 },
  { id: 21, size: 12, left: "8%", speed: 0.45, opacity: 0.25, delay: 0.4 },
  { id: 22, size: 18, left: "42%", speed: 0.35, opacity: 0.33, delay: 0.6 },
  { id: 23, size: 14, left: "58%", speed: 0.5, opacity: 0.28, delay: 0.2 },
  { id: 24, size: 22, left: "78%", speed: 0.25, opacity: 0.4, delay: 0.8 },
  { id: 25, size: 16, left: "97%", speed: 0.42, opacity: 0.32, delay: 0.5 },
];

const ScrollingStar = ({ star }: { star: StarData }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 3000], [0, 3000 * star.speed]);

  return (
    <motion.div
      className="absolute"
      style={{
        left: star.left,
        top: `${star.id * 4}%`,
        y,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: star.opacity,
        scale: 1,
        rotate: [0, 360],
      }}
      transition={{
        opacity: { delay: star.delay, duration: 0.5 },
        scale: { delay: star.delay, duration: 0.5 },
        rotate: {
          duration: 20 + star.id * 2,
          repeat: Infinity,
          ease: "linear",
        },
      }}
    >
      <Star
        size={star.size}
        className="text-primary fill-primary drop-shadow-[0_0_8px_hsl(45_90%_55%/0.8)]"
        style={{
          opacity: star.opacity,
          filter: `drop-shadow(0 0 ${star.size / 2}px hsl(45 90% 55% / 0.6))`,
        }}
      />
    </motion.div>
  );
};

export const ScrollingStars = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {stars.map((star) => (
        <ScrollingStar key={star.id} star={star} />
      ))}
    </div>
  );
};
