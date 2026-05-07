import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Trophy,
  Zap,
  RefreshCw,
  Handshake,
  Lock,
  Target,
  Globe,
  Search,
  Smartphone,
  Newspaper,
  FileText,
  Music,
  Megaphone,
  AppWindow,
  type LucideIcon,
} from "lucide-react";
import partnerstarLogo from "@/assets/partnerstar-full-logo.png";

/**
 * Preview page — visual direction inspired by strongaffiliates.com
 * Dark theme · gold accents · diamond motif · big bold typography · subtle gold particles
 */

// Diamond shape SVG container with icon inside (Strong's signature)
const DiamondIcon = ({ icon: Icon, size = 80 }: { icon: LucideIcon; size?: number }) => (
  <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
    <svg width={size} height={size} viewBox="0 0 80 80" className="absolute inset-0">
      <defs>
        <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5d27c" />
          <stop offset="50%" stopColor="#d4a64a" />
          <stop offset="100%" stopColor="#9a7322" />
        </linearGradient>
        <linearGradient id="diamondFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(212, 166, 74, 0.15)" />
          <stop offset="100%" stopColor="rgba(0, 0, 0, 0.4)" />
        </linearGradient>
      </defs>
      <polygon
        points="40,4 76,40 40,76 4,40"
        fill="url(#diamondFill)"
        stroke="url(#goldStroke)"
        strokeWidth="1.5"
      />
    </svg>
    <Icon className="relative w-7 h-7" style={{ color: "#e8c878" }} strokeWidth={1.75} />
  </div>
);

// Diamond rank badge (used for Top 3 leaderboard)
const DiamondRank = ({ number, size = 140 }: { number: number; size?: number }) => (
  <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
    <svg width={size} height={size} viewBox="0 0 140 140" className="absolute inset-0">
      <defs>
        <linearGradient id={`rankFill-${number}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fce8a8" />
          <stop offset="50%" stopColor="#d4a64a" />
          <stop offset="100%" stopColor="#7a5a18" />
        </linearGradient>
        <linearGradient id={`rankStroke-${number}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5d27c" />
          <stop offset="100%" stopColor="#9a7322" />
        </linearGradient>
      </defs>
      <polygon
        points="70,8 132,70 70,132 8,70"
        fill="rgba(20, 16, 8, 0.6)"
        stroke={`url(#rankStroke-${number})`}
        strokeWidth="2"
      />
      <text
        x="70"
        y="92"
        textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="68"
        fontWeight="900"
        fill={`url(#rankFill-${number})`}
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}
      >
        {number}
      </text>
    </svg>
  </div>
);

const benefits: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Trophy, title: "High Commissions", desc: "Big brands. Bigger conversions. Earn more with every deal." },
  { icon: Zap, title: "Quick Payouts", desc: "No delays. No excuses. Get paid on time, every time." },
  { icon: RefreshCw, title: "No Negative Carryover", desc: "A bad month shouldn't cost you the next. You start fresh, every time." },
  { icon: Handshake, title: "Win-Win", desc: "Your traffic earns. Your deal pays. No catch." },
  { icon: Lock, title: "Lifetime Ownership", desc: "Your players. Your profits. For life." },
  { icon: Target, title: "Dedicated Managers", desc: "You're getting your own personal manager, available 24/7." },
];

const traffic: { icon: LucideIcon; label: string }[] = [
  { icon: Globe, label: "iGaming Sites" },
  { icon: Megaphone, label: "Facebook / TikTok Ads" },
  { icon: Search, label: "Google Search" },
  { icon: AppWindow, label: "Google UAC" },
  { icon: Smartphone, label: "Organic Apps" },
  { icon: Newspaper, label: "Sport News" },
  { icon: FileText, label: "Blogs" },
  { icon: Music, label: "TikTok" },
];

const tiers = [
  { level: "1st Level", percent: "45%", range: "0–10 depositors" },
  { level: "2nd Level", percent: "55%", range: "10–25 depositors", featured: true },
  { level: "3rd Level", percent: "60%", range: "25+ depositors" },
];

const topPayouts = [
  { rank: 1, amount: "€1,279,670" },
  { rank: 2, amount: "€987,664" },
  { rank: 3, amount: "€567,566" },
];

