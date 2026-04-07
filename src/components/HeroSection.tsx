import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";
import { useState } from "react";
import { ContactFormModal } from "./ContactFormModal";
import partnerstarStar from "@/assets/partnerstar-star.png";

const heroStats = [
  { value: "€12.5M+", label: "Total Payouts" },
  { value: "3,200+", label: "Active Affiliates" },
  { value: "45+", label: "Supported GEOs" },
];

export const HeroSection = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(0 0% 50% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 50% / 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      <div className="relative container mx-auto px-4 md:px-8 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto relative"
        >
          <motion.img
            src={partnerstarStar}
            alt=""
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 m-auto w-[1500px] h-[1500px] md:w-[1950px] md:h-[1950px] lg:w-[2400px] lg:h-[2400px] object-contain pointer-events-none select-none z-0"
          />

          <h1 className="relative z-10 font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.9] mb-6 tracking-tight">
            <span className="text-white block">MAXIMIZE YOUR</span>
            <span className="text-white block">CASINO</span>
            <span className="block mt-2">
              <span className="text-gradient-gold">REVENUE</span>
            </span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative z-10 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            High conversions. Top payouts. Premium casino brands trusted by elite affiliates worldwide.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button 
              className="btn-gold-gradient rounded-full px-10 py-6 text-base md:text-lg font-bold uppercase tracking-wider group"
              size="lg"
              onClick={() => setIsContactOpen(true)}
            >
              Join Now
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="rounded-full px-8 py-6 border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
              onClick={() => document.getElementById('brands')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Eye className="w-5 h-5 mr-2" />
              View Brands
            </Button>
          </motion.div>

          {/* Inline Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="relative z-10 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12"
          >
            {heroStats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-2xl md:text-3xl text-gradient-gold">{stat.value}</p>
                <p className="text-muted-foreground text-xs uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      <ContactFormModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
};
