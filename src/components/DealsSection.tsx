import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Star, Crown, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "./GlowCard";

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
    <section id="deals" className="py-24 md:py-32 section-pattern relative">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold uppercase tracking-wider text-sm mb-4 block">
            Commission Plans
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
            DEALS THAT
            <br />
            <span className="text-gradient-gold">MAKE YOU RICH</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the commission model that works best for your traffic
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <GlowCard 
                className={`p-8 h-full ${plan.popular ? 'ring-2 ring-primary' : ''}`}
                glowColor={plan.popular ? "cyan" : "gold"}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-cyan to-cyan-light text-primary-foreground rounded-full text-sm font-bold flex items-center gap-1.5 shadow-lg">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </div>
                )}
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <plan.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-3xl text-foreground">
                    {plan.name}
                  </h3>
                </div>
                
                <p className="font-display text-5xl text-gradient-gold mb-4">
                  {plan.highlight}
                </p>
                <p className="text-muted-foreground mb-8">
                  {plan.description}
                </p>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-foreground/90">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.popular ? "hero" : "heroOutline"} 
                  size="lg" 
                  className="w-full"
                >
                  Get Started
                </Button>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
