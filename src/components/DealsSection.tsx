import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";

const plans = [
  {
    id: "revenue",
    name: "Revenue share",
    type: "For the long game",
    value: "25–50",
    suffix: "%",
    description: "Build recurring revenue from the players you introduce.",
    features: [
      "Lifetime player tracking",
      "No negative carryover",
      "Monthly settlements",
    ],
    cta: "Choose revenue share",
  },
  {
    id: "cpa",
    name: "CPA",
    type: "For every acquisition",
    value: "Your",
    suffix: "rate.",
    description:
      "A fixed commission for each qualified player. A deal built for your traffic.",
    features: [
      "Individually agreed rates",
      "Clear player qualifications",
      "Room to scale",
    ],
    cta: "Discuss a CPA deal",
  },
  {
    id: "hybrid",
    name: "Hybrid",
    type: "The best of both",
    value: "Your",
    suffix: "mix.",
    description: "Combine an upfront CPA with ongoing revenue share.",
    features: [
      "CPA + revenue share",
      "Tailored to your strategy",
      "Long-term earning potential",
    ],
    cta: "Build your hybrid deal",
  },
];
export const DealsSection = () => {
  const [selected, setSelected] = useState("revenue");
  const reduceMotion = useReducedMotion();
  return (
    <section id="deals" className="deals-section section-space">
      <div className="shell">
        <Reveal className="deals-heading">
          <span className="eyebrow">02 / Make it work for you</span>
          <h2>
            Your business.
            <br />
            Your upside.
          </h2>
          <p>
            Three ways to earn.
            <br />
            Choose the way you want to grow.
          </p>
        </Reveal>
        <Tabs.Root
          value={selected}
          onValueChange={setSelected}
          className="commission-selector"
        >
          <Tabs.List className="commission-tabs" aria-label="Commission models">
            {plans.map((plan, i) => (
              <Tabs.Trigger
                className="commission-tab"
                key={plan.id}
                value={plan.id}
              >
                <span className="tab-index">0{i + 1}</span>
                {plan.name}
                {selected === plan.id && (
                  <motion.span
                    className="tab-line"
                    layoutId="commission-indicator"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 36,
                      duration: reduceMotion ? 0 : undefined,
                    }}
                  />
                )}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {plans.map((plan) => (
            <Tabs.Content
              key={plan.id}
              value={plan.id}
              className="commission-panel"
            >
              <motion.div
                className="commission-content"
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="commission-offer">
                  <span className="eyebrow">{plan.type}</span>
                  <div
                    className={`commission-value ${plan.id !== "revenue" ? "commission-value-words" : ""}`}
                  >
                    {plan.value}
                    <span>{plan.suffix}</span>
                  </div>
                  <p>{plan.description}</p>
                </div>
                <div className="commission-details">
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <Check size={18} strokeWidth={1.5} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    className="button"
                    href="https://ro-affiliate.partnerstar.com/registration"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {plan.cta}
                    <ArrowUpRight size={19} />
                  </a>
                </div>
              </motion.div>
            </Tabs.Content>
          ))}
        </Tabs.Root>
        <p className="deal-footnote">
          Final terms are agreed with your account manager.
          <a href="/terms">
            View affiliate terms <ArrowUpRight size={15} />
          </a>
        </p>
      </div>
    </section>
  );
};
