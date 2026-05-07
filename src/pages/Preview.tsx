import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Zap,
  Shield,
  Handshake,
  Crown,
  UserCheck,
  Globe,
  Search,
  Smartphone,
  Newspaper,
  FileText,
  Music,
  Megaphone,
  AppWindow,
} from "lucide-react";
import partnerstarLogo from "@/assets/partnerstar-full-logo.png";

/**
 * Preview page — visual direction inspired by strongaffiliates.com
 * Light theme · navy primary · green CTA · clean minimal layout
 */

const navy = "hsl(220 65% 18%)"; // primary text / brand
const navyDeep = "hsl(220 70% 12%)";
const green = "hsl(140 70% 45%)"; // CTA accent
const greenHover = "hsl(140 70% 38%)";
const surface = "hsl(220 20% 98%)";

const tiers = [
  { level: "1st level", percent: "45%", range: "0–10 depositors" },
  { level: "2nd level", percent: "55%", range: "10–25 depositors", featured: true },
  { level: "3rd level", percent: "60%", range: "25+ depositors" },
];

const benefits = [
  { icon: TrendingUp, title: "High Commissions", desc: "Up to 60% RevShare. CPA, hybrid and tailored deals." },
  { icon: Zap, title: "Quick Payouts", desc: "Get paid on time, every time. Fast & reliable." },
  { icon: Shield, title: "No Negative Carryover", desc: "Start each month at zero. No bag to dig out of." },
  { icon: Handshake, title: "Win-Win Partnership", desc: "Aligned incentives and transparent reporting." },
  { icon: Crown, title: "Lifetime Ownership", desc: "Your players, your earnings — for life." },
  { icon: UserCheck, title: "Dedicated Managers", desc: "Direct line to a real person who knows your account." },
];

const traffic = [
  { icon: Globe, label: "iGaming Sites" },
  { icon: Megaphone, label: "Facebook / TikTok Ads" },
  { icon: Search, label: "Google Search" },
  { icon: AppWindow, label: "Google UAC" },
  { icon: Smartphone, label: "Organic Apps" },
  { icon: Newspaper, label: "Sport News" },
  { icon: FileText, label: "Blogs" },
  { icon: Music, label: "TikTok" },
];

const PreviewHeader = () => (
  <header
    className="sticky top-0 z-50 border-b"
    style={{ background: "rgba(255,255,255,0.92)", borderColor: "hsl(220 20% 90%)", backdropFilter: "blur(12px)" }}
  >
    <nav className="container mx-auto flex items-center justify-between px-4 md:px-8 py-4">
      <Link to="/preview" className="flex items-center" aria-label="Partnerstar home">
        <img src={partnerstarLogo} alt="Partnerstar" className="h-8 md:h-10 w-auto" style={{ filter: "invert(0.15) hue-rotate(190deg)" }} />
      </Link>
      <div className="hidden lg:flex items-center gap-7 text-sm" style={{ color: navyDeep }}>
        <a href="#commissions" className="hover:opacity-70 transition-opacity">Commissions</a>
        <a href="#benefits" className="hover:opacity-70 transition-opacity">Benefits</a>
        <a href="#traffic" className="hover:opacity-70 transition-opacity">Traffic</a>
        <a href="#contact" className="hover:opacity-70 transition-opacity">Contact</a>
      </div>
      <div className="flex items-center gap-3">
        <a
          href="https://ro-affiliate.partnerstar.com/login"
          className="text-sm font-medium hover:opacity-70"
          style={{ color: navyDeep }}
        >
          Login
        </a>
        <a
          href="https://ro-affiliate.partnerstar.com/registration"
          className="rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors"
          style={{ background: green }}
          onMouseEnter={(e) => (e.currentTarget.style.background = greenHover)}
          onMouseLeave={(e) => (e.currentTarget.style.background = green)}
        >
          Sign Up
        </a>
      </div>
    </nav>
  </header>
);

