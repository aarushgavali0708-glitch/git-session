import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Badge } from '../common/Badge';
import { Calendar, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export const UpcomingDeadlines: React.FC = () => {
  const { tasks, projects, updateTaskStatus } = useData();

  const today = new Date().toISOString().split('T')[0];

  // Filter incomplete tasks and sort by dueDate ascending
  const upcomingTasks = tasks
    .filter((t) => t.status !== 'Completed')
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 4);

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8E5F0] shadow-2xs">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-[#252238] flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#6554C0]" /> Upcoming Milestones
          </h3>
          <p className="text-xs text-[#77738C] mt-0.5">
            Prioritized tasks requiring attention
          </p>
        </div>
        <Link
          to="/app/tasks"
          className="text-xs font-semibold text-[#6554C0] hover:text-[#5644B0] flex items-center gap-1 group"
        >
          <span>Kanban Board</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {upcomingTasks.length === 0 ? (
        <div className="text-center py-8 text-xs text-[#77738C] flex flex-col items-center">
          <CheckCircle2 className="w-8 h-8 text-[#8BAF9B] mb-2" />
          <span>All tasks are completed! Great job.</span>
        </div>
      ) : (
        <div className="space-y-3">
          {upcomingTasks.map((task) => {
            const project = projects.find((p) => p.id === task.projectId);
            const isOverdue = task.dueDate < today;

            return (
              <div
                key={task.id}
                className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                  isOverdue
                    ? 'border-[#f7d5dc] bg-[#FDF3F5]/40'
                    : 'border-[#E8E5F0] bg-white hover:bg-[#FAF9FD]'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#252238] truncate">
                      {task.title}
                    </span>
                    {isOverdue && (
                      <span className="shrink-0 flex items-center gap-1 text-[10px] font-semibold text-[#D98291] bg-white px-2 py-0.5 rounded-md border border-[#f7d5dc]">
                        <AlertCircle className="w-3 h-3" /> Overdue
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-[#77738C]">
                    <span className="truncate">{project?.name || 'CEP Project'}</span>
                    <span>•</span>
                    <span className={isOverdue ? 'text-[#D98291] font-medium' : ''}>
                      Due {task.dueDate}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Badge label={task.priority} variant="priority" size="sm" />
                  <button
                    onClick={() => updateTaskStatus(task.id, 'Completed')}
                    className="p-1 rounded-lg text-[#77738C] hover:text-[#8BAF9B] hover:bg-[#F2F8F4] transition-colors"
                    title="Mark task as complete"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