// Subtle gold-particle background
const GoldParticles = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div
      className="absolute inset-0 opacity-40"
      style={{
        background:
          "radial-gradient(ellipse at 20% 30%, rgba(212, 166, 74, 0.18) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(212, 166, 74, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, rgba(212, 166, 74, 0.08) 0%, transparent 60%)",
      }}
    />
    {[...Array(40)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full"
        style={{
          left: `${(i * 7919) % 100}%`,
          top: `${(i * 3779) % 100}%`,
          width: `${1 + ((i * 3) % 3)}px`,
          height: `${1 + ((i * 3) % 3)}px`,
          background: "#d4a64a",
          opacity: 0.3 + ((i * 13) % 5) / 10,
          boxShadow: "0 0 6px rgba(212, 166, 74, 0.6)",
        }}
      />
    ))}
  </div>
);

const PreviewHeader = () => (
  <header
    className="sticky top-0 z-50 border-b"
    style={{ background: "rgba(8, 6, 2, 0.85)", borderColor: "rgba(212, 166, 74, 0.15)", backdropFilter: "blur(12px)" }}
  >
    <nav className="container mx-auto flex items-center justify-between px-4 md:px-8 py-4">
      <Link to="/preview" aria-label="Partnerstar home">
        <img src={partnerstarLogo} alt="Partnerstar" className="h-10 w-auto" />
      </Link>
      <div className="hidden lg:flex items-center gap-7 text-sm text-white/80">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <a href="#commissions" className="hover:text-white transition-colors">Commissions</a>
        <a href="#benefits" className="hover:text-white transition-colors">Benefits</a>
        <a href="#payouts" className="hover:text-white transition-colors">Payouts</a>
        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
      </div>
      <div className="flex items-center gap-3">
        <a
          href="https://ro-affiliate.partnerstar.com/login"
          className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
        >
          Login
        </a>
        <a
          href="https://ro-affiliate.partnerstar.com/registration"
          className="rounded-full px-5 py-2 text-sm font-bold text-black shadow-lg transition-transform hover:scale-105"
          style={{ background: "linear-gradient(135deg, #fce8a8 0%, #d4a64a 50%, #b8862b 100%)" }}
        >
          Sign up
        </a>
      </div>
    </nav>
  </header>
);

