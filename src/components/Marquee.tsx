import { motion } from "framer-motion";

const items = [
  "Up to 50% RevShare",
  "Weekly Payouts",
  "24/7 Support",
  "Premium Brands",
  "Real-time Tracking",
  "Crypto Payments",
  "No Negative Carryover",
  "Dedicated Manager",
];

export const Marquee = () => {
  return (
    <div className="relative overflow-hidden py-5 border-y border-border/15"
      style={{ background: 'linear-gradient(90deg, hsl(224 30% 8%) 0%, hsl(224 28% 10%) 50%, hsl(224 30% 8%) 100%)' }}
    >
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center gap-10">
            <span className="text-[13px] md:text-sm font-medium text-muted-foreground/70 uppercase tracking-[0.12em]">
              {item}
            </span>
            <span className="text-primary/40 text-[8px]">◆</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
