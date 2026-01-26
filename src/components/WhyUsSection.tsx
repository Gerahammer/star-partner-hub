import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Wallet, BarChart3, Shield } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Up to 50% RevShare",
    description: "Industry-leading commission rates with custom CPA & Hybrid plans available",
  },
  {
    icon: Wallet,
    title: "Fast Payouts",
    description: "Monthly on-time payouts via wire, crypto, and e-wallets",
  },
  {
    icon: BarChart3,
    title: "Real-Time Reporting",
    description: "Detailed API & post-back reporting with ZERO data lag",
  },
  {
    icon: Shield,
    title: "Trusted Partner",
    description: "Transparent operations with verified tracking and fair terms",
  },
];

export const WhyUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-us" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial-gold opacity-30" />
      
      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold uppercase tracking-wider text-sm mb-4 block">
            Why Choose Us
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground">
            MAXIMIZE YOUR
            <br />
            <span className="text-gradient-cyan">EARNINGS</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="flex gap-5 p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors group"
            >
              <div className="w-14 h-14 shrink-0 rounded-xl bg-secondary/20 flex items-center justify-center group-hover:bg-secondary transition-colors">
                <feature.icon className="w-7 h-7 text-secondary group-hover:text-primary-foreground transition-colors" />
              </div>
              <div>
                <h3 className="font-display text-2xl text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
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
