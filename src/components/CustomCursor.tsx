import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Detect touch device or reduced motion
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (touch || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }
    
    setIsTouchDevice(false);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.getAttribute('data-cursor-pointer') === 'true'
        );
        setIsPointer(isClickable);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Small precision center dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
        animate={{
          x: position.x,
          y: position.y,
          scale: isPointer ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.1 }}
      />
      {/* Outer smooth tracking ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-cyan-400/60 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        animate={{
          x: position.x,
          y: position.y,
          width: isPointer ? 48 : 28,
          height: isPointer ? 48 : 28,
          backgroundColor: isPointer ? 'rgba(6, 182, 212, 0.12)' : 'rgba(6, 182, 212, 0.02)',
          borderColor: isPointer ? 'rgba(6, 182, 212, 0.8)' : 'rgba(6, 182, 212, 0.4)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 280, mass: 0.2 }}
      />
    </>
  );
}
