export interface CreativeLabItem {
  id: string;
  title: string;
  category: 'UI Experiments' | 'Visual Concepts' | 'Motion & Canvas' | 'Brand & Graphics';
  date: string;
  description: string;
  tags: string[];
  accentColor: string;
  details: string;
  previewUrl?: string;
  badge?: string;
}

export const CREATIVE_LAB_ITEMS: CreativeLabItem[] = [
  {
    id: "lab-1",
    title: "DNYL Eyewear Minimalist Brand & Visual Concept",
    category: "Brand & Graphics",
    date: "2025",
    description: "High-contrast luxury eyewear branding identity, bespoke editorial layout typography, and digital art direction.",
    tags: ["Canva", "Brand Identity", "Editorial Typography", "Art Direction"],
    accentColor: "cyan",
    badge: "Brand Identity",
    details: "Crafted for DNYL Eyewear exploring ultra-minimalist serif and sans-serif pairings, monochrome high-fashion composition, and product card staging."
  },
  {
    id: "lab-2",
    title: "Kinetic Velocity & Elastic Magnetic Buttons",
    category: "UI Experiments",
    date: "2025",
    description: "Physics-based magnetic cursor attraction with damping spring physics and tactile micro-audio feedback.",
    tags: ["Motion", "Micro-Interactions", "Spring Physics", "Sound Design"],
    accentColor: "blue",
    badge: "Interactive UI",
    details: "Exploration of subtle 2D cursor gravity wells that pull interactive elements toward user pointers without jitter or disorientation."
  },
  {
    id: "lab-3",
    title: "Faryal FC Matchday Poster & Social Design System",
    category: "Brand & Graphics",
    date: "2025",
    description: "Vibrant athletic poster design system crafted with bold typography, dynamic player silhouettes, and matchday stats.",
    tags: ["Graphic Design", "Canva", "Sports Media", "Visual Layouts"],
    accentColor: "emerald",
    badge: "Visual Concept",
    details: "Developed as a flexible social template system for Faryal FC to announce fixtures, starting line-ups, and player of the match graphics."
  },
  {
    id: "lab-4",
    title: "Algorithmic Plexus & Particle Drift Network",
    category: "Motion & Canvas",
    date: "2026",
    description: "Hardware-accelerated HTML5 Canvas particle mesh with proximity threshold algorithms and responsive density scaling.",
    tags: ["HTML5 Canvas", "Math Algorithms", "60 FPS", "Reduced Motion"],
    accentColor: "purple",
    badge: "Canvas Experiment",
    details: "Calculates spatial distance matrices between moving vector nodes to dynamically generate translucent connecting webs with cursor repulsion."
  },
  {
    id: "lab-5",
    title: "Obsidian Glassmorphic Telemetry HUD Card",
    category: "UI Experiments",
    date: "2025",
    description: "Futuristic dark-mode computational telemetry panel featuring real-time token rate indicators and cyber accents.",
    tags: ["Figma", "UI Design", "Glassmorphism", "Dark Mode"],
    accentColor: "cyan",
    badge: "Interface Concept",
    details: "Designed for CortexIQ and AI Studio experiments, blending 1px inner borders with noise textures and neon indicators."
  },
  {
    id: "lab-6",
    title: "Motorcycle Sprint 2D Pixel Physics Prototype",
    category: "Motion & Canvas",
    date: "2024",
    description: "Lightweight 2D arcade physics simulation with responsive touch controls, centrifugal acceleration, and collision grids.",
    tags: ["Game Loop", "Canvas 2D", "Touch Ergonomics", "Physics"],
    accentColor: "amber",
    badge: "Game Prototype",
    details: "Algorithmic exploration of variable vehicle inertia, responsive lane shifting, and low-latency mobile canvas rendering."
  }
];
