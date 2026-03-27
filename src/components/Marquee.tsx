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
    <div className="relative overflow-hidden py-4 border-y border-border/20 bg-muted/20">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center gap-8">
            <span className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wider">
              {item}
            </span>
            <span className="text-primary text-xs">◆</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
