export interface CaseStudy {
  overview: string;        // 01 Overview
  problem: string;         // 02 Problem
  idea: string;            // 03 Idea
  design: string;          // 04 Design
  development: string;     // 05 Development
  technology: string;      // 06 Technology
  challenges: string;      // 07 Challenges
  solution: string;        // 08 Solution
  screenshots?: string;    // 09 Screenshots / Visual Architecture
  liveDemo?: string;       // 10 Live Demo
  github?: string;         // 11 GitHub
  lessonsLearned: string;  // 12 Lessons Learned
  result?: string;         // Result summary
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
