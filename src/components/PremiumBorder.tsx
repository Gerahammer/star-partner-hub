import { cn } from "@/lib/utils";

interface PremiumBorderProps {
  children: React.ReactNode;
  className?: string;
  glowing?: boolean;
}

export const PremiumBorder = ({ children, className, glowing = false }: PremiumBorderProps) => {
  return (
    <div className={cn(
      "relative p-[1px] rounded-xl overflow-hidden",
      glowing && "shadow-[0_0_20px_hsl(45_90%_55%/0.2)]",
      className
    )}>
      {/* Gradient Border */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/20 to-primary/40" />
      
      {/* Inner Content */}
      <div className="relative bg-card rounded-xl">
        {children}
      </div>
    </div>
  );
};
