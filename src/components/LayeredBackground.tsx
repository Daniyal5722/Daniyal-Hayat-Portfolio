import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { BackgroundBeams } from './BackgroundBeams';

export function LayeredBackground() {
  const [isTouch, setIsTouch] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

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
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPref = () => {
      setIsReducedMotion(reducedMotionQuery.matches);
    };
    updateMotionPref();
    reducedMotionQuery.addEventListener('change', updateMotionPref);

    const checkTouch = () => {
      setIsTouch(reducedMotionQuery.matches || window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);
    };
    checkTouch();

    if (reducedMotionQuery.matches) {
      return () => {
        reducedMotionQuery.removeEventListener('change', updateMotionPref);
        window.removeEventListener('resize', checkTouch);
      };
    }

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
      reducedMotionQuery.removeEventListener('change', updateMotionPref);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkTouch);
    };
  }, [isTouch, mouseX, mouseY, gridX, gridY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Layer 1: Hardware-Accelerated CSS Aurora Gradient Flow Fields */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000">
        {/* Aurora Mesh 1: Primary Cyan/Teal Wave (Top/Center) */}
        <div 
          className="absolute -top-[15%] left-[10%] sm:left-[25%] w-[550px] sm:w-[750px] h-[450px] sm:h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.18)_0%,rgba(14,165,233,0.08)_45%,transparent_75%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.16)_0%,rgba(14,165,233,0.06)_45%,transparent_75%)] blur-[90px] sm:blur-[130px] animate-aurora-1"
          style={{ willChange: 'transform, opacity' }}
        />

        {/* Aurora Mesh 2: Deep Indigo / Electric Blue Field (Bottom/Right) */}
        <div 
          className="absolute -bottom-[20%] -right-[10%] w-[500px] sm:w-[700px] h-[500px] sm:h-[650px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.16)_0%,rgba(59,130,246,0.07)_50%,transparent_75%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.14)_0%,rgba(59,130,246,0.05)_50%,transparent_75%)] blur-[100px] sm:blur-[140px] animate-aurora-2"
          style={{ willChange: 'transform, opacity' }}
        />

        {/* Aurora Mesh 3: Soft Violet / Purple Accent Wave (Mid-Left) */}
        <div 
          className="absolute top-[30%] -left-[15%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.14)_0%,rgba(139,92,246,0.06)_50%,transparent_75%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.11)_0%,rgba(139,92,246,0.04)_50%,transparent_75%)] blur-[95px] sm:blur-[135px] animate-aurora-3"
          style={{ willChange: 'transform, opacity' }}
        />

        {/* Aurora Mesh 4: Deep Ambient Emerald/Cyan Underglow (Center-Base) */}
        <div 
          className="absolute top-[55%] left-[20%] sm:left-[35%] w-[400px] sm:w-[600px] h-[350px] sm:h-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.10)_0%,rgba(6,182,212,0.04)_50%,transparent_75%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.08)_0%,rgba(6,182,212,0.03)_50%,transparent_75%)] blur-[90px] sm:blur-[120px] animate-aurora-4"
          style={{ willChange: 'transform, opacity' }}
        />
      </div>

      {/* Layer 2: Deep space vignette gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,transparent_40%,rgba(0,0,0,0.35)_100%)] dark:bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,transparent_40%,rgba(0,0,0,0.65)_100%)] pointer-events-none" />

      {/* Layer 3: Technical Grid with Subtle Mouse Parallax */}
      <motion.div
        style={{ x: smoothGridX, y: smoothGridY }}
        className="absolute -inset-10 opacity-30 dark:opacity-20 bg-[linear-gradient(to_right,#0ea5e918_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e918_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_60%,transparent_100%)]"
      />

      {/* Layer 3.5: Animated Beams */}
      <BackgroundBeams />

      {/* Layer 4: Soft Mouse-Reactive Ambient Torch Light */}
      {!isTouch && !isReducedMotion && (
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
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none z-[4]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layer 5.5: Scanning Pulse Line (suppressed if reduced motion) */}
      {!isReducedMotion ? (
        <motion.div
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent z-[5] pointer-events-none"
        />
      ) : null}

      {/* Layer 6: Floating Architectural Geometric Elements */}
      <motion.div
        style={{
          x: smoothGridX,
          y: smoothGridY,
        }}
        className="absolute inset-0 z-[1] hidden lg:block opacity-30 dark:opacity-40 text-cyan-600/60 dark:text-cyan-400/60 font-mono text-[10px]"
      >
        {/* Floating tech stack labels */}
        <div className="absolute top-1/4 left-[15%] select-none flex flex-col gap-1">
          <span className="opacity-40">{`<div class="root">`}</span>
          <span className="opacity-60 pl-4">{`await fetch('/api/projects')`}</span>
          <span className="opacity-40">{`</div>`}</span>
        </div>

        <div className="absolute bottom-1/4 right-[15%] select-none flex flex-col gap-1 text-right">
          <span className="opacity-40">{`interface Developer {`}</span>
          <span className="opacity-60 pr-4">{`name: "Daniyal Hayat";`}</span>
          <span className="opacity-40">{`}`}</span>
        </div>
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
