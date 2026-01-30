import { useState, useEffect } from "react";

import coin1 from "@/assets/coin-1.webp";
import coin2 from "@/assets/coin-2.webp";
import coin3 from "@/assets/coin-3.webp";
import coin4 from "@/assets/coin-4.webp";
import goldPBg from "@/assets/gold-p-bg-v4.png";

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
        className="absolute -top-16 -bottom-16 -right-8 left-8 w-[calc(100%+8rem)] h-[calc(100%+8rem)] object-contain opacity-70 pointer-events-none"
      />
      

      {/* Position coins to the right edge (between P and text) */}
      <div className="absolute -right-8 md:-right-12 lg:-right-16 bottom-0 z-10">
        <img
          src={images[currentIndex]}
          alt="Celestial body"
          className="w-[220px] md:w-[280px] lg:w-[350px] h-auto object-contain"
        />
      </div>
    </div>
  );
};
