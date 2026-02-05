import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, TouchEvent } from "react";
import { Check, Crown, Zap, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "./GlowCard";
import goldWavesBg from "@/assets/gold-waves-bg.png";
import topoWavesBg from "@/assets/topo-waves-bg.png";
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

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

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
          className="text-center mb-12 md:mb-16"
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

        {/* Mobile: Carousel */}
        {isMobile ? (
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full h-8 w-8 bg-background/80 backdrop-blur-sm"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div 
              className="px-10 overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: slideDirection * 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -slideDirection * 100 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <GlowCard 
                    className="p-5 h-full"
                    glowColor="gold"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        {(() => {
                          const Icon = plans[currentSlide].icon;
                          return <Icon className="w-5 h-5 text-primary" />;
                        })()}
                      </div>
                      <h3 className="font-display text-2xl text-foreground">
                        {plans[currentSlide].name}
                      </h3>
                    </div>
                    
                    <p className="font-display text-3xl text-gradient-purple mb-3">
                      {plans[currentSlide].highlight}
                    </p>
                    <p className="text-muted-foreground mb-5 text-sm">
                      {plans[currentSlide].description}
                    </p>
                    
                    <ul className="space-y-3">
                      {plans[currentSlide].features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-foreground/90 text-sm">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </GlowCard>
                </motion.div>
              </AnimatePresence>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full h-8 w-8 bg-background/80 backdrop-blur-sm"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Pagination dots */}
            <div className="flex justify-center gap-2 mt-6">
              {plans.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSlideDirection(index > currentSlide ? 1 : -1);
                    setCurrentSlide(index);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentSlide
                      ? "bg-primary"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Desktop/Tablet: All cards in one row */
          <div className="flex gap-4 lg:gap-6 max-w-6xl mx-auto justify-center">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="flex-1 max-w-[320px]"
              >
                <GlowCard 
                  className="p-4 lg:p-6 h-full"
                  glowColor="gold"
                >
                  <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
                    <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <plan.icon className="w-4 h-4 lg:w-6 lg:h-6 text-primary" />
                    </div>
                    <h3 className="font-display text-lg lg:text-2xl text-foreground">
                      {plan.name}
                    </h3>
                  </div>
                  
                  <p className="font-display text-2xl lg:text-4xl text-gradient-purple mb-2 lg:mb-3">
                    {plan.highlight}
                  </p>
                  <p className="text-muted-foreground mb-4 lg:mb-6 text-xs lg:text-sm">
                    {plan.description}
                  </p>
                  
                  <ul className="space-y-2 lg:space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-foreground/90 text-xs lg:text-sm">
                        <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-primary" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
