import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Wrench, Headphones } from "lucide-react";

const stats = [
  {
    icon: Clock,
    value: "10+",
    label: "Years of Experience",
    description: "Founded and operated by iGaming industry veterans",
  },
  {
    icon: Wrench,
    value: "Tools",
    label: "Full Marketing Toolkit",
    description: "Localized creatives, real-time tracking & more",
  },
  {
    icon: Headphones,
    value: "24/7",
    label: "Dedicated Support",
    description: "Always there for you whenever you need us",
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
            About Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
            <span className="text-liquid-silver">WE BRING THE REAL</span>
            <br />
            <span className="text-gradient-gold">AFFILIATE FLOW</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-4xl md:text-5xl text-gradient-gold mb-2">
                {stat.value}
              </h3>
              <p className="text-foreground font-semibold text-base mb-2">
                {stat.label}
              </p>
              <p className="text-muted-foreground text-sm">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
