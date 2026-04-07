import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, DollarSign, MousePointerClick, UserPlus, CreditCard } from "lucide-react";

const chartData = [25, 38, 32, 52, 45, 60, 55, 72, 65, 80, 75, 92];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const kpiCards = [
  { icon: DollarSign, label: "Today", value: "$2,847", change: "+18%", positive: true },
  { icon: TrendingUp, label: "This Month", value: "$38,420", change: "+24%", positive: true },
  { icon: MousePointerClick, label: "Clicks", value: "12,847", change: "+12%", positive: true },
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
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/3 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
            Real-Time Dashboard
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="text-liquid-silver">TRACK YOUR </span>
            <span className="text-gradient-gold">EARNINGS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every click, conversion, and commission — all in real-time
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 8 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-5xl mx-auto"
          style={{ perspective: "1200px" }}
        >
          <div 
            className="glass-card rounded-2xl p-6 md:p-8 border border-border/50"
            style={{ 
              transform: "rotateX(2deg)",
              boxShadow: "0 30px 80px hsl(0 0% 0% / 0.5), 0 0 50px hsl(44 90% 61% / 0.04)"
            }}
          >
            {/* KPI Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
              {kpiCards.map((kpi) => (
                <div key={kpi.label} className="p-3 md:p-4 rounded-xl bg-muted/30 border border-border/30">
                  <div className="flex items-center gap-2 mb-2">
                    <kpi.icon className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs text-muted-foreground">{kpi.label}</span>
                  </div>
                  <p className="text-foreground font-bold text-lg md:text-xl">{kpi.value}</p>
                  <span className="text-xs text-emerald-400 font-medium">{kpi.change}</span>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="relative h-48 md:h-64 w-full">
              <div className="absolute top-0 left-0 text-xs text-muted-foreground font-medium">Revenue Overview</div>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                {[20, 40, 60, 80].map((y) => (
                  <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="hsl(222 22% 18%)" strokeWidth="0.2" />
                ))}
                <defs>
                  <linearGradient id="goldGradChart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(44 90% 61%)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="hsl(44 90% 61%)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={areaPath} fill="url(#goldGradChart)" />
                <polyline points={points} fill="none" stroke="hsl(44 90% 61%)" strokeWidth="0.5" />
                {chartData.map((val, i) => {
                  const x = (i / (chartData.length - 1)) * 100;
                  const y = 100 - (val / maxVal) * 80;
                  return <circle key={i} cx={x} cy={y} r="0.8" fill="hsl(44 90% 61%)" />;
                })}
              </svg>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1">
                {months.map((m, i) => (
                  <span key={i} className="text-[10px] text-muted-foreground hidden sm:inline">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
