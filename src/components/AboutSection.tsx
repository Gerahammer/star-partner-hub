import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Wrench, Headphones } from "lucide-react";

const stats = [
  {
    icon: Clock,
    value: "10+",
    label: "Years of Experience",
    description: "Founded and operated by iGaming gurus",
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
    <section id="about" className="py-24 md:py-32 section-pattern">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold uppercase tracking-wider text-sm mb-4 block">
            About Us
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
            WE BRING THE REAL
            <br />
            <span className="text-gradient-gold">AFFILIATE FLOW</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="card-premium p-8 group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="font-display text-5xl md:text-6xl text-gradient-gold mb-2">
                {stat.value}
              </h3>
              <p className="text-foreground font-semibold text-lg mb-2">
                {stat.label}
              </p>
              <p className="text-muted-foreground">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
