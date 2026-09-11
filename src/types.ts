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
  stars?: number;
  forks?: number;
  updatedAt?: string;
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    icon: string;
    projectCount: number;
    level: string;
  }[];
}

export interface ContactFormState {
  name: string;
  email: string;
  message: string;
}
