import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import coin1 from "@/assets/coin-1.webp";
import coin2 from "@/assets/coin-2.webp";
import coin3 from "@/assets/coin-3.webp";
import coin4 from "@/assets/coin-4.webp";
import goldPBg from "@/assets/gold-p-bg.png";

const images = [coin1, coin2, coin3, coin4];

export const HeroImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-end justify-center">
      {/* Static P background image */}
      <img 
        src={goldPBg} 
        alt="" 
        className="absolute -inset-16 w-[calc(100%+8rem)] h-[calc(100%+8rem)] object-contain opacity-40 pointer-events-none"
      />
      

      {/* Position coins to the right edge (between P and text) */}
      <div className="absolute right-0 bottom-0 z-10">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt="Celestial body"
            className="w-[280px] md:w-[350px] lg:w-[450px] h-auto object-contain"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.3 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};
