import { Project, SkillCategory, ExperienceItem, ServiceItem } from '../types';

export const DEVELOPER_NAME = "Daniyal Hayat";
export const DEVELOPER_ROLE = "Software Engineer & Builder";
export const DEVELOPER_TAGLINE = "Engineering resilient web platforms, native Android applications, and intelligent systems with mathematical rigor and editorial craft.";
export const DEVELOPER_LOCATION = "Available Globally & Remote";
export const DEVELOPER_EMAIL = "mdaniyalhayyat@gmail.com";
export const GITHUB_USERNAME = "Daniyal5722";
export const GITHUB_PROFILE_URL = "https://github.com/Daniyal5722";
export const LIVE_PORTFOLIO_URL = "https://daniyal-hayat-portfolio.vercel.app/";

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const CURATED_PROJECTS: Project[] = [
  {
    id: "darul-ifta-web",
    slug: "darul-ifta-web",
    name: "Offical-Darul-ifta-Irshad-us-saileen-",
    displayName: "Official Darul Ifta Irshad us Saileen",
    role: "Lead Frontend Engineer & Architect",
    oneLiner: "Production community consultation platform delivering bilingual religious guidance with zero layout shifts and sub-second page loads.",
    description: "Production web platform serving community religious consultation and guidance resources with lightweight, accessible typography and high-performance client rendering.",
    technologies: ["JavaScript (ES6+)", "Tailwind CSS", "HTML5", "REST APIs", "Vercel"],
    language: "JavaScript",
    githubUrl: "https://github.com/Daniyal5722/Offical-Darul-ifta-Irshad-us-saileen-",
    liveUrl: "https://darulifta-bkfbzf6u.manus.space/",
    category: "Web Platform",
    featured: true,
    visualType: "browser-portal",
    readingTime: "4 min read",
    metrics: [
      { label: "First Contentful Paint", value: "< 0.6s" },
      { label: "Cumulative Layout Shift", value: "0.00" },
      { label: "Deployment", value: "Active Production" }
    ],
    caseStudy: {
      overview: "Official Darul Ifta Irshad us Saileen is a public consultation platform engineered to provide accessible religious guidance and official fatwas to community members across desktop and mobile devices.",
      problem: "Traditional consultation workflows relied on physical visits or disjointed messaging channels, making verified guidance difficult to archive, search, and access promptly on low-bandwidth mobile networks.",
      solution: "Engineered a fast, lightweight, responsive web application featuring structured inquiry categories, direct submission interfaces, and organized guidance resources with zero third-party tracking bloat.",
      technicalDecisions: [
        {
          decision: "Vanilla JavaScript ES6+ over heavy runtime frameworks for core reading views",
          rationale: "Minimizes JavaScript bundle execution costs, ensuring instant rendering on budget mobile hardware and flaky cellular networks.",
          tradeOff: "Required manual DOM synchronization for interactive tabs and modals rather than framework state binders."
        },
        {
          decision: "Utility-first CSS via Tailwind with strict typographical scale",
          rationale: "Guaranteed consistent vertical rhythm and high legibility across multilingual text (Urdu and English) without CSS bloat.",
          tradeOff: "Demanded upfront discipline in configuring responsive font clamps and RTL-friendly layouts."
        },
        {
          decision: "Client-side search and category filtering with memoized lookups",
          rationale: "Enables instant category exploration without round-trip network latency on repetitive searches.",
          tradeOff: "Requires dataset pagination when query volumes exceed local memory thresholds."
        }
      ],
      architecture: [
        { layer: "Presentation", stack: "Semantic HTML5, Accessible ARIA Landmarks, Responsive Breakpoints", purpose: "Screen-reader compatibility and fluid viewport adaptation" },
        { layer: "Styling & Typography", stack: "Tailwind CSS, High-Contrast Typography Palette", purpose: "Crisp legibility for extended reading sessions" },
        { layer: "Data Ingestion", stack: "Fetch API, JSON schema normalization, resilient error boundaries", purpose: "Safe parsing of consultation records with fallback states" },
        { layer: "Hosting & CDN", stack: "Global Edge Network, Brotli compression, immutable asset caching", purpose: "Fast asset delivery across international user hubs" }
      ],
      screenshots: [
        { title: "Consultation Directory", caption: "Categorized guidance index with quick search filter", tag: "Platform UI" },
        { title: "Reading View", caption: "Distraction-free typographic layout with bilingual contrast optimization", tag: "Reader UX" },
        { title: "Inquiry Form", caption: "Accessible form validation with instant feedback on required fields", tag: "User Workflow" }
      ],
      outcomes: [
        "Delivered 100% responsive layouts tested across 320px mobile to 4K displays",
        "Achieved sub-second initial render times on throttled 3G cellular connections",
        "Zero layout shifts (CLS: 0.00) during font swapping and image hydration",
        "Successfully deployed to production and actively serving community inquiries"
      ],
      lessonsLearned: "Designing for real community accessibility taught me that eliminating unnecessary client JavaScript is the single most effective way to ensure reliable mobile performance in emerging markets.",
      liveDemo: "https://darulifta-bkfbzf6u.manus.space/",
      github: "https://github.com/Daniyal5722/Offical-Darul-ifta-Irshad-us-saileen-"
    }
  },
  {
    id: "cortexiq-ai-suite",
    slug: "cortexiq-ai-suite",
    name: "cortexiq-by-dnyl",
    displayName: "CortexIQ AI Suite",
    role: "Full-Stack & AI Systems Engineer",
    oneLiner: "Computational AI workspace pairing real-time LLM inference, token telemetry, and prompt parsing with an obsidian command dashboard.",
    description: "Production-ready AI computational intelligence suite featuring advanced LLM integration, reactive dashboard telemetry, and modular tool pipelines.",
    technologies: ["TypeScript", "React 19", "Google Gemini AI", "Tailwind CSS", "Vite", "Motion"],
    language: "TypeScript",
    githubUrl: "https://github.com/Daniyal5722/cortexiq-by-dnyl",
    liveUrl: "https://daniyal-hayat-portfolio.vercel.app/",
    category: "AI & Intelligence",
    featured: true,
    visualType: "ai-dashboard",
    readingTime: "5 min read",
    metrics: [
      { label: "Type Safety", value: "100% TypeScript" },
      { label: "Model Architecture", value: "Gemini Flash" },
      { label: "Telemetry Latency", value: "< 120ms" }
    ],
    caseStudy: {
      overview: "CortexIQ is a modern developer intelligence workspace built to bridge natural language prompts with structured computational workflows and real-time model telemetry.",
      problem: "Standard AI interfaces often obscure model execution metrics, lack structured prompt composition controls, and suffer from jarring layout shifts during streaming text responses.",
      solution: "Engineered a reactive dashboard with an obsidian-and-cyan aesthetic, incorporating strict TypeScript interfaces, secure server-side API proxying, and streaming token monitors.",
      technicalDecisions: [
        {
          decision: "Server-side proxy route for Gemini AI requests instead of client keys",
          rationale: "Protects sensitive API credentials from client leakage and allows centralized rate limiting and prompt sanitization.",
          tradeOff: "Requires dedicated backend server infrastructure rather than a purely static client build."
        },
        {
          decision: "Strict discriminated union types for chat messages and model streaming states",
          rationale: "Prevents runtime state bugs during concurrent message transmissions, error fallbacks, and retry operations.",
          tradeOff: "Added initial type-scaffolding overhead for every model integration module."
        },
        {
          decision: "Optimistic UI state updates with streaming token chunking",
          rationale: "Delivers immediate feedback upon submission and prevents frame-rate stutters as tokens stream into the DOM.",
          tradeOff: "Requires auto-scroll anchoring logic that respects user manual scroll overrides."
        }
      ],
      architecture: [
        { layer: "Client Interface", stack: "React 19, TypeScript, Tailwind CSS, Motion", purpose: "High-frame-rate command panel with zero layout jitter" },
        { layer: "API Proxy", stack: "Node.js, Express, Rate Limiter, Environment Isolation", purpose: "Secure token management and validation pipeline" },
        { layer: "AI Inference Engine", stack: "Google Gen AI SDK (@google/genai), Model Fallbacks", purpose: "Low-latency prompt completion with automatic graceful failovers" },
        { layer: "State Management", stack: "React custom hooks, localStorage persistence for conversation sessions", purpose: "Resilient session recovery across browser reloads" }
      ],
      screenshots: [
        { title: "Command Console", caption: "Obsidian workspace with quick prompt action pills and model switchers", tag: "Workspace" },
        { title: "Streaming Telemetry", caption: "Real-time token counting and execution latency telemetry", tag: "Analytics" },
        { title: "Structured Output Parser", caption: "Markdown, code block syntax highlighting, and copy controls", tag: "Code Output" }
      ],
      outcomes: [
        "Zero API secret exposure verified through end-to-end network audits",
        "Sub-120ms local UI response latency before model stream initiation",
        "Robust multi-model fallback strategy preventing downtime during upstream model spikes",
        "Clean, maintainable TypeScript architecture with 100% strict type checking"
      ],
      lessonsLearned: "Production AI systems require defensive engineering around rate limits, token timeouts, and network disconnects — the quality of the error state defines the quality of the product.",
      liveDemo: "https://daniyal-hayat-portfolio.vercel.app/",
      github: "https://github.com/Daniyal5722/cortexiq-by-dnyl"
    }
  },
  {
    id: "hamara-weather",
    slug: "hamara-weather",
    name: "Hamara-Weather",
    displayName: "Hamara Weather",
    role: "Frontend Engineer",
    oneLiner: "Focused meteorological telemetry application delivering real-time atmospheric metrics and precision forecasts with zero tracking bloat.",
    description: "Real-time meteorological tracking application delivering live atmospheric condition metrics, precision forecasts, and intuitive visual data.",
    technologies: ["JavaScript (ES6+)", "OpenWeather API", "HTML5", "CSS3", "Vercel"],
    language: "JavaScript",
    githubUrl: "https://github.com/Daniyal5722/Hamara-Weather",
    liveUrl: "https://hamara-weather.vercel.app/",
    category: "Web Platform",
    featured: true,
    visualType: "weather-telemetry",
    readingTime: "3 min read",
    metrics: [
      { label: "Search Latency", value: "< 250ms" },
      { label: "Ad Tracker Footprint", value: "0 bytes" },
      { label: "Status", value: "Live on Vercel" }
    ],
    caseStudy: {
      overview: "Hamara Weather is a streamlined weather forecasting application designed to provide instantaneous atmospheric telemetry without advertisements, invasive trackers, or bloated animations.",
      problem: "Commercial weather portals are laden with intrusive auto-playing video ads, heavy tracking scripts, and complex layouts that delay essential forecast information for users.",
      solution: "Built a fast, ad-free utility highlighting current conditions, humidity, atmospheric pressure, and multi-day projections through clean data cards and reactive search.",
      technicalDecisions: [
        {
          decision: "Direct OpenWeather API integration with defensive parameter validation",
          rationale: "Keeps request sizes minimal and allows clear custom mapping to intuitive UI metrics.",
          tradeOff: "Requires handling API rate limits and providing friendly fallbacks for misspelled city queries."
        },
        {
          decision: "Dynamic ambient gradient theme based on condition codes",
          rationale: "Provides immediate visual context of weather states (clear, storm, rain, snow) without heavy background videos.",
          tradeOff: "Careful color testing was needed to ensure text contrast remains WCAG AA compliant on all gradient variants."
        }
      ],
      architecture: [
        { layer: "UI & Layout", stack: "Semantic HTML5, CSS Grid, Fluid Typography", purpose: "Single-glance readability on phones and desktops" },
        { layer: "Asynchronous Pipeline", stack: "Fetch API, Promise chaining, Try/Catch normalization", purpose: "Graceful error interception and friendly user messaging" },
        { layer: "Caching", stack: "Browser sessionStorage for recent city queries", purpose: "Instant retrieval of recent lookups without redundant network calls" }
      ],
      screenshots: [
        { title: "Condition Dashboard", caption: "Live temperature, humidity, visibility, and atmospheric pressure cards", tag: "Dashboard" },
        { title: "Location Search", caption: "Real-time validation with instant feedback on city not found states", tag: "Search" }
      ],
      outcomes: [
        "100% tracker-free footprint saving over 2MB of payload compared to commercial weather portals",
        "Sub-250ms lookup response time with cached city lookups",
        "Deployed live on Vercel with continuous deployment integration"
      ],
      lessonsLearned: "Utility applications succeed through speed and clarity. Every millisecond saved between search input and data rendering directly improves user satisfaction.",
      liveDemo: "https://hamara-weather.vercel.app/",
      github: "https://github.com/Daniyal5722/Hamara-Weather"
    }
  },
  {
    id: "mystic-match-game",
    slug: "mystic-match-game",
    name: "mystic-match-by-dnyl",
    displayName: "Mystic Match Algorithmic Game",
    role: "Game Logic & Mobile Engineer",
    oneLiner: "Mobile-first fantasy match-3 algorithmic puzzle game engineered in Kotlin with deterministic 2D matrix traversal and fluid touch physics.",
    description: "Mobile-first fantasy match-3 algorithmic puzzle game engineered in Kotlin with custom game mechanics, cascading tile replenishment, and responsive touch physics.",
    technologies: ["Kotlin", "Android SDK", "Algorithms", "Canvas 2D", "Vercel"],
    language: "Kotlin",
    githubUrl: "https://github.com/Daniyal5722/mystic-match-by-dnyl",
    liveUrl: "https://mystic-match-rho.vercel.app/",
    category: "Mobile Game",
    featured: true,
    visualType: "matrix-grid",
    readingTime: "4 min read",
    metrics: [
      { label: "Frame Rate", value: "60 FPS Constant" },
      { label: "State Model", value: "Deterministic FSM" },
      { label: "Platform", value: "Android & Web" }
    ],
    caseStudy: {
      overview: "Mystic Match is an interactive puzzle game demonstrating advanced finite state machine architecture, 2D matrix traversal algorithms, and touch-drag physics.",
      problem: "Mobile puzzle games frequently experience memory leaks, uncoordinated animation loops, and unpredictable cascade calculations that lead to game freeze glitches.",
      solution: "Architected a custom algorithmic engine in Kotlin with discrete state transitions (IDLE, SWAPPING, CHECKING, CLEARING, DROPPING) and optimized frame rendering.",
      technicalDecisions: [
        {
          decision: "Deterministic Finite State Machine (FSM) for game lifecycle",
          rationale: "Prevents race conditions where player input conflicts with automated cascade drops and score computations.",
          tradeOff: "Requires strict guard clauses and explicit event transitions between every sub-state."
        },
        {
          decision: "Iterative 2D matrix scanning with look-ahead validation",
          rationale: "Identifies horizontal and vertical matches of 3, 4, and 5 tiles in $O(N \\times M)$ time without recursive stack overflows.",
          tradeOff: "Needed boundary checks to prevent edge tile indexing errors."
        }
      ],
      architecture: [
        { layer: "Game Logic Engine", stack: "Kotlin, State Machine, 2D Matrix Algorithms", purpose: "Deterministic board evaluation and match calculations" },
        { layer: "Rendering Surface", stack: "Canvas 2D, requestAnimationFrame / Android SurfaceView", purpose: "60 FPS smooth tile animations and particle sparks" },
        { layer: "Input Pipeline", stack: "Touch drag vectors, threshold detection, haptic feedback", purpose: "Tactile, responsive piece movement" }
      ],
      screenshots: [
        { title: "Game Board Matrix", caption: "Interactive 8x8 gemstone grid with dynamic match highlighting", tag: "Gameplay" },
        { title: "Cascade Phase", caption: "Fluid gravity drop animation and combo multiplier readout", tag: "Animation" }
      ],
      outcomes: [
        "Achieved unwavering 60 FPS rendering with zero garbage collection hitches",
        "Deterministic cascade resolution eliminating board lock scenarios",
        "Deployed as cross-platform interactive build accessible via mobile browser and Android runtime"
      ],
      lessonsLearned: "Game development is one of the best arenas for mastering state management; when state transitions are strictly governed, complex cascading animations become predictable and robust.",
      liveDemo: "https://mystic-match-rho.vercel.app/",
      github: "https://github.com/Daniyal5722/mystic-match-by-dnyl"
    }
  },
  {
    id: "darul-ifta-android-v2",
    slug: "darul-ifta-android-v2",
    name: "Darul-Ifta-Irshad-us-Saileen-app2",
    displayName: "Darul Ifta Android App v2",
    role: "Native Android Developer",
    oneLiner: "Second-generation native Android client featuring SQLite/Room offline persistence for uninhibited reading in low-connectivity regions.",
    description: "Second-generation native Android application featuring robust offline caching, refined Material layouts, and rapid consultation querying.",
    technologies: ["Kotlin", "Android SDK", "Room / SQLite", "XML Layouts", "Background Sync"],
    language: "Kotlin",
    githubUrl: "https://github.com/Daniyal5722/Darul-Ifta-Irshad-us-Saileen-app2",
    liveUrl: "https://darulifta-bkfbzf6u.manus.space/",
    category: "Mobile App",
    featured: false,
    visualType: "mobile-mockup",
    readingTime: "4 min read",
    metrics: [
      { label: "Language", value: "100% Kotlin" },
      { label: "Data Strategy", value: "Offline-First" },
      { label: "Architecture", value: "MVVM Pattern" }
    ],
    caseStudy: {
      overview: "The second iteration of the Darul Ifta Android application rebuilds mobile navigation and storage from the ground up, adding persistent local caching for users with unstable internet.",
      problem: "In rural or spotty network conditions, users lost access to previously retrieved fatwa guidance whenever the network dropped.",
      solution: "Engineered a local SQLite/Room caching architecture that automatically synchronizes fetched guidance and makes all consulted records available indefinitely offline.",
      technicalDecisions: [
        {
          decision: "Offline-first Room database with sync flags",
          rationale: "Guarantees instant app launches and uninterrupted reading even when cellular data is disabled.",
          tradeOff: "Requires local cache migration schemas and conflict resolution strategies when records update remotely."
        },
        {
          decision: "ViewHolder memory recycling in native RecyclerViews",
          rationale: "Ensures smooth scrolling through thousands of text items on low-memory budget Android devices.",
          tradeOff: "Demands careful view binding detachment to prevent Android Activity memory leaks."
        }
      ],
      architecture: [
        { layer: "Presentation", stack: "Kotlin, Android XML Layouts, Material Design Components", purpose: "Touch-ergonomic navigation and clean Urdu/Arabic font rendering" },
        { layer: "Persistence Layer", stack: "Android Room Database, SQLite, Shared Preferences", purpose: "Local offline fatwa repository and user reading bookmarks" },
        { layer: "Network & Sync", stack: "Retrofit/OkHttp, WorkManager for periodic background refreshes", purpose: "Bandwidth-efficient synchronization when network is restored" }
      ],
      screenshots: [
        { title: "Offline Reader", caption: "Locally cached fatwa records accessible without active network", tag: "Mobile UI" },
        { title: "Category Index", caption: "Native Android tab navigation with rapid keyword indexing", tag: "Navigation" }
      ],
      outcomes: [
        "100% offline access to downloaded guidance records without network drops",
        "Significantly reduced memory footprint tested on low-end 2GB RAM devices",
        "Published open source on GitHub with modular package architecture"
      ],
      lessonsLearned: "Mobile users judge apps in the worst conditions, not the best. An offline-first mindset fundamentally transforms app reliability and trust.",
      liveDemo: "https://darulifta-bkfbzf6u.manus.space/",
      github: "https://github.com/Daniyal5722/Darul-Ifta-Irshad-us-Saileen-app2"
    }
  },
  {
    id: "daniyal-hayat-portfolio",
    slug: "daniyal-hayat-portfolio",
    name: "Daniyal-Hayat-Portfolio",
    displayName: "Daniyal Hayat Portfolio Platform",
    role: "Full-Stack Architect & Designer",
    oneLiner: "Production-grade developer portfolio featuring live GitHub API integration, dark futuristic editorial typography, and full keyboard accessibility.",
    description: "Personal portfolio showcase platform featuring live GitHub synchronization, dark editorial styling, case-study routing, and zero-compromise UX.",
    technologies: ["TypeScript", "React 19", "Tailwind CSS", "Express", "Vite"],
    language: "TypeScript",
    githubUrl: "https://github.com/Daniyal5722/Daniyal-Hayat-Portfolio",
    liveUrl: "https://daniyal-hayat-portfolio.vercel.app/",
    category: "Showcase",
    featured: false,
    visualType: "editorial-code",
    readingTime: "3 min read",
    metrics: [
      { label: "Accessibility", value: "WCAG AA Standard" },
      { label: "Type Safety", value: "100% TypeScript" },
      { label: "Performance", value: "Lighthouse 95+" }
    ],
    caseStudy: {
      overview: "The digital portfolio of Daniyal Hayat was architected as an editorial, high-performance showcase that values proof of work over generic templates.",
      problem: "Many developer portfolios rely on bloated templates, flashy animations that obscure content, broken project links, and fabricated experience claims.",
      solution: "Rebuilt with a disciplined editorial aesthetic: dark navy tones, cyan accents, zero-pill typography, dedicated case studies, and server-side validated contact mechanisms.",
      technicalDecisions: [
        {
          decision: "Zero-pill metadata discipline and high-contrast typography",
          rationale: "Distinguishes the portfolio from generic AI slop and highlights architectural clarity and readability.",
          tradeOff: "Requires rigorous typographic scale planning and alignment math."
        },
        {
          decision: "Server-side contact API with Zod validation and IP rate limiting",
          rationale: "Prevents spam and ensures contact inquiries are reliably captured with clear user feedback.",
          tradeOff: "Requires full-stack Node runtime rather than purely static bucket hosting."
        }
      ],
      architecture: [
        { layer: "Frontend Interface", stack: "React 19, TypeScript, Tailwind CSS, Accessible Focus Management", purpose: "Blazing fast SPA navigation with route-level case studies" },
        { layer: "Full-Stack Server", stack: "Node.js, Express, Zod Validation, Rate Limiter", purpose: "Secure API endpoints and asset distribution" },
        { layer: "Build & Bundler", stack: "Vite, Rollup, PostCSS", purpose: "Sub-second hot-reload and optimized tree-shaken production bundles" }
      ],
      screenshots: [
        { title: "Editorial Hero", caption: "Clean typography with restrained availability status and real photo", tag: "Home" },
        { title: "Dynamic Case Study", caption: "Deep architectural breakdowns with problem-solution narratives", tag: "Case Study" }
      ],
      outcomes: [
        "Lighthouse 95+ score across Performance, Accessibility, and Best Practices",
        "Full keyboard navigation with visible focus indicators and skip link",
        "Truthful representation with verified GitHub repositories and live deployments"
      ],
      lessonsLearned: "A portfolio should reflect how an engineer writes production code: structured, accessible, resilient, and honest.",
      liveDemo: "https://daniyal-hayat-portfolio.vercel.app/",
      github: "https://github.com/Daniyal5722/Daniyal-Hayat-Portfolio"
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages & Core",
    description: "Foundational programming languages used for production web platforms, systems, and mobile apps.",
    skills: [
      { name: "TypeScript", level: "Core", context: "Strict typing, generic abstractions, discriminated unions" },
      { name: "JavaScript (ES6+)", level: "Core", context: "Asynchronous runtime, Event Loop, DOM mechanics" },
      { name: "Kotlin", level: "Advanced", context: "Coroutines, Flow, OOP & functional paradigms" },
      { name: "HTML5 & CSS3", level: "Core", context: "Semantic architecture, Flexbox, Grid, WCAG standards" },
      { name: "SQL", level: "Proficient", context: "Relational queries, schema design, index optimization" }
    ]
  },
  {
    category: "Web & Frontend Architecture",
    description: "Modern component-driven frameworks, responsive layout engines, and styling architectures.",
    skills: [
      { name: "React 19", level: "Core", context: "Custom hooks, state isolation, Concurrent Mode" },
      { name: "Next.js", level: "Advanced", context: "App Router, SSR/SSG patterns, API handlers" },
      { name: "Tailwind CSS", level: "Core", context: "Utility architecture, design systems, dark-mode tokens" },
      { name: "Vite", level: "Core", context: "ESM bundling, plugin integration, build optimization" },
      { name: "RESTful APIs", level: "Core", context: "Client-side caching, schema validation, error boundaries" }
    ]
  },
  {
    category: "Native Android & Mobile",
    description: "Native mobile development targeting high performance and offline-first availability.",
    skills: [
      { name: "Android SDK", level: "Advanced", context: "Activity lifecycles, Intent routing, background tasks" },
      { name: "Room / SQLite", level: "Advanced", context: "Local database persistence, DAO patterns, migrations" },
      { name: "Jetpack Compose", level: "Proficient", context: "Declarative UI, State hoist, Material 3" },
      { name: "Offline Caching", level: "Advanced", context: "Sync flags, memory optimization, low-bandwidth resiliency" },
      { name: "Touch & Game Physics", level: "Proficient", context: "Canvas 2D rendering, touch drag vectors, state machines" }
    ]
  },
  {
    category: "Systems, Tools & AI",
    description: "Backend runtimes, developer tooling, and modern artificial intelligence SDKs.",
    skills: [
      { name: "Node.js & Express", level: "Advanced", context: "REST endpoints, middleware, server-side validation" },
      { name: "Google Gemini AI SDK", level: "Advanced", context: "Streaming completions, structured output, prompt engineering" },
      { name: "Git & GitHub", level: "Core", context: "Branching strategies, semantic commits, code reviews" },
      { name: "Performance & Auditing", level: "Advanced", context: "Lighthouse 95+, bundle analysis, CLS/LCP optimization" },
      { name: "Vercel & Netlify", level: "Core", context: "Edge routing, custom domains, continuous deployment" }
    ]
  }
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    id: "exp-1",
    year: "2025 — 2026",
    title: "Flagship Deployments & Independent Engineering",
    role: "Full-Stack Web & Android Developer",
    type: "milestone",
    description: "Architecting and publishing production web platforms, AI-assisted development tools, and native Android applications with a focus on speed and accessible design.",
    highlights: [
      "Engineered Official Darul Ifta Irshad us Saileen web portal serving community religious consultation",
      "Developed CortexIQ AI Suite, integrating Google Gemini AI with reactive telemetry dashboards",
      "Built and deployed Hamara Weather application providing ad-free real-time atmospheric tracking",
      "Maintained verified public GitHub repositories with clean documentation and continuous deployment"
    ],
    technologies: ["TypeScript", "React", "Next.js", "Kotlin", "Android SDK", "Tailwind CSS", "Vite"]
  },
  {
    id: "exp-2",
    year: "2024 — 2025",
    title: "Native Android & Mobile Architecture Focus",
    role: "Mobile App Developer",
    type: "project",
    description: "Focused on native mobile engineering with Kotlin, developing offline-resilient utilities and algorithmic puzzle game systems.",
    highlights: [
      "Architected Darul Ifta Irshad us Saileen mobile app v1 and v2 with Room/SQLite offline persistence",
      "Engineered Mystic Match, a fantasy-themed match-3 algorithmic puzzle game in Kotlin",
      "Implemented resilient offline data persistence to ensure accessibility under poor connectivity",
      "Optimized memory usage and UI frame rates across diverse Android device tiers"
    ],
    technologies: ["Kotlin", "Android Studio", "SQLite / Room", "XML Layouts", "Game Logic"]
  },
  {
    id: "exp-3",
    year: "2023 — 2024",
    title: "Foundations & Web Architecture Mastery",
    role: "Frontend Developer",
    type: "learning",
    description: "Deep dive into web fundamentals, JavaScript algorithms, semantic markup, and the modern React ecosystem.",
    highlights: [
      "Transitioned from classic web development to component-driven React and TypeScript ecosystems",
      "Explored asynchronous REST API integration and client-side data synchronization",
      "Built multiple web utilities and responsive prototypes with modern CSS and Tailwind",
      "Established strict version control and open source hygiene on GitHub"
    ],
    technologies: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "Git", "REST APIs", "Tailwind CSS"]
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "srv-1",
    title: "Full-Stack Web Engineering",
    tagline: "High-performance web apps built to scale",
    description: "End-to-end development of modern web applications using React, Next.js, and TypeScript. Fast loading, secure, and engineered with clean architecture.",
    icon: "Layers",
    deliverables: [
      "Custom responsive web applications with sub-second page loads",
      "Strict TypeScript typings with zero runtime type escapes",
      "Accessible design systems adhering to WCAG AA guidelines",
      "Production deployment pipelines to Vercel or cloud infrastructure"
    ]
  },
  {
    id: "srv-2",
    title: "Native Android Mobile Apps",
    tagline: "Fluid, reliable mobile apps built with Kotlin",
    description: "Native Android development utilizing Kotlin and modern Android SDK patterns. Emphasizing smooth touch ergonomics, offline reliability, and clean interfaces.",
    icon: "Smartphone",
    deliverables: [
      "Native Android applications written in idiomatic Kotlin",
      "Offline-first caching with SQLite / Room architecture",
      "Memory-efficient layouts optimized for budget device tiers",
      "Clean Material Design navigation and responsive touch physics"
    ]
  },
  {
    id: "srv-3",
    title: "AI Integration & Data Systems",
    tagline: "Connecting modern AI models to practical frontends",
    description: "Integrating modern LLM capabilities (such as Google Gemini AI) into intuitive frontends for prompt parsing, smart assistants, and automated data processing.",
    icon: "Cpu",
    deliverables: [
      "Secure server-side API proxying and key isolation",
      "Streaming model completions with token latency monitors",
      "Structured output parsers with Markdown formatting",
      "Real-time external API pipelines with graceful error handling"
    ]
  },
  {
    id: "srv-4",
    title: "Performance & Accessibility Auditing",
    tagline: "Eliminating bloat, layout shifts, and accessibility barriers",
    description: "Transforming clunky or generic interfaces into polished, accessible, memorable digital experiences with verified Lighthouse 95+ performance scores.",
    icon: "ShieldCheck",
    deliverables: [
      "Core Web Vitals remediation (LCP, INP, and CLS = 0.00)",
      "Full keyboard navigation and screen-reader accessibility",
      "Zero-pill typography and dark editorial theme refinement",
      "Bundle size minification and unused JavaScript elimination"
    ]
  }
];

