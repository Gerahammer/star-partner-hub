import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Star, Crown, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "./GlowCard";
import goldWavesBg from "@/assets/gold-waves-bg.png";
import topoWavesBg from "@/assets/topo-waves-bg.png";

const plans = [
  {
    name: "RevShare",
    icon: TrendingUp,
    highlight: "25-50%",
    description: "Lifetime revenue share on all player activity",
    features: [
      "Up to 50% revenue share",
      "Lifetime player tracking",
      "No negative carryover",
      "Monthly payments",
    ],
    popular: false,
  },
  {
    name: "CPA",
    icon: Zap,
    highlight: "Custom",
    description: "Fixed commission per qualified player",
    features: [
      "High CPA rates",
      "Flexible qualification criteria",
      "Fast payouts",
      "Scalable deals",
    ],
    popular: true,
  },
  {
    name: "Hybrid",
    icon: Crown,
    highlight: "Best of Both",
    description: "Combine RevShare with CPA benefits",
    features: [
      "CPA + RevShare combo",
      "Tailored to your traffic",
      "Maximum earning potential",
      "Premium partner status",
    ],
    popular: false,
  },
];

export const DealsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="deals" className="py-16 sm:py-20 md:py-28 lg:py-32 relative overflow-hidden">
      {/* Topo waves background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35 dark:opacity-35"
        style={{ backgroundImage: `url(${topoWavesBg})` }}
      />
      {/* Gold waves background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 dark:opacity-30"
        style={{ backgroundImage: `url(${goldWavesBg})` }}
      />
      <div className="absolute inset-0 bg-background/70 dark:bg-background/70" />
      
      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold uppercase tracking-wider text-xs sm:text-sm mb-3 md:mb-4 block">
            Commission Plans
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 md:mb-6 px-2">
            DEALS THAT
            <br />
            <span className="text-gradient-purple">MAKE YOU RICH</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Choose the commission model that works best for your traffic
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <GlowCard 
                className="p-4 sm:p-5 lg:p-6 h-full"
                glowColor="gold"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <plan.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl lg:text-3xl text-foreground">
                    {plan.name}
                  </h3>
                </div>
                
                <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-gradient-purple mb-2 sm:mb-3">
                  {plan.highlight}
                </p>
                <p className="text-muted-foreground mb-4 sm:mb-5 lg:mb-6 text-xs sm:text-sm lg:text-base">
                  {plan.description}
                </p>
                
                <ul className="space-y-2 sm:space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-foreground/90 text-xs sm:text-sm lg:text-base">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
