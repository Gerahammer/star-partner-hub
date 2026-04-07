import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Wallet, BarChart3, UserCheck } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "High Conversion",
    description: "Optimized funnels and premium brands that turn your traffic into revenue",
  },
  {
    icon: BarChart3,
    title: "Real-Time Tracking",
    description: "Analytics, API integrations, and post-back tracking with zero lag",
  },
  {
    icon: Wallet,
    title: "Fast Payments",
    description: "Weekly payouts via wire, crypto, and e-wallets — no delays",
  },
  {
    icon: UserCheck,
    title: "Dedicated Manager",
    description: "Personal account manager to maximize your campaign ROI",
  },
];

export const WhyUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-us" className="py-28 md:py-36 relative overflow-hidden">
      {/* Ambient gradient */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, hsl(225 35% 6%) 0%, hsl(224 30% 8%) 50%, hsl(225 35% 6%) 100%)' }}
      />
      
      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary/80 font-medium uppercase tracking-[0.2em] text-xs mb-5 block">
            Why Choose Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl">
            <span className="text-foreground">Built for </span>
            <span className="text-gradient-gold">Performance</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card flex gap-4 p-6 md:p-7 rounded-2xl group cursor-default"
            >
              <div className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center transition-colors border border-primary/15"
                style={{ background: 'linear-gradient(135deg, hsl(42 65% 52% / 0.1), hsl(42 65% 52% / 0.04))' }}
              >
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg text-foreground mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
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
