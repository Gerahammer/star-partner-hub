import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import goldStar3d from "@/assets/gold-star-3d.png";

const marqueeRows = [
  {
    text: "Up to 50% RevShare or custom CPA / Hybrid plans.",
    rotation: -3,
    direction: 1,
    top: "20%",
  },
  {
    text: "Monthly, on-time payouts via wire, crypto, and e-wallets.",
    rotation: 1,
    direction: -1,
    top: "45%",
  },
  {
    text: "Detailed API & post-back reporting — ZERO data lag.",
    rotation: -2,
    direction: 1,
    top: "70%",
  },
];

const MarqueeRow = ({ 
  text, 
  rotation, 
  direction,
  top,
  isInView,
}: { 
  text: string; 
  rotation: number; 
  direction: number;
  top: string;
  isInView: boolean;
}) => {
  const items = Array(10).fill(text);
  
  return (
    <motion.div 
      className="absolute left-0 right-0 overflow-visible py-2 md:py-3"
      style={{ 
        top,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "right center",
      }}
      initial={{ opacity: 0, x: 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.3 }}
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
    </motion.div>
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
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Main card container */}
          <div className="relative rounded-2xl md:rounded-3xl overflow-visible bg-card border border-border/30 min-h-[400px] md:min-h-[450px] lg:min-h-[500px]">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-transparent to-primary/10 pointer-events-none rounded-2xl md:rounded-3xl" />
            
            {/* WHY US Title */}
            <div className="relative p-6 md:p-10 lg:p-12">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
                WHY US
              </h2>
            </div>

            {/* Marquee Rows - emanating from the star */}
            <div className="absolute inset-0 overflow-visible">
              {marqueeRows.map((row, index) => (
                <MarqueeRow
                  key={index}
                  text={row.text}
                  rotation={row.rotation}
                  direction={row.direction}
                  top={row.top}
                  isInView={isInView}
                />
              ))}
            </div>

            {/* Left fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-card to-transparent pointer-events-none z-20 rounded-l-2xl md:rounded-l-3xl" />
          </div>

          {/* Star - positioned on the right, full height, extending outside */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -right-16 md:-right-24 lg:-right-32 z-30"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.5, type: "spring", stiffness: 100 }}
          >
            <div className="relative">
              {/* Glow effect behind star */}
              <div className="absolute inset-0 blur-[80px] bg-primary/60 scale-125" />
              <img 
                src={goldStar3d} 
                alt="Gold star"
                className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] relative z-10 object-contain"
                style={{
                  filter: "drop-shadow(0 0 50px hsl(45 90% 55% / 0.8)) drop-shadow(0 0 100px hsl(45 90% 55% / 0.5))",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
