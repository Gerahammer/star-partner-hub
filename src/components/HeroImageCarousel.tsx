import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import heroPlanet1 from "@/assets/hero-planet-1.png";
import heroPlanet2 from "@/assets/hero-planet-2.png";
import heroPlanet3 from "@/assets/hero-planet-3.png";
import heroPlanet4 from "@/assets/hero-planet-4.png";
import goldPBg from "@/assets/gold-p-bg.png";

const images = [heroPlanet1, heroPlanet2, heroPlanet3, heroPlanet4];

export const HeroImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Static P background image */}
      <img 
        src={goldPBg} 
        alt="" 
        className="absolute inset-0 w-full h-full object-contain opacity-40 pointer-events-none"
      />
      
      {/* Glow effect behind the image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[80%] h-[80%] bg-primary/20 rounded-full blur-[100px]" />
      </div>
      
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Celestial body"
          className="relative z-10 w-[95%] max-w-[700px] h-auto object-contain drop-shadow-[0_0_100px_hsl(45_90%_55%/0.6)]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.3 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </AnimatePresence>
    </div>
  );
};
