import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Wallet, BarChart3, UserCheck, Trophy, Zap, RefreshCw, Lock } from "lucide-react";
import { GoldParticles } from "./GoldParticles";
import { DiamondIcon } from "./DiamondIcon";

const benefits = [
  { icon: Trophy, title: "High Commissions", desc: "Up to 50% RevShare. CPA, hybrid and tailored deals for serious affiliates." },
  { icon: Zap, title: "Quick Payouts", desc: "No delays. No excuses. Weekly cycle via wire, crypto and e-wallets." },
  { icon: RefreshCw, title: "No Negative Carryover", desc: "A bad month shouldn't cost you the next. You start fresh, every time." },
  { icon: BarChart3, title: "Real-Time Tracking", desc: "Live analytics, API integrations and postback tracking — zero data lag." },
  { icon: Lock, title: "Lifetime Ownership", desc: "Your players. Your profits. For life." },
  { icon: UserCheck, title: "Dedicated Managers", desc: "1:1 support from a real person who knows your account." },
];

export const WhyUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-us" className="relative py-28 md:py-36 overflow-hidden bg-background">
      <GoldParticles density="medium" />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold uppercase tracking-[0.25em] text-xs mb-5 block">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black">
            <span className="text-foreground">Built for </span>
            <span
              style={{
                background: "linear-gradient(135deg, #fce8a8 0%, #d4a64a 50%, #9a7322 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Performance
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 max-w-4xl mx-auto">
          {benefits.map((b, index) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="flex items-start gap-5"
            >
              <DiamondIcon icon={b.icon} size={70} />
              <div className="flex-1 pt-2">
                <h3 className="text-xl font-bold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm leading-relaxed text-foreground/60">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
