import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Lock, CreditCard, Award, Zap, Clock } from "lucide-react";

const badges = [
  { icon: Shield, label: "Verified Partner" },
  { icon: Lock, label: "Secure Payments" },
  { icon: CreditCard, label: "Multiple Currencies" },
  { icon: Award, label: "Award Winning" },
  { icon: Zap, label: "Instant Setup" },
  { icon: Clock, label: "Fast Payouts" },
];

export const TrustBadges = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-14 border-y border-border/10">
      <div className="container mx-auto px-4 md:px-8">
        <p className="text-center text-muted-foreground/60 text-[11px] uppercase tracking-[0.2em] mb-8 font-medium">
          Trusted by affiliates worldwide
        </p>
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-7 md:gap-10"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="flex items-center gap-2.5 text-muted-foreground/60 hover:text-muted-foreground transition-colors group"
            >
              <badge.icon className="w-3.5 h-3.5 text-primary/50 group-hover:text-primary/70 transition-colors" />
              <span className="text-[11px] font-medium uppercase tracking-[0.1em] whitespace-nowrap">{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
