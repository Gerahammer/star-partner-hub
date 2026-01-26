import { motion } from "framer-motion";
import { useInView } from "framer-motion";
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
    <section className="py-12 border-y border-border/50">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-6 md:gap-10"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <badge.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium whitespace-nowrap">{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
