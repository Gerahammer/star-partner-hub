import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, TouchEvent } from "react";
import { Check, Crown, Zap, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const plans = [
  {
    name: "RevShare",
    icon: TrendingUp,
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
    icon: Zap,
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
    icon: Crown,
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
    <div className={`glass-card rounded-2xl p-6 lg:p-8 h-full flex flex-col ${plan.featured ? 'border-primary/25' : ''}`}
      style={plan.featured ? { boxShadow: '0 0 40px hsl(42 65% 52% / 0.06), 0 8px 40px hsl(0 0% 0% / 0.4)' } : {}}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-primary/15"
          style={{ background: 'linear-gradient(135deg, hsl(42 65% 52% / 0.1), hsl(42 65% 52% / 0.04))' }}
        >
          <plan.icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-display text-lg text-foreground">{plan.name}</h3>
      </div>
      
      <p className="font-mono text-3xl lg:text-4xl text-gradient-gold mb-3 font-bold tracking-tight">
        {plan.highlight}
      </p>
      <p className="text-muted-foreground mb-6 text-sm">{plan.description}</p>
      
      <ul className="space-y-3 mt-auto">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5 text-foreground/75 text-sm">
            <div className="w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'hsl(42 65% 52% / 0.12)' }}
            >
              <Check className="w-3 h-3 text-primary" />
            </div>
            {feature}
          </li>
        ))}
      </ul>
    </div>
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
          <p className="text-muted-foreground text-base max-w-lg mx-auto">
            Pick the model that works best for your traffic
          </p>
        </motion.div>

        {isMobile ? (
          <div className="relative">
            <Button variant="outline" size="icon" className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full h-8 w-8 bg-card/80 border-border/50" onClick={prevSlide}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="px-10 overflow-hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={currentSlide} initial={{ opacity: 0, x: slideDirection * 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -slideDirection * 100 }} transition={{ duration: 0.3 }}>
                  {renderCard(plans[currentSlide])}
                </motion.div>
              </AnimatePresence>
            </div>
            <Button variant="outline" size="icon" className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full h-8 w-8 bg-card/80 border-border/50" onClick={nextSlide}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="flex justify-center gap-2 mt-6">
              {plans.map((_, index) => (
                <button key={index} onClick={() => { setSlideDirection(index > currentSlide ? 1 : -1); setCurrentSlide(index); }}
                  className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? "bg-primary" : "bg-muted-foreground/20"}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex gap-5 max-w-5xl mx-auto justify-center">
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
