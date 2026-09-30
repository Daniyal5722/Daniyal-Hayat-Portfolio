import { useEffect, useRef } from 'react';

interface CardInteractiveCanvasProps {
  className?: string;
  isHovered: boolean;
  mousePos: { x: number; y: number };
  accentColor?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  color: string;
}

export function CardInteractiveCanvas({
  className = '',
  isHovered,
  mousePos,
  accentColor = '#06b6d4',
}: CardInteractiveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Store mutable refs for high 60fps render loop
  const stateRef = useRef({
    isHovered,
    mouseX: mousePos.x,
    mouseY: mousePos.y,
    smoothMouseX: mousePos.x,
    smoothMouseY: mousePos.y,
  });

  useEffect(() => {
    stateRef.current.isHovered = isHovered;
    stateRef.current.mouseX = mousePos.x;
    stateRef.current.mouseY = mousePos.y;
  }, [isHovered, mousePos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animId: number;
    let isVisible = !document.hidden;

    const particleCount = 28;
    let particles: Particle[] = [];

    const initParticles = (w: number, h: number) => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 0.8,
          baseAlpha: Math.random() * 0.35 + 0.15,
          alpha: 0,
          color: Math.random() > 0.4 ? accentColor : '#818cf8',
        });
      }
    };

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initParticles(width, height);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    let hoverTransition = 0;

    const render = () => {
      animId = requestAnimationFrame(render);

      if (!isVisible || prefersReducedMotion) return;

      const { isHovered: hovered, mouseX, mouseY } = stateRef.current;

      // Smooth hover fade in/out
      if (hovered) {
        hoverTransition += (1 - hoverTransition) * 0.1;
      } else {
        hoverTransition += (0 - hoverTransition) * 0.08;
      }

      // Smooth mouse position damping
      stateRef.current.smoothMouseX += (mouseX - stateRef.current.smoothMouseX) * 0.15;
      stateRef.current.smoothMouseY += (mouseY - stateRef.current.smoothMouseY) * 0.15;

      const smX = stateRef.current.smoothMouseX;
      const smY = stateRef.current.smoothMouseY;

      ctx.clearRect(0, 0, width, height);

      // Only draw if there is some hover opacity or idle presence
      if (hoverTransition < 0.01) return;

      // 1. Draw Cursor-Following Ambient Light Glow
      if (smX > 0 && smY > 0) {
        const glowRadius = Math.max(width * 0.45, 160);
        const radialGlow = ctx.createRadialGradient(smX, smY, 0, smX, smY, glowRadius);
        radialGlow.addColorStop(0, `rgba(6, 182, 212, ${0.18 * hoverTransition})`);
        radialGlow.addColorStop(0.5, `rgba(59, 130, 246, ${0.08 * hoverTransition})`);
        radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = radialGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Proximity Connecting Lines between active particles
      const maxConnectDist = 85;
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnectDist * maxConnectDist) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxConnectDist) * 0.22 * hoverTransition;
            ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 3. Update & Draw Particles with cursor attraction
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Slight drift
        p.x += p.vx;
        p.y += p.vy;

        // Cursor attraction/reaction when hovered
        if (hovered && smX > 0 && smY > 0) {
          const mdx = smX - p.x;
          const mdy = smY - p.y;
          const mDist = Math.hypot(mdx, mdy);
          const reactRadius = 140;

          if (mDist < reactRadius && mDist > 5) {
            const force = (reactRadius - mDist) / reactRadius;
            p.x += (mdx / mDist) * force * 0.8;
            p.y += (mdy / mDist) * force * 0.8;
          }
        }

        // Screen boundary bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Dynamic alpha based on cursor proximity
        let activeAlpha = p.baseAlpha * hoverTransition;
        if (smX > 0 && smY > 0) {
          const mDist = Math.hypot(smX - p.x, smY - p.y);
          if (mDist < 120) {
            activeAlpha += (1 - mDist / 120) * 0.4 * hoverTransition;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${Math.min(1, activeAlpha)})`;
        ctx.fill();
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [accentColor]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden rounded-inherit ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
