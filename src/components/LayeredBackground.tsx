import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ParticleField } from './ParticleField';

export function LayeredBackground() {
  const [isTouch, setIsTouch] = useState(false);

  // Mouse spring coordinates for subtle light & parallax
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const springConfig = { damping: 30, stiffness: 180 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax for grid & geometric layers
  const gridX = useMotionValue(0);
  const gridY = useMotionValue(0);
  const smoothGridX = useSpring(gridX, { damping: 40, stiffness: 120 });
  const smoothGridY = useSpring(gridY, { damping: 40, stiffness: 120 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const checkTouch = () => {
      setIsTouch(prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);
    };
    checkTouch();

    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouch) return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Subtle parallax offset (-10px to +10px)
      const nx = (e.clientX / window.innerWidth - 0.5) * 20;
      const ny = (e.clientY / window.innerHeight - 0.5) * 20;
      gridX.set(nx);
      gridY.set(ny);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', checkTouch);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkTouch);
    };
  }, [isTouch, mouseX, mouseY, gridX, gridY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Layer 1: Ambient Gradient Mesh with subtle breathing pulsation */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(6,182,212,0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(6,182,212,0.14),transparent_70%)] transition-opacity duration-1000" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-indigo-500/10 via-cyan-500/5 to-transparent blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-cyan-500/10 via-violet-500/5 to-transparent blur-[130px] rounded-full pointer-events-none" />

      {/* Layer 2: Technical Grid with Subtle Mouse Parallax */}
      <motion.div
        style={{ x: smoothGridX, y: smoothGridY }}
        className="absolute -inset-10 opacity-35 dark:opacity-25 bg-[linear-gradient(to_right,#0ea5e918_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e918_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_60%,transparent_100%)]"
      />

      {/* Layer 3: Interactive Lightweight Canvas Particle Field */}
      <ParticleField />

      {/* Layer 4: Soft Mouse-Reactive Ambient Torch Light */}
      {!isTouch && (
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="absolute w-[450px] h-[450px] rounded-full bg-radial from-cyan-500/12 via-blue-500/5 to-transparent blur-3xl pointer-events-none z-[3]"
        />
      )}

      {/* Layer 5: Subtle Noise / Editorial Grain Texture */}
      <div
        className="absolute inset-0 opacity-[0.022] dark:opacity-[0.035] pointer-events-none z-[4]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layer 6: Floating Architectural Geometric Elements */}
      <motion.div
        style={{
          x: smoothGridX,
          y: smoothGridY,
        }}
        className="absolute inset-0 z-[1] hidden lg:block opacity-30 dark:opacity-40 text-cyan-600/60 dark:text-cyan-400/60 font-mono text-[10px]"
      >
        {/* Top left technical coordinate */}
        <div className="absolute top-28 left-12 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
          <span>SYS.LAT: 33.6844° N // LON: 73.0479° E</span>
        </div>

        {/* Floating cross marks */}
        <div className="absolute top-1/4 right-20 select-none text-slate-400 dark:text-slate-600 text-xs">
          +
        </div>
        <div className="absolute bottom-1/3 left-16 select-none text-slate-400 dark:text-slate-600 text-xs">
          +
        </div>
        <div className="absolute top-2/3 right-1/4 select-none text-slate-400 dark:text-slate-600 text-xs">
          [ ARCH: TS • KOTLIN • GEMINI ]
        </div>

        {/* Bottom right runtime indicator */}
        <div className="absolute bottom-12 right-12 flex items-center gap-2 text-[10px]">
          <span className="inline-block w-2 h-2 border border-cyan-500/60 rotate-45" />
          <span>STATUS: ONLINE & VERIFIED</span>
        </div>
      </motion.div>
    </div>
  );
}
