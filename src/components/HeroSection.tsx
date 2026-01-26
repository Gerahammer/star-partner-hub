import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { FloatingParticles } from "./FloatingParticles";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Animated Glow Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 md:px-8 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 text-sm text-foreground mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              Premium iGaming Affiliate Program
              <Sparkles className="w-4 h-4 text-primary" />
            </span>
          </motion.div>
          
          <motion.h1
            className="font-display text-6xl md:text-8xl lg:text-9xl leading-none mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-foreground">BECOME A</span>
            <br />
            <span className="text-gradient-gold drop-shadow-[0_0_30px_hsl(45_100%_50%/0.3)]">PARTNER</span>
            <span className="text-foreground">STAR</span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Earn like a star with industry-leading commission rates 
            and premium iGaming brands
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button variant="hero" size="xl" className="group shadow-[0_0_30px_hsl(180_100%_50%/0.3)]">
              Start Earning Now
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="heroOutline" size="xl" className="backdrop-blur-sm">
              Learn More
            </Button>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 1.2, duration: 0.6 },
            y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
