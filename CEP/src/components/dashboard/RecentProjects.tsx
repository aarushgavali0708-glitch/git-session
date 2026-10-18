import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';
import { ArrowRight, FolderKanban, Calendar } from 'lucide-react';

export const RecentProjects: React.FC = () => {
  const { projects, members, getProjectProgress } = useData();

  const recent = projects.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8E5F0] shadow-2xs">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-[#252238] flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-[#6554C0]" /> Active Projects
          </h3>
          <p className="text-xs text-[#77738C] mt-0.5">
            Key community initiatives in progress
          </p>
        </div>
        <Link
          to="/app/projects"
          className="text-xs font-semibold text-[#6554C0] hover:text-[#5644B0] flex items-center gap-1 group"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="text-center py-8 text-xs text-[#77738C]">
          No projects found. Create your first project to get started.
        </div>
      ) : (
        <div className="space-y-4">
          {recent.map((project) => {
            const { percent, completed, total } = getProjectProgress(project.id);
            const projectMembers = members.filter((m) =>
              project.memberIds.includes(m.id)
            );

            return (
              <div
                key={project.id}
                className="p-4 rounded-xl border border-[#E8E5F0] hover:border-[#6554C0]/40 hover:bg-[#FAF9FD] transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-[#252238] truncate">
                      {project.name}
                    </h4>
                    <p className="text-xs text-[#77738C] line-clamp-1 mt-0.5">
                      {project.description}
                    </p>
                  </div>
                  <Badge label={project.status} variant="status" size="sm" />
                </div>

                <div className="my-3">
                  <div className="flex items-center justify-between text-xs text-[#77738C] mb-1.5">
                    <span>
                      {completed} of {total} tasks done
                    </span>
                    <span className="font-semibold text-[#252238]">{percent}%</span>
                  </div>
                  <ProgressBar progress={percent} size="sm" />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#F0EDFA] text-xs text-[#77738C]">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#77738C]" />
                    <span>Due {project.deadline}</span>
                  </div>

                  {/* Member avatars */}
                  <div className="flex items-center -space-x-1.5">
                    {projectMembers.slice(0, 3).map((m) => (
                      <div
                        key={m.id}
                        title={m.name}
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white ring-2 ring-white"
                        style={{ backgroundColor: m.avatarColor }}
                      >
                        {m.initials}
                      </div>
                    ))}
                    {projectMembers.length > 3 && (
                      <div className="w-5 h-5 rounded-full bg-[#F0EDFA] text-[#6554C0] flex items-center justify-center text-[9px] font-semibold ring-2 ring-white">
                        +{projectMembers.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

