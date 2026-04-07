import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Wallet, BarChart3, UserCheck } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "High Conversion Rates",
    description: "Optimized funnels and premium brands that convert your traffic into revenue",
  },
  {
    icon: BarChart3,
    title: "Real-Time Tracking",
    description: "Detailed analytics, API integrations, and post-back tracking with zero lag",
  },
  {
    icon: Wallet,
    title: "Fast Payments",
    description: "Weekly payouts via wire, crypto, and e-wallets — no delays",
  },
  {
    icon: UserCheck,
    title: "Dedicated Manager",
    description: "Personal account manager to optimize your campaigns and maximize ROI",
  },
];

export const WhyUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-us" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      
      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold uppercase tracking-wider text-xs sm:text-sm mb-4 block">
            Why Choose Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl">
            <span className="text-liquid-silver">BUILT FOR </span>
            <span className="text-gradient-gold">PERFORMANCE</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex gap-4 p-5 md:p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors border border-primary/20">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg md:text-xl text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
