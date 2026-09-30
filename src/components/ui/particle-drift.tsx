import React, { useEffect, useRef, useState } from "react";

export interface ParticleDriftProps {
  mode?: "dark" | "light" | "auto";
  speed?: number;
  density?: number;
  particleSize?: number;
  connectionDistance?: number;
  connectionOpacity?: number;
  particleOpacity?: number;
  streamCount?: number;
  interactionRadius?: number;
  color?: "cyan" | "electric" | "purple" | "custom";
  enabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

interface ParticleNode {
  x: number;
  y: number;
  originalY: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  color: ColorRGB;
  hasGlow: boolean;
  waveOffset: number;
  waveSpeed: number;
  waveAmplitude: number;
  char: string | null;
  charSwapTimer: number;
}

interface DataStream {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  width: number;
  color: ColorRGB;
}

const ASCII_CHARS = ["0", "1", "A", "B", "C", "@", "#", "%", "&", "*"];

export default function ParticleDrift({
  mode = "dark",
  speed = 1,
  density = 1,
  particleSize = 1,
  connectionDistance = 125,
  connectionOpacity = 0.18,
  particleOpacity = 0.6,
  streamCount = 20,
  interactionRadius = 140,
  color = "cyan",
  enabled = true,
  className = "",
  style = {},
}: ParticleDriftProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [fadeOpacity, setFadeOpacity] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Accessibility check
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Smooth page-load fade-in
    let fadeTimer = requestAnimationFrame(() => setFadeOpacity(1));

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Determine target device scale factors
    const getDeviceConfig = (w: number) => {
      if (w < 640) return { count: Math.round(32 * density), streams: Math.round(8 * (streamCount / 20)), dist: Math.round(90 * (connectionDistance / 125)), speedMult: 0.5 };
      if (w < 1024) return { count: Math.round(52 * density), streams: Math.round(14 * (streamCount / 20)), dist: Math.round(110 * (connectionDistance / 125)), speedMult: 0.75 };
      if (w < 1440) return { count: Math.round(75 * density), streams: Math.round(streamCount), dist: Math.round(connectionDistance), speedMult: 0.9 };
      return { count: Math.round(95 * density), streams: Math.round(streamCount * 1.2), dist: Math.round(connectionDistance * 1.15), speedMult: 1.0 };
    };

    let devConfig = getDeviceConfig(window.innerWidth);
    let particles: ParticleNode[] = [];
    let streams: DataStream[] = [];

    const PALETTE = {
      cyan: { r: 34, g: 211, b: 238 },        // Cyan 400
      electric: { r: 59, g: 130, b: 246 },    // Electric Blue 500
      coolGray: { r: 148, g: 163, b: 184 },   // Slate 400
      purple: { r: 139, g: 92, b: 246 },      // Purple 500
    };

    const getParticleColor = (): ColorRGB => {
      if (color === "electric") return PALETTE.electric;
      if (color === "purple") return PALETTE.purple;
      
      // Default natural blend
      const rand = Math.random();
      if (rand > 0.85) return PALETTE.purple;
      if (rand > 0.5) return PALETTE.electric;
      if (rand > 0.3) return PALETTE.coolGray;
      return PALETTE.cyan;
    };

    const initElements = (w: number, h: number) => {
      devConfig = getDeviceConfig(w);
      const { count, streams: numStreams, speedMult } = devConfig;

      // 1. Initialize Particles
      particles = [];
      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        const baseAlpha = (Math.random() * 0.35 + 0.25) * particleOpacity;
        const y = Math.random() * h;
        const isAscii = rand < 0.18; // ~18% subtle ASCII characters

        particles.push({
          x: Math.random() * w,
          y,
          originalY: y,
          vx: (Math.random() * 0.35 + 0.1) * speed * speedMult, // Slow forward horizontal drift
          vy: (Math.random() - 0.5) * 0.12 * speed * speedMult,
          radius: (Math.random() * 0.8 + 0.6) * particleSize,
          alpha: baseAlpha,
          baseAlpha,
          color: getParticleColor(),
          hasGlow: Math.random() > 0.82,
          waveOffset: Math.random() * Math.PI * 2,
          waveSpeed: (0.006 + Math.random() * 0.01) * speed * speedMult,
          waveAmplitude: 18 + Math.random() * 28,
          char: isAscii ? ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)] : null,
          charSwapTimer: Math.random() * 300,
        });
      }

      // 2. Initialize Data Streams (Upward flowing data streaks)
      streams = [];
      for (let i = 0; i < numStreams; i++) {
        const streamColor = Math.random() > 0.6 ? PALETTE.cyan : PALETTE.electric;
        streams.push({
          x: Math.random() * w,
          y: Math.random() * h,
          length: (Math.random() * 80 + 40) * particleSize,
          speed: (Math.random() * 2.5 + 1.2) * speed * speedMult,
          opacity: (Math.random() * 0.22 + 0.08) * connectionOpacity * 2,
          width: Math.random() * 0.8 + 0.6,
          color: streamColor,
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
      initElements(width, height);
    };

    let isRunning = false;
    let isVisible = !document.hidden;
    const mouse = { x: -1000, y: -1000 };
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchDevice) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
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
      if (isVisible) startAnimation();
      else stopAnimation();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    const render = (_time: number, forceFrame = false) => {
      if (!forceFrame && (!isVisible || prefersReducedMotion)) {
        isRunning = false;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const waveFreq = 0.0022;
      const effectiveDist = devConfig.dist;

      // Hero profile image avoidance zone calculation (to ensure face remains sharp and crystal clear)
      const isDesktop = width >= 1024;
      const heroZone = isDesktop
        ? { x: width * 0.76, y: height * 0.44, r: 240 } // Center-right on desktop
        : { x: width * 0.5, y: height * 0.62, r: 170 };  // Centered lower on mobile

      // 1. Draw Data Streams (Subtle vertical computational data streaks)
      streams.forEach((s) => {
        if (!forceFrame) {
          s.y -= s.speed;
          if (s.y + s.length < -20) {
            s.y = height + Math.random() * 100;
            s.x = Math.random() * width;
          }
        }

        const gradient = ctx.createLinearGradient(s.x, s.y, s.x, s.y + s.length);
        gradient.addColorStop(0, `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${s.opacity})`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = s.width;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x, s.y + s.length);
        ctx.stroke();
      });

      // 2. Draw Proximity Connecting Network Lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Hero zone clarity dampening
        const distToHero1 = Math.hypot(p1.x - heroZone.x, p1.y - heroZone.y);
        const heroClarity1 = Math.min(1, Math.max(0, (distToHero1 - heroZone.r * 0.5) / (heroZone.r * 0.5)));

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          const maxDistSq = effectiveDist * effectiveDist;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            let alpha = (1 - dist / effectiveDist) * connectionOpacity * heroClarity1;

            // Highlight connection lines slightly near cursor
            if (!isTouchDevice && mouse.x > 0) {
              const midX = (p1.x + p2.x) / 2;
              const midY = (p1.y + p2.y) / 2;
              const mouseDist = Math.hypot(midX - mouse.x, midY - mouse.y);
              if (mouseDist < interactionRadius) {
                const mouseBoost = (1 - mouseDist / interactionRadius) * 0.15;
                alpha += mouseBoost;
              }
            }

            if (alpha > 0.01) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${Math.min(0.45, alpha)})`;
              ctx.stroke();
            }
          }
        }
      }

      // 3. Update & Draw Particle Nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!forceFrame) {
          // Subtle mouse attraction/repulsion on desktop
          if (!isTouchDevice && mouse.x > 0) {
            const mdx = p.x - mouse.x;
            const mdy = p.y - mouse.y;
            const mDist = Math.hypot(mdx, mdy);
            if (mDist < interactionRadius && mDist > 0) {
              const force = (interactionRadius - mDist) / interactionRadius;
              p.x += (mdx / mDist) * force * 1.5;
              p.originalY += (mdy / mDist) * force * 1.5;
            }
          }

          // Gentle horizontal wave & drift
          p.x += p.vx;
          p.waveOffset += p.waveSpeed;
          const waveY = Math.sin(p.x * waveFreq + p.waveOffset) * p.waveAmplitude;
          p.originalY += p.vy;
          p.y = p.originalY + waveY;

          // Occasional subtle ASCII character swap
          if (p.char) {
            p.charSwapTimer += 1;
            if (p.charSwapTimer > 240 || Math.random() > 0.992) {
              p.char = ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
              p.charSwapTimer = 0;
            }
          }

          // Screen Wrap-around
          const margin = 60;
          if (p.x < -margin) p.x = width + margin;
          if (p.x > width + margin) p.x = -margin;
          if (p.originalY < -margin) p.originalY = height + margin;
          if (p.originalY > height + margin) p.originalY = -margin;
        }

        // Hero zone alpha reduction factor
        const distToHero = Math.hypot(p.x - heroZone.x, p.y - heroZone.y);
        const heroAlphaFactor = Math.min(1, Math.max(0.12, (distToHero - heroZone.r * 0.4) / (heroZone.r * 0.6)));
        const currentAlpha = p.alpha * heroAlphaFactor;

        // Glowing backdrop dot
        if (p.hasGlow && currentAlpha > 0.05) {
          const glowAlpha = currentAlpha * 0.28;
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 6);
          gradient.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${glowAlpha})`);
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 6, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw Particle Core or Subtle ASCII Character
        if (p.char) {
          ctx.font = `${Math.round(10 * particleSize)}px monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha * 0.8})`;
          ctx.fillText(p.char, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha})`;
          ctx.fill();
        }
      }

      if (!forceFrame && isRunning) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener("resize", resize, { passive: true });
    resize();

    startAnimation();

    return () => {
      stopAnimation();
      cancelAnimationFrame(fadeTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [
    enabled,
    speed,
    density,
    particleSize,
    connectionDistance,
    connectionOpacity,
    particleOpacity,
    streamCount,
    interactionRadius,
    color,
    mode,
  ]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none transition-opacity duration-1000 ${className}`}
      style={{
        opacity: fadeOpacity,
        ...style,
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
