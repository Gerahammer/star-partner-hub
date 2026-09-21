import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ContactFormModal } from "./ContactFormModal";
import { Reveal } from "./Reveal";
export const CTASection = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const section = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [-55, 0]);
  return (
    <section className="closing-section" ref={section}>
      <div className="shell">
        <div className="closing-top">
          <span className="eyebrow">Ambition looks good on you.</span>
          <span className="eyebrow">Let’s put it to work.</span>
        </div>
        <motion.h2 style={reduceMotion ? undefined : { x }}>
          Your next
          <br />
          <span>big move.</span>
        </motion.h2>
        <Reveal className="closing-bottom">
          <p>
            A real conversation.
            <br />A partnership built around you.
          </p>
          <div>
            <a
              className="button button-gold"
              href="https://ro-affiliate.partnerstar.com/registration"
              target="_blank"
              rel="noopener noreferrer"
            >
              Become a partner <ArrowUpRight size={19} />
            </a>
            <button className="text-link" onClick={() => setContactOpen(true)}>
              Let’s talk first <ArrowUpRight size={17} />
            </button>
          </div>
        </Reveal>
      </div>
      <ContactFormModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </section>
  );
};
