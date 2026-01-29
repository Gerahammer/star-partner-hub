import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrailStar {
  id: number;
  x: number;
  y: number;
}

const StarCursorTrail = () => {
  const [trail, setTrail] = useState<TrailStar[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    
    const newStar: TrailStar = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
    };

    setTrail(prev => [...prev.slice(-12), newStar]);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.slice(1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Main cursor star */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: mousePos.x - 12,
          top: mousePos.y - 12,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="hsl(45 90% 55%)"
            filter="drop-shadow(0 0 6px hsl(45 90% 55% / 0.8))"
          />
        </svg>
      </motion.div>

      {/* Trail stars */}
      <AnimatePresence>
        {trail.map((star, index) => (
          <motion.div
            key={star.id}
            className="fixed pointer-events-none z-[9998]"
            initial={{ 
              opacity: 0.8, 
              scale: 0.6,
              left: star.x - 8,
              top: star.y - 8,
            }}
            animate={{ 
              opacity: 0,
              scale: 0.2,
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.6,
              ease: "easeOut"
            }}
            style={{
              left: star.x - 8,
              top: star.y - 8,
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={`hsl(45 90% ${55 + (index * 2)}%)`}
                opacity={0.6 - (index * 0.04)}
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default StarCursorTrail;
