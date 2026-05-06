import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, TouchEvent } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const plans = [
  {
    name: "RevShare",
    highlight: "25–50%",
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
    highlight: "Custom",
    description: "Fixed commission per qualified player",
    features: [
      "High CPA rates",
      "Flexible qualification",
      "Fast payouts",
      "Scalable deals",
    ],
    featured: true,
  },
  {
    name: "Hybrid",
    highlight: "Best Deal",
    description: "Combine RevShare with CPA benefits",
    features: [
      "CPA + RevShare combo",
      "Tailored to your traffic",
      "Maximum earnings",
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

  const nextSlide = () => { setSlideDirection(1); setCurrentSlide((p) => (p + 1) % plans.length); };
  const prevSlide = () => { setSlideDirection(-1); setCurrentSlide((p) => (p - 1 + plans.length) % plans.length); };
  const handleTouchStart = (e: TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e: TouchEvent) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) { diff > 0 ? nextSlide() : prevSlide(); }
    touchStartX.current = null; touchEndX.current = null;
  };

  const renderCard = (plan: typeof plans[0]) => (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl p-6 lg:p-8 h-full flex flex-col border ${plan.featured ? 'border-primary/20' : 'border-border/15'}`}
      style={{
        background: plan.featured
          ? 'linear-gradient(165deg, hsl(224 28% 13%) 0%, hsl(224 26% 9%) 100%)'
          : 'hsl(224 28% 10%)',
        boxShadow: plan.featured ? '0 0 30px hsl(42 65% 52% / 0.04)' : 'none'
      }}
    >
      {plan.featured && (
        <span className="text-[10px] uppercase tracking-[0.2em] text-primary/70 font-medium mb-4">Most Popular</span>
      )}
      <h3 className="font-display text-lg text-foreground mb-2">{plan.name}</h3>
      <p className="font-mono text-3xl lg:text-4xl text-foreground mb-2 font-bold tracking-tight">
        {plan.highlight}
      </p>
      <p className="text-muted-foreground/60 mb-6 text-sm">{plan.description}</p>
      
      <ul className="space-y-3 mt-auto">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5 text-muted-foreground text-sm">
            <Check className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" strokeWidth={1.5} />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <section id="deals" className="py-28 md:py-36 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary/80 font-medium uppercase tracking-[0.2em] text-xs mb-5 block">
            Commission Plans
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="text-foreground">Choose Your </span>
            <span className="text-gradient-gold">Deal</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Pick the model that works best for your traffic
          </p>
        </motion.div>

        {isMobile ? (
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full h-8 w-8 bg-card/80 border-border/30 hover:bg-card hover:border-border/50 transition-colors"
              onClick={prevSlide}
              aria-label="Previous commission plan"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
            </Button>
            <div className="px-10 overflow-hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={currentSlide} initial={{ opacity: 0, x: slideDirection * 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -slideDirection * 100 }} transition={{ duration: 0.3 }}>
                  {renderCard(plans[currentSlide])}
                </motion.div>
              </AnimatePresence>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full h-8 w-8 bg-card/80 border-border/30 hover:bg-card hover:border-border/50 transition-colors"
              onClick={nextSlide}
              aria-label="Next commission plan"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </Button>
            <div className="flex justify-center gap-2 mt-6">
              {plans.map((_, index) => (
                <button
                  key={index}
                  onClick={() => { setSlideDirection(index > currentSlide ? 1 : -1); setCurrentSlide(index); }}
                  className={`w-1.5 h-1.5 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 ${index === currentSlide ? "bg-primary/70" : "bg-muted-foreground/15"}`}
                  aria-label={`Go to ${plans[index].name} plan`}
                  aria-current={index === currentSlide ? "true" : "false"}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex gap-4 max-w-5xl mx-auto justify-center">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="flex-1 max-w-[340px]"
              >
                {renderCard(plan)}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
