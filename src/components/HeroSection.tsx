import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { FloatingParticles } from "./FloatingParticles";
import { HeroImageCarousel } from "./HeroImageCarousel";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Decorative Corner Frames */}
      <div className="absolute top-24 left-4 md:left-8 w-16 md:w-24 h-16 md:h-24 border-t-2 border-l-2 border-primary/40" />
      <div className="absolute top-24 right-4 md:right-8 w-16 md:w-24 h-16 md:h-24 border-t-2 border-r-2 border-primary/40" />
      <div className="absolute bottom-24 left-4 md:left-8 w-16 md:w-24 h-16 md:h-24 border-b-2 border-l-2 border-primary/40" />
      <div className="absolute bottom-24 right-4 md:right-8 w-16 md:w-24 h-16 md:h-24 border-b-2 border-r-2 border-primary/40" />
      
      {/* Decorative Stars */}
      <motion.div 
        className="absolute top-32 left-12 md:left-20"
        animate={{ rotate: 360, opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <Star className="w-3 h-3 md:w-4 md:h-4 text-primary fill-primary" />
      </motion.div>
      <motion.div 
        className="absolute top-40 right-16 md:right-28"
        animate={{ rotate: -360, opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <Star className="w-2 h-2 md:w-3 md:h-3 text-primary fill-primary" />
      </motion.div>
      <motion.div 
        className="absolute bottom-40 left-20 md:left-32"
        animate={{ rotate: 360, opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <Star className="w-2 h-2 md:w-3 md:h-3 text-primary fill-primary" />
      </motion.div>
      
      {/* Side Decorative Lines */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-primary/50 to-transparent hidden md:block" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-primary/50 to-transparent hidden md:block" />
      
      {/* Subtle Glow Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[150px]"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      {/* Content - Split Layout */}
      <div className="relative container mx-auto px-4 md:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[70vh]">
          
          {/* Left Side - Text Content */}
          <div className="flex flex-col justify-center items-center text-center order-1 py-8 lg:py-0">
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm text-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              Premium iGaming Affiliate Program
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.span>
            
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block text-foreground">SHINE</span>
              <span className="block text-foreground">LIKE A</span>
              <span className="block text-primary">STAR</span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-primary mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Premium Partners, Premium Rewards
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button variant="hero" size="lg" className="group uppercase tracking-wide px-8 py-6">
                Start Earning Now
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
          
          {/* Right Side - Image Carousel */}
          <motion.div
            className="relative h-[400px] md:h-[500px] lg:h-[600px] order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <HeroImageCarousel />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
