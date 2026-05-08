import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { GoldParticles } from "./GoldParticles";

export const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-background">
      <GoldParticles density="medium" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="text-foreground">Ready to partner with the </span>
            <span
              style={{
                background: "linear-gradient(135deg, #fce8a8 0%, #d4a64a 50%, #9a7322 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              best?
            </span>
          </h2>

          <p className="text-base md:text-lg text-foreground/65 mb-10 max-w-xl mx-auto leading-relaxed">
            Sign up in minutes. Get a dedicated manager. Start earning today.
          </p>

          <Button
            className="btn-gold-gradient btn-shine rounded-full px-12 py-7 text-base font-bold uppercase tracking-wider group"
            size="lg"
            asChild
          >
            <a href="https://ro-affiliate.partnerstar.com/registration" target="_blank" rel="noopener noreferrer">
              Register Now
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" strokeWidth={2} />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
