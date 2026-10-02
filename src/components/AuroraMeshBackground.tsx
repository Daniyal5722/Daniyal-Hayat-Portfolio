import React, { useEffect, useRef, useState, useMemo } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  color: string;
}

export function AuroraMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Monitor prefers-reduced-motion media query
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);
    } else {
      mediaQuery.addListener(listener);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', listener);
      } else {
        mediaQuery.removeListener(listener);
      }
    };
  }, []);

  // Canvas particle drift & network simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isTabVisible = !document.hidden;

    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle count scaled by device type
    const getParticleCount = () => {
      if (width < 640) return 14; // mobile
      if (width < 1024) return 24; // tablet
      return 36; // desktop
    };

    let particles: Particle[] = [];

    const initParticles = () => {
      const count = getParticleCount();
      particles = [];
      const colors = [
        'rgba(6, 182, 212,',   // Cyan
        'rgba(59, 130, 246,',  // Electric Blue
        'rgba(147, 197, 253,', // Soft Sky
        'rgba(168, 85, 247,',  // Subtle Violet
      ];

      for (let i = 0; i < count; i++) {
        const color = colors[i % colors.length];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 0.8 + 0.8,
          baseAlpha: Math.random() * 0.22 + 0.12,
          color,
        });
      }
    };

    initParticles();

    // Resize listener with debounced re-init
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
      }, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Desktop Mouse Move listener
    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchDevice || prefersReducedMotion) return;
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    if (!isTouchDevice && !prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    // Page Visibility change listener (pause to save battery when inactive)
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const maxConnectionDistance = width < 768 ? 95 : 130;

    // Render loop
    const render = () => {
      if (!isTabVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const mouseRadius = 140;
      const len = particles.length;

      for (let i = 0; i < len; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Gentle mouse reaction (desktop only)
          if (mouse.active && !isTouchDevice) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);

            if (dist < mouseRadius && dist > 0) {
              const force = (1 - dist / mouseRadius) * 0.4;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force;
            }
          }

          // Screen wrap-around with boundary margin
          const margin = 25;
          if (p.x < -margin) p.x = width + margin;
          if (p.x > width + margin) p.x = -margin;
          if (p.y < -margin) p.y = height + margin;
          if (p.y > height + margin) p.y = -margin;
        }

        // Render particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.baseAlpha})`;
        ctx.fill();

        // Connect nearby particles with subtle network lines
        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectionDistance) {
            const lineAlpha = (1 - dist / maxConnectionDistance) * 0.11;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      {/* ========================================================================= */}
      {/* LAYER 1: DARK BASE AMBIENT GRADIENT                                       */}
      {/* Deep black, dark navy & charcoal ambience                                 */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 bg-[#070913] transition-colors duration-500" />
      <div
        className="absolute inset-0 opacity-95"
        style={{
          background:
            'radial-gradient(ellipse 120% 90% at 50% 10%, #0c1024 0%, #070915 50%, #04050a 100%)',
        }}
      />

      {/* ========================================================================= */}
      {/* LAYER 2: HARDWARE-ACCELERATED CSS AURORA MESH FIELDS                      */}
      {/* 4 fluid fields using translate3d, will-change: transform                  */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 overflow-hidden opacity-65 dark:opacity-75">
        {/* Field 1: Cyan / Emerald Shift */}
        <div
          className="aurora-orb aurora-orb-1 absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full blur-[110px] md:blur-[140px]"
          style={{
            background:
              'radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(14,165,233,0.08) 50%, transparent 70%)',
          }}
        />

        {/* Field 2: Electric Blue */}
        <div
          className="aurora-orb aurora-orb-2 absolute top-[28%] -right-[15%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px] md:blur-[150px]"
          style={{
            background:
              'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, transparent 70%)',
          }}
        />

        {/* Field 3: Subtle Violet Accent */}
        <div
          className="aurora-orb aurora-orb-3 absolute top-[62%] left-[15%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-[130px] md:blur-[160px]"
          style={{
            background:
              'radial-gradient(circle, rgba(168,85,247,0.11) 0%, rgba(99,102,241,0.05) 50%, transparent 70%)',
          }}
        />

        {/* Field 4: Deep Cyan Horizon Field */}
        <div
          className="aurora-orb aurora-orb-4 absolute -bottom-[15%] right-[10%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full blur-[120px] md:blur-[150px]"
          style={{
            background:
              'radial-gradient(circle, rgba(6,182,212,0.12) 0%, rgba(14,116,144,0.04) 50%, transparent 70%)',
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* LAYER 5: VERY SUBTLE TECHNICAL / DOT GRID                                 */}
      {/* Ultra-low opacity (3%), masked with radial vignette for depth             */}
      {/* ========================================================================= */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(6, 182, 212, 0.85) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          maskImage:
            'radial-gradient(ellipse 85% 75% at 50% 35%, black 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 85% 75% at 50% 35%, black 40%, transparent 100%)',
        }}
      />

      {/* ========================================================================= */}
      {/* LAYER 7: PROFILE DEPTH AMBIENT GLOW                                       */}
      {/* Soft ambient light aligned behind Hero profile card                       */}
      {/* ========================================================================= */}
      <div
        className="profile-depth-orb absolute top-[160px] md:top-[180px] right-[5%] md:right-[12%] lg:right-[15%] w-[320px] sm:w-[420px] md:w-[480px] h-[320px] sm:h-[420px] md:h-[480px] rounded-full pointer-events-none blur-[90px] md:blur-[120px] opacity-75 dark:opacity-85"
        style={{
          background:
            'radial-gradient(circle, rgba(6,182,212,0.16) 0%, rgba(59,130,246,0.08) 45%, transparent 70%)',
        }}
      />

      {/* ========================================================================= */}
      {/* LAYERS 3, 4 & 6: CANVAS PARTICLES & SUBTLE DIGITAL NETWORK               */}
      {/* Lightweight Canvas layer                                                  */}
      {/* ========================================================================= */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Subtle bottom gradient to ensure pristine footer contrast */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#070913]/90 to-transparent pointer-events-none" />

      {/* Hardware-accelerated CSS animations and proper prefers-reduced-motion media query */}
      <style>{`
        .aurora-orb {
          will-change: transform;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
        }

        .aurora-orb-1 {
          animation: auroraMotion1 34s ease-in-out infinite alternate;
        }

        .aurora-orb-2 {
          animation: auroraMotion2 42s ease-in-out infinite alternate;
        }

        .aurora-orb-3 {
          animation: auroraMotion3 38s ease-in-out infinite alternate;
        }

        .aurora-orb-4 {
          animation: auroraMotion4 48s ease-in-out infinite alternate;
        }

        .profile-depth-orb {
          will-change: transform, opacity;
          backface-visibility: hidden;
          animation: profileGlowPulse 14s ease-in-out infinite alternate;
        }

        @keyframes auroraMotion1 {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(6vw, 4vh, 0) scale(1.08);
          }
          100% {
            transform: translate3d(-4vw, 8vh, 0) scale(0.96);
          }
        }

        @keyframes auroraMotion2 {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-7vw, -5vh, 0) scale(1.1);
          }
          100% {
            transform: translate3d(5vw, 6vh, 0) scale(0.94);
          }
        }

        @keyframes auroraMotion3 {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(5vw, -6vh, 0) scale(1.06);
          }
          100% {
            transform: translate3d(-6vw, 4vh, 0) scale(0.98);
          }
        }

        @keyframes auroraMotion4 {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-4vw, 5vh, 0) scale(1.08);
          }
          100% {
            transform: translate3d(6vw, -4vh, 0) scale(0.95);
          }
        }

        @keyframes profileGlowPulse {
          0% {
            transform: translate3d(0, 0, 0) scale(0.95);
            opacity: 0.65;
          }
          50% {
            transform: translate3d(0, 0, 0) scale(1.05);
            opacity: 0.85;
          }
          100% {
            transform: translate3d(0, 0, 0) scale(0.98);
            opacity: 0.70;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .aurora-orb,
          .profile-depth-orb {
            animation: none !important;
            transform: translate3d(0, 0, 0) !important;
          }
        }
      `}</style>
    </div>
  );
}

export default AuroraMeshBackground;
