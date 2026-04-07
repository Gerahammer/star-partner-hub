import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const paymentMethods = [
  "Wire Transfer", "Bitcoin", "USDT", "Skrill", "Neteller", "ecoPayz"
];

const geos = [
  { flag: "🇩🇪", code: "DE" },
  { flag: "🇦🇹", code: "AT" },
  { flag: "🇨🇭", code: "CH" },
  { flag: "🇫🇮", code: "FI" },
  { flag: "🇳🇴", code: "NO" },
  { flag: "🇸🇪", code: "SE" },
  { flag: "🇨🇦", code: "CA" },
  { flag: "🇧🇷", code: "BR" },
  { flag: "🇯🇵", code: "JP" },
  { flag: "🇳🇿", code: "NZ" },
  { flag: "🇵🇱", code: "PL" },
  { flag: "🇮🇪", code: "IE" },
];

export const TrustBadges = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-16 md:py-20 border-y border-border/10">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Payment Methods */}
          <div className="mb-10">
            <p className="text-center text-muted-foreground/50 text-[10px] uppercase tracking-[0.25em] mb-5 font-medium">
              Payment Methods
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              {paymentMethods.map((method, i) => (
                <motion.div
                  key={method}
                  initial={{ opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="px-4 py-2 rounded-lg border border-border/20 text-muted-foreground/60 text-xs font-medium tracking-wide"
                  style={{ background: 'hsl(224 28% 10%)' }}
                >
                  {method}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Supported GEOs */}
          <div>
            <p className="text-center text-muted-foreground/50 text-[10px] uppercase tracking-[0.25em] mb-5 font-medium">
              Supported GEOs
            </p>
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
              {geos.map((geo, i) => (
                <motion.div
                  key={geo.code}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.03 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border/15 text-muted-foreground/50 hover:text-muted-foreground/70 transition-colors"
                  style={{ background: 'hsl(224 28% 9%)' }}
                >
                  <span className="text-sm">{geo.flag}</span>
                  <span className="text-[10px] font-mono font-medium tracking-wider">{geo.code}</span>
                </motion.div>
              ))}
              <span className="text-muted-foreground/40 text-xs font-medium">+33 more</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
