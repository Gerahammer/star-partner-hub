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
        relative overflow-hidden rounded-2xl 
        bg-gradient-to-br from-card to-card/80
        border border-border/50 hover:border-primary/30
        before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-0 before:transition-opacity before:duration-500
        hover:before:opacity-100
        transition-all duration-500
        ${glowClass}
        ${className}
      `}
    >
      {/* Subtle animated gradient border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-[-1px] rounded-2xl" style={{ background: `conic-gradient(from 0deg, hsl(var(--primary) / 0.15), transparent, hsl(var(--primary) / 0.15))` }} />
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
