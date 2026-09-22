import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CustomCursor() {
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'pointer' | 'badge'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 26, stiffness: 350, mass: 0.15 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobileDevice) {
      setIsTouchDevice(true);
      return;
    }

    setIsTouchDevice(false);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check cursor data attribute
      const cursorElem = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorElem) {
        const type = cursorElem.getAttribute('data-cursor');
        if (type === 'view') {
          setCursorVariant('badge');
          setCursorText('VIEW');
          return;
        } else if (type === 'external') {
          setCursorVariant('badge');
          setCursorText('OPEN ↗');
          return;
        } else if (type === 'copy') {
          setCursorVariant('badge');
          setCursorText('COPY');
          return;
        } else if (type === 'drag') {
          setCursorVariant('badge');
          setCursorText('DRAG');
          return;
        }
      }

      // Check if clickable
      const isClickable = Boolean(
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer')
      );

      if (isClickable) {
        setCursorVariant('pointer');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
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
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan-400 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: cursorVariant === 'badge' ? 0 : cursorVariant === 'pointer' ? 0.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Smooth Outer Follower Ring / Badge */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center font-mono font-bold tracking-wider select-none text-[9px]"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          width: cursorVariant === 'badge' ? 62 : cursorVariant === 'pointer' ? 44 : 26,
          height: cursorVariant === 'badge' ? 62 : cursorVariant === 'pointer' ? 44 : 26,
          backgroundColor: cursorVariant === 'badge' 
            ? 'rgba(6, 182, 212, 0.92)' 
            : cursorVariant === 'pointer' 
              ? 'rgba(6, 182, 212, 0.15)' 
              : 'rgba(6, 182, 212, 0.04)',
          borderColor: cursorVariant === 'badge'
            ? 'rgba(6, 182, 212, 1)'
            : cursorVariant === 'pointer'
              ? 'rgba(6, 182, 212, 0.7)'
              : 'rgba(6, 182, 212, 0.35)',
          color: cursorVariant === 'badge' ? '#090a0f' : '#38bdf8',
          borderRadius: '9999px',
          borderWidth: '1.5px',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.2 }}
      >
        {cursorVariant === 'badge' && cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-slate-950 font-extrabold text-[9px] uppercase tracking-widest leading-none text-center"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
