import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";

const stars = [
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
];

export const ScrollingStars = () => {
  const { scrollY } = useScroll();

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {stars.map((star) => {
        const y = useTransform(scrollY, [0, 3000], [0, 3000 * star.speed]);
        
        return (
          <motion.div
            key={star.id}
            className="absolute"
            style={{
              left: star.left,
              top: `${star.id * 10}%`,
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
                ease: "linear" 
              },
            }}
          >
            <Star 
              size={star.size} 
              className="text-primary fill-primary"
              style={{ opacity: star.opacity }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};
