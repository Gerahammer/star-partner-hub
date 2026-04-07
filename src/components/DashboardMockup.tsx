import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { DollarSign, MousePointerClick, UserPlus, CreditCard, ArrowUpRight, ExternalLink } from "lucide-react";

const chartData = [25, 38, 32, 52, 45, 60, 55, 72, 65, 80, 75, 92];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const kpiCards = [
  { icon: DollarSign, label: "Today's Revenue", value: "$2,847", change: "+18%", positive: true },
  { icon: DollarSign, label: "Monthly Revenue", value: "$38,420", change: "+24%", positive: true },
  { icon: MousePointerClick, label: "Total Clicks", value: "12,847", change: "+12%", positive: true },
  { icon: UserPlus, label: "Registrations", value: "342", change: "+8%", positive: true },
  { icon: CreditCard, label: "FTDs", value: "89", change: "+15%", positive: true },
];

export const DashboardMockup = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const maxVal = Math.max(...chartData);
  const points = chartData.map((val, i) => {
    const x = (i / (chartData.length - 1)) * 100;
    const y = 100 - (val / maxVal) * 80;
    return `${x},${y}`;
  }).join(" ");

  const areaPath = `M0,100 L${chartData.map((val, i) => {
    const x = (i / (chartData.length - 1)) * 100;
    const y = 100 - (val / maxVal) * 80;
    return `${x},${y}`;
  }).join(" L")} L100,100 Z`;

  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary/80 font-medium uppercase tracking-[0.2em] text-xs mb-5 block">
            Real-Time Dashboard
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="text-foreground">Track Your </span>
            <span className="text-gradient-gold">Earnings</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-3">
            Every click, conversion, and commission — all in real-time
          </p>
          <div className="flex items-center justify-center gap-2 text-muted-foreground/50 text-xs">
            <span>Powered by</span>
            <a 
              href="https://www.referon.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary/70 hover:text-primary transition-colors font-medium"
            >
              ReferOn
              <ExternalLink className="w-2.5 h-2.5" strokeWidth={1.5} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div 
            className="rounded-2xl overflow-hidden"
            style={{ 
              background: 'hsl(224 30% 9%)',
              border: '1px solid hsl(224 18% 16% / 0.6)',
              boxShadow: '0 40px 100px -20px hsl(0 0% 0% / 0.5)'
            }}
          >
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border/20">
              <div className="w-2 h-2 rounded-full bg-muted-foreground/20" />
              <div className="w-2 h-2 rounded-full bg-muted-foreground/20" />
              <div className="w-2 h-2 rounded-full bg-muted-foreground/20" />
              <div className="ml-4 flex-1 h-6 rounded max-w-[260px]" style={{ background: 'hsl(224 22% 12%)' }}>
                <span className="text-[10px] text-muted-foreground/40 px-3 leading-6 block font-mono">dashboard.partnerstar.com</span>
              </div>
            </div>

            <div className="p-5 md:p-7">
              {/* KPI Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
                {kpiCards.map((kpi) => (
                  <div key={kpi.label} className="p-3 md:p-4 rounded-xl border border-border/15"
                    style={{ background: 'hsl(224 28% 11%)' }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <kpi.icon className="w-3.5 h-3.5 text-muted-foreground/50" strokeWidth={1.5} />
                      <span className="text-[10px] font-mono font-medium flex items-center gap-0.5" style={{ color: 'hsl(152 45% 45%)' }}>
                        <ArrowUpRight className="w-2.5 h-2.5" strokeWidth={2} />
                        {kpi.change}
                      </span>
                    </div>
                    <p className="font-mono text-lg md:text-xl font-bold text-foreground tracking-tight">{kpi.value}</p>
                    <span className="text-[10px] text-muted-foreground/50 font-medium">{kpi.label}</span>
                  </div>
                ))}
              </div>

              {/* Chart area */}
              <div className="relative h-48 md:h-56 w-full rounded-xl p-4 border border-border/15"
                style={{ background: 'hsl(224 28% 10%)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-muted-foreground/60 font-medium">Revenue Overview</span>
                  <span className="text-[10px] text-muted-foreground/40 font-mono">2024</span>
                </div>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                  {[20, 40, 60, 80].map((y) => (
                    <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="hsl(224 18% 14%)" strokeWidth="0.15" />
                  ))}
                  <defs>
                    <linearGradient id="goldGradChart" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(42 65% 52%)" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="hsl(42 65% 52%)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={areaPath} fill="url(#goldGradChart)" />
                  <polyline points={points} fill="none" stroke="hsl(42 65% 52%)" strokeWidth="0.35" strokeLinejoin="round" />
                  {chartData.map((val, i) => {
                    const x = (i / (chartData.length - 1)) * 100;
                    const y = 100 - (val / maxVal) * 80;
                    return <circle key={i} cx={x} cy={y} r="0.6" fill="hsl(42 65% 52%)" />;
                  })}
                </svg>
                <div className="absolute bottom-3 left-4 right-4 flex justify-between">
                  {months.map((m, i) => (
                    <span key={i} className="text-[8px] text-muted-foreground/30 font-mono hidden sm:inline">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