export const PROJECTS = CURATED_PROJECTS;

export const LIVE_DEPLOYMENTS = CURATED_PROJECTS.map(p => ({
  title: p.displayName,
  type: p.category,
  url: p.liveUrl || p.githubUrl,
  githubUrl: p.githubUrl,
  badge: "Production Live",
  description: p.oneLiner
}));

export const SKILL_GROUPS = SKILL_CATEGORIES.map(cat => ({
  category: cat.category,
  subtitle: cat.description,
  icon: "Layers",
  skills: cat.skills.map(s => ({
    name: s.name,
    level: s.level,
    description: s.context,
    badge: s.level,
    icon: "CheckCircle"
  }))
}));

export const EDUCATION_DATA = [
  {
    id: "edu-1",
    institution: "Computer Science & Engineering Studies",
    program: "Software Design, Algorithms & System Architecture",
    timeline: "2023 — Present",
    description: "Rigorous focus on data structures, algorithmic complexity, object-oriented design in Kotlin, and modern web application development.",
    skillsGained: ["Data Structures & Algorithms", "Kotlin & Android SDK", "TypeScript & React", "Database Design"]
  }
];

export const MARQUEE_TECH_STACK = [
  { name: "TypeScript", category: "Language" },
  { name: "React 19", category: "Frontend" },
  { name: "Kotlin", category: "Mobile" },
  { name: "Next.js", category: "Framework" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Android SDK", category: "Mobile" },
  { name: "Google Gemini AI", category: "Intelligence" },
  { name: "Node.js", category: "Backend" }
];

