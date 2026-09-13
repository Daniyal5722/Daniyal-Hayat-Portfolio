import { Project, SkillGroup, ExperienceItem, EducationItem, ServiceItem } from '../types';

export const DEVELOPER_NAME = "Daniyal Hayat";
export const DEVELOPER_ROLE = "Software Engineer & Product Builder";
export const DEVELOPER_TAGLINE = "Building Digital Experiences That Feel Different.";
export const DEVELOPER_LOCATION = "Available Globally & Remote";
export const DEVELOPER_EMAIL = "mdaniyalhayyat@gmail.com";
export const GITHUB_USERNAME = "Daniyal5722";
export const GITHUB_PROFILE_URL = "https://github.com/Daniyal5722";
export const LIVE_PORTFOLIO_URL = "https://daniyal-hayat-portfolio.vercel.app/";

export const MARQUEE_TECH_STACK = [
  { name: "TypeScript", category: "Language" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Framework" },
  { name: "Kotlin", category: "Mobile" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Android SDK", category: "Mobile OS" },
  { name: "Node.js", category: "Runtime" },
  { name: "Google Gemini AI", category: "Intelligence" },
  { name: "Vite", category: "Tooling" },
  { name: "HTML5 & CSS3", category: "Web Core" },
  { name: "Motion", category: "Animation" },
  { name: "Git & GitHub", category: "DevOps" },
  { name: "RESTful APIs", category: "Integration" },
  { name: "Responsive UI", category: "Design" }
];

export const PROJECTS: Project[] = [
  {
    id: "offical-darul-ifta-irshad-us-saileen",
    name: "Offical-Darul-ifta-Irshad-us-saileen-",
    displayName: "Official Darul Ifta Irshad us Saileen",
    description: "Production web platform serving community religious consultation and guidance resources with high-performance responsive web layouts.",
    technologies: ["JavaScript", "Tailwind CSS", "HTML5", "Responsive Web", "REST APIs"],
    language: "JavaScript",
    githubUrl: "https://github.com/Daniyal5722/Offical-Darul-ifta-Irshad-us-saileen-",
    liveUrl: "https://darulifta-bkfbzf6u.manus.space/",
    category: "Web Platform",
    featured: true,
    iconName: "Folder",
    metrics: [
      { label: "Deployment", value: "Active Production" },
      { label: "Accessibility", value: "Mobile & Desktop" },
      { label: "Performance", value: "Optimized Load" }
    ],
    features: [
      "Intuitive religious consultation portal",
      "Streamlined fatwa repository and searchable categories",
      "High-contrast, distraction-free typographic hierarchy",
      "Accessible design optimized for low-bandwidth mobile devices"
    ],
    caseStudy: {
      overview: "Official Darul Ifta Irshad us Saileen is an online consultation platform engineered to provide accessible religious guidance and official fatwas to a broad community across desktop and mobile devices.",
      problem: "Traditional consultation workflows relied on physical visits or disjointed communication channels, making verified guidance difficult to archive, search, and access promptly.",
      idea: "Design a fast, lightweight, responsive web platform featuring structured inquiry categories, direct submission interfaces, and organized guidance resources.",
      design: "Prioritized clean editorial typography, high readability, soft neutral palettes, and accessible contrast to ensure clear legibility for users of all demographics.",
      development: "Crafted using semantic HTML5, modern Tailwind CSS for modular utility styling, and vanilla JavaScript routines for lightweight client performance and instant page responsiveness.",
      challenges: "Ensuring instant load times on variable-speed cellular connections while accommodating large textual archives and bilingual character sets.",
      solution: "Implemented efficient asset minification, clean CSS architectures, and streamlined DOM manipulation to eliminate redundant overhead.",
      result: "Successfully launched live in production, serving queries with zero layout shift and providing community members with an authoritative digital resource."
    }
  },
  {
    id: "cortexiq-by-dnyl",
    name: "cortexiq-by-dnyl",
    displayName: "CortexIQ by DNYL",
    description: "AI-driven computational intelligence suite engineered with reactive dashboard interfaces, dynamic prompt parsing, and modular tool integrations.",
    technologies: ["TypeScript", "React", "AI Integration", "Tailwind CSS", "Vite", "Motion"],
    language: "TypeScript",
    githubUrl: "https://github.com/Daniyal5722/cortexiq-by-dnyl",
    category: "AI & Intelligence",
    featured: true,
    iconName: "Cpu",
    metrics: [
      { label: "Architecture", value: "Reactive Engine" },
      { label: "Type Safety", value: "100% TypeScript" },
      { label: "Tooling", value: "Modular SDKs" }
    ],
    features: [
      "Dynamic prompt parser with contextual token weighting",
      "Futuristic dark-mode dashboard with interactive state cards",
      "Strict TypeScript typings across computation layers",
      "Low-latency reactive UI powered by Vite and Motion"
    ],
    caseStudy: {
      overview: "CortexIQ is a next-generation AI intelligence interface engineered by Daniyal Hayat to bridge natural language prompts with structured tool pipelines and analytical feedback.",
      problem: "Many AI playground interfaces suffer from chaotic state representations, poor error handling during generation, and lack of modular tool integration.",
      idea: "Build a cohesive, developer-friendly intelligence suite that emphasizes structured input, real-time validation, and intuitive visual telemetry.",
      design: "Employed a deep midnight aesthetic with subtle cyan-to-violet accent lines, monospace code inspection panels, and tactile micro-interactions.",
      development: "Architected in React 18+ and TypeScript with strict boundary typings, leveraging Vite for rapid build times and Motion for smooth entering transitions.",
      challenges: "Managing asynchronous generation states and preventing UI stutter during intensive real-time token processing.",
      solution: "Separated prompt parsing into dedicated utility workers and utilized reactive state stores with defensive error boundaries.",
      result: "Delivers an ultra-responsive, developer-grade intelligence environment with seamless interaction fidelity and clean extensibility."
    }
  },
  {
    id: "hamara-weather",
    name: "Hamara-Weather",
    displayName: "Hamara Weather",
    description: "Real-time meteorological tracking application delivering live atmospheric condition metrics, precision forecasts, and intuitive visual data.",
    technologies: ["JavaScript", "Meteorological API", "DOM Manipulation", "CSS3", "Async Pipeline"],
    language: "JavaScript",
    githubUrl: "https://github.com/Daniyal5722/Hamara-Weather",
    liveUrl: "https://hamara-weather.netlify.app/",
    category: "Utility App",
    featured: true,
    iconName: "CloudSun",
    metrics: [
      { label: "Status", value: "Live on Netlify" },
      { label: "Data Source", value: "Real-time API" },
      { label: "Update Rate", value: "On-demand Sync" }
    ],
    features: [
      "Real-time weather API integration for live temperature and wind speed",
      "Atmospheric humidity, pressure, and visibility telemetry",
      "Adaptive weather condition indicators with visual feedback",
      "Zero-latency search with responsive layout across all viewports"
    ],
    caseStudy: {
      overview: "Hamara Weather is a sleek, lightweight weather forecasting application created to provide quick, accurate weather reports with minimal bandwidth footprint.",
      problem: "Existing consumer weather services are frequently cluttered with intrusive advertisements, slow tracker scripts, and complex layouts that delay essential forecast info.",
      idea: "Create a focused, ad-free utility that highlights current weather metrics at a single glance with intuitive search and fast feedback.",
      design: "Constructed with clean atmospheric gradients, modern iconography, and distinct typographic hierarchy distinguishing key metric numbers from secondary labels.",
      development: "Developed using vanilla JavaScript utilizing asynchronous Fetch API calls, structured JSON parsing, and defensive error fallbacks for unavailable cities.",
      challenges: "Handling rate-limited external weather APIs and providing smooth degradation when location permissions or network connections are weak.",
      solution: "Implemented robust try-catch wrappers, graceful input validation, and user-friendly visual alerts on invalid location queries.",
      result: "Deployed live on Netlify with exceptional speed metrics and a clean, dependable everyday utility experience."
    }
  },
  {
    id: "darul-ifta-irshad-us-saileen-app2",
    name: "Darul-Ifta-Irshad-us-Saileen-app2",
    displayName: "Darul Ifta Android App v2",
    description: "Second-generation native Android application featuring robust offline caching, refined Material layouts, and rapid consultation querying.",
    technologies: ["Kotlin", "Android SDK", "Offline Caching", "XML Layouts", "Mobile Architecture"],
    language: "Kotlin",
    githubUrl: "https://github.com/Daniyal5722/Darul-Ifta-Irshad-us-Saileen-app2",
    liveUrl: "https://darulifta-bkfbzf6u.manus.space/",
    category: "Mobile App",
    featured: false,
    iconName: "Smartphone",
    metrics: [
      { label: "Platform", value: "Native Android" },
      { label: "Storage", value: "Offline Caching" },
      { label: "Language", value: "100% Kotlin" }
    ],
    features: [
      "Native Android architecture built with Kotlin",
      "Local offline caching for uninterrupted guidance access in remote areas",
      "Second-generation UI with enhanced touch ergonomics and smooth scrolling",
      "Lightweight memory footprint optimized for low-spec Android devices"
    ],
    caseStudy: {
      overview: "The second iteration of the Darul Ifta Android application rebuilds mobile navigation from the ground up, adding offline persistence and improved accessibility.",
      problem: "Users in remote regions with unstable internet connectivity lost access to previously browsed answers and fatwa references.",
      idea: "Architect a local caching mechanism that stores consulted fatwas locally, allowing seamless offline reading and fast indexing.",
      design: "Adhered to modern Android Material guidelines with optimized button sizes, intuitive tab bars, and clear typography suited for Arabic and Urdu scripts.",
      development: "Engineered in Kotlin using Android SDK components, optimized ListView/RecyclerView viewholders, and background data synchronization.",
      challenges: "Ensuring offline cache coherency and fast database lookups without bogging down low-tier mobile hardware.",
      solution: "Implemented efficient local data structures, lazy view binding, and defensive error handling for network edge cases.",
      result: "Delivered a rock-solid native companion app that brings essential guidance directly to mobile users anywhere, anytime."
    }
  },
  {
    id: "mystic-match-by-dnyl",
    name: "mystic-match-by-dnyl",
    displayName: "Mystic Match Puzzle Game",
    description: "Mobile-first fantasy match-3 algorithmic puzzle game engineered in Kotlin with custom game mechanics and responsive touch physics.",
    technologies: ["Kotlin", "Android", "Game Mechanics", "Mobile UI", "Algorithms"],
    language: "Kotlin",
    githubUrl: "https://github.com/Daniyal5722/mystic-match-by-dnyl",
    category: "Mobile Game",
    featured: false,
    iconName: "Smartphone",
    metrics: [
      { label: "Platform", value: "Native Android" },
      { label: "Engine", value: "Custom Kotlin" },
      { label: "Genre", value: "Match-3 Puzzle" }
    ],
    features: [
      "Algorithmic match-3 grid detection with cascading mechanics",
      "Fantasy-themed visual styling with custom responsive tile states",
      "Fluid touch-drag interaction and tactile feedback",
      "High-performance frame rendering optimized for Android lifecycle"
    ],
    caseStudy: {
      overview: "Mystic Match is an interactive puzzle game demonstrating advanced state machines, algorithmic matrix manipulations, and fluid Android touch interactions.",
      problem: "Game loops on mobile can easily introduce memory leaks and garbage collection stutters when tracking animated grid states.",
      idea: "Build a bespoke, lightweight match-3 algorithmic engine in Kotlin that manages 2D coordinate matrices with optimal efficiency.",
      design: "Created a fantasy neo-aesthetic with vibrant gem motifs, clean board borders, and immediate visual reactions upon valid combinations.",
      development: "Authored in Kotlin, utilizing 2D matrix traversal algorithms for match detection (horizontal, vertical, combos) and recursive tile replenishment.",
      challenges: "Preventing infinite cascade loops while accurately computing multi-tile cascade multipliers in real-time.",
      solution: "Implemented discrete state transitions (IDLE, SWAPPING, CHECKING, CLEARING, DROPPING) to ensure deterministic gameplay.",
      result: "A captivating, glitch-free Android puzzle experience showcasing deep algorithmic and mobile design competence."
    }
  },
  {
    id: "daniyal-hayat-portfolio",
    name: "Daniyal-Hayat-Portfolio",
    displayName: "Daniyal Hayat Portfolio Platform",
    description: "Personal portfolio showcase platform featuring live GitHub synchronization, dual-theme styling, smooth page transitions, and zero-compromise UX.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Motion"],
    language: "TypeScript",
    githubUrl: "https://github.com/Daniyal5722/Daniyal-Hayat-Portfolio",
    liveUrl: "https://daniyal-hayat-portfolio.vercel.app/",
    category: "Web Application",
    featured: false,
    iconName: "Layers",
    metrics: [
      { label: "Deployment", value: "Vercel Live" },
      { label: "Speed", value: "95+ Lighthouse" },
      { label: "Sync", value: "Live GitHub API" }
    ],
    features: [
      "Live GitHub repository data synchronization with resilient local fallback",
      "Accessible dark and light themes with system memory in localStorage",
      "Polished Motion scroll transitions and micro-interactions",
      "Clean modular component architecture with strict TypeScript types"
    ],
    caseStudy: {
      overview: "The digital portfolio of Daniyal Hayat represents his design philosophy: modern, fast, transparent, and focused on tangible engineering value.",
      problem: "Many developer portfolios rely on generic templates, static fake numbers, or bloated graphics that harm load performance and accessibility.",
      idea: "Craft an original, bespoke platform that pulls real verified GitHub data, presents detailed project case studies, and delivers an unforgettable interaction feel.",
      design: "Sleek dark/light theme options, balanced negative space, refined Plus Jakarta Sans and JetBrains Mono typography, and purposeful interactive feedback.",
      development: "Constructed with React 19, TypeScript, Tailwind CSS v4, and Motion, with strict attention to semantic HTML and zero-error compilation.",
      challenges: "Balancing rich animations with snappy performance across low-end mobile devices and high-refresh desktop monitors.",
      solution: "Used hardware-accelerated CSS transforms, GPU-powered Motion animations, and defensive localStorage caching for external APIs.",
      result: "A world-class personal brand platform showcasing verified capabilities and real projects to employers, collaborators, and clients worldwide."
    }
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Frontend Engineering",
    subtitle: "Modern, responsive web applications",
    icon: "Layers",
    skills: [
      { name: "TypeScript", icon: "Code", level: "Core Stack", description: "Strict typing, generic interfaces, scalable frontend state architectures", badge: "Advanced" },
      { name: "React / Next.js", icon: "Layers", level: "Core Stack", description: "Modern hooks, modular component trees, SSR/SSG patterns, Motion", badge: "Expert" },
      { name: "Tailwind CSS", icon: "Palette", level: "Core Stack", description: "Utility-first modern styling, responsive prefixes, custom design systems", badge: "Expert" },
      { name: "HTML5 & Semantic Web", icon: "Globe", level: "Foundational", description: "Accessible markup, SEO structured schema, WCAG AA compliance", badge: "Advanced" },
      { name: "CSS3 & Modern Animations", icon: "Sparkles", level: "Core Stack", description: "Hardware-accelerated transforms, keyframes, fluid clamp() typography", badge: "Advanced" }
    ]
  },
  {
    category: "Mobile Development",
    subtitle: "Native Android & mobile architectures",
    icon: "Smartphone",
    skills: [
      { name: "Kotlin", icon: "Smartphone", level: "Core Stack", description: "Modern native Android application engineering, concise functional syntax", badge: "Production" },
      { name: "Android SDK", icon: "Cpu", level: "Core Stack", description: "Activity lifecycles, Intent routing, background tasks, Material layouts", badge: "Advanced" },
      { name: "Offline Caching", icon: "Server", level: "Architecture", description: "Local persistence strategies for seamless offline data retrieval", badge: "Intermediate" },
      { name: "Mobile UI Ergonomics", icon: "Palette", level: "Design", description: "Touch-friendly targets, bottom sheet navigations, responsive scaling", badge: "Advanced" }
    ]
  },
  {
    category: "Backend & APIs",
    subtitle: "Server integration & data communication",
    icon: "Server",
    skills: [
      { name: "Node.js & Express", icon: "Server", level: "Runtime", description: "Lightweight API servers, proxy routes, environment security", badge: "Advanced" },
      { name: "RESTful API Integration", icon: "Globe", level: "Core Stack", description: "Async data fetching, defensive error handling, token management", badge: "Expert" },
      { name: "JSON Data Pipelines", icon: "Code", level: "Architecture", description: "Schema normalization, data parsing, client-side caching", badge: "Advanced" }
    ]
  },
  {
    category: "AI & Modern Tooling",
    subtitle: "Next-gen developer ecosystem",
    icon: "Cpu",
    skills: [
      { name: "Google Gemini AI SDK", icon: "Cpu", level: "Integration", description: "Model prompting, structured outputs, AI-assisted interface pipelines", badge: "Specialist" },
      { name: "Git & GitHub", icon: "Github", level: "Workflow", description: "Branching strategies, commit history hygiene, continuous deployment", badge: "Expert" },
      { name: "Vite & Build Tooling", icon: "Terminal", level: "DevOps", description: "Fast HMR bundling, tree-shaking, production optimization", badge: "Advanced" }
    ]
  },
  {
    category: "UI/UX & Design Sense",
    subtitle: "Visual craft & user experience",
    icon: "Palette",
    skills: [
      { name: "Responsive Systems", icon: "Smartphone", level: "Discipline", description: "Fluid scaling from 320px mobile to 4K ultra-wide displays", badge: "Expert" },
      { name: "Micro-Interactions", icon: "Sparkles", level: "Craft", description: "Subtle hover transitions, magnetic buttons, feedback indicators", badge: "Advanced" },
      { name: "Dark & Light Theming", icon: "Palette", level: "System", description: "Cohesive color contrast ratios, CSS variables, theme toggling", badge: "Expert" }
    ]
  }
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    id: "exp-1",
    year: "2023 — Present",
    title: "Independent Software Engineer & Product Builder",
    role: "Full-Stack Web & Android Developer",
    type: "milestone",
    description: "Architecting and publishing production-grade web platforms and native mobile applications with a focus on performance, accessibility, and modern UI craft.",
    highlights: [
      "Engineered Official Darul Ifta Irshad us Saileen web portal serving community religious consultation",
      "Developed CortexIQ by DNYL, an AI-assisted intelligence suite using TypeScript and React",
      "Built and deployed Hamara Weather application providing real-time meteorological tracking",
      "Authored multiple native Android applications in Kotlin with offline caching strategies"
    ],
    technologies: ["TypeScript", "React", "Next.js", "Kotlin", "Android SDK", "Tailwind CSS", "Vite"]
  },
  {
    id: "exp-2",
    year: "2023 — 2024",
    title: "Native Android Engineering Focus",
    role: "Mobile App Developer",
    type: "project",
    description: "Focused on mastering native mobile development with Kotlin, building user-friendly mobile utilities and algorithmic puzzle systems.",
    highlights: [
      "Designed and published Darul Ifta Irshad us Saileen mobile app v1 and v2",
      "Engineered Mystic Match, a fantasy-themed match-3 algorithmic puzzle game in Kotlin",
      "Implemented resilient offline data persistence to ensure accessibility under poor connectivity",
      "Optimized memory usage and UI frame rates across diverse Android device tiers"
    ],
    technologies: ["Kotlin", "Android Studio", "Offline Storage", "XML Layouts", "Game Logic"]
  },
  {
    id: "exp-3",
    year: "2022 — 2023",
    title: "Web Engineering & Modern Frontend Mastery",
    role: "Frontend Developer",
    type: "learning",
    description: "Deep dive into web fundamentals, JavaScript algorithms, semantic markup, and the modern React ecosystem.",
    highlights: [
      "Transitioned from classic web development to component-driven React and TypeScript ecosystems",
      "Explored asynchronous REST API integration and client-side data synchronization",
      "Built multiple web utilities and responsive prototypes with modern CSS and Tailwind",
      "Established strict version control and open source hygiene on GitHub"
    ],
    technologies: ["JavaScript", "HTML5", "CSS3", "Git", "REST APIs", "Tailwind CSS"]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "edu-1",
    institution: "Computer Science & Software Engineering Studies",
    program: "Core Computer Science, Algorithms & Software Design",
    timeline: "Continuous Academic & Self-Directed Engineering",
    description: "Focused on software design principles, data structures, algorithmic complexity, object-oriented programming in Kotlin, and modern web application development.",
    skillsGained: [
      "Data Structures & Algorithmic Problem Solving",
      "Object-Oriented Programming (OOP) in Kotlin & TypeScript",
      "Modern Web & Mobile Architecture Principles",
      "Database Design, Caching & Network Communication"
    ]
  },
  {
    id: "edu-2",
    institution: "Modern Developer Specializations",
    program: "Full-Stack Web, AI Integration & Native Mobile",
    timeline: "Ongoing Exploration & Production Practice",
    description: "Hands-on engineering across production web frameworks (React, Next.js, Vite), AI model integration (Google Gemini), and production deployment pipelines (Vercel, Netlify).",
    skillsGained: [
      "Type-Safe Frontend Architecture (TypeScript + React)",
      "Production Performance Auditing & Lighthouse 90+ Optimization",
      "Responsive Design Systems & Accessible Interfaces (WCAG)",
      "API Engineering & Asynchronous State Synchronization"
    ]
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "srv-1",
    title: "Full-Stack Web Development",
    tagline: "High-performance web apps built to scale",
    description: "End-to-end development of modern web applications using React, Next.js, and TypeScript. Fast loading, secure, and engineered with clean architecture.",
    icon: "Layers",
    deliverables: [
      "Custom responsive web applications",
      "Component-driven design systems with Tailwind CSS",
      "API integrations & asynchronous data handling",
      "Production deployment to Vercel or Cloud infrastructure"
    ]
  },
  {
    id: "srv-2",
    title: "Native Android Mobile Apps",
    tagline: "Fluid, reliable apps built with Kotlin",
    description: "Native Android development utilizing Kotlin and modern Android SDK patterns. Emphasizing smooth touch ergonomics, offline reliability, and clean interfaces.",
    icon: "Smartphone",
    deliverables: [
      "Native Android applications in Kotlin",
      "Offline caching & local data storage",
      "Touch-optimized UI and Material Design integration",
      "Lightweight resource footprint for diverse device support"
    ]
  },
  {
    id: "srv-3",
    title: "AI Integration & Smart Utilities",
    tagline: "Empowering applications with AI capabilities",
    description: "Integrating modern AI capabilities (such as Google Gemini) into intuitive frontends for prompt parsing, smart assistants, and automated data processing.",
    icon: "Cpu",
    deliverables: [
      "Google Gemini AI SDK integrations",
      "Intelligent prompt parsing and result visualizations",
      "Dynamic weather & data telemetry integrations",
      "Secure server-side API proxying and key management"
    ]
  },
  {
    id: "srv-4",
    title: "UI/UX Craft & Performance Audits",
    tagline: "Delivering world-class digital feel",
    description: "Transforming clunky or generic interfaces into polished, accessible, memorable digital experiences with subtle micro-interactions and dual-theme elegance.",
    icon: "Palette",
    deliverables: [
      "Comprehensive mobile & desktop responsiveness",
      "Dark / Light theme system implementations",
      "Motion animations & interactive state handling",
      "Lighthouse performance, accessibility & SEO optimization"
    ]
  }
];

export const LIVE_DEPLOYMENTS = [
  {
    title: "Darul Ifta Irshad us Saileen",
    type: "Production Web Platform",
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
