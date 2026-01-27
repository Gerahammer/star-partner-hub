import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import goldStar3d from "@/assets/gold-star-3d.png";

const marqueeRows = [
  {
    text: "Up to 50% RevShare or custom CPA / Hybrid plans.",
    rotation: -3,
    direction: 1,
    color: "primary",
  },
  {
    text: "Monthly, on-time payouts via wire, crypto, and e-wallets.",
    rotation: 1,
    direction: -1,
    color: "secondary",
  },
  {
    text: "Detailed API & post-back reporting — ZERO data lag.",
    rotation: -2,
    direction: 1,
    color: "primary",
  },
];

const MarqueeRow = ({ 
  text, 
  rotation, 
  direction,
  color,
}: { 
  text: string; 
  rotation: number; 
  direction: number;
  color: string;
}) => {
  const items = Array(10).fill(text);
  
  return (
    <div 
      className="relative overflow-hidden py-3 md:py-4"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <motion.div
        className="flex gap-8 md:gap-12 whitespace-nowrap"
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
          <div key={index} className="flex items-center gap-6 md:gap-10">
            <span 
              className={`text-base md:text-xl lg:text-2xl font-bold uppercase tracking-wide ${
                color === "primary" ? "text-primary" : "text-foreground"
              }`}
            >
              {item}
            </span>
            <span className="text-primary text-xl md:text-2xl">★</span>
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
    <section id="why-us" className="py-16 sm:py-20 md:py-28 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial-gold opacity-20" />
      
      <div className="container mx-auto px-4 md:px-8 relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-primary font-semibold uppercase tracking-wider text-xs sm:text-sm mb-3 md:mb-4 block">
            Why Choose Us
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
            WHY US
          </h2>
        </motion.div>

        {/* Marquee Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-card/80 border border-border/50 p-6 md:p-10 lg:p-14"
        >
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
          
          {/* Marquee Rows */}
          <div className="space-y-4 md:space-y-6 relative pr-24 md:pr-40 lg:pr-56">
            {marqueeRows.map((row, index) => (
              <MarqueeRow
                key={index}
                text={row.text}
                rotation={row.rotation}
                direction={row.direction}
                color={row.color}
              />
            ))}
          </div>

          {/* Big decorative star on the right */}
          <motion.div
            className="absolute -right-8 md:-right-4 lg:right-0 top-1/2 -translate-y-1/2 z-20"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
          >
            <div className="relative">
              {/* Glow effect behind star */}
              <div className="absolute inset-0 blur-3xl bg-primary/40 scale-150" />
              <img 
                src={goldStar3d} 
                alt="Gold star"
                className="w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 relative z-10 object-contain"
                style={{
                  filter: "drop-shadow(0 0 40px hsl(45 90% 55% / 0.6)) drop-shadow(0 0 80px hsl(45 90% 55% / 0.3))",
                }}
              />
            </div>
          </motion.div>

          {/* Side fade effects */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-card to-transparent pointer-events-none z-10" />
        </motion.div>
      </div>
    </section>
  );
};
