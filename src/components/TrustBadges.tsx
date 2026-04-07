import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Globe, CreditCard, Zap, Clock, Award } from "lucide-react";

const badges = [
  { icon: Shield, label: "Licensed & Regulated" },
  { icon: Globe, label: "45+ GEOs Supported" },
  { icon: CreditCard, label: "Multiple Payment Methods" },
  { icon: Zap, label: "Instant Setup" },
  { icon: Clock, label: "Weekly Payouts" },
  { icon: Award, label: "Award-Winning Platform" },
];

export const TrustBadges = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-16 md:py-20 border-y border-border/10">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-center text-muted-foreground/50 text-[10px] uppercase tracking-[0.25em] mb-8 font-medium">
            Trusted by 3,200+ affiliates worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {badges.map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center gap-2.5 text-muted-foreground/50 hover:text-muted-foreground/70 transition-colors"
              >
                <badge.icon className="w-3.5 h-3.5 text-muted-foreground/30" strokeWidth={1.5} />
                <span className="text-[11px] font-medium tracking-wide whitespace-nowrap">{badge.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
