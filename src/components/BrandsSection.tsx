import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Gamepad2, Users, Shield, Headphones, Star } from "lucide-react";
import wintinoCharacter from "@/assets/wintino-character.png";
import wintinoBrandMobile from "@/assets/wintino-brand-mobile.png";
import { PremiumBorder } from "./PremiumBorder";
import { DecorativeDivider } from "./DecorativeDivider";
import topoWavesBg from "@/assets/topo-waves-bg.png";

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
    <section id="brands" className="py-24 md:py-32 relative bg-transparent overflow-hidden">
      {/* Topo waves background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
        style={{ backgroundImage: `url(${topoWavesBg})` }}
      />
      {/* Decorative side lines */}
      <div className="absolute left-0 top-1/4 w-px h-32 bg-gradient-to-b from-transparent via-primary/40 to-transparent hidden lg:block" />
      <div className="absolute right-0 top-1/4 w-px h-32 bg-gradient-to-b from-transparent via-primary/40 to-transparent hidden lg:block" />
      <div className="absolute left-0 bottom-1/4 w-px h-32 bg-gradient-to-b from-transparent via-primary/40 to-transparent hidden lg:block" />
      <div className="absolute right-0 bottom-1/4 w-px h-32 bg-gradient-to-b from-transparent via-primary/40 to-transparent hidden lg:block" />
      
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
          <DecorativeDivider variant="star" className="max-w-xs mx-auto" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
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
          <PremiumBorder glowing>
            <div className="overflow-hidden rounded-xl">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Content - Left Side */}
                <div className="p-8 lg:p-12 flex flex-col justify-center relative order-2 lg:order-1">
                  {/* Decorative corner */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-primary/30" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-primary/30 hidden lg:block" />
                  
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
                        <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
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
                
                {/* Image - Right Side with overflow */}
                <div className="relative h-64 lg:h-auto overflow-visible order-1 lg:order-2 flex items-center justify-center lg:justify-start">
                  {/* Mobile/Tablet image */}
                  <img 
                    src={wintinoBrandMobile} 
                    alt="Wintino Casino" 
                    className="w-full h-full object-contain lg:hidden"
                  />
                  {/* Desktop image with overflow effect */}
                  <img 
                    src={wintinoCharacter} 
                    alt="Wintino Casino" 
                    className="hidden lg:block lg:absolute lg:-left-16 lg:top-1/2 lg:-translate-y-1/2 lg:w-[120%] lg:max-w-none"
                  />
                  
                  {/* Star decorations on image */}
                  <div className="absolute top-4 right-4">
                    <Star className="w-4 h-4 text-primary fill-primary opacity-60" />
                  </div>
                  <div className="absolute bottom-4 left-4 lg:left-auto lg:right-8">
                    <Star className="w-3 h-3 text-primary fill-primary opacity-40" />
                  </div>
                </div>
              </div>
            </div>
          </PremiumBorder>
        </motion.div>
      </div>
    </section>
  );
};
