import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Wallet, UserCheck, Wrench } from "lucide-react";

const benefits = [
  {
    icon: Wallet,
    title: "Weekly Payouts",
    description: "Get paid every week via crypto, wire transfer, or e-wallets. No minimum thresholds for established partners.",
  },
  {
    icon: UserCheck,
    title: "Personal Manager",
    description: "Dedicated account manager who understands your traffic and helps optimize your campaigns for maximum ROI.",
  },
  {
    icon: Wrench,
    title: "Exclusive Tools",
    description: "Advanced tracking, custom landing pages, real-time API, and marketing creatives designed to convert.",
  },
];

export const BenefitsGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-28 relative">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
            Why Partners Choose Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="text-liquid-silver">THE </span>
            <span className="text-gradient-gold">ELITE</span>
            <span className="text-liquid-silver"> ADVANTAGE</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-card rounded-2xl p-8 group cursor-default"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
