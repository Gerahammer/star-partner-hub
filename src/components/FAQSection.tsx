import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <section id="faq" className="py-28 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, hsl(225 35% 6%) 0%, hsl(224 30% 8%) 50%, hsl(225 35% 6%) 100%)' }}
      />

      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="text-primary/80 font-medium uppercase tracking-[0.2em] text-xs mb-5 block">
            Got Questions?
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground">
            Frequently Asked
            <br />
            <span className="text-gradient-gold">Questions</span>
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
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-xl px-5 sm:px-6 transition-colors data-[state=open]:border-primary/20"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-foreground/90 hover:text-foreground py-4 sm:py-5 [&[data-state=open]]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
