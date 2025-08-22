import { useQuery } from '@tanstack/react-query';

interface GitHubEvent {
  id: string;
  type: string;
  repo: {
    name: string;
  };
  created_at: string;
  payload: any;
}

interface GitHubStats {
  repositories: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
}

export function useGitHubActivity() {
  return useQuery({
    queryKey: ['/api/github-activity'],
    select: (data: GitHubEvent[]) => data.slice(0, 5), // Show only recent 5 activities
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useGitHubStats() {
  return useQuery<GitHubStats>({
    queryKey: ['/api/github-stats'],
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}
