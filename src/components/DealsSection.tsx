import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, TouchEvent } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

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
      className="relative rounded-2xl p-8 lg:p-10 h-full flex flex-col text-center"
      style={{
        background: plan.featured
          ? "linear-gradient(180deg, rgba(212, 166, 74, 0.15) 0%, rgba(20, 14, 4, 0.6) 100%)"
          : "rgba(20, 14, 4, 0.4)",
        border: "1px solid rgba(212, 166, 74, 0.25)",
        transform: plan.featured ? "scale(1.03)" : "none",
      }}
    >
      {plan.featured && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold text-black whitespace-nowrap animate-badge-pulse"
          style={{ background: "linear-gradient(135deg, #fce8a8 0%, #d4a64a 50%, #b8862b 100%)" }}
        >
          Most Popular
        </span>
      )}
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/60 mb-4">{plan.name}</h3>
      <p
        className="font-black mb-2 tracking-tight whitespace-nowrap text-4xl sm:text-5xl lg:text-6xl min-h-[3.5rem] sm:min-h-[4rem] lg:min-h-[5rem] flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #fce8a8 0%, #d4a64a 50%, #9a7322 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {plan.highlight}
      </p>
      <p className="text-foreground/70 mb-8 text-sm">{plan.description}</p>

      <ul className="space-y-3 mt-auto text-left">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-foreground/80 text-sm">
            <Check className="w-4 h-4 text-primary shrink-0" strokeWidth={2} />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <section id="deals" className="relative py-28 md:py-36 overflow-hidden">
      <div className="relative container mx-auto px-4 md:px-8 z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold uppercase tracking-[0.25em] text-xs mb-5 block">
            Commission Plans
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
            <span className="text-foreground">Choose Your </span>
            <span
              style={{
                background: "linear-gradient(135deg, #fce8a8 0%, #d4a64a 50%, #9a7322 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Deal
            </span>
          </h2>
          <p className="text-foreground/60 text-sm max-w-md mx-auto">
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
