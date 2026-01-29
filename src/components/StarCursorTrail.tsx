import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import starCursorImage from '@/assets/star-cursor-image.png';

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
          left: mousePos.x - 16,
          top: mousePos.y - 16,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
        }}
      >
        <img 
          src={starCursorImage} 
          alt="" 
          className="w-8 h-8 object-contain drop-shadow-[0_0_8px_hsl(45_90%_55%/0.8)]"
        />
      </motion.div>

      {/* Trail stars */}
      <AnimatePresence>
        {trail.map((star) => (
          <motion.div
            key={star.id}
            className="fixed pointer-events-none z-[9998]"
            initial={{ 
              opacity: 0.7, 
              scale: 0.5,
              left: star.x - 10,
              top: star.y - 10,
            }}
            animate={{ 
              opacity: 0,
              scale: 0.15,
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.6,
              ease: "easeOut"
            }}
            style={{
              left: star.x - 10,
              top: star.y - 10,
            }}
          >
            <img 
              src={starCursorImage} 
              alt="" 
              className="w-5 h-5 object-contain"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default StarCursorTrail;
