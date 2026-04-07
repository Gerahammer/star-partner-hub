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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layered background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] rounded-full opacity-30"
        style={{ background: 'radial-gradient(ellipse, hsl(224 30% 12%) 0%, transparent 70%)' }} />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[600px] h-[600px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, hsl(42 65% 52% / 0.08) 0%, transparent 60%)' }} />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(hsl(220 10% 50% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(220 10% 50% / 0.4) 1px, transparent 1px)`,
          backgroundSize: '72px 72px'
        }}
      />
      
      <div className="relative container mx-auto px-4 md:px-8 pt-28 pb-20 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto relative"
        >
          {/* Star watermark */}
          <motion.img
            src={partnerstarStar}
            alt=""
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 m-auto w-[1500px] h-[1500px] md:w-[1950px] md:h-[1950px] lg:w-[2400px] lg:h-[2400px] object-contain pointer-events-none select-none z-0"
          />

          {/* Headline */}
          <h1 className="relative z-10 font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.9] mb-7 tracking-tight">
            <span className="text-foreground block">MAXIMIZE YOUR</span>
            <span className="text-foreground block">CASINO</span>
            <span className="block mt-3">
              <span className="text-gradient-gold">REVENUE</span>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative z-10 text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed"
          >
            High conversions. Top payouts. Premium casino brands trusted by elite affiliates worldwide.
          </motion.p>
          
          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
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
              className="rounded-full px-8 py-6 border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300 hover:bg-card/50"
              onClick={() => document.getElementById('brands')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Eye className="w-5 h-5 mr-2" />
              View Brands
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="relative z-10 flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-0"
          >
            {heroStats.map((stat, i) => (
              <div key={stat.label} className={`text-center px-8 sm:px-10 ${i < heroStats.length - 1 ? 'sm:border-r sm:border-border/40' : ''}`}>
                <p className="font-mono text-2xl md:text-3xl lg:text-4xl text-gradient-gold font-bold tracking-tight">{stat.value}</p>
                <p className="text-muted-foreground text-[11px] uppercase tracking-[0.15em] mt-2 font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />
      <ContactFormModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
};
