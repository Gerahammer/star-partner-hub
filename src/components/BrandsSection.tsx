import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Gamepad2, Users, Shield, Headphones } from "lucide-react";
import wintinoBrand from "@/assets/wintino-brand.jpg";

const brandFeatures = [
  { icon: Gamepad2, label: "5,000+", desc: "Casino games & sportsbook" },
  { icon: Users, label: "VIP", desc: "Exclusive VIP program" },
  { icon: Shield, label: "Licensed", desc: "Fully regulated & secure" },
  { icon: Headphones, label: "24/7", desc: "Multilingual support" },
];

export const BrandsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="brands" className="py-24 md:py-32 bg-muted/20">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold uppercase tracking-wider text-sm mb-4 block">
            Our Brands
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
            PARTNER WITH
            <br />
            <span className="text-gradient-gold">PREMIUM BRANDS</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Working with top-tier iGaming brands that convert and retain players
          </p>
        </motion.div>

        {/* Wintino Brand Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="card-premium overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img 
                  src={wintinoBrand} 
                  alt="Wintino Casino" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card lg:bg-gradient-to-t lg:from-transparent lg:to-transparent" />
              </div>
              
              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="font-display text-5xl md:text-6xl text-gradient-gold mb-4">
                  WINTINO
                </h3>
                <p className="text-xl text-muted-foreground mb-8">
                  Premium online casino with the best gaming experience. 
                  High player retention and lifetime value.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {brandFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-display text-xl text-foreground">{feature.label}</p>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
