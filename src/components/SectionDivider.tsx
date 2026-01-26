export const SectionDivider = () => {
  return (
    <div className="relative h-24 overflow-hidden">
      <svg
        className="absolute bottom-0 w-full h-24"
        viewBox="0 0 1440 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 96L60 85.3C120 75 240 53 360 48C480 43 600 53 720 58.7C840 64 960 64 1080 58.7C1200 53 1320 43 1380 37.3L1440 32V96H1380C1320 96 1200 96 1080 96C960 96 840 96 720 96C600 96 480 96 360 96C240 96 120 96 60 96H0Z"
          fill="hsl(var(--muted) / 0.3)"
        />
        <path
          d="M0 96L60 90.7C120 85 240 75 360 69.3C480 64 600 64 720 69.3C840 75 960 85 1080 80C1200 75 1320 53 1380 42.7L1440 32V96H1380C1320 96 1200 96 1080 96C960 96 840 96 720 96C600 96 480 96 360 96C240 96 120 96 60 96H0Z"
          fill="hsl(var(--muted) / 0.2)"
        />
      </svg>
    </div>
  );
};
