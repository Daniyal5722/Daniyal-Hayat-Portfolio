import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<'init' | 'scanning' | 'ready' | 'exit'>('init');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Step 1: Progress count-up simulation (1.1s total sequence)
    const startTime = Date.now();
    const duration = 1100; // ms

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 40 && pct < 85) {
        setPhase('scanning');
      } else if (pct >= 85) {
        setPhase('ready');
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          setPhase('exit');
          setTimeout(() => {
            onComplete();
          }, 450);
        }, 150);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          key="portfolio-preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            opacity: 0.95,
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[99999] bg-[#07090e] flex flex-col items-center justify-center select-none overflow-hidden"
          style={{ willChange: 'transform' }}
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-radial from-cyan-500/10 via-blue-500/5 to-transparent blur-3xl pointer-events-none" />

          {/* Precision Top Scanning Line */}
          <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80"
          />

          <div className="relative z-10 flex flex-col items-center space-y-6 max-w-sm px-6 text-center">
            
            {/* Monogram Emblem with Radar Ring */}
            <div className="relative">
              {/* Outer pulsing ring */}
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-2 rounded-2xl border border-cyan-500/40 pointer-events-none"
              />

              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900/90 border border-cyan-500/50 flex flex-col items-center justify-center shadow-2xl shadow-cyan-500/25 backdrop-blur-xl"
              >
                <span className="font-mono text-2xl sm:text-3xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                  DH
                </span>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-ping" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400" />
              </motion.div>
            </div>

            {/* Typography / System Diagnostics */}
            <div className="space-y-1.5">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.35 }}
                className="text-xs sm:text-sm font-bold tracking-widest text-slate-100 uppercase font-sans"
              >
                DANIYAL HAYAT
              </motion.div>
              
              <div className="flex items-center justify-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-wider text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-cyan-400 font-medium">
                  {phase === 'init' && 'INITIALIZING ARCHITECTURE...'}
                  {phase === 'scanning' && 'SYNCHRONIZING VERIFIED MODULES...'}
                  {phase === 'ready' && 'SYSTEM READY // ENGAGING'}
                </span>
              </div>
            </div>

            {/* Progress Bar & Numerical Readout */}
            <div className="w-48 sm:w-56 space-y-2">
              <div className="w-full h-1 bg-slate-800/80 rounded-full overflow-hidden p-[0.5px] border border-slate-700/50">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full"
                  style={{ width: `${progress}%`, transition: 'width 60ms linear' }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>PORTFOLIO // {new Date().getFullYear()}</span>
                <span className="text-slate-300 font-bold">{progress}%</span>
              </div>
            </div>

          </div>

          {/* Bottom subtle copyright / runtime mark */}
          <div className="absolute bottom-6 text-[10px] font-mono text-slate-600 tracking-widest uppercase">
            FULL-STACK • ANDROID • AI SYSTEMS
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

