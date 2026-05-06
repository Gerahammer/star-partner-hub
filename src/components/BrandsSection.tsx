import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Gamepad2, Users, Shield, Headphones } from "lucide-react";
import wintinoCharacter from "@/assets/wintino-character.png";
import wintinoBrandMobile from "@/assets/wintino-brand-mobile.png";
import wintinoLogo from "@/assets/wintino-logo.svg";

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
    <section id="brands" className="py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
            Our Brands
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="text-liquid-silver">PARTNER WITH</span>
            <br />
            <span className="text-gradient-gold">PREMIUM BRANDS</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
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
          <div className="glass-card rounded-2xl overflow-hidden border border-primary/20">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                <h3 className="font-display text-4xl md:text-5xl text-gradient-gold mb-4">
                  WINTINO
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
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
                      <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                        <feature.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-display text-lg text-foreground">{feature.label}</p>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Image */}
              <div className="relative h-64 lg:h-auto overflow-visible order-1 lg:order-2 flex items-center justify-center lg:justify-start">
                <img 
                  src={wintinoBrandMobile} 
                  alt="Wintino Casino" 
                  className="w-full h-full object-contain lg:hidden"
                />
                <img 
                  src={wintinoCharacter} 
                  alt="Wintino Casino" 
                  className="hidden lg:block lg:absolute lg:-left-32 lg:top-1/2 lg:-translate-y-1/2 lg:w-[138%] lg:max-w-none"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
