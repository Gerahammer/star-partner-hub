import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface DecorativeDividerProps {
  className?: string;
  variant?: "star" | "line" | "diamond";
}

export const DecorativeDivider = ({ className, variant = "star" }: DecorativeDividerProps) => {
  return (
    <div className={cn("flex items-center justify-center gap-4 py-4", className)}>
      <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-primary/50" />
      
      {variant === "star" && (
        <Star className="w-4 h-4 text-primary fill-primary" />
      )}
      
      {variant === "diamond" && (
        <div className="w-2 h-2 rotate-45 bg-primary" />
      )}
      
      {variant === "line" && (
        <div className="w-8 h-0.5 bg-primary" />
      )}
      
      <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-primary/50" />
    </div>
  );
};
