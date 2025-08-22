import React from 'react';
import { motion } from 'framer-motion';
import { Github, GitCommit, Star, GitFork, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useGitHubActivity, useGitHubStats } from '@/hooks/useGitHub';

const eventTypeMap: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  PushEvent: { icon: GitCommit, color: 'text-blue-500', label: 'Pushed' },
  CreateEvent: { icon: Star, color: 'text-green-500', label: 'Created' },
  ForkEvent: { icon: GitFork, color: 'text-purple-500', label: 'Forked' },
  IssuesEvent: { icon: GitCommit, color: 'text-orange-500', label: 'Issue' },
  PullRequestEvent: { icon: GitCommit, color: 'text-red-500', label: 'Pull Request' },
};

function ActivityItem({ event }: { event: any }) {
  const eventInfo = eventTypeMap[event.type] || eventTypeMap.PushEvent;
  const IconComponent = eventInfo.icon;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return '1 day ago';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <div className="border-l-4 border-blue-500 pl-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
      <div className="flex items-center mb-1">
        <IconComponent className={`h-4 w-4 mr-2 ${eventInfo.color}`} />
        <span className="font-medium text-sm">{eventInfo.label}</span>
      </div>
      <p className="font-medium text-sm">{event.repo.name}</p>
      <p className="text-xs text-gray-600 dark:text-gray-400">{formatDate(event.created_at)}</p>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, color }: { 
  icon: React.ElementType; 
  value: string | number; 
  label: string; 
  color: string; 
}) {
  return (
    <div className="text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
      <Icon className={`h-6 w-6 mx-auto mb-2 ${color}`} />
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
}

export default function GitHubActivity() {
  const { data: activities, isLoading: activitiesLoading, error: activitiesError } = useGitHubActivity();
  const { data: stats, isLoading: statsLoading, error: statsError } = useGitHubStats();

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            GitHub Activity
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Recent contributions and activity</p>
        </motion.div>
        
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div>
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="flex items-center text-xl">
                    <Github className="mr-3 h-6 w-6" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                
                <div className="space-y-4">
                  {activitiesLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-2/3" />
                      </div>
                    ))
                  ) : activitiesError ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                      <Github className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Unable to load GitHub activity</p>
                      <p className="text-sm">Please check back later</p>
                    </div>
                  ) : activities && activities.length > 0 ? (
                    activities.map((event) => (
                      <ActivityItem key={event.id} event={event} />
                    ))
                  ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                      <Github className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No recent activity found</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* GitHub Stats */}
              <div>
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl">Statistics</CardTitle>
                </CardHeader>
                
                {statsLoading ? (
                  <div className="grid grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                        <Skeleton className="h-6 w-6 mx-auto mb-2" />
                        <Skeleton className="h-6 w-12 mx-auto mb-1" />
                        <Skeleton className="h-4 w-16 mx-auto" />
                      </div>
                    ))}
                  </div>
                ) : statsError ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    <p>Unable to load GitHub stats</p>
                  </div>
                ) : stats ? (
                  <div className="grid grid-cols-2 gap-4">
                    <StatCard
                      icon={Github}
                      value={stats.repositories}
                      label="Repositories"
                      color="text-blue-600"
                    />
                    <StatCard
                      icon={Star}
                      value={stats.totalStars}
                      label="Stars"
                      color="text-yellow-600"
                    />
                    <StatCard
                      icon={GitFork}
                      value={stats.totalForks}
                      label="Forks"
                      color="text-purple-600"
                    />
                    <StatCard
                      icon={Users}
                      value={stats.followers}
                      label="Followers"
                      color="text-green-600"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
