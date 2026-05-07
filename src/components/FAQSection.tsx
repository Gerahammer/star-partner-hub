import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GoldParticles } from "./GoldParticles";

const faqs = [
  {
    question: "How do I get started as a Partnerstar affiliate?",
    answer: "Click 'Join Now' and fill out the application. Our team reviews your profile and responds within 24–48 hours with account details and a dedicated manager.",
  },
  {
    question: "What commission models do you offer?",
    answer: "We offer Revenue Share (up to 50%), CPA, and Hybrid deals. Your account manager will help you choose the best model for your traffic type.",
  },
  {
    question: "How and when do I get paid?",
    answer: "We process payouts monthly with no minimum threshold hassles. We support wire transfers, cryptocurrency, and popular e-wallets.",
  },
  {
    question: "What tracking and reporting tools are available?",
    answer: "Full real-time dashboard with analytics, API integrations, post-back tracking, and custom reporting — all with zero data lag.",
  },
  {
    question: "Do you provide marketing materials?",
    answer: "Yes — high-converting banners, landing pages, deeplinks, and custom creatives. We also create tailored materials for your audience.",
  },
  {
    question: "Which brands can I promote?",
    answer: "50+ premium casino and sports betting brands worldwide, with strong conversion rates and high player retention.",
  },
];

export const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="relative py-28 md:py-36 overflow-hidden bg-background">
      <GoldParticles density="low" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="text-primary font-bold uppercase tracking-[0.25em] text-xs mb-5 block">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground">
            Frequently Asked
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #fce8a8 0%, #d4a64a 50%, #9a7322 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Questions
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-2.5">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="glass-card rounded-xl px-5 sm:px-6 transition-all data-[state=open]:border-primary/20 hover:border-border/30"
                >
                  <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-foreground/90 hover:text-foreground py-4 sm:py-5 [&[data-state=open]]:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
