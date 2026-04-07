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
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6">
            <span className="text-white">START EARNING</span>
            <br />
            <span className="text-gradient-gold">TODAY</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
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
