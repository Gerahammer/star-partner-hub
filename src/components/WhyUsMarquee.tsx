import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import goldStar3d from "@/assets/gold-star-3d.png";
import { DecorativeFrame } from "./DecorativeFrame";

const marqueeRows = [
  {
    text: "Up to 50% RevShare or custom CPA / Hybrid plans.",
    rotation: -2,
    direction: 1,
  },
  {
    text: "Monthly, on-time payouts via wire, crypto, and e-wallets.",
    rotation: 1.5,
    direction: -1,
  },
  {
    text: "Detailed API & post-back reporting — ZERO data lag.",
    rotation: -1,
    direction: 1,
  },
];

// Sparkle positions relative to the star
const sparkles = [
  { top: "15%", left: "50%", size: 8, delay: 0 },
  { top: "30%", left: "20%", size: 6, delay: 0.3 },
  { top: "25%", left: "75%", size: 7, delay: 0.6 },
  { top: "45%", left: "10%", size: 5, delay: 0.9 },
  { top: "40%", left: "85%", size: 6, delay: 0.4 },
  { top: "55%", left: "30%", size: 8, delay: 0.7 },
  { top: "50%", left: "65%", size: 5, delay: 0.2 },
  { top: "70%", left: "45%", size: 7, delay: 0.5 },
];

const Sparkle = ({ top, left, size, delay }: { top: string; left: string; size: number; delay: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ top, left }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
    }}
    transition={{
      duration: 1.5,
      delay,
      repeat: Infinity,
      repeatDelay: 1,
      ease: "easeInOut",
    }}
  >
    <svg width={size * 2} height={size * 2} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
        fill="hsl(45 90% 70%)"
      />
    </svg>
  </motion.div>
);

const MarqueeRow = ({ 
  text, 
  rotation, 
  direction,
}: { 
  text: string; 
  rotation: number; 
  direction: number;
}) => {
  const items = Array(12).fill(text);
  
  return (
    <div 
      className="relative overflow-hidden py-2 md:py-3"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Gold/cream background band */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-gold-light to-primary" />
      
      <motion.div
        className="flex gap-6 md:gap-10 whitespace-nowrap relative z-10"
        animate={{ 
          x: direction > 0 ? ["0%", "-50%"] : ["-50%", "0%"]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-4 md:gap-8">
            <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold uppercase tracking-wide text-background">
              {item}
            </span>
            <span className="text-background text-base md:text-lg">★</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const WhyUsMarquee = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-us" className="py-12 sm:py-16 md:py-24 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial-gold opacity-10" />
      
      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex gap-3 md:gap-4 relative justify-center"
        >
          {/* Main content box - full width on mobile, 80% on desktop */}
          <DecorativeFrame variant="gold" className="w-full md:w-[80%]">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-transparent border border-border/30">
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-muted/10 via-transparent to-muted/10 pointer-events-none" />
            
            {/* Content */}
            <div className="relative p-5 sm:p-6 md:p-8 lg:p-10 min-h-[260px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[360px] flex flex-col">
              {/* WHY US Title */}
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                WHY US
              </h2>
              
              {/* Marquee Rows Container */}
              <div className="flex-1 flex flex-col justify-center space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 -mx-5 sm:-mx-6 md:-mx-8 lg:-mx-10 pr-0 sm:pr-8 md:pr-16 lg:pr-24">
                {marqueeRows.map((row, index) => (
                  <div 
                    key={index} 
                    className={index === 2 ? "md:pr-10 lg:pr-0" : ""}
                  >
                    <MarqueeRow
                      text={row.text}
                      rotation={row.rotation}
                      direction={row.direction}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 lg:w-20 bg-gradient-to-r from-card via-card/80 to-transparent pointer-events-none z-10" />
            </div>
          </DecorativeFrame>
          {/* Star with sparkles - hidden on mobile, visible on tablet+ */}
          <div
            className="hidden md:block absolute -bottom-16 md:-bottom-24 lg:-bottom-32 -right-28 md:-right-24 lg:-right-8 z-30"
          >
            <div className="relative">
              <img 
                src={goldStar3d} 
                alt="Gold star"
                className="w-96 h-96 md:w-[480px] md:h-[480px] lg:w-[580px] lg:h-[580px] object-contain"
              />
              {/* Sparkles */}
              {sparkles.map((sparkle, index) => (
                <Sparkle key={index} {...sparkle} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
