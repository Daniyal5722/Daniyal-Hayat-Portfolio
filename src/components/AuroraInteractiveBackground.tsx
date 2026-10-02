import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  depth: number; // 0.4 (far) to 1.6 (near) for 3D parallax depth
  color: string;
  pulseOffset: number;
  pulseSpeed: number;
}

export function AuroraInteractiveBackground() {
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

  // Main Continuous Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let isTabVisible = !document.hidden;

    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);
    let cssWidth = window.innerWidth;
    let cssHeight = window.innerHeight;

    // Initialize mouse to center
    mouseRef.current.targetX = cssWidth / 2;
    mouseRef.current.targetY = cssHeight / 2;
    mouseRef.current.currentX = cssWidth / 2;
    mouseRef.current.currentY = cssHeight / 2;

    // Particle count: optimal balance between fluidity and performance
    const getParticleCount = () => {
      if (cssWidth < 640) return 22; // Mobile
      if (cssWidth < 1024) return 36; // Tablet
      return 52; // Desktop
    };

    let particles: Particle[] = [];

    const initParticles = () => {
      const count = getParticleCount();
      particles = [];
      const colors = [
        'rgba(6, 182, 212,',   // Electric Cyan
        'rgba(59, 130, 246,',  // Bright Blue
        'rgba(147, 197, 253,', // Soft Sky
        'rgba(168, 85, 247,',  // Radiant Violet
      ];

      for (let i = 0; i < count; i++) {
        const color = colors[i % colors.length];
        const depth = Math.random() * 1.1 + 0.5; // Depth from 0.5 to 1.6
        particles.push({
          x: Math.random() * cssWidth,
          y: Math.random() * cssHeight,
          // Tangible, graceful velocity (clearly moving even when still)
          vx: (Math.random() - 0.5) * (0.45 * depth),
          vy: (Math.random() - 0.5) * (0.45 * depth),
          radius: (Math.random() * 1.2 + 1.1) * depth,
          baseAlpha: (Math.random() * 0.35 + 0.35),
          alpha: 0.4,
          depth,
          color,
          pulseOffset: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.015,
        });
      }
    };

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
        width = canvas.width = cssWidth * dpr;
        height = canvas.height = cssHeight * dpr;
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

    // Visibility change handler
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const maxConnectionDistance = cssWidth < 768 ? 100 : 135;

    // Time tracker for continuous mathematical fluid waves
    let startTime = performance.now();

    // =========================================================================
    // RENDER LOOP: 100% REAL CONTINUOUS ANIMATION
    // =========================================================================
    const render = (now: number) => {
      if (!isTabVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const elapsed = (now - startTime) * 0.001; // elapsed seconds
      const mouse = mouseRef.current;

      // 1. Mouse Lerp Interpolation
      if (!isTouchDevice && !prefersReducedMotion) {
        const lerpFactor = 0.055;
        if (mouse.active) {
          mouse.currentX += (mouse.targetX - mouse.currentX) * lerpFactor;
          mouse.currentY += (mouse.targetY - mouse.currentY) * lerpFactor;
          mouse.opacity += (1 - mouse.opacity) * 0.06;
        } else {
          mouse.opacity += (0 - mouse.opacity) * 0.04;
        }
      }

      // Parallax coordinate normalization (-1 to +1)
      const centerX = cssWidth / 2;
      const centerY = cssHeight / 2;
      const normX = !isTouchDevice && !prefersReducedMotion
        ? (mouse.currentX - centerX) / (centerX || 1)
        : 0;
      const normY = !isTouchDevice && !prefersReducedMotion
        ? (mouse.currentY - centerY) / (centerY || 1)
        : 0;

      // Scale context for HiDPI retina displays
      ctx.save();
      ctx.scale(dpr, dpr);

      // =========================================================================
      // LAYER 1: DEEP ATMOSPHERIC BASE
      // =========================================================================
      // Fill base background
      ctx.fillStyle = '#070913';
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      // Deep atmospheric gradient with subtle 1x parallax
      const baseGradX = centerX + normX * 12;
      const baseGradY = centerY * 0.6 + normY * 10;
      const baseRadius = Math.max(cssWidth, cssHeight) * 0.75;
      const baseGrad = ctx.createRadialGradient(
        baseGradX,
        baseGradY,
        0,
        baseGradX,
        baseGradY,
        baseRadius
      );
      baseGrad.addColorStop(0, '#0f1430');
      baseGrad.addColorStop(0.5, '#090c1c');
      baseGrad.addColorStop(1, '#05060c');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      // =========================================================================
      // LAYER 2: CONTINUOUS FLUID AURORA (Real real-time moving light fields)
      // Visibly undulates and flows smoothly every single frame
      // =========================================================================
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const speedMultiplier = prefersReducedMotion ? 0.08 : 0.65;
      const t = elapsed * speedMultiplier;

      // Parallax 4x shift for aurora layer
      const auroraShiftX = normX * 24;
      const auroraShiftY = normY * 20;

      // Aurora 1: Vibrant Cyan (Sweeping across top-left to center)
      const a1X = cssWidth * 0.3 + Math.sin(t * 0.5) * (cssWidth * 0.18) + auroraShiftX;
      const a1Y = cssHeight * 0.25 + Math.cos(t * 0.4) * (cssHeight * 0.12) + auroraShiftY;
      const a1Radius = Math.min(cssWidth, cssHeight) * (0.42 + Math.sin(t * 0.3) * 0.06);
      const grad1 = ctx.createRadialGradient(a1X, a1Y, 0, a1X, a1Y, a1Radius);
      grad1.addColorStop(0, 'rgba(6, 182, 212, 0.22)');
      grad1.addColorStop(0.45, 'rgba(14, 165, 233, 0.09)');
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      // Aurora 2: Electric Royal Blue (Sweeping right to lower-mid)
      const a2X = cssWidth * 0.75 + Math.cos(t * 0.45) * (cssWidth * 0.16) + auroraShiftX * 1.1;
      const a2Y = cssHeight * 0.42 + Math.sin(t * 0.35) * (cssHeight * 0.15) + auroraShiftY * 1.1;
      const a2Radius = Math.min(cssWidth, cssHeight) * (0.45 + Math.cos(t * 0.25) * 0.05);
      const grad2 = ctx.createRadialGradient(a2X, a2Y, 0, a2X, a2Y, a2Radius);
      grad2.addColorStop(0, 'rgba(59, 130, 246, 0.18)');
      grad2.addColorStop(0.5, 'rgba(37, 99, 235, 0.07)');
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      // Aurora 3: Radiant Violet / Indigo (Lower-left depth harmonic)
      const a3X = cssWidth * 0.22 + Math.sin(t * 0.38 + 1) * (cssWidth * 0.14) + auroraShiftX * 0.9;
      const a3Y = cssHeight * 0.72 + Math.cos(t * 0.42 + 2) * (cssHeight * 0.12) + auroraShiftY * 0.9;
      const a3Radius = Math.min(cssWidth, cssHeight) * (0.38 + Math.sin(t * 0.35) * 0.04);
      const grad3 = ctx.createRadialGradient(a3X, a3Y, 0, a3X, a3Y, a3Radius);
      grad3.addColorStop(0, 'rgba(168, 85, 247, 0.14)');
      grad3.addColorStop(0.48, 'rgba(99, 102, 241, 0.05)');
      grad3.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      // Aurora 4: Soft Emerald / Cyan (Bottom horizon glow)
      const a4X = cssWidth * 0.65 + Math.cos(t * 0.32 + 3) * (cssWidth * 0.15) + auroraShiftX;
      const a4Y = cssHeight * 0.82 + Math.sin(t * 0.28 + 1) * (cssHeight * 0.1) + auroraShiftY;
      const a4Radius = Math.min(cssWidth, cssHeight) * 0.36;
      const grad4 = ctx.createRadialGradient(a4X, a4Y, 0, a4X, a4Y, a4Radius);
      grad4.addColorStop(0, 'rgba(20, 184, 166, 0.12)');
      grad4.addColorStop(0.5, 'rgba(6, 182, 212, 0.04)');
      grad4.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad4;
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      // Aurora 5: Profile Depth Ambient Glow (Soft glow positioned behind Hero profile avatar)
      const profileBaseX = cssWidth >= 768 ? cssWidth * 0.72 : cssWidth * 0.5;
      const profileBaseY = cssHeight * 0.38;
      const profilePulse = 1 + Math.sin(t * 0.8) * 0.08;
      const profileRadius = (cssWidth >= 768 ? 260 : 180) * profilePulse;
      const gradProfile = ctx.createRadialGradient(
        profileBaseX + auroraShiftX * 0.5,
        profileBaseY + auroraShiftY * 0.5,
        0,
        profileBaseX + auroraShiftX * 0.5,
        profileBaseY + auroraShiftY * 0.5,
        profileRadius
      );
      gradProfile.addColorStop(0, 'rgba(6, 182, 212, 0.18)');
      gradProfile.addColorStop(0.45, 'rgba(59, 130, 246, 0.08)');
      gradProfile.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradProfile;
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      // =========================================================================
      // LAYER 5: INTERACTIVE CURSOR AMBIENT GLOW
      // Follows cursor with smooth delayed lerp, large soft blur, low opacity
      // =========================================================================
      if (!isTouchDevice && !prefersReducedMotion && mouse.opacity > 0.01) {
        const glowRadius = Math.min(cssWidth, cssHeight) * 0.32;
        const cursorGrad = ctx.createRadialGradient(
          mouse.currentX,
          mouse.currentY,
          0,
          mouse.currentX,
          mouse.currentY,
          glowRadius
        );
        const glowAlpha = mouse.opacity * 0.16;
        cursorGrad.addColorStop(0, `rgba(6, 182, 212, ${glowAlpha})`);
        cursorGrad.addColorStop(0.35, `rgba(59, 130, 246, ${glowAlpha * 0.55})`);
        cursorGrad.addColorStop(0.7, `rgba(168, 85, 247, ${glowAlpha * 0.2})`);
        cursorGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = cursorGrad;
        ctx.fillRect(0, 0, cssWidth, cssHeight);
      }

      ctx.restore(); // Exit screen blend mode

      // =========================================================================
      // LAYER 3 & 4: PARTICLES & DYNAMIC NETWORK WITH 3D DEPTH PARALLAX
      // =========================================================================
      const len = particles.length;
      const mouseRadius = 155;

      // Update particle positions
      for (let i = 0; i < len; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Natural breathing pulse on particle alpha
          p.alpha = p.baseAlpha + Math.sin(t * 2 + p.pulseOffset) * 0.12;

          // Interactive cursor reaction: subtle push/attraction and proximity brightness
          if (!isTouchDevice && mouse.active && mouse.opacity > 0.05) {
            // Include particle parallax in proximity calculation
            const px = p.x + normX * 16 * p.depth;
            const py = p.y + normY * 14 * p.depth;
            const dx = px - mouse.currentX;
            const dy = py - mouse.currentY;
            const dist = Math.hypot(dx, dy);

            if (dist < mouseRadius && dist > 0) {
              const force = (1 - dist / mouseRadius) * 0.42 * p.depth;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force;

              // Proximity illumination: nearby nodes glow brighter
              p.alpha = Math.min(0.9, p.alpha + (1 - dist / mouseRadius) * 0.35);
            }
          }

          // Screen boundaries wrap-around
          const margin = 30;
          if (p.x < -margin) p.x = cssWidth + margin;
          if (p.x > cssWidth + margin) p.x = -margin;
          if (p.y < -margin) p.y = cssHeight + margin;
          if (p.y > cssHeight + margin) p.y = -margin;
        }
      }

      // Draw Dynamic Network Lines (Layer 4)
      for (let i = 0; i < len; i++) {
        const p1 = particles[i];
        const p1X = p1.x + normX * 16 * p1.depth;
        const p1Y = p1.y + normY * 14 * p1.depth;

        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];
          const p2X = p2.x + normX * 16 * p2.depth;
          const p2Y = p2.y + normY * 14 * p2.depth;

          const dx = p1X - p2X;
          const dy = p1Y - p2Y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectionDistance) {
            // Smooth distance-based opacity
            const factor = 1 - dist / maxConnectionDistance;
            const lineAlpha = factor * 0.18 * Math.min(p1.alpha, p2.alpha);

            ctx.beginPath();
            ctx.moveTo(p1X, p1Y);
            ctx.lineTo(p2X, p2Y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.75 * ((p1.depth + p2.depth) * 0.5);
            ctx.stroke();
          }
        }

        // Draw connecting filament from cursor to closest particles
        if (!isTouchDevice && mouse.active && mouse.opacity > 0.1) {
          const dxMouse = p1X - mouse.currentX;
          const dyMouse = p1Y - mouse.currentY;
          const distMouse = Math.hypot(dxMouse, dyMouse);

          if (distMouse < 140) {
            const cursorLineAlpha = (1 - distMouse / 140) * 0.14 * mouse.opacity;
            ctx.beginPath();
            ctx.moveTo(p1X, p1Y);
            ctx.lineTo(mouse.currentX, mouse.currentY);
            ctx.strokeStyle = `rgba(96, 165, 250, ${cursorLineAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }

      // Draw Particles (Layer 3)
      for (let i = 0; i < len; i++) {
        const p = particles[i];
        const px = p.x + normX * 16 * p.depth;
        const py = p.y + normY * 14 * p.depth;

        // Particle core
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha.toFixed(2)})`;
        ctx.fill();

        // Subtle outer halo for foreground particles
        if (p.depth > 1.2) {
          ctx.beginPath();
          ctx.arc(px, py, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color} ${(p.alpha * 0.18).toFixed(2)})`;
          ctx.fill();
        }
      }

      // Subtle technical grid overlay for depth
      // Drawn with low opacity
      ctx.restore(); // Restore scale

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
  }, [prefersReducedMotion]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      {/* High-Performance Unified Animation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Very Subtle Technical Grid Overlay for Depth */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(6, 182, 212, 0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 35%, black 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 35%, black 40%, transparent 100%)',
        }}
      />

      {/* Subtle bottom gradient to ensure pristine reading contrast on footer */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#070913]/90 to-transparent pointer-events-none" />
    </div>
  );
}

export default AuroraInteractiveBackground;
