import { useEffect, useState } from 'react';

export function BackgroundGrid() {
  const [mousePosition, setMousePosition] = useState({ x: -500, y: -500 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only track on non-touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isHovering) setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovering]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 dark:opacity-40" />

      {/* Mouse following soft spotlight */}
      {isHovering && (
        <div
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none transition-transform duration-100 ease-out hidden md:block"
          style={{
            transform: `translate(${mousePosition.x - 250}px, ${mousePosition.y - 250}px)`,
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.07) 0%, rgba(59, 130, 246, 0.03) 40%, transparent 70%)',
          }}
        />
      )}

      {/* Fixed subtle ambient glows */}
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/8 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/8 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '3s' }} />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/8 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '5s' }} />
    </div>
  );
}
