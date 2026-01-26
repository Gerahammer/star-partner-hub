import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "RevShare",
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
    <section id="deals" className="py-24 md:py-32 section-pattern">
      <div className="container mx-auto px-4 md:px-8">
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
              className={`card-premium p-8 relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm font-semibold flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  Most Popular
                </div>
              )}
              
              <h3 className="font-display text-3xl text-foreground mb-2">
                {plan.name}
              </h3>
              <p className="font-display text-5xl text-gradient-gold mb-4">
                {plan.highlight}
              </p>
              <p className="text-muted-foreground mb-8">
                {plan.description}
              </p>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-foreground/90">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
