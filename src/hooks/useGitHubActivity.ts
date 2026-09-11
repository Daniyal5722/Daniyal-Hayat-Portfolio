import { useState, useEffect } from 'react';
import { GITHUB_USERNAME } from '../data/portfolioData';

export interface ActivityStatus {
  repoName: string;
  repoUrl: string;
  actionText: string;
  timeAgo: string;
}

export function useGitHubActivity() {
  const [activity, setActivity] = useState<ActivityStatus>({
    repoName: 'cortexiq-by-dnyl',
    repoUrl: `https://github.com/${GITHUB_USERNAME}/cortexiq-by-dnyl`,
    actionText: 'Push updates to CortexIQ intelligence suite',
    timeAgo: 'Recently active'
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=5`);
        if (!response.ok) throw new Error('Events fetch failed');
        const events = await response.json();
        
        // Find first push or repo event
        const pushEvent = events.find((e: any) => e.type === 'PushEvent' || e.type === 'CreateEvent' || e.type === 'WatchEvent');
        if (pushEvent) {
          const repoName = pushEvent.repo.name.replace(`${GITHUB_USERNAME}/`, '');
          const repoUrl = `https://github.com/${pushEvent.repo.name}`;
          const type = pushEvent.type === 'PushEvent' ? 'Committed to' : 'Updated';
          const time = new Date(pushEvent.created_at).toLocaleDateString();

          setActivity({
            repoName,
            repoUrl,
            actionText: `${type} ${repoName}`,
            timeAgo: time
          });
        } else {
          // Fallback to most recently updated repo
          const repoRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=1`);
          const repos = await repoRes.json();
          if (repos && repos.length > 0) {
            setActivity({
              repoName: repos[0].name,
              repoUrl: repos[0].html_url,
              actionText: `Active on ${repos[0].name}`,
              timeAgo: 'Recently updated'
            });
          }
        }
      } catch (err) {
        console.warn('Using default active status:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  return { activity, loading };
}
