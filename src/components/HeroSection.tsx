import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import partnerstarStar from "@/assets/partnerstar-star.png";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg">
      {/* Subtle radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(0 0% 50% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 50% / 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 md:px-8 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto relative"
        >
          {/* Star centered behind the headline */}
          <motion.img
            src={partnerstarStar}
            alt=""
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 m-auto w-[1500px] h-[1500px] md:w-[1950px] md:h-[1950px] lg:w-[2400px] lg:h-[2400px] object-contain pointer-events-none select-none z-0"
          />

          {/* Headline */}
          <h1 className="relative z-10 font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.9] mb-8 tracking-tight">
            <span className="text-white block">ELEVATE YOUR</span>
            <span className="text-white block">AFFILIATE REVENUE</span>
            <span className="block mt-2">
              <span className="text-white">TO </span>
              <span className="text-gradient-gold">STAR STATUS</span>
            </span>
          </h1>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative z-10 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            Access the world's premier casino brands. Join the network trusted by elite affiliates worldwide.
          </motion.p>
          
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative z-10"
          >
            <Button 
              className="btn-gold-gradient rounded-full px-10 py-6 text-base md:text-lg font-bold uppercase tracking-wider group"
              size="lg"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
