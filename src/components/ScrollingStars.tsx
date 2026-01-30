import { motion, useScroll, useTransform } from "framer-motion";

import coin1 from "@/assets/coin-1.webp";
import coin2 from "@/assets/coin-2.webp";
import coin3 from "@/assets/coin-3.webp";
import coin4 from "@/assets/coin-4.webp";

const coinImages = [coin1, coin2, coin3, coin4];

interface StarData {
  id: number;
  size: number;
  left: string;
  speed: number;
  opacity: number;
  delay: number;
  coinIndex: number;
}

const stars: StarData[] = [
  { id: 1, size: 48, left: "5%", speed: 0.3, opacity: 0.6, delay: 0, coinIndex: 0 },
  { id: 2, size: 36, left: "15%", speed: 0.5, opacity: 0.5, delay: 0.5, coinIndex: 1 },
  { id: 3, size: 40, left: "25%", speed: 0.2, opacity: 0.7, delay: 1, coinIndex: 2 },
  { id: 4, size: 32, left: "35%", speed: 0.4, opacity: 0.45, delay: 0.3, coinIndex: 3 },
  { id: 5, size: 56, left: "55%", speed: 0.35, opacity: 0.55, delay: 0.8, coinIndex: 0 },
  { id: 6, size: 34, left: "65%", speed: 0.45, opacity: 0.5, delay: 0.2, coinIndex: 1 },
  { id: 7, size: 44, left: "75%", speed: 0.25, opacity: 0.6, delay: 0.6, coinIndex: 2 },
  { id: 8, size: 48, left: "85%", speed: 0.5, opacity: 0.55, delay: 0.4, coinIndex: 3 },
  { id: 9, size: 30, left: "92%", speed: 0.3, opacity: 0.45, delay: 0.9, coinIndex: 0 },
  { id: 10, size: 38, left: "48%", speed: 0.4, opacity: 0.5, delay: 0.7, coinIndex: 1 },
  { id: 11, size: 28, left: "3%", speed: 0.55, opacity: 0.55, delay: 0.15, coinIndex: 2 },
  { id: 12, size: 42, left: "10%", speed: 0.28, opacity: 0.6, delay: 0.65, coinIndex: 3 },
  { id: 13, size: 34, left: "20%", speed: 0.42, opacity: 0.5, delay: 0.35, coinIndex: 0 },
  { id: 14, size: 52, left: "30%", speed: 0.33, opacity: 0.65, delay: 0.85, coinIndex: 1 },
  { id: 15, size: 30, left: "40%", speed: 0.48, opacity: 0.48, delay: 0.25, coinIndex: 2 },
  { id: 16, size: 46, left: "50%", speed: 0.22, opacity: 0.58, delay: 0.55, coinIndex: 3 },
  { id: 17, size: 38, left: "60%", speed: 0.38, opacity: 0.52, delay: 0.75, coinIndex: 0 },
  { id: 18, size: 50, left: "70%", speed: 0.52, opacity: 0.62, delay: 0.45, coinIndex: 1 },
  { id: 19, size: 34, left: "80%", speed: 0.3, opacity: 0.5, delay: 0.95, coinIndex: 2 },
  { id: 20, size: 42, left: "90%", speed: 0.4, opacity: 0.56, delay: 0.1, coinIndex: 3 },
];

const ScrollingStar = ({ star }: { star: StarData }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 3000], [0, 3000 * star.speed]);

  return (
    <motion.div
      className="absolute"
      style={{
        left: star.left,
        top: `${star.id * 5}%`,
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
      <img
        src={coinImages[star.coinIndex]}
        alt=""
        style={{
          width: star.size,
          height: star.size,
          opacity: star.opacity,
          filter: `drop-shadow(0 0 ${star.size / 3}px hsl(45 90% 55% / 0.5))`,
        }}
        className="object-contain"
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
