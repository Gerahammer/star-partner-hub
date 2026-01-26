import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MessageCircle, Star } from "lucide-react";
import { DecorativeDivider } from "./DecorativeDivider";
import { ContactFormModal } from "./ContactFormModal";

export const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial-gold opacity-20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      
      {/* Decorative frame corners */}
      <div className="absolute top-8 left-8 w-20 h-20 border-t-2 border-l-2 border-primary/30 hidden lg:block" />
      <div className="absolute top-8 right-8 w-20 h-20 border-t-2 border-r-2 border-primary/30 hidden lg:block" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-b-2 border-l-2 border-primary/30 hidden lg:block" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 border-primary/30 hidden lg:block" />
      
      {/* Decorative stars */}
      <motion.div 
        className="absolute top-16 left-16 hidden lg:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Star className="w-4 h-4 text-primary/40 fill-primary/40" />
      </motion.div>
      <motion.div 
        className="absolute bottom-16 right-16 hidden lg:block"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <Star className="w-3 h-3 text-primary/30 fill-primary/30" />
      </motion.div>
      
      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
            READY TO BECOME
            <br />
            <span className="text-gradient-gold">A STAR?</span>
          </h2>
          
          <DecorativeDivider variant="star" className="max-w-xs mx-auto mb-6" />
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join Partnerstar today and start earning with premium iGaming brands. 
            Our team is ready to help you succeed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" size="xl" className="group" onClick={() => setIsContactOpen(true)}>
              Start Partnership
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="heroOutline" size="xl" onClick={() => setIsContactOpen(true)}>
              <MessageCircle className="w-5 h-5" />
              Contact Us
            </Button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-muted-foreground"
          >
            <Mail className="w-5 h-5" />
            <a 
              href="mailto:partners@partnerstar.com" 
              className="hover:text-primary transition-colors"
            >
              partners@partnerstar.com
            </a>
          </motion.div>
        </motion.div>
      </div>

      <ContactFormModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
};
