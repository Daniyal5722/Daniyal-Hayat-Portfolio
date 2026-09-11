import { useState, useEffect } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';

export function useGitHubRepos() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  const fetchGitHubData = async () => {
    setIsSyncing(true);
    setSyncError(null);
    try {
      const response = await fetch('https://api.github.com/users/Daniyal5722/repos?per_page=100&sort=updated');
      if (!response.ok) {
        throw new Error(`GitHub API rate limit or error: ${response.statusText}`);
      }
      const data = await response.json();
      
      // Merge live GitHub repo stats with our curated repository descriptions & features
      const curatedProjects = PROJECTS.map((proj) => {
        // match by repo name (case insensitive or exact)
        const liveRepo = data.find(
          (r: any) => r.name.toLowerCase() === proj.name.toLowerCase() ||
                      r.name.toLowerCase().replace(/[-_]/g, '') === proj.name.toLowerCase().replace(/[-_]/g, '')
        );

        if (liveRepo) {
          return {
            ...proj,
            language: liveRepo.language || proj.language,
            stars: liveRepo.stargazers_count,
            forks: liveRepo.forks_count,
            updatedAt: liveRepo.updated_at,
            githubUrl: liveRepo.html_url,
            description: liveRepo.description || proj.description
          };
        }
        return proj;
      });

      const newProjects = data
        .filter((r: any) => !r.fork)
        .filter((r: any) => !PROJECTS.some(proj => 
          r.name.toLowerCase() === proj.name.toLowerCase() || 
          r.name.toLowerCase().replace(/[-_]/g, '') === proj.name.toLowerCase().replace(/[-_]/g, '')
        ))
        .map((repo: any) => ({
          id: repo.name,
          name: repo.name,
          displayName: repo.name.replace(/[-_]/g, ' '),
          description: repo.description || "No description provided.",
          technologies: repo.language ? [repo.language] : [],
          language: repo.language || "Unknown",
          githubUrl: repo.html_url,
          liveUrl: repo.homepage,
          category: "GitHub Repository",
          featured: false,
          iconName: "Github",
          features: [],
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updatedAt: repo.updated_at
        }));

      const updatedProjects = [...curatedProjects, ...newProjects].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        const dateA = new Date(a.updatedAt || 0).getTime();
        const dateB = new Date(b.updatedAt || 0).getTime();
        return dateB - dateA;
      });

      setProjects(updatedProjects);
      setLastSynced(new Date().toLocaleTimeString());
      localStorage.setItem('daniyal_github_repos_cache', JSON.stringify({
        projects: updatedProjects,
        timestamp: new Date().toISOString()
      }));
    } catch (err: any) {
      console.warn('Using cached/static project data due to GitHub API limit:', err);
      setSyncError('Using local curated repository state (GitHub API limit or offline)');
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    // Check localStorage cache first
    const cached = localStorage.getItem('daniyal_github_repos_cache');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed.projects) {
          setProjects(parsed.projects);
          setLastSynced(new Date(parsed.timestamp).toLocaleTimeString());
        }
      } catch (e) {
        // ignore
      }
    }
    // Fetch fresh live data in background
    fetchGitHubData();
  }, []);

  return {
    projects,
    isSyncing,
    lastSynced,
    syncError,
    refreshRepos: fetchGitHubData
  };
}
