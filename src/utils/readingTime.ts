import { Project } from '../types';

/**
 * Calculates the estimated reading time for a project card based on its content length.
 * Considers display name, description, features list, and technologies.
 */
export function getEstimatedReadingTime(project: Partial<Project>): string {
  if (project.readingTime) {
    return project.readingTime;
  }

  const textSegments = [
    project.displayName || '',
    project.description || '',
    ...(project.features || []),
    ...(project.technologies || []),
  ];

  const wordCount = textSegments
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  // Assuming an average reading/evaluation speed of ~65 words per minute for technical cards
  const minutes = Math.max(1, Math.ceil(wordCount / 65));
  return `${minutes} min read`;
}
