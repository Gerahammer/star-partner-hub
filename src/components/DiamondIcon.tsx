import type { LucideIcon } from "lucide-react";

interface DiamondIconProps {
  icon: LucideIcon;
  size?: number;
  iconColor?: string;
}

/** Diamond/rhombus container with gold gradient stroke and an icon centered inside. */
export const DiamondIcon = ({ icon: Icon, size = 70, iconColor = "#e8c878" }: DiamondIconProps) => (
  <div className="relative inline-flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
    <svg width={size} height={size} viewBox="0 0 80 80" className="absolute inset-0">
      <defs>
        <linearGradient id={`gold-stroke-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5d27c" />
          <stop offset="50%" stopColor="#d4a64a" />
          <stop offset="100%" stopColor="#9a7322" />
        </linearGradient>
        <linearGradient id={`diamond-fill-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(212, 166, 74, 0.15)" />
          <stop offset="100%" stopColor="rgba(0, 0, 0, 0.4)" />
        </linearGradient>
      </defs>
      <polygon
        points="40,4 76,40 40,76 4,40"
        fill={`url(#diamond-fill-${size})`}
        stroke={`url(#gold-stroke-${size})`}
        strokeWidth="1.5"
      />
    </svg>
    <Icon className="relative" style={{ color: iconColor, width: size * 0.36, height: size * 0.36 }} strokeWidth={1.75} />
  </div>
);
