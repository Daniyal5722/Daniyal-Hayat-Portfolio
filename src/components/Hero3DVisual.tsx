import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Hero3DVisualProps {
  className?: string;
  isInteractive?: boolean;
}

export function Hero3DVisual({ className = '', isInteractive = true }: Hero3DVisualProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Verify WebGL availability
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL not supported for 3D visual:', e);
      setIsSupported(false);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 4.2;

    // Group holding the 3D visual elements
    const visualGroup = new THREE.Group();
    scene.add(visualGroup);

    // 1. Outer Faceted Geometric Wireframe (Icosahedron)
    const outerGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Cyan
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const outerMesh = new THREE.Mesh(outerGeo, wireframeMat);
    visualGroup.add(outerMesh);

    // 2. Inner Glowing Core / Gem (Octahedron with glass/metallic aesthetic)
    const innerGeo = new THREE.OctahedronGeometry(0.7, 0);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6, // Electric Blue
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.3,
      metalness: 0.85,
      roughness: 0.15,
      transmission: 0.6,
      thickness: 1.2,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    visualGroup.add(innerMesh);

    // 3. Inner Wireframe Accent Cage
    const innerWireGeo = new THREE.OctahedronGeometry(0.72, 0);
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7, // Purple accent
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const innerWireMesh = new THREE.Mesh(innerWireGeo, innerWireMat);
    visualGroup.add(innerWireMesh);

    // 4. Orbiting Geometric Rings / Tech Gyroscope
    const ring1Geo = new THREE.TorusGeometry(1.5, 0.015, 16, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.4,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    visualGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.65, 0.012, 16, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.3,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    visualGroup.add(ring2);

    // 5. Constellation Particles Swarm around the object
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x06b6d4); // cyan
    const color2 = new THREE.Color(0x8b5cf6); // purple
    const tempColor = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.3 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      tempColor.lerpColors(color1, color2, Math.random());
      colors[i * 3] = tempColor.r;
      colors[i * 3 + 1] = tempColor.g;
      colors[i * 3 + 2] = tempColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    visualGroup.add(particles);

    // 6. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x06b6d4, 2.5);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xa855f7, 2.0);
    fillLight.position.set(-3, -2, -2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x38bdf8, 3, 10);
    rimLight.position.set(0, 0, -2);
    scene.add(rimLight);

    // Mouse and Parallax State
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let scrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isInteractive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
      targetRotationY = mouseX * 0.6;
      targetRotationX = -mouseY * 0.45;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer?.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    // Visibility Handling
    let isVisible = !document.hidden;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // WebGL Context Management
    const gl = renderer.getContext();
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(animFrameId);
    };
    const handleContextRestored = () => {
      animFrameId = requestAnimationFrame(animate);
    };
    container.addEventListener('webglcontextlost', handleContextLost, false);
    container.addEventListener('webglcontextrestored', handleContextRestored, false);

    // Animation Loop
    let animFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      if (!isVisible || prefersReducedMotion) {
        renderer?.render(scene, camera);
        return;
      }

      const delta = clock.getDelta();

      // Smooth mouse lerp
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      // Base idle rotations
      outerMesh.rotation.y += delta * 0.35;
      outerMesh.rotation.x += delta * 0.2;

      innerMesh.rotation.y -= delta * 0.45;
      innerMesh.rotation.z += delta * 0.25;

      innerWireMesh.rotation.y -= delta * 0.45;
      innerWireMesh.rotation.z += delta * 0.25;

      ring1.rotation.z += delta * 0.4;
      ring2.rotation.x += delta * 0.3;

      particles.rotation.y += delta * 0.15;
      particles.rotation.x += delta * 0.08;

      // Apply interactive tilt and scroll drift
      visualGroup.rotation.x = currentRotationX + scrollY * 0.0003;
      visualGroup.rotation.y = currentRotationY;
      visualGroup.position.y = Math.sin(clock.getElapsedTime() * 1.5) * 0.08 - scrollY * 0.0004;

      renderer?.render(scene, camera);
    };

    animFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
      resizeObserver.disconnect();

      container.removeEventListener('webglcontextlost', handleContextLost);
      container.removeEventListener('webglcontextrestored', handleContextRestored);

      // Clean disposal
      outerGeo.dispose();
      wireframeMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      innerWireGeo.dispose();
      innerWireMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [isInteractive]);

  if (!isSupported) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="w-24 h-24 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`relative pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
