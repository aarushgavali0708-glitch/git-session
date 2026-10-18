import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { StatCard } from '../components/dashboard/StatCard';
import { ProgressOverview } from '../components/dashboard/ProgressOverview';
import { RecentProjects } from '../components/dashboard/RecentProjects';
import { UpcomingDeadlines } from '../components/dashboard/UpcomingDeadlines';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { ProjectModal } from '../components/projects/ProjectModal';
import { TaskModal } from '../components/tasks/TaskModal';
import {
  FolderKanban,
  CheckSquare,
  Clock,
  CheckCircle2,
  ListTodo,
  TrendingUp,
  Plus,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { metrics, preferences } = useData();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner / Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E8E5F0]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#252238] tracking-tight">
            Welcome back, {preferences.displayName}
          </h1>
          <p className="text-xs sm:text-sm text-[#77738C] mt-1">
            Community Engagement Project (CEP) Collaboration & Delivery Hub
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#E8E5F0] bg-white text-xs sm:text-sm font-medium text-[#252238] hover:bg-[#F0EDFA] hover:text-[#6554C0] hover:border-[#6554C0]/30 transition-all shadow-2xs"
          >
            <Plus className="w-4 h-4 text-[#6554C0]" />
            <span>Add Task</span>
          </button>
          <button
            onClick={() => setIsProjectModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6554C0] text-white text-xs sm:text-sm font-medium hover:bg-[#5644B0] transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Dynamic Statistics Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard
          title="Total Projects"
          value={metrics.totalProjects}
          subtitle="Community initiatives"
          icon={FolderKanban}
          accent="deep"
        />
        <StatCard
          title="Total Tasks"
          value={metrics.totalTasks}
          subtitle="All deliverables"
          icon={CheckSquare}
          accent="lavender"
        />
        <StatCard
          title="In Progress"
          value={metrics.inProgressTasks}
          subtitle="Actively worked on"
          icon={Clock}
          accent="lavender"
        />
        <StatCard
          title="Pending (To Do)"
          value={metrics.todoTasks}
          subtitle="Queued milestones"
          icon={ListTodo}
          accent="amber"
        />
        <StatCard
          title="Completed"
          value={metrics.completedTasks}
          subtitle="Delivered results"
          icon={CheckCircle2}
          accent="sage"
        />
        <StatCard
          title="Overall Progress"
          value={`${metrics.overallProgress}%`}
          subtitle="Execution rate"
          icon={TrendingUp}
          accent="lavender"
        />
      </div>

      {/* Progress Breakdown & Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <ProgressOverview />
          <RecentProjects />
        </div>

        <div className="space-y-6">
          <UpcomingDeadlines />
          <ActivityFeed />
        </div>
      </div>

      {/* Contextual Modals */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />
    </div>
  );
};

