import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { DollarSign, Users, Globe, Award, Star } from "lucide-react";
import { DecorativeFrame } from "./DecorativeFrame";
import { DecorativeDivider } from "./DecorativeDivider";

const stats = [
  { icon: DollarSign, value: 15, suffix: "M+", label: "Paid to Partners" },
  { icon: Users, value: 1000, suffix: "+", label: "Active Affiliates" },
  { icon: Globe, value: 150, suffix: "+", label: "Countries" },
  { icon: Award, value: 10, suffix: "+", label: "Years Experience" },
];

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gradient-gold">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-12 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent" />
      
      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-primary/30 hidden lg:block" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-primary/30 hidden lg:block" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-primary/30 hidden lg:block" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-primary/30 hidden lg:block" />
      
      <div className="container mx-auto px-4 md:px-8 relative">
        <DecorativeDivider variant="star" className="mb-8 md:mb-12" />
        
        <div 
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <DecorativeFrame variant="subtle" className="p-4 md:p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <div className="mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-muted-foreground font-medium text-xs sm:text-sm md:text-base">{stat.label}</p>
              </DecorativeFrame>
            </motion.div>
          ))}
        </div>
        
        <DecorativeDivider variant="diamond" className="mt-8 md:mt-12" />
      </div>
    </section>
  );
};
