import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import goldStar3d from "@/assets/gold-star-3d.png";

const marqueeRows = [
  {
    text: "Up to 50% RevShare or custom CPA / Hybrid plans.",
    rotation: -3,
    direction: 1,
  },
  {
    text: "Monthly, on-time payouts via wire, crypto, and e-wallets.",
    rotation: 1,
    direction: -1,
  },
  {
    text: "Detailed API & post-back reporting — ZERO data lag.",
    rotation: -2,
    direction: 1,
  },
];

const MarqueeRow = ({ 
  text, 
  rotation, 
  direction,
}: { 
  text: string; 
  rotation: number; 
  direction: number;
}) => {
  const items = Array(10).fill(text);
  
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
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-4 md:gap-8">
            <span className="text-sm md:text-lg lg:text-xl font-bold uppercase tracking-wide text-background">
              {item}
            </span>
            <span className="text-background text-lg md:text-xl">★</span>
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
      <div className="absolute inset-0 bg-gradient-radial-gold opacity-10" />
      
      <div className="container mx-auto px-4 md:px-8 relative">
        {/* Two-box layout */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex gap-4 md:gap-6"
        >
          {/* Main content box */}
          <div className="relative flex-1 rounded-2xl md:rounded-3xl overflow-hidden bg-card border border-border/30">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-transparent to-muted/10 pointer-events-none" />
            
            {/* Content container */}
            <div className="relative p-6 md:p-10 lg:p-12 min-h-[280px] md:min-h-[320px] lg:min-h-[380px]">
              {/* WHY US Title - inside the box */}
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-8 md:mb-12">
                WHY US
              </h2>
              
              {/* Marquee Rows - positioned in the lower portion */}
              <div className="space-y-3 md:space-y-4 pr-32 md:pr-48 lg:pr-64">
                {marqueeRows.map((row, index) => (
                  <MarqueeRow
                    key={index}
                    text={row.text}
                    rotation={row.rotation}
                    direction={row.direction}
                  />
                ))}
              </div>
            </div>

            {/* Star image - positioned at bottom right, extending outside */}
            <motion.div
              className="absolute -bottom-8 md:-bottom-12 lg:-bottom-16 right-4 md:right-8 lg:right-12 z-30"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 1, delay: 0.5, type: "spring" }}
            >
              <div className="relative">
                {/* Glow effect behind star */}
                <div className="absolute inset-0 blur-3xl bg-primary/50 scale-150" />
                <img 
                  src={goldStar3d} 
                  alt="Gold star"
                  className="w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 relative z-10 object-contain"
                  style={{
                    filter: "drop-shadow(0 0 40px hsl(45 90% 55% / 0.7)) drop-shadow(0 0 80px hsl(45 90% 55% / 0.4))",
                  }}
                />
              </div>
            </motion.div>

            {/* Left fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-card to-transparent pointer-events-none z-10" />
          </div>

          {/* Decorative side box */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:block w-24 lg:w-32 rounded-2xl md:rounded-3xl overflow-hidden relative"
          >
            {/* Gold gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-gold-light/20 to-primary/40" />
            <div className="absolute inset-0 bg-card/80" />
            <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-primary/20 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
