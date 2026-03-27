import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: 25.4, suffix: "M+", label: "Total Paid", prefix: "$" },
  { value: 50, suffix: "+", label: "Active Brands", prefix: "" },
  { value: 15, suffix: "%+", label: "Avg. Conversion", prefix: "" },
];

const AnimatedCounter = ({ value, suffix, prefix }: { value: number; suffix: string; prefix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      const isDecimal = value % 1 !== 0;
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(isDecimal ? Math.round(start * 10) / 10 : Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display text-4xl sm:text-5xl md:text-6xl text-gradient-gold">
      {prefix}{count % 1 !== 0 ? count.toFixed(1) : count}{suffix}
    </span>
  );
};

export const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-20 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div 
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="text-center p-6 md:p-8 rounded-xl border border-primary/20 bg-card/50 hover:border-primary/40 transition-colors duration-300"
            >
              <div className="mb-3">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <p className="text-muted-foreground font-medium text-sm uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
