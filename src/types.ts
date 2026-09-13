export interface CaseStudy {
  overview: string;
  problem: string;
  idea: string;
  design: string;
  development: string;
  challenges: string;
  solution: string;
  result: string;
}

export interface Project {
  id: string;
  name: string;
  displayName: string;
  description: string;
  technologies: string[];
  language: string;
  githubUrl: string;
  liveUrl?: string;
  category: string;
  featured?: boolean;
  iconName: string;
  features: string[];
  caseStudy?: CaseStudy;
  metrics?: { label: string; value: string }[];
  stars?: number;
  forks?: number;
  updatedAt?: string;
  readingTime?: string;
}

export interface SkillCategoryItem {
  name: string;
  icon: string;
  level: string;
  description: string;
  badge: string;
}

export interface SkillGroup {
  category: string;
  subtitle: string;
  icon: string;
  skills: SkillCategoryItem[];
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

export interface EducationItem {
  id: string;
  institution: string;
  program: string;
  timeline: string;
  description: string;
  skillsGained: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  deliverables: string[];
}

export interface ContactFormState {
  name: string;
  email: string;
  message: string;
}
