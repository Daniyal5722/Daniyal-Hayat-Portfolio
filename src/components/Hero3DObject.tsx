import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Edge {
  p1: number;
  p2: number;
}

export function Hero3DObject() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    // Check if device is mobile or reduced motion
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || prefersReducedMotion) {
      setIsLowPower(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = 340);
    let height = (canvas.height = 340);

    // Generate Icosahedron vertices (Golden Ratio geometry)
    const phi = (1 + Math.sqrt(5)) / 2;
    const baseRadius = 85;

    const rawVertices: Point3D[] = [
      { x: -1, y: phi, z: 0 },
      { x: 1, y: phi, z: 0 },
      { x: -1, y: -phi, z: 0 },
      { x: 1, y: -phi, z: 0 },
      { x: 0, y: -1, z: phi },
      { x: 0, y: 1, z: phi },
      { x: 0, y: -1, z: -phi },
      { x: 0, y: 1, z: -phi },
      { x: phi, y: 0, z: -1 },
      { x: phi, y: 0, z: 1 },
      { x: -phi, y: 0, z: -1 },
      { x: -phi, y: 0, z: 1 },
    ];

    // Normalize and scale
    const vertices: Point3D[] = rawVertices.map((v) => {
      const length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
      return {
        x: (v.x / length) * baseRadius,
        y: (v.y / length) * baseRadius,
        z: (v.z / length) * baseRadius,
      };
    });

    // 30 edges of an icosahedron
    const edges: Edge[] = [
      { p1: 0, p2: 11 }, { p1: 0, p2: 5 }, { p1: 0, p2: 1 }, { p1: 0, p2: 7 }, { p1: 0, p2: 10 },
      { p1: 1, p2: 5 }, { p1: 5, p2: 11 }, { p1: 11, p2: 10 }, { p1: 10, p2: 7 }, { p1: 7, p2: 1 },
      { p1: 3, p2: 9 }, { p1: 3, p2: 4 }, { p1: 3, p2: 2 }, { p1: 3, p2: 6 }, { p1: 3, p2: 8 },
      { p1: 9, p2: 4 }, { p1: 4, p2: 2 }, { p1: 2, p2: 6 }, { p1: 6, p2: 8 }, { p1: 8, p2: 9 },
      { p1: 4, p2: 5 }, { p1: 5, p2: 9 }, { p1: 8, p2: 1 }, { p1: 1, p2: 9 }, { p1: 7, p2: 8 },
      { p1: 6, p2: 7 }, { p1: 10, p2: 6 }, { p1: 2, p2: 10 }, { p1: 11, p2: 2 }, { p1: 4, p2: 11 },
    ];

    let angleX = 0.2;
    let angleY = 0.3;
    let targetSpeedX = 0.003;
    let targetSpeedY = 0.005;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX = (e.clientX - cx) * 0.00015;
      mouseY = (e.clientY - cy) * 0.00015;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let isVisible = true;
    const handleScroll = () => {
      // Pause animation if scrolled past hero
      if (window.scrollY > window.innerHeight) {
        isVisible = false;
      } else {
        isVisible = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const isDarkMode = () => document.documentElement.classList.contains('dark');

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Rotate with inertia + mouse influence
      angleX += targetSpeedX + mouseY;
      angleY += targetSpeedY + mouseX;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Project vertices to 2D
      const projected = vertices.map((v) => {
        // Rotate around Y
        let x1 = v.x * cosY + v.z * sinY;
        let y1 = v.y;
        let z1 = -v.x * sinY + v.z * cosY;

        // Rotate around X
        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        // Perspective camera
        const distance = 280;
        const fov = distance / (distance + z2);
        return {
          x: x2 * fov + width / 2,
          y: y2 * fov + height / 2,
          z: z2,
          fov,
        };
      });

      const dark = isDarkMode();
      const edgeColor = dark ? '56, 189, 248' : '2, 132, 199'; // Sky/Cyan
      const vertexColor = dark ? '168, 85, 247' : '124, 58, 237'; // Purple/Violet

      // Draw Edges
      edges.forEach((edge) => {
        const p1 = projected[edge.p1];
        const p2 = projected[edge.p2];

        // Depth-based opacity
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.12, Math.min(0.85, (avgZ + 100) / 180));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(${edgeColor}, ${alpha * (dark ? 0.75 : 0.55)})`;
        ctx.lineWidth = 1.25 * ((p1.fov + p2.fov) / 2);
        ctx.stroke();
      });

      // Draw Glowing Vertices
      projected.forEach((p) => {
        const alpha = Math.max(0.2, (p.z + 100) / 180);
        const radius = Math.max(1.5, 3.2 * p.fov);

        // Core vertex dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${vertexColor}, ${alpha})`;
        ctx.fill();

        // Subtle glow aura on front vertices
        if (p.z > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha * 0.25})`;
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isLowPower) {
    // Lightweight, stylish CSS holographic element for mobile
    return (
      <div className="relative w-40 h-40 mx-auto my-4 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-cyan-500/30 dark:border-cyan-500/40 animate-spin [animation-duration:12s]" />
        <div className="absolute inset-3 rounded-full border border-violet-500/30 dark:border-violet-500/40 animate-spin [animation-duration:8s] [animation-direction:reverse]" />
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/40 flex items-center justify-center">
          <span className="font-mono text-xs font-bold text-cyan-400">DH</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-[340px] h-[340px] flex items-center justify-center pointer-events-none select-none">
      {/* Background radial halo */}
      <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-violet-500/15 blur-2xl" />
      <canvas
        ref={canvasRef}
        width={340}
        height={340}
        className="relative z-10 w-full h-full drop-shadow-xl"
      />
    </div>
  );
}
