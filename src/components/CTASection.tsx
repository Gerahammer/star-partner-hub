import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { ContactFormModal } from "./ContactFormModal";

export const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6">
            <span className="text-liquid-silver">READY TO JOIN</span>
            <br />
            <span className="text-gradient-gold">THE ELITE?</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join Partnerstar today and start earning with premium iGaming brands. 
            Our team is ready to help you succeed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              className="btn-gold-gradient rounded-full px-10 py-6 text-base font-bold uppercase tracking-wider group"
              size="lg"
              onClick={() => setIsContactOpen(true)}
            >
              Start Partnership
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="rounded-full px-8 py-6 border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
              onClick={() => setIsContactOpen(true)}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Us
            </Button>
          </div>
        </motion.div>
      </div>

      <ContactFormModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
};
