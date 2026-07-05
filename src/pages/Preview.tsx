import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Trophy,
  Zap,
  RefreshCw,
  BarChart3,
  Lock,
  UserCheck,
  Check,
  Plus,
  Minus,
  type LucideIcon,
} from "lucide-react";
import partnerstarLogo from "@/assets/partnerstar-full-logo.png";
import starIcon from "@/assets/star-icon.png";
import coin1 from "@/assets/coin-1.webp";
import coin2 from "@/assets/coin-2.webp";
import wintinoBrand from "@/assets/wintino-brand.webp";
import wintinoLogo from "@/assets/wintino-logo.svg";

/* ————————————————————————————————————————————————
   Fable 5 design showcase — "Private Club" direction
   Editorial numbered sections · hairline gold rules ·
   bento benefits · podium payouts · live ticker
   ———————————————————————————————————————————————— */

const GOLD = "#d4a64a";
const GOLD_TEXT = "linear-gradient(100deg, #ffedb8 0%, #f0cf7e 30%, #ddb35e 62%, #c99a3e 100%)";
const HAIRLINE = "rgba(212, 166, 74, 0.22)";
const CANVAS = "#070502";
const PANEL = "rgba(255, 250, 240, 0.025)";

const goldText: React.CSSProperties = {
  background: GOLD_TEXT,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

/* Small-caps eyebrow with hairline rules on both sides */
const Eyebrow = ({ n, children }: { n: string; children: React.ReactNode }) => (
  <div className="flex items-center gap-4 justify-center mb-6">
    <span className="h-px w-10 sm:w-16" style={{ background: HAIRLINE }} />
    <span className="font-mono text-[11px] tracking-[0.35em] uppercase" style={{ color: GOLD }}>
      {n} — {children}
    </span>
    <span className="h-px w-10 sm:w-16" style={{ background: HAIRLINE }} />
  </div>
);

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ————————————————— Header ————————————————— */
const PvHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(7, 5, 2, 0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: `1px solid ${scrolled ? HAIRLINE : "transparent"}`,
      }}
    >
      <nav className="container mx-auto flex items-center justify-between px-5 md:px-10 h-[72px]">
        <Link to="/preview" aria-label="Partnerstar">
          <img src={partnerstarLogo} alt="Partnerstar" className="h-8 md:h-9 w-auto" />
        </Link>
        <div className="hidden lg:flex items-center gap-10 font-mono text-[11px] tracking-[0.25em] uppercase text-white/60">
          {["Brands", "Commissions", "Payouts", "FAQ"].map((l) => (
            <a key={l} href={`#pv-${l.toLowerCase()}`} className="hover:text-white transition-colors duration-300">
              {l}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://ro-affiliate.partnerstar.com/login"
            className="hidden sm:block font-mono text-[11px] tracking-[0.25em] uppercase text-white/60 hover:text-white transition-colors"
          >
            Log in
          </a>
          <a
            href="https://ro-affiliate.partnerstar.com/registration"
            className="group relative inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[12px] font-bold tracking-[0.15em] uppercase text-black overflow-hidden transition-transform duration-300 hover:scale-[1.04]"
            style={{ background: "linear-gradient(120deg, #f7e3ae, #d4a64a 55%, #b8862b)" }}
          >
            Become a Partner
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
          </a>
        </div>
      </nav>
    </header>
  );
};

/* ————————————————— Hero ————————————————— */
const PvHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const starY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const starRotate = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: CANVAS }}>
      {/* Vignette + warm core glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 38%, rgba(212,166,74,0.13) 0%, transparent 60%), radial-gradient(ellipse at 50% 120%, rgba(212,166,74,0.07) 0%, transparent 55%)",
        }}
      />
      {/* Fine grid, masked to center */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(${HAIRLINE} 1px, transparent 1px), linear-gradient(90deg, ${HAIRLINE} 1px, transparent 1px)`,
          backgroundSize: "120px 120px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
        }}
      />

      {/* Floating coins */}
      <motion.img
        src={coin1}
        alt=""
        aria-hidden="true"
        animate={{ y: [0, -18, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[8%] top-[30%] w-16 md:w-24 opacity-70 pointer-events-none select-none blur-[1px]"
      />
      <motion.img
        src={coin2}
        alt=""
        aria-hidden="true"
        animate={{ y: [0, 14, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="absolute right-[10%] top-[52%] w-14 md:w-20 opacity-60 pointer-events-none select-none blur-[0.5px]"
      />

      {/* NOTE: no z-index here — a stacking context would isolate the star's
          mix-blend-mode from the section background and show its black box. */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-5 pt-32 pb-24">
        {/* Star crest — floats gently, parallaxes on scroll */}
        <div className="relative mb-2">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[420px] md:h-[420px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(212,166,74,0.28) 0%, transparent 62%)" }}
          />
          <motion.div style={{ y: starY, rotate: starRotate, opacity: fadeOut, mixBlendMode: "screen" }}>
            <motion.img
              src={starIcon}
              alt=""
              aria-hidden="true"
              initial={{ scale: 0.5, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-28 md:w-40 pointer-events-none select-none animate-float"
            />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-[11px] md:text-xs tracking-[0.45em] uppercase text-white/50 mb-8"
        >
          The Premium iGaming Affiliate Program
        </motion.p>

        <h1 className="font-display font-bold leading-[0.95] tracking-[-0.02em] text-white text-[13vw] sm:text-7xl md:text-8xl lg:text-[7.5rem] max-w-6xl">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            Traffic in.
          </motion.span>
          <motion.span
            className="block"
            style={goldText}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Fortune out.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="mt-8 max-w-xl text-white/55 text-base md:text-lg leading-relaxed"
        >
          Up to 50% lifetime RevShare on premium casino brands.
          Monthly payouts, no negative carryover, a manager who answers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-5"
        >
          <a
            href="https://ro-affiliate.partnerstar.com/registration"
            className="group inline-flex items-center gap-3 rounded-full pl-8 pr-3 py-3 text-sm font-bold tracking-[0.12em] uppercase text-black transition-transform duration-300 hover:scale-[1.03]"
            style={{ background: "linear-gradient(120deg, #f7e3ae, #d4a64a 55%, #b8862b)", boxShadow: "0 12px 40px rgba(212,166,74,0.25)" }}
          >
            Start Earning
            <span className="grid place-items-center w-9 h-9 rounded-full bg-black/15 transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </span>
          </a>
          <a
            href="#pv-commissions"
            className="font-mono text-[11px] tracking-[0.3em] uppercase text-white/50 hover:text-white transition-colors border-b border-white/20 hover:border-white/60 pb-1"
          >
            View the deals
          </a>
        </motion.div>
      </div>

      {/* Stats strip pinned at hero bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="relative z-10 border-t"
        style={{ borderColor: HAIRLINE, background: "rgba(7,5,2,0.5)", backdropFilter: "blur(8px)" }}
      >
        <div className="container mx-auto grid grid-cols-3 divide-x" style={{ borderColor: HAIRLINE }}>
          {[
            { v: "€1.5M+", l: "Paid to partners monthly" },
            { v: "3,200+", l: "Active affiliates" },
            { v: "20+", l: "Supported GEOs" },
          ].map((s) => (
            <div key={s.l} className="py-7 md:py-9 text-center px-2" style={{ borderColor: HAIRLINE }}>
              <p className="font-mono text-2xl md:text-4xl font-bold tabular-nums" style={goldText}>{s.v}</p>
              <p className="mt-2 font-mono text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-white/40">{s.l}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

/* ————————————————— Live payout ticker ————————————————— */
const tickerItems = [
  { geo: "🇷🇴 RO", amount: "€4,120", tag: "RevShare" },
  { geo: "🇩🇪 DE", amount: "€11,540", tag: "Hybrid" },
  { geo: "🇧🇷 BR", amount: "€2,380", tag: "CPA" },
  { geo: "🇮🇹 IT", amount: "€7,905", tag: "RevShare" },
  { geo: "🇪🇸 ES", amount: "€3,470", tag: "CPA" },
  { geo: "🇨🇦 CA", amount: "€9,215", tag: "Hybrid" },
  { geo: "🇵🇱 PL", amount: "€5,660", tag: "RevShare" },
  { geo: "🇳🇱 NL", amount: "€6,020", tag: "Hybrid" },
];

const PvTicker = () => (
  <div className="relative overflow-hidden border-y py-4" style={{ borderColor: HAIRLINE, background: PANEL }}>
    <div className="flex w-max animate-[pv-ticker_38s_linear_infinite] gap-14 px-7">
      {[...tickerItems, ...tickerItems].map((t, i) => (
        <div key={i} className="flex items-center gap-3 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD }} />
          <span className="font-mono text-xs text-white/45">{t.geo}</span>
          <span className="font-mono text-sm font-bold tabular-nums" style={goldText}>{t.amount}</span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30">{t.tag} payout</span>
        </div>
      ))}
    </div>
    <style>{`@keyframes pv-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
  </div>
);

