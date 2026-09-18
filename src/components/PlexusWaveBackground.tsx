import { useEffect, useRef } from 'react';

export interface PlexusWaveBackgroundProps {
  className?: string;
  /** Custom particle count override (defaults dynamically based on device) */
  particleCount?: number;
  /** Maximum distance to draw connecting threads */
  connectionDistance?: number;
  /** Enable mouse and scroll interaction */
  interactive?: boolean;
}

interface PlexusNode {
  // Spatial coordinates
  x: number;
  y: number;
  vx: number;
  vy: number;
  // Depth (Z-axis) properties
  baseZ: number; // 0.15 (far background) to 1.0 (near foreground)
  z: number;
  zFreq: number; // Oscillation frequency
  zPhase: number; // Oscillation phase offset
  zAmp: number; // Oscillation amplitude
  // Visual properties
  baseRadius: number;
  baseAlpha: number;
  // Dynamic projected state
  currentX: number;
  currentY: number;
  currentZ: number;
  currentRadius: number;
  currentAlpha: number;
}

export function PlexusWaveBackground({
  className = 'absolute inset-0 pointer-events-none z-[2]',
  particleCount: propParticleCount,
  connectionDistance: propConnectionDistance,
  interactive = true,
}: PlexusWaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Adaptive configuration
    const count =
      propParticleCount ??
      (isMobile ? 22 : prefersReducedMotion ? 35 : 65);
    const maxConnectionDistance =
      propConnectionDistance ?? (isMobile ? 70 : 125);
    const mouseRadius = isMobile ? 90 : 150;

    // Smoothed mouse coordinates & parallax target
    const mouse = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
      // Normalized offset (-1 to 1) from screen center for 3D parallax
      parallaxX: 0,
      parallaxY: 0,
      targetParallaxX: 0,
      targetParallaxY: 0,
    };

    // Smoothed scroll tracker for depth parallax
    const scroll = {
      currentY: window.scrollY,
      targetY: window.scrollY,
      deltaY: 0,
    };

    // Initialize 3D Plexus particles with randomized depth properties
    const particles: PlexusNode[] = [];
    for (let i = 0; i < count; i++) {
      // Randomized depth: 0.15 (far background, tiny, faint) to 1.0 (near camera, prominent)
      const baseZ = 0.15 + Math.random() * 0.85;
      const baseAlpha = 0.12 + Math.random() * 0.35;
      const baseRadius = 1.0 + Math.random() * 1.6;

      // Z-oscillation parameters for subtle 3D harmonic wave motion
      const zFreq = 0.0012 + Math.random() * 0.0016; // Frequency in ms-1
      const zPhase = Math.random() * Math.PI * 2;
      const zAmp = 0.08 + Math.random() * 0.14; // Amplitude of Z-displacement

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (0.25 + baseZ * 0.25),
        vy: (Math.random() - 0.5) * (0.25 + baseZ * 0.25),
        baseZ,
        z: baseZ,
        zFreq,
        zPhase,
        zAmp,
        baseRadius,
        baseAlpha,
        currentX: 0,
        currentY: 0,
        currentZ: baseZ,
        currentRadius: baseRadius,
        currentAlpha: baseAlpha,
      });
    }

    // Set canvas dimensions with high-DPI scaling
    const setCanvasDimensions = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setCanvasDimensions();

    const handleResize = () => {
      setCanvasDimensions();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      // Center-relative normalized coordinates (-1 to 1)
      mouse.targetParallaxX = (e.clientX - width * 0.5) / (width * 0.5);
      mouse.targetParallaxY = (e.clientY - height * 0.5) / (height * 0.5);
    };

    const handleMouseLeave = () => {
      mouse.targetX = -2000;
      mouse.targetY = -2000;
      mouse.targetParallaxX = 0;
      mouse.targetParallaxY = 0;
    };

    const handleScroll = () => {
      if (!interactive) return;
      scroll.targetY = window.scrollY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const isDarkMode = () => document.documentElement.classList.contains('dark');

    let startTime = performance.now();

    const render = (currentTime: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const elapsed = currentTime - startTime;

      ctx.clearRect(0, 0, width, height);

      // Smooth interpolation for mouse positions and parallax coordinates
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;
      mouse.parallaxX += (mouse.targetParallaxX - mouse.parallaxX) * 0.06;
      mouse.parallaxY += (mouse.targetParallaxY - mouse.parallaxY) * 0.06;

      // Smooth interpolation for page scroll parallax
      const prevScrollY = scroll.currentY;
      scroll.currentY += (scroll.targetY - scroll.currentY) * 0.08;
      scroll.deltaY = scroll.currentY - prevScrollY;

      const dark = isDarkMode();
      // Color palette tuned to high-contrast cyan/sky tech aesthetic
      const dotRGB = dark ? '125, 211, 252' : '14, 165, 233'; // Sky-300 / Sky-500
      const lineRGB = dark ? '56, 189, 248' : '2, 132, 199'; // Sky-400 / Sky-600
      const glowRGB = dark ? '56, 189, 248' : '56, 189, 248';

      // Parallax multiplier factors
      const maxMouseParallaxOffset = isMobile ? 18 : 34; // Max pixels shifted by mouse at Z=1
      const scrollParallaxFactor = 0.18; // Speed differential per depth layer

      // 1. Update particle 3D state, Z-oscillation, and screen positions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Harmonic Z-oscillation with wave dispersion across coordinates
        // Creates undulating wave ripples across the 3D depth field
        const waveDispersion = p.x * 0.0018 + p.y * 0.0018;
        const zOscillation = Math.sin(elapsed * p.zFreq + p.zPhase + waveDispersion) * p.zAmp;
        const currentZ = Math.max(0.12, Math.min(1.15, p.baseZ + zOscillation));
        p.currentZ = currentZ;

        // Depth simulation: Node size varies dynamically with Z-axis
        // Higher Z (closer) -> larger diameter; lower Z (far) -> smaller diameter
        p.currentRadius = p.baseRadius * (0.55 + currentZ * 0.95);

        // Depth simulation: Node opacity varies dynamically with Z-axis
        // Far nodes are hazy/atmospheric (0.15-0.3), near nodes are crisp and prominent (0.5-0.9)
        const depthAlphaFactor = 0.3 + currentZ * 0.7;
        let targetAlpha = p.baseAlpha * depthAlphaFactor;

        // Move base planar coordinates
        p.x += p.vx;
        p.y += p.vy;

        // Soft screen border wrap-around with padding
        const margin = 20;
        if (p.x < -margin) p.x = width + margin;
        else if (p.x > width + margin) p.x = -margin;
        if (p.y < -margin) p.y = height + margin;
        else if (p.y > height + margin) p.y = -margin;

        // 3D Parallax Calculation:
        // Relative mouse parallax: Foreground nodes shift significantly more than background nodes
        const depthParallaxMultiplier = (currentZ - 0.45) * 1.5;
        const mouseOffsetX = mouse.parallaxX * maxMouseParallaxOffset * depthParallaxMultiplier;
        const mouseOffsetY = mouse.parallaxY * maxMouseParallaxOffset * depthParallaxMultiplier;

        // Scroll Parallax: Scroll offset creates a vertical layer fly-by effect
        // Nodes at different depths move past each other at distinct rates
        const scrollOffsetY = (scroll.currentY * scrollParallaxFactor * (currentZ - 0.5)) % height;

        // Calculate rendered screen coordinate
        let screenX = p.x + mouseOffsetX;
        let screenY = p.y - scrollOffsetY + mouseOffsetY;

        // Wrap around screen viewport to keep continuous parallax field
        if (screenX < -margin) screenX += width + margin * 2;
        else if (screenX > width + margin) screenX -= width + margin * 2;
        if (screenY < -margin) screenY += height + margin * 2;
        else if (screenY > height + margin) screenY -= height + margin * 2;

        p.currentX = screenX;
        p.currentY = screenY;

        // Mouse proximity interaction:
        // Cursor proximity increases brightness and provides gentle 3D repulsion
        const dx = mouse.x - screenX;
        const dy = mouse.y - screenY;
        const distToMouse = Math.hypot(dx, dy);

        if (distToMouse < mouseRadius && distToMouse > 0) {
          const proximityForce = (mouseRadius - distToMouse) / mouseRadius;
          const pushAngle = Math.atan2(dy, dx);
          // Foreground particles respond more vigorously to mouse interaction
          const pushStrength = proximityForce * 1.8 * currentZ;
          p.x -= Math.cos(pushAngle) * pushStrength;
          p.y -= Math.sin(pushAngle) * pushStrength;

          // Illuminating glow when mouse is near
          targetAlpha = Math.min(targetAlpha + proximityForce * 0.55 * currentZ, 0.95);
        }

        // Smooth transition of opacity
        p.currentAlpha += (targetAlpha - p.currentAlpha) * 0.08;
      }

      // 2. Draw 3D Plexus Connection Lines with depth-weighted opacity & width
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];

          const dx = p1.currentX - p2.currentX;
          const dy = p1.currentY - p2.currentY;
          const dist2D = Math.hypot(dx, dy);

          // Connection threshold scales with depth (closer layers connect more prominently)
          const avgZ = (p1.currentZ + p2.currentZ) * 0.5;
          const effectiveConnectionDist = maxConnectionDistance * (0.75 + avgZ * 0.35);

          if (dist2D < effectiveConnectionDist) {
            // Distance factor: fades out as distance approaches limit
            const proximity = 1 - dist2D / effectiveConnectionDist;

            // Z-difference: connections between particles on vastly different depth planes are dimmer
            const zDifference = Math.abs(p1.currentZ - p2.currentZ);
            const zCoherence = Math.max(0.2, 1 - zDifference * 1.2);

            // Line opacity and width scale with average depth (near lines are crisp, far lines are faint)
            const lineAlpha = proximity * 0.26 * (0.35 + avgZ * 0.65) * zCoherence;
            const lineWidth = (0.4 + avgZ * 0.75) * (0.8 + proximity * 0.4);

            ctx.beginPath();
            ctx.moveTo(p1.currentX, p1.currentY);
            ctx.lineTo(p2.currentX, p2.currentY);
            ctx.strokeStyle = `rgba(${lineRGB}, ${lineAlpha})`;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
          }
        }
      }

      // 3. Draw 3D Plexus Nodes (sorted or rendered with subtle depth glow)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Soft halo glow for near foreground particles (Z > 0.7)
        if (p.currentZ > 0.7 && p.currentAlpha > 0.35) {
          ctx.beginPath();
          ctx.arc(p.currentX, p.currentY, p.currentRadius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${glowRGB}, ${p.currentAlpha * 0.15})`;
          ctx.fill();
        }

        // Primary particle node
        ctx.beginPath();
        ctx.arc(p.currentX, p.currentY, Math.max(0.6, p.currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotRGB}, ${p.currentAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [interactive, propConnectionDistance, propParticleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    />
  );
}

// Export ParticleField as an alias so existing components and imports remain 100% compatible
export const ParticleField = PlexusWaveBackground;