const Hero = () => (
  <section className="relative overflow-hidden" style={{ background: "white" }}>
    <div className="container mx-auto px-4 md:px-8 py-24 md:py-32">
      <div className="max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
          style={{ background: "hsl(140 70% 95%)", color: green }}
        >
          Premium iGaming Affiliate Program
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
          style={{ color: navyDeep }}
        >
          Some Affiliate Programs Like to Talk.
          <br />
          <span style={{ color: green }}>Partner Pays.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg md:text-xl max-w-2xl"
          style={{ color: "hsl(220 15% 35%)" }}
        >
          Top brands. High conversions. Fast payouts. Built for affiliates who actually want to win.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="https://ro-affiliate.partnerstar.com/registration"
            className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
            style={{ background: green }}
          >
            Register Now <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#commissions"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 px-7 py-3.5 text-base font-semibold transition-colors"
            style={{ borderColor: navyDeep, color: navyDeep }}
          >
            View Commissions
          </a>
        </motion.div>
      </div>
    </div>

    {/* Subtle decorative gradient */}
    <div
      className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-30"
      style={{
        background: `radial-gradient(circle at 70% 40%, hsl(140 70% 90%) 0%, transparent 60%)`,
      }}
    />
  </section>
);

const Commissions = () => (
  <section id="commissions" className="py-20 md:py-28" style={{ background: surface }}>
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: green }}>
          Commissions
        </span>
        <h2 className="mt-3 text-4xl md:text-5xl font-bold" style={{ color: navyDeep }}>
          Tiered RevShare. The more you bring, the more you earn.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.level}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl p-8 text-center ${tier.featured ? "shadow-2xl scale-105" : "shadow-md"}`}
            style={{
              background: tier.featured ? navyDeep : "white",
              color: tier.featured ? "white" : navyDeep,
              border: tier.featured ? "none" : "1px solid hsl(220 20% 90%)",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-3">{tier.level}</p>
            <p className="text-6xl md:text-7xl font-bold mb-2" style={{ color: tier.featured ? green : navyDeep }}>
              {tier.percent}
            </p>
            <p className="text-sm font-medium opacity-90 mb-5">Revenue Share</p>
            <p className="text-sm opacity-70">{tier.range}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Benefits = () => (
  <section id="benefits" className="py-20 md:py-28" style={{ background: "white" }}>
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: green }}>
          Benefits
        </span>
        <h2 className="mt-3 text-4xl md:text-5xl font-bold" style={{ color: navyDeep }}>
          Built for affiliates who mean business
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl p-7 transition-all hover:shadow-lg hover:-translate-y-1"
            style={{ background: surface, border: "1px solid hsl(220 20% 92%)" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{ background: "hsl(140 70% 95%)" }}
            >
              <b.icon className="w-6 h-6" style={{ color: green }} strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: navyDeep }}>{b.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "hsl(220 15% 40%)" }}>{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Traffic = () => (
  <section id="traffic" className="py-20 md:py-28" style={{ background: surface }}>
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: green }}>
          Traffic Sources
        </span>
        <h2 className="mt-3 text-4xl md:text-5xl font-bold" style={{ color: navyDeep }}>
          Every channel welcome
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {traffic.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="rounded-xl p-5 flex flex-col items-center text-center transition-colors hover:bg-white"
            style={{ background: "white", border: "1px solid hsl(220 20% 92%)" }}
          >
            <t.icon className="w-7 h-7 mb-3" style={{ color: green }} strokeWidth={1.75} />
            <p className="text-sm font-semibold" style={{ color: navyDeep }}>{t.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section id="contact" className="py-20 md:py-28" style={{ background: navyDeep }}>
    <div className="container mx-auto px-4 md:px-8 text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 max-w-3xl mx-auto leading-tight">
        Ready to partner with the brands that <span style={{ color: green }}>actually convert</span>?
      </h2>
      <p className="text-lg max-w-xl mx-auto mb-10" style={{ color: "hsl(220 20% 75%)" }}>
        Sign up in minutes. Get a dedicated manager. Start earning today.
      </p>
      <a
        href="https://ro-affiliate.partnerstar.com/registration"
        className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
        style={{ background: green }}
      >
        Register Now <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  </section>
);

const PreviewFooter = () => (
  <footer className="py-10 border-t" style={{ background: "white", borderColor: "hsl(220 20% 92%)" }}>
    <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm" style={{ color: "hsl(220 15% 45%)" }}>
      <p>© {new Date().getFullYear()} Partnerstar. All rights reserved.</p>
      <p>18+ | Gamble Responsibly</p>
      <Link to="/" className="underline hover:opacity-70">← Back to current site</Link>
    </div>
  </footer>
);

const Preview = () => {
  return (
    <div className="min-h-screen" style={{ background: "white", color: navyDeep, fontFamily: "Inter, system-ui, sans-serif" }}>
      <PreviewHeader />
      <main>
        <Hero />
        <Commissions />
        <Benefits />
        <Traffic />
        <FinalCTA />
      </main>
      <PreviewFooter />
    </div>
  );
};

export default Preview;
