import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ContactFormModal } from "./ContactFormModal";

export const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      {/* Layered ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-40"
        style={{ background: 'radial-gradient(ellipse, hsl(42 65% 52% / 0.05) 0%, transparent 60%)' }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-px" 
        style={{ background: 'linear-gradient(90deg, transparent, hsl(42 65% 52% / 0.15), transparent)' }}
      />
      
      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl mb-7">
            <span className="text-foreground">Start Earning</span>
            <br />
            <span className="text-gradient-gold">Today</span>
          </h2>
          
          <p className="text-base text-muted-foreground mb-12 max-w-md mx-auto leading-relaxed">
            Join thousands of affiliates already earning with premium casino brands. Your dedicated manager is ready.
          </p>
          
          <Button 
            className="btn-gold-gradient rounded-full px-12 py-7 text-lg font-bold uppercase tracking-wider group"
            size="lg"
            onClick={() => setIsContactOpen(true)}
          >
            Join Now
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>

      <ContactFormModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
};
