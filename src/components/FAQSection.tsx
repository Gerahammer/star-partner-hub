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
    answer:
      "Simply click 'Get Started' and fill out the application form. Our team will review your profile and get back to you within 24-48 hours with your account details and dedicated manager.",
  },
  {
    question: "What commission models do you offer?",
    answer:
      "We offer flexible commission structures including Revenue Share (up to 50%), CPA, and Hybrid deals. Your personal account manager will help you choose the best model for your traffic.",
  },
  {
    question: "How and when do I get paid?",
    answer:
      "We process payouts monthly with no minimum threshold hassles. We support wire transfers, cryptocurrency, and popular e-wallets for your convenience.",
  },
  {
    question: "What tracking and reporting tools are available?",
    answer:
      "You'll have access to our real-time dashboard with detailed analytics, API integrations, post-back tracking, and custom reporting — all with zero data lag.",
  },
  {
    question: "Do you provide marketing materials?",
    answer:
      "Yes! We provide high-converting banners, landing pages, deeplinks, and custom creatives. Our team can also create tailored materials for your specific audience.",
  },
  {
    question: "Which brands can I promote?",
    answer:
      "Partnerstar partners with 50+ premium casino and sports betting brands worldwide. You'll get access to top-tier operators with strong conversion rates and player retention.",
  },
];

export const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-16 sm:py-20 md:py-28 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-primary font-semibold uppercase tracking-wider text-xs sm:text-sm mb-3 md:mb-4 block">
            Got Questions?
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground">
            FREQUENTLY ASKED
            <br />
            <span className="text-gradient-gold">QUESTIONS</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/50 rounded-xl px-5 sm:px-6 bg-card/50 hover:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base md:text-lg font-semibold text-foreground hover:text-primary py-4 sm:py-5 [&[data-state=open]]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm sm:text-base pb-4 sm:pb-5">
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
