import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, DollarSign, MousePointerClick, UserPlus, CreditCard } from "lucide-react";

const chartData = [25, 38, 32, 52, 45, 60, 55, 72, 65, 80, 75, 92];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const kpiCards = [
  { icon: DollarSign, label: "Today", value: "$2,847", change: "+18%" },
  { icon: TrendingUp, label: "This Month", value: "$38,420", change: "+24%" },
  { icon: MousePointerClick, label: "Clicks", value: "12,847", change: "+12%" },
  { icon: UserPlus, label: "Registrations", value: "342", change: "+8%" },
  { icon: CreditCard, label: "FTDs", value: "89", change: "+15%" },
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
      {/* Ambient glow behind dashboard */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full opacity-40"
        style={{ background: 'radial-gradient(ellipse, hsl(42 65% 52% / 0.03) 0%, transparent 60%)' }} />
      
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
          <p className="text-muted-foreground text-base max-w-lg mx-auto">
            Every click, conversion, and commission — all in real-time
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 8 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-5xl mx-auto"
          style={{ perspective: "1400px" }}
        >
          {/* Dashboard window frame */}
          <div 
            className="rounded-2xl overflow-hidden"
            style={{ 
              transform: "rotateX(2deg)",
              background: 'linear-gradient(165deg, hsl(224 30% 12%) 0%, hsl(224 28% 8%) 100%)',
              border: '1px solid hsl(224 18% 16% / 0.8)',
              boxShadow: '0 40px 100px -20px hsl(0 0% 0% / 0.6), 0 0 60px hsl(42 65% 52% / 0.03), inset 0 1px 0 hsl(0 0% 100% / 0.03)'
            }}
          >
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border/30">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'hsl(0 60% 45%)' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'hsl(42 65% 45%)' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'hsl(140 50% 40%)' }} />
              <div className="ml-4 flex-1 h-6 rounded-md max-w-[280px]" style={{ background: 'hsl(224 22% 13%)' }}>
                <span className="text-[10px] text-muted-foreground/50 px-3 leading-6 block">dashboard.partnerstar.com</span>
              </div>
            </div>

            <div className="p-5 md:p-7">
              {/* KPI Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
                {kpiCards.map((kpi) => (
                  <div key={kpi.label} className="p-3 md:p-4 rounded-xl border border-border/30"
                    style={{ background: 'linear-gradient(165deg, hsl(224 28% 13%) 0%, hsl(224 26% 10%) 100%)' }}
                  >
                    <div className="flex items-center gap-2 mb-2.5">
                      <kpi.icon className="w-3.5 h-3.5 text-primary/70" />
                      <span className="text-[11px] text-muted-foreground font-medium">{kpi.label}</span>
                    </div>
                    <p className="font-mono text-lg md:text-xl font-bold text-foreground tracking-tight">{kpi.value}</p>
                    <span className="text-[11px] font-mono font-medium" style={{ color: 'hsl(152 55% 48%)' }}>{kpi.change}</span>
                  </div>
                ))}
              </div>

              {/* Chart area */}
              <div className="relative h-48 md:h-60 w-full rounded-xl p-4 border border-border/20"
                style={{ background: 'linear-gradient(165deg, hsl(224 28% 11%) 0%, hsl(224 26% 9%) 100%)' }}
              >
                <div className="absolute top-4 left-4 text-[11px] text-muted-foreground font-medium tracking-wide">Revenue Overview</div>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                  {[20, 40, 60, 80].map((y) => (
                    <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="hsl(224 18% 16%)" strokeWidth="0.15" strokeDasharray="1 1" />
                  ))}
                  <defs>
                    <linearGradient id="goldGradChart" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(42 65% 52%)" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="hsl(42 65% 52%)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={areaPath} fill="url(#goldGradChart)" />
                  <polyline points={points} fill="none" stroke="hsl(42 65% 52%)" strokeWidth="0.4" strokeLinejoin="round" />
                  {chartData.map((val, i) => {
                    const x = (i / (chartData.length - 1)) * 100;
                    const y = 100 - (val / maxVal) * 80;
                    return (
                      <g key={i}>
                        <circle cx={x} cy={y} r="1.2" fill="hsl(225 35% 6%)" stroke="hsl(42 65% 52%)" strokeWidth="0.3" />
                        <circle cx={x} cy={y} r="0.4" fill="hsl(42 65% 52%)" />
                      </g>
                    );
                  })}
                </svg>
                <div className="absolute bottom-3 left-4 right-4 flex justify-between">
                  {months.map((m, i) => (
                    <span key={i} className="text-[9px] text-muted-foreground/50 font-mono hidden sm:inline">{m}</span>
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
