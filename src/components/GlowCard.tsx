import { motion } from "framer-motion";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "gold" | "cyan";
}

export const GlowCard = ({ children, className = "", glowColor = "gold" }: GlowCardProps) => {
  const glowClass = glowColor === "gold" 
    ? "before:from-secondary/10 before:via-secondary/5 before:to-transparent hover:shadow-[0_0_30px_hsl(45_90%_55%/0.1)]" 
    : "before:from-primary/10 before:via-primary/5 before:to-transparent hover:shadow-[0_0_30px_hsl(168_100%_45%/0.15)]";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`
        relative overflow-hidden rounded-3xl 
        bg-card border border-border/50
        before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-0 before:transition-opacity before:duration-500
        hover:before:opacity-100 hover:border-primary/30
        transition-all duration-500
        ${glowClass}
        ${className}
      `}
    >
      {/* Subtle topographic pattern background */}
      <div className="absolute inset-0 opacity-[0.18] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="topo-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M0 80 Q50 60 100 80 T200 80" fill="none" stroke="hsl(45 20% 90%)" strokeWidth="1"/>
              <path d="M0 100 Q50 80 100 100 T200 100" fill="none" stroke="hsl(45 20% 90%)" strokeWidth="1"/>
              <path d="M0 120 Q50 100 100 120 T200 120" fill="none" stroke="hsl(45 20% 90%)" strokeWidth="1"/>
              <path d="M0 140 Q50 120 100 140 T200 140" fill="none" stroke="hsl(45 20% 90%)" strokeWidth="1"/>
              <path d="M0 160 Q50 140 100 160 T200 160" fill="none" stroke="hsl(45 20% 90%)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo-pattern)"/>
        </svg>
      </div>
      
      {/* Subtle animated gradient border */}
      <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-[-1px] rounded-3xl" style={{ background: `conic-gradient(from 0deg, hsl(var(--primary) / 0.15), transparent, hsl(var(--primary) / 0.15))` }} />
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
