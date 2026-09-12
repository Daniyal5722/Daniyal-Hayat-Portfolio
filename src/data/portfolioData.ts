import { Project } from '../types';

export const GITHUB_USERNAME = "Daniyal5722";
export const GITHUB_PROFILE_URL = "https://github.com/Daniyal5722";
export const DEVELOPER_NAME = "Daniyal Hayat";

export const PROJECTS: Project[] = [
  {
    id: "offical-darul-ifta-irshad-us-saileen",
    name: "Offical-Darul-ifta-Irshad-us-saileen-",
    displayName: "Official Darul Ifta Irshad us Saileen",
    description: "Official web platform for Darul Ifta Irshad us Saileen, delivering responsive religious consultation and guidance resources with modern web layouts.",
    technologies: ["JavaScript", "Tailwind CSS", "HTML5", "Responsive Web"],
    language: "JavaScript",
    githubUrl: "https://github.com/Daniyal5722/Offical-Darul-ifta-Irshad-us-saileen-",
    liveUrl: "https://darulifta-bkfbzf6u.manus.space/",
    category: "Web Platform",
    featured: true,
    iconName: "Folder",
    features: [
      "Responsive religious consultation interface",
      "Streamlined guidance resources and fatwa portal",
      "Optimized layout for community accessibility",
      "Clean semantic HTML and Tailwind styling"
    ]
  },
  {
    id: "hamara-weather",
    name: "Hamara-Weather",
    displayName: "Hamara Weather",
    description: "Real-time meteorological tracking application displaying precise forecasts, atmospheric conditions, and clean visual indicators.",
    technologies: ["JavaScript", "API Integration", "DOM Manipulation", "CSS3"],
    language: "JavaScript",
    githubUrl: "https://github.com/Daniyal5722/Hamara-Weather",
    liveUrl: "https://hamara-weather.netlify.app/",
    category: "Utility App",
    featured: true,
    iconName: "CloudSun",
    features: [
      "Live weather API integration for accurate forecasts",
      "Dynamic atmospheric condition indicators",
      "Clean, user-friendly weather dashboard",
      "Responsive layout for seamless mobile and desktop usage"
    ]
  },
  {
    id: "daniyal-hayat-portfolio",
    name: "Daniyal-Hayat-Portfolio",
    displayName: "Daniyal Hayat Portfolio",
    description: "Personal developer showcase platform featuring live project synchronization, dark mode, smooth animations, and verified repository metrics.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Motion"],
    language: "TypeScript",
    githubUrl: "https://github.com/Daniyal5722/Daniyal-Hayat-Portfolio",
    liveUrl: "https://daniyal-hayat-portfolio.vercel.app/",
    category: "Web Application",
    featured: false,
    iconName: "Folder",
    features: [
      "Automated GitHub API integration and cache layer",
      "High-contrast responsive UI with custom dark mode",
      "Smooth Intersection Observer reveal transitions",
      "Instant live deployment status indicators"
    ]
  },
  {
    id: "darul-ifta-irshad-us-saileen-app",
    name: "darul-ifta-irshad-us-saileen-app",
    displayName: "Darul Ifta Irshad us Saileen App",
    description: "Android mobile application extension for Darul Ifta, providing quick access to mobile-optimized fatwas and consultations.",
    technologies: ["Kotlin", "Android SDK", "Mobile UI", "XML Layouts"],
    language: "Kotlin",
    githubUrl: "https://github.com/Daniyal5722/darul-ifta-irshad-us-saileen-app",
    liveUrl: "https://darulifta-bkfbzf6u.manus.space/",
    category: "Mobile App",
    featured: false,
    iconName: "Smartphone",
    features: [
      "Native Android mobile application architecture",
      "Mobile-optimized fatwa lookup and browsing",
      "Fast consultation request interface",
      "Lightweight resource consumption"
    ]
  },
  {
    id: "darul-ifta-irshad-us-saileen-app2",
    name: "Darul-Ifta-Irshad-us-Saileen-app2",
    displayName: "Darul Ifta Irshad us Saileen App v2",
    description: "Second generation application release featuring enhanced user interface design, faster consultation lookups, and robust offline caching.",
    technologies: ["Kotlin", "Android", "Offline Caching", "UI/UX Enhancements"],
    language: "Kotlin",
    githubUrl: "https://github.com/Daniyal5722/Darul-Ifta-Irshad-us-Saileen-app2",
    liveUrl: "https://darulifta-bkfbzf6u.manus.space/",
    category: "Mobile App v2",
    featured: false,
    iconName: "Layers",
    features: [
      "Second-generation architecture with enhanced UX",
      "Optimized consultation query speed",
      "Robust offline caching for remote accessibility",
      "Refined Android design patterns"
    ]
  },
  {
    id: "cortexiq-by-dnyl",
    name: "cortexiq-by-dnyl",
    displayName: "CortexIQ by DNYL",
    description: "AI-powered intelligence suite engineered by Daniyal, offering smart computational tools, prompt parsing, and modern frontend UI.",
    technologies: ["TypeScript", "React", "AI Integration", "Tailwind CSS", "Vite"],
    language: "TypeScript",
    githubUrl: "https://github.com/Daniyal5722/cortexiq-by-dnyl",
    category: "AI & Intelligence",
    featured: true,
    iconName: "Cpu",
    features: [
      "Advanced AI prompt parsing and computation engine",
      "Sleek futuristic dashboard UI with reactive components",
      "High-performance state management",
      "Modular architecture for intelligence tools"
    ]
  },
  {
    id: "mystic-match-by-dnyl",
    name: "mystic-match-by-dnyl",
    displayName: "Mystic Match Puzzle Game",
    description: "A high-fidelity mobile-first fantasy-themed match-3 puzzle game featuring neo-brutalist game UI and fluid mechanics.",
    technologies: ["Kotlin", "Android", "Game Mechanics", "Mobile UI"],
    language: "Kotlin",
    githubUrl: "https://github.com/Daniyal5722/mystic-match-by-dnyl",
    category: "Mobile Game",
    featured: false,
    iconName: "Smartphone",
    features: [
      "Mobile-first match-3 algorithmic game engine",
      "Fantasy-themed neo-brutalist aesthetic",
      "Smooth interactive touch-driven tile animations",
      "Optimized Android build pipeline"
    ]
  }
];

