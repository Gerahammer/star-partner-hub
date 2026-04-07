import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Wallet, BarChart3, UserCheck } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "High Conversion",
    stat: "3.2%",
    statLabel: "avg. CR",
    description: "Optimized funnels and premium brands that turn traffic into revenue",
  },
  {
    icon: BarChart3,
    title: "Real-Time Tracking",
    stat: "0ms",
    statLabel: "data lag",
    description: "Live analytics, API integrations, and post-back tracking",
  },
  {
    icon: Wallet,
    title: "Fast Payments",
    stat: "7",
    statLabel: "day cycle",
    description: "Weekly payouts via wire, crypto, and e-wallets",
  },
  {
    icon: UserCheck,
    title: "Dedicated Manager",
    stat: "1:1",
    statLabel: "support",
    description: "Personal account manager for your campaign ROI",
  },
];

export const WhyUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-us" className="py-28 md:py-36 relative overflow-hidden">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl group cursor-default text-center"
            >
              <div className="w-10 h-10 mx-auto mb-4 rounded-xl flex items-center justify-center border border-border/20"
                style={{ background: 'hsl(224 28% 12%)' }}
              >
                <feature.icon className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <p className="font-mono text-2xl text-foreground font-bold tracking-tight mb-0.5">{feature.stat}</p>
              <p className="text-muted-foreground/50 text-[10px] uppercase tracking-[0.15em] mb-3 font-medium">{feature.statLabel}</p>
              <h3 className="font-display text-sm text-foreground mb-1.5">{feature.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
