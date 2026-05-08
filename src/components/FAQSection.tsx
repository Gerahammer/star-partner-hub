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
    question: "How do I sign up?",
    answer:
      "Click any “Register Now” button on this site to open the affiliate application. We review every application manually — most are approved within 24–48 hours, after which you get login credentials and a dedicated account manager who reaches out to set up your first deal.",
  },
  {
    question: "What commission models do you offer?",
    answer:
      "Three: tiered Revenue Share (25–50% based on volume), Custom CPA per qualified depositor, and a Hybrid combining both. Your account manager will help you pick — RevShare suits long-term retention plays, CPA suits high-volume short-cycle traffic, Hybrid is the default for serious media buyers.",
  },
  {
    question: "When and how do I get paid?",
    answer:
      "Commissions are calculated monthly and paid by the 20th of the following month. Minimum payout is €100 — anything below carries forward. Supported methods: wire transfer, Skrill, Neteller, USDT (TRC-20 / ERC-20), and BTC. You choose your preferred method during onboarding and can change it at any time.",
  },
  {
    question: "Is there negative carryover?",
    answer:
      "No. Your monthly Net Revenue is reset to zero at the end of every month, so a losing month never reduces your earnings the following month. The only exception is fraudulent traffic — clawbacks for fraud, chargebacks, or bonus abuse are deducted as defined in our Terms.",
  },
  {
    question: "Which brands can I promote?",
    answer:
      "Our flagship brand is Wintino — a fully licensed casino and sportsbook converting strongly across Europe and Latin America. We're actively onboarding additional partner brands; your account manager will keep you informed of new launches as they go live.",
  },
  {
    question: "Which traffic sources do you accept?",
    answer:
      "SEO, content sites, comparison/review sites, social media (Facebook, Instagram, TikTok), Telegram channels, streaming, push, native, paid social, email (with proper opt-in), and Google UAC are welcome. Brand-bidding on operator keywords on PPC and unsolicited spam are not permitted — full rules are in our Affiliate Terms.",
  },
  {
    question: "Are there any restricted countries?",
    answer:
      "Yes. We do not accept traffic from a list of jurisdictions including (among others) the United States, United Kingdom, Russia, Iran, Israel, North Korea, and Cuba. The complete list is in our Terms & Conditions and may be updated by the operator from time to time.",
  },
  {
    question: "Do you have a sub-affiliate (2nd tier) program?",
    answer:
      "Yes — when you refer another affiliate, you earn a percentage of their commissions for the lifetime of their account. The exact rate is agreed individually with your manager based on the volume and quality of the affiliates you bring in.",
  },
  {
    question: "Do I need to provide tax / KYC documents?",
    answer:
      "Yes, before your first payout. We require government-issued ID, proof of address, and tax information (W-9 for US persons, W-8BEN/E for non-US, or VAT ID for EU companies). This is standard AML/KYC and protects you and us — your manager walks you through it during onboarding.",
  },
  {
    question: "Who do I contact if something is wrong?",
    answer:
      "Your dedicated account manager is your first point of contact for anything — deal renegotiation, payout issues, creative requests. For privacy or data-related questions, write to privacy@partnerstar.com. For general program inquiries, affiliates@partnerstar.com.",
  },
];

export const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="relative py-28 md:py-36 overflow-hidden">
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
          <Accordion type="multiple" className="space-y-2.5">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-xl px-5 sm:px-6 border border-border/15 transition-all data-[state=open]:border-primary/20 hover:border-border/30"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-foreground/90 hover:text-foreground py-5 [&[data-state=open]]:text-primary transition-colors">
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