export const TECHNICAL_SKILLS = [
  { name: "TypeScript", icon: "Code", projectCount: 1, level: "Advanced" },
  { name: "React / Next.js", icon: "Layers", projectCount: 1, level: "Expert" },
  { name: "Kotlin", icon: "Smartphone", projectCount: 2, level: "Intermediate" },
  { name: "Tailwind CSS", icon: "Palette", projectCount: 2, level: "Expert" },
  { name: "AI & Prompts", icon: "Cpu", projectCount: 1, level: "Specialist" },
  { name: "Node.js & APIs", icon: "Server", projectCount: 3, level: "Advanced" }
];

export interface LiveDeployment {
  title: string;
  type: string;
  url: string;
  githubUrl: string;
  badge: string;
  description: string;
}

export const LIVE_DEPLOYMENTS: LiveDeployment[] = [
  {
    title: "Darul Ifta Irshad us Saileen",
    type: "Live Web Platform",
    url: "https://darulifta-bkfbzf6u.manus.space/",
    githubUrl: "https://github.com/Daniyal5722/Offical-Darul-ifta-Irshad-us-saileen-",
    badge: "Production Live",
    description: "Official online Fatwa and scholarly consultation portal for community guidance."
  },
  {
    title: "Hamara Weather",
    type: "Live Forecast App",
    url: "https://hamara-weather.netlify.app/",
    githubUrl: "https://github.com/Daniyal5722/Hamara-Weather",
    badge: "Netlify Live",
    description: "Real-time meteorological tracking dashboard with atmospheric metrics and forecasts."
  },
  {
    title: "Daniyal Hayat Portfolio",
    type: "Live Showcase Platform",
    url: "https://daniyal-hayat-portfolio.vercel.app/",
    githubUrl: "https://github.com/Daniyal5722/Daniyal-Hayat-Portfolio",
    badge: "Vercel Live",
    description: "Personal developer showcase platform synchronizing live GitHub repository metrics."
  }
];

