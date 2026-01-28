import { cn } from "@/lib/utils";

interface DecorativeFrameProps {
  children: React.ReactNode;
  className?: string;
  variant?: "gold" | "subtle";
}

export const DecorativeFrame = ({ children, className, variant = "gold" }: DecorativeFrameProps) => {
  const cornerClasses = variant === "gold" 
    ? "border-primary/60" 
    : "border-border/60";

  const glowClasses = variant === "gold"
    ? "shadow-[0_0_25px_hsl(45_90%_55%/0.1)] hover:shadow-[0_0_50px_hsl(45_90%_55%/0.2),0_0_80px_hsl(45_90%_55%/0.1)]"
    : "";

  return (
    <div className={cn("relative transition-shadow duration-500", glowClasses, className)}>
      {/* Top Left Corner */}
      <div className={cn("absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2", cornerClasses)} />
      
      {/* Top Right Corner */}
      <div className={cn("absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2", cornerClasses)} />
      
      {/* Bottom Left Corner */}
      <div className={cn("absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2", cornerClasses)} />
      
      {/* Bottom Right Corner */}
      <div className={cn("absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2", cornerClasses)} />
      
      {children}
    </div>
  );
};
