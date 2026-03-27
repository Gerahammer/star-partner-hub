import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, DollarSign, BarChart3, Users } from "lucide-react";

const chartData = [30, 45, 35, 55, 48, 62, 55, 70, 65, 78, 72, 85];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/3 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
            Real-Time Analytics
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="text-liquid-silver">YOUR </span>
            <span className="text-gradient-gold">DASHBOARD</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Track every click, conversion, and commission in real-time
          </p>
        </motion.div>

        {/* 3D Perspective Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 10 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-5xl mx-auto"
          style={{ perspective: "1200px" }}
        >
          <div 
            className="glass-card rounded-2xl p-6 md:p-8 border border-border/50"
            style={{ 
              transform: "rotateX(2deg)",
              boxShadow: "0 25px 80px hsl(0 0% 0% / 0.5), 0 0 40px hsl(43 72% 52% / 0.05)"
            }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-muted-foreground text-sm">Total Revenue</p>
                <p className="font-display text-3xl md:text-4xl text-gradient-gold">$127,450</p>
              </div>
              <div className="flex gap-4">
                {[
                  { icon: Users, label: "Players", value: "2,847" },
                  { icon: DollarSign, label: "Commission", value: "$12.4K" },
                  { icon: TrendingUp, label: "Growth", value: "+24%" },
                ].map((item) => (
                  <div key={item.label} className="hidden sm:block text-right p-3 rounded-lg bg-muted/30 border border-border/30">
                    <div className="flex items-center gap-2 justify-end mb-1">
                      <item.icon className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                    </div>
                    <p className="text-foreground font-semibold text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart */}
            <div className="relative h-48 md:h-64 w-full">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                {/* Grid lines */}
                {[20, 40, 60, 80].map((y) => (
                  <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="hsl(0 0% 25%)" strokeWidth="0.2" />
                ))}
                {/* Area fill */}
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(43 72% 52%)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="hsl(43 72% 52%)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={areaPath} fill="url(#goldGrad)" />
                {/* Line */}
                <polyline
                  points={points}
                  fill="none"
                  stroke="hsl(43 72% 52%)"
                  strokeWidth="0.5"
                />
                {/* Dots */}
                {chartData.map((val, i) => {
                  const x = (i / (chartData.length - 1)) * 100;
                  const y = 100 - (val / maxVal) * 80;
                  return (
                    <circle key={i} cx={x} cy={y} r="0.8" fill="hsl(43 72% 52%)" />
                  );
                })}
              </svg>
              
              {/* Month labels */}
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
