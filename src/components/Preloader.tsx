import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<'initial' | 'revealed' | 'done'>('initial');

  useEffect(() => {
    // Fast, ultra-crisp loading experience (<750ms total)
    const t1 = setTimeout(() => {
      setPhase('revealed');
    }, 450);

    const t2 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[99999] bg-[#090a0f] flex flex-col items-center justify-center select-none"
        >
          <div className="relative flex flex-col items-center space-y-4">
            {/* Logo Monogram */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative w-16 h-16 rounded-2xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center shadow-2xl shadow-cyan-500/20"
            >
              <span className="font-mono text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                DH
              </span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            </motion.div>

            {/* Subtitle tag */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-400"
            >
              BUILD • CREATE • EXPLORE
            </motion.div>

            {/* Fast progress line */}
            <div className="w-28 h-[2px] bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 0.55, ease: 'easeInOut' }}
                className="w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
