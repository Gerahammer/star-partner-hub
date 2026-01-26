import { motion } from "framer-motion";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "gold" | "cyan";
}

export const GlowCard = ({ children, className = "", glowColor = "gold" }: GlowCardProps) => {
  const glowClass = glowColor === "gold" 
    ? "before:from-primary/20 before:via-primary/5 before:to-transparent hover:shadow-[0_0_40px_hsl(45_100%_50%/0.15)]" 
    : "before:from-secondary/20 before:via-secondary/5 before:to-transparent hover:shadow-[0_0_40px_hsl(180_100%_50%/0.15)]";

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
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-primary/50 via-transparent to-primary/50 animate-[spin_8s_linear_infinite]" style={{ background: `conic-gradient(from 0deg, hsl(var(--primary) / 0.3), transparent, hsl(var(--primary) / 0.3))` }} />
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