const Hero = () => (
  <section className="relative overflow-hidden" style={{ background: "#080602" }}>
    <GoldParticles />
    <div className="container mx-auto relative z-10 px-4 md:px-8 py-32 md:py-44">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mx-auto max-w-4xl text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-white"
      >
        Some Affiliate Programs Like to Talk.{" "}
        <span style={{ background: "linear-gradient(135deg, #fce8a8 0%, #d4a64a 50%, #9a7322 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          Partner Pays.
        </span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-6 text-center text-base md:text-lg text-white/65 italic"
      >
        Top Brands. High Conversions. Fast Payouts.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 flex justify-center"
      >
        <a
          href="https://ro-affiliate.partnerstar.com/registration"
          className="rounded-full px-10 py-4 text-base font-bold text-black shadow-2xl transition-transform hover:scale-105"
          style={{ background: "linear-gradient(135deg, #fce8a8 0%, #d4a64a 50%, #b8862b 100%)" }}
        >
          Register Now
        </a>
      </motion.div>
    </div>
  </section>
);

const Commissions = () => (
  <section id="commissions" className="relative py-24 md:py-32" style={{ background: "#080602" }}>
    <GoldParticles />
    <div className="container mx-auto relative z-10 px-4 md:px-8">
      <h2 className="text-center text-4xl md:text-5xl font-black text-white mb-14">Commissions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.level}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl p-10 text-center"
            style={{
              background: tier.featured
                ? "linear-gradient(180deg, rgba(212, 166, 74, 0.15) 0%, rgba(20, 14, 4, 0.6) 100%)"
                : "rgba(20, 14, 4, 0.4)",
              border: "1px solid rgba(212, 166, 74, 0.25)",
              transform: tier.featured ? "scale(1.05)" : "none",
            }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-4">{tier.level}</p>
            <p
              className="text-7xl md:text-8xl font-black mb-2"
              style={{
                background: "linear-gradient(135deg, #fce8a8 0%, #d4a64a 50%, #9a7322 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {tier.percent}
            </p>
            <p className="text-sm font-semibold text-white/80 mb-4">Revenue Share</p>
            <p className="text-sm text-white/50">{tier.range}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Benefits = () => (
  <section id="benefits" className="relative py-24 md:py-32" style={{ background: "#080602" }}>
    <GoldParticles />
    <div className="container mx-auto relative z-10 px-4 md:px-8">
      <h2 className="text-center text-4xl md:text-5xl font-black text-white mb-14">Benefits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 max-w-4xl mx-auto">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="flex items-start gap-5"
          >
            <DiamondIcon icon={b.icon} size={70} />
            <div className="flex-1 pt-2">
              <h3 className="text-xl font-bold text-white mb-2">{b.title}</h3>
              <p className="text-sm leading-relaxed text-white/60">{b.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const TopPayouts = () => (
  <section id="payouts" className="relative py-24 md:py-32" style={{ background: "#080602" }}>
    <GoldParticles />
    <div className="container mx-auto relative z-10 px-4 md:px-8">
      <h2 className="text-center text-4xl md:text-5xl font-black text-white mb-20">Top 3 Affiliate Payouts</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
        {/* 2nd place - left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-5 md:order-1"
        >
          <DiamondRank number={2} size={120} />
          <div>
            <p className="text-sm font-semibold text-white/60 mb-1">2nd place</p>
            <p className="text-2xl md:text-3xl font-bold text-white">{topPayouts[1].amount}</p>
          </div>
        </motion.div>
        {/* 1st place - center, larger */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-5 md:order-2 md:-mt-12"
        >
          <DiamondRank number={1} size={160} />
          <div>
            <p className="text-sm font-semibold text-white/60 mb-1">1st place</p>
            <p className="text-3xl md:text-4xl font-bold text-white">{topPayouts[0].amount}</p>
          </div>
        </motion.div>
        {/* 3rd place - right */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-5 md:order-3"
        >
          <DiamondRank number={3} size={120} />
          <div>
            <p className="text-sm font-semibold text-white/60 mb-1">3rd place</p>
            <p className="text-2xl md:text-3xl font-bold text-white">{topPayouts[2].amount}</p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Traffic = () => (
  <section className="relative py-24 md:py-32" style={{ background: "#080602" }}>
    <GoldParticles />
    <div className="container mx-auto relative z-10 px-4 md:px-8">
      <h2 className="text-center text-4xl md:text-5xl font-black text-white mb-14">Traffic We Accept</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {traffic.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="flex flex-col items-center text-center p-6 rounded-xl"
            style={{ background: "rgba(20, 14, 4, 0.5)", border: "1px solid rgba(212, 166, 74, 0.2)" }}
          >
            <DiamondIcon icon={t.icon} size={56} />
            <p className="text-sm font-semibold text-white mt-4">{t.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section id="contact" className="relative py-24 md:py-32" style={{ background: "#080602" }}>
    <GoldParticles />
    <div className="container mx-auto relative z-10 px-4 md:px-8 text-center">
      <h2 className="text-4xl md:text-5xl font-black text-white mb-5 max-w-3xl mx-auto leading-tight">
        Ready to{" "}
        <span style={{ background: "linear-gradient(135deg, #fce8a8 0%, #d4a64a 50%, #9a7322 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          partner with the best
        </span>
        ?
      </h2>
      <p className="text-lg max-w-xl mx-auto mb-10 text-white/65">
        Sign up in minutes. Get a dedicated manager. Start earning today.
      </p>
      <a
        href="https://ro-affiliate.partnerstar.com/registration"
        className="inline-block rounded-full px-10 py-4 text-base font-bold text-black shadow-2xl transition-transform hover:scale-105"
        style={{ background: "linear-gradient(135deg, #fce8a8 0%, #d4a64a 50%, #b8862b 100%)" }}
      >
        Register Now
      </a>
    </div>
  </section>
);

const PreviewFooter = () => (
  <footer className="py-10 border-t" style={{ background: "#050402", borderColor: "rgba(212, 166, 74, 0.15)" }}>
    <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
      <p>© {new Date().getFullYear()} Partnerstar. All rights reserved.</p>
      <p>18+ | Gamble Responsibly</p>
      <Link to="/" className="underline hover:text-white">← Back to current site</Link>
    </div>
  </footer>
);

const Preview = () => {
  return (
    <div className="min-h-screen text-white" style={{ background: "#080602", fontFamily: "Inter, system-ui, sans-serif" }}>
      <PreviewHeader />
      <main>
        <Hero />
        <Commissions />
        <Benefits />
        <TopPayouts />
        <Traffic />
        <FinalCTA />
      </main>
      <PreviewFooter />
    </div>
  );
};

export default Preview;
