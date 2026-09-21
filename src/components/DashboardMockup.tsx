import { ArrowUpRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
export const DashboardMockup = () => {
  const reduceMotion = useReducedMotion();
  return (
    <section className="platform-section section-space" id="platform">
      <div className="shell platform-grid">
        <Reveal className="platform-copy">
          <span className="eyebrow">03 / Nothing lost in the numbers</span>
          <h2>
            See the whole
            <br />
            <span className="muted-heading">picture.</span>
          </h2>
          <p>
            Follow your traffic from first click to commission. ReferOn puts
            your performance in perspective, so you know where to go next.
          </p>
          <ul>
            <li>
              <Check size={17} />
              Real-time performance reporting
            </li>
            <li>
              <Check size={17} />
              Campaign and conversion tracking
            </li>
            <li>
              <Check size={17} />
              API and postback integrations
            </li>
          </ul>
          <a
            className="text-link"
            href="https://ro-affiliate.partnerstar.com/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open your dashboard <ArrowUpRight size={17} />
          </a>
        </Reveal>
        <div className="report-system">
          <div className="report-heading">
            <span className="eyebrow">The complete journey</span>
            <span>
              Powered by <strong>ReferOn</strong>
            </span>
          </div>
          {["Every click.", "Every conversion.", "Every commission."].map(
            (title, index) => (
              <motion.div
                className="report-step"
                key={title}
                initial={reduceMotion ? false : { opacity: 0.25, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.65,
                  delay: reduceMotion ? 0 : index * 0.12,
                }}
              >
                <span>0{index + 1}</span>
                <strong>{title}</strong>
                <motion.div
                  className="report-rule"
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: reduceMotion ? 0 : 1,
                    delay: reduceMotion ? 0 : index * 0.14,
                  }}
                />
              </motion.div>
            ),
          )}
          <p className="report-caption">
            One platform. A clear view of your performance.
          </p>
        </div>
      </div>
    </section>
  );
};
