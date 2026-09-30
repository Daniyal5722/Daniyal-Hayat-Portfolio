export interface CaseStudyDecision {
  decision: string;
  rationale: string;
  tradeOff: string;
}

export interface ArchitectureLayer {
  layer: string;
  stack: string;
  purpose: string;
}

export interface CaseStudyScreenshot {
  title: string;
  caption: string;
  tag: string;
}

export interface CaseStudy {
  overview: string;
  problem: string;
  idea?: string;
  solution: string;
  technicalDecisions: CaseStudyDecision[];
  architecture: ArchitectureLayer[];
  screenshots?: CaseStudyScreenshot[];
  outcomes: string[];
  lessonsLearned: string;
  liveDemo?: string;
  github?: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  displayName: string;
  role: string;
  oneLiner: string;
  description: string;
  technologies: string[];
  language: string;
  githubUrl: string;
  liveUrl?: string;
  category: 'Web Platform' | 'Mobile App' | 'AI & Intelligence' | 'Mobile Game' | 'Showcase';
  featured: boolean;
  visualType: 'browser-portal' | 'ai-dashboard' | 'weather-telemetry' | 'mobile-mockup' | 'matrix-grid' | 'editorial-code';
  metrics?: { label: string; value: string }[];
  caseStudy: CaseStudy;
  readingTime?: string;
  features?: string[];
  stars?: number;
  forks?: number;
  updatedAt?: string;
  iconName?: string;
}

export type ContactFormState = ContactFormValues;

export interface SkillCategoryItem {
  name: string;
  level: string;
  description: string;
  badge: string;
  icon?: string;
}

export interface SkillGroup {
  category: string;
  subtitle: string;
  icon: string;
  skills: SkillCategoryItem[];
}

export interface EducationItem {
  id: string;
  institution: string;
  program: string;
  timeline: string;
  description: string;
  skillsGained: string[];
}

export interface SkillItem {
  name: string;
  level: 'Core' | 'Advanced' | 'Proficient';
  context: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  year: string;
  title: string;
  role: string;
  type: 'milestone' | 'project' | 'learning';
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  deliverables: string[];
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject?: string;
  message: string;
  website?: string; // Honeypot field
}
