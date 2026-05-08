import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";

interface HeroStat {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}

const heroStats: HeroStat[] = [
  { value: 12.5, prefix: "€", suffix: "M+", decimals: 1, label: "Total Payouts" },
  { value: 3200, suffix: "+", label: "Active Affiliates" },
  { value: 45, suffix: "+", label: "Supported GEOs" },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative container mx-auto px-4 md:px-8 pt-28 pb-20 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-black leading-[1.05] tracking-tight mb-7">
            <span className="text-foreground block">Where Affiliates</span>
            <span className="block mt-3 animate-gold-shimmer">Become Stars</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base md:text-lg text-foreground/70 italic max-w-xl mx-auto mb-12"
          >
            High Conversions. Top Payouts. Fast Settlements.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
          >
            <Button
              className="btn-gold-gradient btn-shine rounded-full px-10 py-6 text-sm md:text-base font-bold uppercase tracking-wider group"
              size="lg"
              asChild
            >
              <a href="https://ro-affiliate.partnerstar.com/registration" target="_blank" rel="noopener noreferrer">
                Register Now
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" strokeWidth={2} />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 border-primary/30 text-foreground/80 hover:text-foreground hover:border-primary/60 hover:bg-primary/5 transition-all duration-300"
              onClick={() => document.getElementById("brands")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Eye className="w-4 h-4 mr-2" strokeWidth={2} />
              View Brands
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-0"
          >
            {heroStats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center px-8 sm:px-10 ${i < heroStats.length - 1 ? "sm:border-r sm:border-primary/15" : ""}`}
              >
                <p className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight animate-gold-shimmer">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </p>
                <p className="text-foreground/50 text-[10px] uppercase tracking-[0.2em] mt-2 font-semibold">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
