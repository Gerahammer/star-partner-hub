import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "./Reveal";
const faqs = [
  {
    question: "How do I sign up?",
    answer:
      "Click any “Become a partner” button on this site to open the affiliate application. We review every application manually — most are approved within 24–48 hours, after which you get login credentials and a dedicated account manager who reaches out to set up your first deal.",
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

export const FAQSection = () => (
  <section id="faq" className="faq-section section-space">
    <div className="shell faq-grid">
      <Reveal className="faq-intro">
        <span className="eyebrow">05 / The details</span>
        <h2>
          Before we
          <br />
          get started.
        </h2>
        <p>Everything else you need to know before we get started.</p>
        <a className="text-link" href="mailto:affiliates@partnerstar.com">
          Ask our team ↗
        </a>
      </Reveal>
      <Accordion type="single" collapsible className="faq-list">
        {faqs.map((faq, i) => (
          <AccordionItem
            value={`faq-${i}`}
            key={faq.question}
            className="faq-item"
          >
            <AccordionTrigger className="faq-question">
              <span>
                <small>{String(i + 1).padStart(2, "0")}</small>
                {faq.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="faq-answer">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