/* ————————————————— Bento benefits ————————————————— */
interface Cell {
  icon: LucideIcon;
  title: string;
  desc: string;
  span?: string;
  big?: boolean;
}
const cells: Cell[] = [
  { icon: Trophy, title: "Up to 50% RevShare", desc: "Lifetime revenue share on every player you send — plus CPA and hybrid structures negotiated around your traffic, not ours.", span: "lg:col-span-2", big: true },
  { icon: RefreshCw, title: "No Negative Carryover", desc: "Every month starts at zero. A bad run never eats next month's earnings.", },
  { icon: Zap, title: "Monthly Payouts", desc: "Wire, crypto or e-wallets. On time, every time." },
  { icon: BarChart3, title: "Real-Time Tracking", desc: "Live dashboard with postbacks, API access and zero data lag — powered by ReferOn.", span: "lg:col-span-2", big: true },
  { icon: Lock, title: "Lifetime Ownership", desc: "Your players stay yours. For life." },
  { icon: UserCheck, title: "Dedicated Manager", desc: "A real person on Telegram who knows your account." },
];

const PvBenefits = () => (
  <section className="relative py-28 md:py-36" style={{ background: CANVAS }}>
    <div className="container mx-auto px-5 md:px-10">
      <Reveal>
        <Eyebrow n="01">Why Partnerstar</Eyebrow>
        <h2 className="text-center font-display font-bold text-4xl md:text-6xl tracking-[-0.02em] text-white mb-16">
          Built like a <span style={goldText}>partner</span>,<br className="hidden sm:block" /> not a program.
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-6xl mx-auto">
        {cells.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06} className={c.span ?? ""}>
            <div
              className="group relative h-full rounded-2xl p-7 md:p-8 overflow-hidden transition-colors duration-500"
              style={{ background: PANEL, border: `1px solid ${HAIRLINE}` }}
            >
              {/* hover inner glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 90% 90% at 50% 0%, rgba(212,166,74,0.10) 0%, transparent 65%)" }}
              />
              <c.icon className="relative w-6 h-6 mb-5 transition-transform duration-500 group-hover:scale-110" style={{ color: GOLD }} strokeWidth={1.5} />
              <h3 className={`relative font-display font-bold text-white mb-2.5 ${c.big ? "text-2xl md:text-3xl" : "text-lg"}`}>{c.title}</h3>
              <p className="relative text-sm leading-relaxed text-white/45">{c.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ————————————————— Brand ————————————————— */
const PvBrand = () => (
  <section id="pv-brands" className="relative py-28 md:py-36" style={{ background: CANVAS }}>
    <div className="container mx-auto px-5 md:px-10">
      <Reveal>
        <Eyebrow n="02">The Brand</Eyebrow>
        <h2 className="text-center font-display font-bold text-4xl md:text-6xl tracking-[-0.02em] text-white mb-16">
          Promote a casino that <span style={goldText}>converts</span>.
        </h2>
      </Reveal>

      <Reveal delay={0.15}>
        <div
          className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden group"
          style={{ border: `1px solid ${HAIRLINE}` }}
        >
          <img
            src={wintinoBrand}
            alt="Wintino Casino"
            loading="lazy"
            className="w-full h-[300px] md:h-[440px] object-cover object-top transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 20%, rgba(7,5,2,0.55) 60%, rgba(7,5,2,0.96) 100%)" }} />
          <div className="absolute bottom-0 inset-x-0 p-7 md:p-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <img src={wintinoLogo} alt="Wintino" className="h-10 md:h-12 w-auto mb-5" loading="lazy" />
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {[
                  ["5,000+", "Casino games & sportsbook"],
                  ["VIP", "Retention program"],
                  ["24/7", "Multilingual support"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <p className="font-mono text-xl md:text-2xl font-bold" style={goldText}>{v}</p>
                    <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-white/40 mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </div>
            <a
              href="https://ro-affiliate.partnerstar.com/registration"
              className="self-start md:self-auto inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] uppercase text-white border-b pb-1.5 transition-colors hover:text-[#d4a64a]"
              style={{ borderColor: HAIRLINE }}
            >
              Promote Wintino <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ————————————————— Commissions ————————————————— */
const plans = [
  {
    name: "RevShare",
    value: "50%",
    prefix: "up to",
    desc: "Lifetime revenue share on all player activity.",
    feats: ["Tiered 25–50% by volume", "Lifetime player tracking", "No negative carryover", "Monthly payments"],
  },
  {
    name: "CPA",
    value: "Custom",
    prefix: "fully",
    desc: "Fixed commission per qualified player.",
    feats: ["High flat rates per FTD", "Flexible qualification", "Fast scaling for media buyers", "GEO-specific pricing"],
    featured: true,
  },
  {
    name: "Hybrid",
    value: "Both",
    prefix: "best of",
    desc: "CPA upfront plus RevShare for life.",
    feats: ["CPA + RevShare combo", "Tailored to your traffic", "Maximum lifetime earnings", "Premium partner status"],
  },
];

const PvCommissions = () => (
  <section id="pv-commissions" className="relative py-28 md:py-36" style={{ background: CANVAS }}>
    <div className="container mx-auto px-5 md:px-10">
      <Reveal>
        <Eyebrow n="03">Commissions</Eyebrow>
        <h2 className="text-center font-display font-bold text-4xl md:text-6xl tracking-[-0.02em] text-white mb-4">
          Pick your <span style={goldText}>weapon</span>.
        </h2>
        <p className="text-center text-white/45 text-sm md:text-base mb-16 max-w-md mx-auto">
          Every deal is negotiable. These are the starting points.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 max-w-5xl mx-auto items-stretch">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.1}>
            <div
              className="relative h-full rounded-2xl p-8 md:p-9 flex flex-col overflow-hidden group transition-transform duration-500 hover:-translate-y-1.5"
              style={{
                background: p.featured
                  ? "linear-gradient(180deg, rgba(212,166,74,0.13) 0%, rgba(255,250,240,0.02) 100%)"
                  : PANEL,
                border: `1px solid ${p.featured ? "rgba(212,166,74,0.45)" : HAIRLINE}`,
              }}
            >
              {p.featured && (
                <span
                  className="absolute top-0 right-0 font-mono text-[9px] tracking-[0.3em] uppercase text-black font-bold px-4 py-1.5 rounded-bl-xl"
                  style={{ background: "linear-gradient(120deg, #f7e3ae, #d4a64a)" }}
                >
                  Most Popular
                </span>
              )}
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">{p.name}</p>
              <div className="mb-2 flex items-baseline gap-2">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/35">{p.prefix}</span>
              </div>
              <p className="font-display font-bold text-6xl md:text-7xl tracking-[-0.03em] leading-none mb-4 whitespace-nowrap" style={goldText}>
                {p.value}
              </p>
              <p className="text-sm text-white/50 mb-8">{p.desc}</p>
              <ul className="mt-auto space-y-3.5">
                {p.feats.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/65">
                    <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: GOLD }} strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ————————————————— Podium payouts ————————————————— */
const podium = [
  { rank: 2, amount: "€987,664", height: "h-40 md:h-52", delay: 0.15 },
  { rank: 1, amount: "€1,279,670", height: "h-56 md:h-72", delay: 0 },
  { rank: 3, amount: "€567,566", height: "h-28 md:h-40", delay: 0.3 },
];

const PvPayouts = () => (
  <section id="pv-payouts" className="relative py-28 md:py-36 overflow-hidden" style={{ background: CANVAS }}>
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: "radial-gradient(ellipse 60% 45% at 50% 100%, rgba(212,166,74,0.10) 0%, transparent 65%)" }}
    />
    <div className="container mx-auto px-5 md:px-10 relative">
      <Reveal>
        <Eyebrow n="04">All-Time Records</Eyebrow>
        <h2 className="text-center font-display font-bold text-4xl md:text-6xl tracking-[-0.02em] text-white mb-20">
          Top partner <span style={goldText}>payouts</span>.
        </h2>
      </Reveal>

      <div className="flex items-end justify-center gap-3 md:gap-5 max-w-3xl mx-auto">
        {podium.map((p) => (
          <motion.div
            key={p.rank}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 max-w-[220px] flex flex-col items-center"
          >
            <p className="font-mono font-bold tabular-nums text-lg md:text-2xl mb-4" style={goldText}>{p.amount}</p>
            <div
              className={`w-full ${p.height} rounded-t-xl relative overflow-hidden flex items-start justify-center pt-5`}
              style={{
                background: p.rank === 1
                  ? "linear-gradient(180deg, rgba(212,166,74,0.35) 0%, rgba(212,166,74,0.05) 100%)"
                  : "linear-gradient(180deg, rgba(212,166,74,0.16) 0%, rgba(212,166,74,0.02) 100%)",
                border: `1px solid ${HAIRLINE}`,
                borderBottom: "none",
              }}
            >
              <span
                className="font-display font-bold text-4xl md:text-6xl"
                style={{ color: "rgba(247, 227, 174, 0.9)", textShadow: "0 4px 30px rgba(212,166,74,0.45)" }}
              >
                {p.rank}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="h-px max-w-3xl mx-auto" style={{ background: HAIRLINE }} />
      <Reveal delay={0.4}>
        <p className="text-center font-mono text-[10px] tracking-[0.25em] uppercase text-white/30 mt-6">
          Cumulative payouts · verified · anonymised
        </p>
      </Reveal>
    </div>
  </section>
);

/* ————————————————— Quote ————————————————— */
const PvQuote = () => (
  <section className="relative py-28 md:py-40" style={{ background: CANVAS }}>
    <div className="container mx-auto px-5 md:px-10 max-w-4xl text-center">
      <Reveal>
        <span className="font-display text-[120px] md:text-[180px] leading-none block -mb-10 md:-mb-16 select-none" style={{ color: "rgba(212,166,74,0.22)" }}>
          “
        </span>
        <blockquote className="font-display text-2xl md:text-4xl leading-snug text-white/85 tracking-[-0.01em]">
          The best affiliate program we work with. Payments arrive <span style={goldText}>before we ask</span>,
          and our manager actually understands traffic.
        </blockquote>
        <footer className="mt-10 flex items-center justify-center gap-3">
          <span className="h-px w-10" style={{ background: HAIRLINE }} />
          <cite className="not-italic font-mono text-[11px] tracking-[0.3em] uppercase text-white/40">Sportuna · Partner since 2025</cite>
          <span className="h-px w-10" style={{ background: HAIRLINE }} />
        </footer>
      </Reveal>
    </div>
  </section>
);

/* ————————————————— FAQ ————————————————— */
const faqs = [
  { q: "How fast is the approval?", a: "Applications are reviewed within 24–48 hours. You'll get your account, tracking links and a dedicated manager in the same email." },
  { q: "When do I get paid?", a: "Monthly, with no minimum threshold. Wire, crypto (BTC/USDT) and popular e-wallets are supported." },
  { q: "Is there negative carryover?", a: "No. Every month starts from zero — a losing month never haunts the next one." },
  { q: "Which traffic sources are accepted?", a: "SEO, PPC (no brand bidding), social, streaming, apps and email — as long as it's compliant with the terms and the target GEO's rules." },
  { q: "Can I get a custom deal?", a: "Yes. RevShare, CPA and hybrid are starting points; volume partners get tailored terms within the first month." },
];

const PvFaq = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="pv-faq" className="relative py-28 md:py-36" style={{ background: CANVAS }}>
      <div className="container mx-auto px-5 md:px-10 max-w-3xl">
        <Reveal>
          <Eyebrow n="05">Questions</Eyebrow>
          <h2 className="text-center font-display font-bold text-4xl md:text-6xl tracking-[-0.02em] text-white mb-16">
            Before you <span style={goldText}>ask</span>.
          </h2>
        </Reveal>

        <div className="divide-y" style={{ borderColor: HAIRLINE }}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div style={{ borderColor: HAIRLINE }}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-baseline gap-5">
                      <span className="font-mono text-[10px] tabular-nums" style={{ color: GOLD }}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={`font-display text-lg md:text-xl transition-colors duration-300 ${isOpen ? "text-white" : "text-white/70 group-hover:text-white"}`}>
                        {f.q}
                      </span>
                    </span>
                    <span
                      className="grid place-items-center w-8 h-8 rounded-full shrink-0 transition-all duration-300"
                      style={{ border: `1px solid ${isOpen ? "rgba(212,166,74,0.6)" : HAIRLINE}`, background: isOpen ? "rgba(212,166,74,0.12)" : "transparent" }}
                    >
                      {isOpen ? <Minus className="w-3.5 h-3.5" style={{ color: GOLD }} /> : <Plus className="w-3.5 h-3.5 text-white/50" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-7 pl-[42px] md:pl-[46px] pr-14 text-sm md:text-base leading-relaxed text-white/45">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ————————————————— Final CTA ————————————————— */
const PvCta = () => (
  <section className="relative py-32 md:py-44 overflow-hidden" style={{ background: CANVAS }}>
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: "radial-gradient(ellipse 65% 60% at 50% 50%, rgba(212,166,74,0.14) 0%, transparent 65%)" }}
    />
    <motion.img
      src={starIcon}
      alt=""
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.85, rotate: -12 }}
      whileInView={{ opacity: 0.35, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] md:w-[620px] pointer-events-none select-none blur-[3px]"
      style={{ mixBlendMode: "screen" }}
    />
    <div className="container mx-auto px-5 relative text-center">
      <Reveal>
        <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-[-0.02em] text-white leading-[0.95]">
          Your traffic is<br />
          <span style={goldText}>worth more here.</span>
        </h2>
        <div className="mt-14">
          <a
            href="https://ro-affiliate.partnerstar.com/registration"
            className="group inline-flex items-center gap-3 rounded-full pl-10 pr-4 py-4 text-sm font-bold tracking-[0.12em] uppercase text-black transition-transform duration-300 hover:scale-[1.04]"
            style={{ background: "linear-gradient(120deg, #f7e3ae, #d4a64a 55%, #b8862b)", boxShadow: "0 16px 60px rgba(212,166,74,0.3)" }}
          >
            Become a Partner
            <span className="grid place-items-center w-10 h-10 rounded-full bg-black/15 transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </span>
          </a>
        </div>
        <p className="mt-8 font-mono text-[10px] tracking-[0.3em] uppercase text-white/35">
          Approval within 48 hours · No setup fees
        </p>
      </Reveal>
    </div>
  </section>
);

/* ————————————————— Footer ————————————————— */
const PvFooter = () => (
  <footer className="border-t py-12" style={{ borderColor: HAIRLINE, background: "#050301" }}>
    <div className="container mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
      <img src={partnerstarLogo} alt="Partnerstar" className="h-7 w-auto opacity-80" />
      <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/30">
        18+ · Gamble responsibly · © {new Date().getFullYear()} Partnerstar
      </p>
      <Link to="/" className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 hover:text-white transition-colors border-b border-white/15 pb-0.5">
        ← Current live site
      </Link>
    </div>
  </footer>
);

/* ————————————————— Page ————————————————— */
const Preview = () => {
  useEffect(() => {
    const prev = document.title;
    document.title = "Design Preview | Partnerstar";
    return () => { document.title = prev; };
  }, []);

  return (
    <div className="min-h-screen antialiased" style={{ background: CANVAS, color: "#fff" }}>
      <PvHeader />
      <main>
        <PvHero />
        <PvTicker />
        <PvBenefits />
        <PvBrand />
        <PvCommissions />
        <PvPayouts />
        <PvQuote />
        <PvFaq />
        <PvCta />
      </main>
      <PvFooter />
    </div>
  );
};

export default Preview;
