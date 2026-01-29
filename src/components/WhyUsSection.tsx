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
    <section id="why-us" className="py-16 sm:py-20 md:py-28 lg:py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial-primary opacity-30" />
      
      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold uppercase tracking-wider text-xs sm:text-sm mb-3 md:mb-4 block">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground px-2">
            MAXIMIZE YOUR
            <br />
            <span className="text-gradient-purple">EARNINGS</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex gap-3 sm:gap-4 md:gap-5 p-4 sm:p-5 md:p-6 rounded-xl md:rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 shrink-0 rounded-lg md:rounded-xl bg-secondary/20 flex items-center justify-center group-hover:bg-secondary transition-colors">
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-secondary group-hover:text-primary-foreground transition-colors" />
              </div>
              <div>
                <h3 className="font-display text-lg sm:text-xl md:text-2xl text-foreground mb-1 md:mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base">
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
