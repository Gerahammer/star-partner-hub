import { useRef, type PointerEvent } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import sculpture from "@/assets/partnerstar-sculpture.jpg";

export const HeroSection = () => {
  const section = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 65, damping: 24 });
  const y = useSpring(pointerY, { stiffness: 65, damping: 24 });
  const move = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 28);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 20);
  };
  return (
    <section
      className="hero"
      ref={section}
      aria-labelledby="hero-title"
      onPointerMove={move}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <div className="shell">
        <div className="hero-topline">
          <span className="eyebrow">Independent minds. Shared ambition.</span>
          <span className="hero-edition">iGaming affiliate partnerships</span>
        </div>
        <div className="hero-stage">
          <h1
            id="hero-title"
            className="hero-title"
            aria-label="In it for the long game."
          >
            {["In it for", "the long", "game."].map((line, index) => (
              <span className="hero-line" key={line} aria-hidden="true">
                <motion.span
                  initial={reduceMotion ? false : { y: "110%", rotate: 3 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.95,
                    delay: reduceMotion ? 0 : 0.08 + index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div
            className="hero-object"
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              style={reduceMotion ? undefined : { y: drift, rotate: rotation }}
            >
              <motion.img
                src={sculpture}
                width="1254"
                height="1254"
                alt=""
                fetchPriority="high"
                draggable={false}
                style={reduceMotion ? undefined : { x, y }}
              />
            </motion.div>
          </motion.div>
          <motion.div
            className="hero-intro"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.6 }}
          >
            <p>
              You bring the ambition. We bring the people, the platform, and a
              deal worth building on.
            </p>
            <a
              className="button button-gold"
              href="https://ro-affiliate.partnerstar.com/registration"
              target="_blank"
              rel="noopener noreferrer"
            >
              Become a partner <ArrowUpRight size={20} />
            </a>
          </motion.div>
          <div className="hero-stat">
            <span>Revenue share up to</span>
            <strong>
              50<small>%</small>
            </strong>
            <a href="#deals">
              Find your deal <ArrowDown size={16} />
            </a>
          </div>
        </div>
        <div className="hero-foot">
          <span>Built on partnership. Measured in progress.</span>
          <a href="#why-us">
            Discover Partnerstar <ArrowDown size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};
