import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  depth: number;
  color: string;
  pulseOffset: number;
  pulseSpeed: number;
}

interface AuroraInteractiveBackgroundProps {
  isDarkMode?: boolean;
}

export function AuroraInteractiveBackground({ isDarkMode: propDarkMode }: AuroraInteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Smooth lerped mouse tracking
  const mouseRef = useRef<{
    targetX: number;
    targetY: number;
    currentX: number;
    currentY: number;
    active: boolean;
    opacity: number;
  }>({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    active: false,
    opacity: 0,
  });

  // Track dark mode dynamically with fallback to DOM class
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof propDarkMode === 'boolean') return propDarkMode;
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });

  const isDarkRef = useRef(isDark);
  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  // Synchronize when prop changes
  useEffect(() => {
    if (typeof propDarkMode === 'boolean') {
      setIsDark(propDarkMode);
    }
  }, [propDarkMode]);

  // Observe class mutations on <html> for instant light/dark toggle response
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDarkClass = document.documentElement.classList.contains('dark');
      setIsDark(isDarkClass);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Monitor prefers-reduced-motion
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

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Use alpha: true for seamless compositing with light/dark theme backgrounds
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isTabVisible = !document.hidden;

    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cssWidth = window.innerWidth;
    let cssHeight = window.innerHeight;
    canvas.width = cssWidth * dpr;
    canvas.height = cssHeight * dpr;

    mouseRef.current.targetX = cssWidth / 2;
    mouseRef.current.targetY = cssHeight / 2;
    mouseRef.current.currentX = cssWidth / 2;
    mouseRef.current.currentY = cssHeight / 2;

    const getParticleCount = () => {
      if (cssWidth < 640) return 22;
      if (cssWidth < 1024) return 34;
      return 48;
    };

    let particles: Particle[] = [];

    const initParticles = () => {
      const count = getParticleCount();
      particles = [];
      const currentDark = isDarkRef.current;

      const colors = currentDark
        ? [
            'rgba(6, 182, 212,',   // Cyan
            'rgba(59, 130, 246,',  // Electric Blue
            'rgba(147, 197, 253,', // Soft Sky
            'rgba(168, 85, 247,',  // Violet
          ]
        : [
            'rgba(8, 145, 178,',   // Deep Cyan for light mode
            'rgba(37, 99, 235,',   // Royal Blue for light mode
            'rgba(124, 58, 237,',  // Soft Indigo for light mode
            'rgba(14, 116, 144,',  // Teal for light mode
          ];

      for (let i = 0; i < count; i++) {
        const color = colors[i % colors.length];
        const depth = Math.random() * 1.1 + 0.5;
        particles.push({
          x: Math.random() * cssWidth,
          y: Math.random() * cssHeight,
          vx: (Math.random() - 0.5) * (0.35 * depth),
          vy: (Math.random() - 0.5) * (0.35 * depth),
          radius: (Math.random() * 1.1 + 0.9) * depth,
          baseAlpha: currentDark
            ? Math.random() * 0.3 + 0.25
            : Math.random() * 0.25 + 0.2,
          alpha: 0.3,
          depth,
          color,
          pulseOffset: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.015,
        });
      }
    };

    initParticles();

    // Re-init particles colors when dark mode changes
    const currentDark = isDark;
    initParticles();

    // Resize handler
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!canvas) return;
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        cssWidth = window.innerWidth;
        cssHeight = window.innerHeight;
        canvas.width = cssWidth * dpr;
        canvas.height = cssHeight * dpr;
        initParticles();
      }, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Desktop Mouse Move listener
    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchDevice || prefersReducedMotion) return;
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleMouseEnter = () => {
      if (!isTouchDevice && !prefersReducedMotion) {
        mouseRef.current.active = true;
      }
    };

    if (!isTouchDevice && !prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);
    }

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const maxConnectionDistance = cssWidth < 768 ? 95 : 130;
    const startTime = performance.now();

    // =========================================================================
    // RENDER LOOP: Continuous, Banding-Free, Multi-Stop Ambient Light
    // =========================================================================
    const render = (now: number) => {
      if (!isTabVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const elapsed = (now - startTime) * 0.001;
      const mouse = mouseRef.current;
      const dark = isDarkRef.current;

      // 1. Mouse Lerp Interpolation
      if (!isTouchDevice && !prefersReducedMotion) {
        const lerpFactor = 0.05;
        if (mouse.active) {
          mouse.currentX += (mouse.targetX - mouse.currentX) * lerpFactor;
          mouse.currentY += (mouse.targetY - mouse.currentY) * lerpFactor;
          mouse.opacity += (1 - mouse.opacity) * 0.05;
        } else {
          mouse.opacity += (0 - mouse.opacity) * 0.035;
        }
      }

      const centerX = cssWidth / 2;
      const centerY = cssHeight / 2;
      const normX =
        !isTouchDevice && !prefersReducedMotion
          ? (mouse.currentX - centerX) / (centerX || 1)
          : 0;
      const normY =
        !isTouchDevice && !prefersReducedMotion
          ? (mouse.currentY - centerY) / (centerY || 1)
          : 0;

      // Scale context for retina
      ctx.save();
      ctx.scale(dpr, dpr);

      // Clear the canvas cleanly so underlying base background transitions flawlessly
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      // =========================================================================
      // LAYER 1: BASE AMBIENT ATMOSPHERE
      // =========================================================================
      if (dark) {
        // Dark Mode Base: Deep midnight navy & obsidian with soft center depth
        const baseGrad = ctx.createRadialGradient(
          centerX + normX * 12,
          centerY * 0.7 + normY * 10,
          0,
          centerX,
          centerY,
          Math.max(cssWidth, cssHeight) * 0.85
        );
        baseGrad.addColorStop(0, '#0c1024');
        baseGrad.addColorStop(0.5, '#070914');
        baseGrad.addColorStop(1, '#05060b');
        ctx.fillStyle = baseGrad;
        ctx.fillRect(0, 0, cssWidth, cssHeight);
      } else {
        // Light Mode Base: Soft crystalline pearl with subtle sky gradient
        const baseGrad = ctx.createRadialGradient(
          centerX + normX * 12,
          centerY * 0.7 + normY * 10,
          0,
          centerX,
          centerY,
          Math.max(cssWidth, cssHeight) * 0.85
        );
        baseGrad.addColorStop(0, '#f2f6fe');
        baseGrad.addColorStop(0.5, '#edf2fa');
        baseGrad.addColorStop(1, '#e7ecf7');
        ctx.fillStyle = baseGrad;
        ctx.fillRect(0, 0, cssWidth, cssHeight);
      }

      // =========================================================================
      // LAYER 2: ORGANIC CONTINUOUS AURORA LIGHT FIELDS
      // Rendered with cubic falloff and matching outer RGB to completely eliminate banding
      // =========================================================================
      const speedMultiplier = prefersReducedMotion ? 0.08 : 0.55;
      const t = elapsed * speedMultiplier;

      const auroraShiftX = normX * 22;
      const auroraShiftY = normY * 18;

      // Use 'screen' in dark mode for ethereal glow; use 'multiply' or gentle 'source-over' in light mode
      ctx.save();
      if (dark) {
        ctx.globalCompositeOperation = 'screen';
      }

      // Helper function to draw an ultra-soft, zero-banding ambient light field
      const drawSoftLight = (
        cx: number,
        cy: number,
        radius: number,
        r: number,
        g: number,
        b: number,
        peakAlpha: number
      ) => {
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        // Multi-stop cubic ease falloff ensures absolute softness without hard rings
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${peakAlpha.toFixed(3)})`);
        grad.addColorStop(0.25, `rgba(${r}, ${g}, ${b}, ${(peakAlpha * 0.75).toFixed(3)})`);
        grad.addColorStop(0.55, `rgba(${r}, ${g}, ${b}, ${(peakAlpha * 0.35).toFixed(3)})`);
        grad.addColorStop(0.8, `rgba(${r}, ${g}, ${b}, ${(peakAlpha * 0.1).toFixed(3)})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`); // Matching RGB prevents dark ring halos

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      };

      // Aurora 1: Subtle Cyan / Emerald Flow (Upper-Left to Center)
      const a1X = cssWidth * 0.32 + Math.sin(t * 0.45) * (cssWidth * 0.16) + auroraShiftX;
      const a1Y = cssHeight * 0.26 + Math.cos(t * 0.38) * (cssHeight * 0.12) + auroraShiftY;
      const a1Radius = Math.min(cssWidth, cssHeight) * (0.42 + Math.sin(t * 0.28) * 0.05);
      drawSoftLight(a1X, a1Y, a1Radius, 6, 182, 212, dark ? 0.18 : 0.09);

      // Aurora 2: Electric Royal Blue (Center-Right Drift)
      const a2X = cssWidth * 0.72 + Math.cos(t * 0.42) * (cssWidth * 0.15) + auroraShiftX * 1.1;
      const a2Y = cssHeight * 0.44 + Math.sin(t * 0.32) * (cssHeight * 0.14) + auroraShiftY * 1.1;
      const a2Radius = Math.min(cssWidth, cssHeight) * (0.44 + Math.cos(t * 0.24) * 0.05);
      drawSoftLight(a2X, a2Y, a2Radius, 59, 130, 246, dark ? 0.15 : 0.08);

      // Aurora 3: Soft Violet / Indigo (Lower-Mid Harmonic Accent)
      const a3X = cssWidth * 0.25 + Math.sin(t * 0.35 + 1.2) * (cssWidth * 0.14) + auroraShiftX * 0.9;
      const a3Y = cssHeight * 0.68 + Math.cos(t * 0.4 + 2) * (cssHeight * 0.12) + auroraShiftY * 0.9;
      const a3Radius = Math.min(cssWidth, cssHeight) * (0.38 + Math.sin(t * 0.32) * 0.04);
      drawSoftLight(a3X, a3Y, a3Radius, 168, 85, 247, dark ? 0.11 : 0.06);

      // Aurora 4: Soft Horizon Glow (Lower-Right)
      const a4X = cssWidth * 0.68 + Math.cos(t * 0.3 + 3) * (cssWidth * 0.14) + auroraShiftX;
      const a4Y = cssHeight * 0.82 + Math.sin(t * 0.26 + 1.5) * (cssHeight * 0.1) + auroraShiftY;
      const a4Radius = Math.min(cssWidth, cssHeight) * 0.36;
      drawSoftLight(a4X, a4Y, a4Radius, 14, 165, 233, dark ? 0.12 : 0.06);

      // Aurora 5: Hero Profile Depth Ambient Glow (Soft background light behind profile avatar)
      const profileBaseX = cssWidth >= 768 ? cssWidth * 0.72 : cssWidth * 0.5;
      const profileBaseY = cssHeight * 0.38;
      const profilePulse = 1 + Math.sin(t * 0.75) * 0.07;
      const profileRadius = (cssWidth >= 768 ? 240 : 170) * profilePulse;
      drawSoftLight(
        profileBaseX + auroraShiftX * 0.5,
        profileBaseY + auroraShiftY * 0.5,
        profileRadius,
        6,
        182,
        212,
        dark ? 0.16 : 0.08
      );

      // =========================================================================
      // LAYER 5: AMBIENT CURSOR GLOW
      // Seamless, zero-banding soft illumination following lerped cursor coordinates
      // =========================================================================
      if (!isTouchDevice && !prefersReducedMotion && mouse.opacity > 0.01) {
        const cursorGlowRadius = Math.min(cssWidth, cssHeight) * 0.3;
        const cursorGlowAlpha = mouse.opacity * (dark ? 0.14 : 0.08);
        drawSoftLight(
          mouse.currentX,
          mouse.currentY,
          cursorGlowRadius,
          6,
          182,
          212,
          cursorGlowAlpha
        );
      }

      ctx.restore(); // Restore composite mode

      // =========================================================================
      // LAYER 3 & 4: PARTICLES & DYNAMIC NETWORK WITH 3D DEPTH PARALLAX
      // =========================================================================
      const len = particles.length;
      const mouseRadius = 145;

      for (let i = 0; i < len; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Natural gentle breathing pulse
          p.alpha = p.baseAlpha + Math.sin(t * 2 + p.pulseOffset) * 0.08;

          // Interactive cursor reaction
          if (!isTouchDevice && mouse.active && mouse.opacity > 0.05) {
            const px = p.x + normX * 14 * p.depth;
            const py = p.y + normY * 12 * p.depth;
            const dx = px - mouse.currentX;
            const dy = py - mouse.currentY;
            const dist = Math.hypot(dx, dy);

            if (dist < mouseRadius && dist > 0) {
              const force = (1 - dist / mouseRadius) * 0.35 * p.depth;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force;

              p.alpha = Math.min(dark ? 0.85 : 0.65, p.alpha + (1 - dist / mouseRadius) * 0.25);
            }
          }

          // Screen wrap-around with boundary margin
          const margin = 25;
          if (p.x < -margin) p.x = cssWidth + margin;
          if (p.x > cssWidth + margin) p.x = -margin;
          if (p.y < -margin) p.y = height / dpr + margin;
          if (p.y > height / dpr + margin) p.y = -margin;
        }
      }

      // Draw Dynamic Network Lines (Layer 4)
      for (let i = 0; i < len; i++) {
        const p1 = particles[i];
        const p1X = p1.x + normX * 14 * p1.depth;
        const p1Y = p1.y + normY * 12 * p1.depth;

        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];
          const p2X = p2.x + normX * 14 * p2.depth;
          const p2Y = p2.y + normY * 12 * p2.depth;

          const dx = p1X - p2X;
          const dy = p1Y - p2Y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectionDistance) {
            const factor = 1 - dist / maxConnectionDistance;
            const lineAlpha = factor * (dark ? 0.16 : 0.12) * Math.min(p1.alpha, p2.alpha);

            ctx.beginPath();
            ctx.moveTo(p1X, p1Y);
            ctx.lineTo(p2X, p2Y);
            ctx.strokeStyle = dark
              ? `rgba(6, 182, 212, ${lineAlpha.toFixed(3)})`
              : `rgba(8, 145, 178, ${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.7 * ((p1.depth + p2.depth) * 0.5);
            ctx.stroke();
          }
        }

        // Connecting filament to cursor
        if (!isTouchDevice && mouse.active && mouse.opacity > 0.1) {
          const dxMouse = p1X - mouse.currentX;
          const dyMouse = p1Y - mouse.currentY;
          const distMouse = Math.hypot(dxMouse, dyMouse);

          if (distMouse < 135) {
            const cursorLineAlpha = (1 - distMouse / 135) * (dark ? 0.12 : 0.09) * mouse.opacity;
            ctx.beginPath();
            ctx.moveTo(p1X, p1Y);
            ctx.lineTo(mouse.currentX, mouse.currentY);
            ctx.strokeStyle = dark
              ? `rgba(96, 165, 250, ${cursorLineAlpha.toFixed(3)})`
              : `rgba(37, 99, 235, ${cursorLineAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw Particles (Layer 3)
      for (let i = 0; i < len; i++) {
        const p = particles[i];
        const px = p.x + normX * 14 * p.depth;
        const py = p.y + normY * 12 * p.depth;

        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha.toFixed(2)})`;
        ctx.fill();

        // Subtle outer aura for nearest particles in dark mode
        if (dark && p.depth > 1.25) {
          ctx.beginPath();
          ctx.arc(px, py, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color} ${(p.alpha * 0.15).toFixed(2)})`;
          ctx.fill();
        }
      }

      ctx.restore(); // Restore dpr scale

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [prefersReducedMotion, isDark]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none transition-colors duration-500"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      {/* High-Performance Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Subtle Technical Dot Grid Overlay with radial mask */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035] pointer-events-none transition-opacity duration-500"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(rgba(6, 182, 212, 0.8) 1px, transparent 1px)'
            : 'radial-gradient(rgba(8, 145, 178, 0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 35%, black 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 35%, black 40%, transparent 100%)',
        }}
      />

      {/* Bottom gradient to ensure pristine reading contrast on footer */}
      <div
        className={`absolute inset-x-0 bottom-0 h-40 pointer-events-none transition-colors duration-500 ${
          isDark
            ? 'bg-gradient-to-t from-[#070913]/90 to-transparent'
            : 'bg-gradient-to-t from-[#fafbfe]/90 to-transparent'
        }`}
      />
    </div>
  );
}

export default AuroraInteractiveBackground;
