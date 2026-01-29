import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import heroPlanet1 from "@/assets/hero-planet-1.png";
import heroPlanet2 from "@/assets/hero-planet-2.png";
import heroPlanet3 from "@/assets/hero-planet-3.png";
import heroPlanet4 from "@/assets/hero-planet-4.png";

const images = [heroPlanet1, heroPlanet2, heroPlanet3, heroPlanet4];

export const HeroImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Glow effect behind the image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[80%] h-[80%] bg-primary/20 rounded-full blur-[100px]" />
      </div>
      
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Celestial body"
          className="relative z-10 w-[70%] max-w-[500px] h-auto object-contain drop-shadow-[0_0_60px_hsl(45_90%_55%/0.4)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Carousel indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-primary w-6" 
                : "bg-primary/30 hover:bg-primary/50"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
