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
    <div className="relative overflow-hidden py-4 border-y border-border/10"
      style={{ background: 'hsl(224 30% 7%)' }}
    >
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center gap-12">
            <span className="text-[11px] font-medium text-muted-foreground/40 uppercase tracking-[0.15em]">
              {item}
            </span>
            <span className="text-muted-foreground/15 text-[6px]">●</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
