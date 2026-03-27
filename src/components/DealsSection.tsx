import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, TouchEvent } from "react";
import { Check, Crown, Zap, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

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
  },
];

export const DealsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = () => {
    setSlideDirection(1);
    setCurrentSlide((prev) => (prev + 1) % plans.length);
  };

  const prevSlide = () => {
    setSlideDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + plans.length) % plans.length);
  };

  const handleTouchStart = (e: TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e: TouchEvent) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) { diff > 0 ? nextSlide() : prevSlide(); }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const renderCard = (plan: typeof plans[0], index: number) => (
    <div className="glass-card rounded-2xl p-6 lg:p-8 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
          <plan.icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-display text-xl text-foreground">{plan.name}</h3>
      </div>
      
      <p className="font-display text-3xl lg:text-4xl text-gradient-gold mb-3">
        {plan.highlight}
      </p>
      <p className="text-muted-foreground mb-6 text-sm">{plan.description}</p>
      
      <ul className="space-y-3 mt-auto">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-foreground/80 text-sm">
            <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 text-primary" />
            </div>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section id="deals" className="py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
            Commission Plans
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="text-liquid-silver">DEALS THAT</span>
            <br />
            <span className="text-gradient-gold">MAKE YOU RICH</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the commission model that works best for your traffic
          </p>
        </motion.div>

        {isMobile ? (
          <div className="relative">
            <Button variant="outline" size="icon" className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full h-8 w-8 bg-background/80 border-border/50" onClick={prevSlide}>
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="px-10 overflow-hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: slideDirection * 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -slideDirection * 100 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderCard(plans[currentSlide], currentSlide)}
                </motion.div>
              </AnimatePresence>
            </div>

            <Button variant="outline" size="icon" className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full h-8 w-8 bg-background/80 border-border/50" onClick={nextSlide}>
              <ChevronRight className="h-4 w-4" />
            </Button>

            <div className="flex justify-center gap-2 mt-6">
              {plans.map((_, index) => (
                <button key={index} onClick={() => { setSlideDirection(index > currentSlide ? 1 : -1); setCurrentSlide(index); }}
                  className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? "bg-primary" : "bg-muted-foreground/30"}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex gap-6 max-w-5xl mx-auto justify-center">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex-1 max-w-[340px]"
              >
                {renderCard(plan, index)}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
