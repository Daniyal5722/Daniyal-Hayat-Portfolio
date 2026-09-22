import { useEffect, useRef, useMemo } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  color: { r: number; g: number; b: number };
  hasGlow: boolean;
  waveOffset: number;
  waveSpeed: number;
  waveAmplitude: number;
  originalY: number;
}

export function PlexusWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Accessibility check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    const getDeviceConfig = (w: number) => {
      if (w < 640) return { count: 30, dist: 80, speed: 0.5, size: 0.8 }; // Mobile
      if (w < 1024) return { count: 45, dist: 100, speed: 0.7, size: 0.9 }; // Tablet
      if (w < 1440) return { count: 65, dist: 120, speed: 0.8, size: 1.0 }; // Laptop
      return { count: 80, dist: 140, speed: 1.0, size: 1.0 }; // Desktop
    };

    let config = getDeviceConfig(window.innerWidth);
    let particleCount = config.count;
    let connectionDistance = config.dist;
    const waveFreq = 0.002;
    
    let particles: Particle[] = [];

    const colors = {
      cyan: { r: 34, g: 211, b: 238 },      // cyan-400 (#22d3ee)
      electricBlue: { r: 59, g: 130, b: 246 }, // blue-500 (#3b82f6)
      purple: { r: 139, g: 92, b: 246 }    // purple-500 (#8b5cf6)
    };

    const initParticles = (w: number, h: number) => {
      config = getDeviceConfig(w);
      particleCount = config.count;
      connectionDistance = config.dist;
      
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const rand = Math.random();
        let color = colors.cyan;
        if (rand > 0.7) color = colors.electricBlue;
        if (rand > 0.95) color = colors.purple;

        const baseAlpha = Math.random() * 0.15 + 0.12;
        const y = Math.random() * h;

        particles.push({
          x: Math.random() * w,
          y: y,
          originalY: y,
          vx: (Math.random() - 0.5) * (0.35 * config.speed),
          vy: (Math.random() - 0.5) * (0.15 * config.speed),
          radius: (Math.random() * 0.75 + 0.5) * config.size, 
          alpha: baseAlpha,
          baseAlpha: baseAlpha,
          color: color,
          hasGlow: Math.random() > 0.85,
          waveOffset: Math.random() * Math.PI * 2,
          waveSpeed: (0.008 + Math.random() * 0.012) * config.speed,
          waveAmplitude: 25 + Math.random() * 35
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);
      initParticles(width, height);
    };

    let isRunning = false;
    let isVisible = !document.hidden;
    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const startAnimation = () => {
      if (!isRunning && isVisible) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const stopAnimation = () => {
      if (isRunning) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      }
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        startAnimation();
      } else {
        stopAnimation();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('mousemove', handleMouseMove);

    const render = (time: number, forceFrame = false) => {
      if (!forceFrame && (!isVisible || prefersReducedMotion)) {
        isRunning = false;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Hero avoidance zone (rough estimate based on design)
      const isDesktop = width >= 1024;
      const heroZone = isDesktop 
        ? { x: width * 0.75, y: height * 0.45, r: 250 } // Center-right on desktop
        : { x: width * 0.5, y: height * 0.65, r: 180 }; // Centered lower on mobile

      // Draw lines first
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        // Skip lines in hero zone for visual clarity on face
        const distToHero = Math.sqrt((p1.x - heroZone.x) ** 2 + (p1.y - heroZone.y) ** 2);
        const heroClarityFactor = Math.min(1, Math.max(0, (distToHero - heroZone.r * 0.5) / (heroZone.r * 0.5)));

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          const maxDistSq = connectionDistance * connectionDistance;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / connectionDistance) * 0.22 * heroClarityFactor;
            
            if (alpha > 0.01) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${alpha})`;
              ctx.stroke();
            }
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!forceFrame) {
          // Mouse interaction (repulsion)
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 150) {
            const force = (150 - mDist) / 150;
            p.x += (mdx / mDist) * force * 2;
            p.originalY += (mdy / mDist) * force * 2;
          }

          // Wave motion logic
          p.x += p.vx;
          p.waveOffset += p.waveSpeed;
          const waveY = Math.sin(p.x * waveFreq + p.waveOffset) * p.waveAmplitude;
          p.originalY += p.vy;
          p.y = p.originalY + waveY;

          // Wrap around
          const margin = 100;
          if (p.x < -margin) p.x = width + margin;
          if (p.x > width + margin) p.x = -margin;
          if (p.originalY < -margin) p.originalY = height + margin;
          if (p.originalY > height + margin) p.originalY = -margin;
        }

        // Hero zone alpha reduction
        const distToHero = Math.sqrt((p.x - heroZone.x) ** 2 + (p.y - heroZone.y) ** 2);
        const heroAlphaFactor = Math.min(1, Math.max(0.1, (distToHero - heroZone.r * 0.4) / (heroZone.r * 0.6)));

        const currentAlpha = (forceFrame ? p.alpha * 0.7 : p.alpha) * heroAlphaFactor;

        // Glow effect
        if (p.hasGlow && currentAlpha > 0.05) {
          const glowAlpha = currentAlpha * 0.35;
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 7);
          gradient.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${glowAlpha})`);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 7, 0, Math.PI * 2);
          ctx.fill();
        }

        // Particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha})`;
        ctx.fill();
      }

      if (!forceFrame && isRunning) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('resize', resize);
    resize();
    
    startAnimation();

    return () => {
      stopAnimation();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none opacity-[0.25] dark:opacity-[0.35]"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
      {/* Dynamic overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/20 to-slate-100/40 dark:via-slate-950/20 dark:to-slate-950/40 pointer-events-none" />
    </div>
  );
}
