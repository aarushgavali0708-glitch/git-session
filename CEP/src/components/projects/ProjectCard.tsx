import React from 'react';
import type { Project } from '../../types';
import { useData } from '../../context/DataContext';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';
import { Calendar, MoreVertical, Edit2, Trash2, Eye } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  onView: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
  onView,
}) => {
  const { members, getProjectProgress } = useData();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const { percent, completed, total } = getProjectProgress(project.id);
  const assignedMembers = members.filter((m) =>
    project.memberIds.includes(m.id)
  );

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E8E5F0] hover:border-[#6554C0]/40 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between relative group">
      <div>
        {/* Top Badges and Action Menu */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge label={project.status} variant="status" size="sm" />
            <Badge label={project.category} variant="category" size="sm" />
          </div>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 rounded-lg text-[#77738C] hover:text-[#252238] hover:bg-[#F0EDFA] transition-colors"
              aria-label="Project actions"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-[#E8E5F0] py-1.5 z-30 animate-in fade-in zoom-in-95">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onView(project);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-[#252238] hover:bg-[#F0EDFA] hover:text-[#6554C0] font-medium flex items-center gap-2"
                  >
                    <Eye className="w-3.5 h-3.5" /> Details
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onEdit(project);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-[#252238] hover:bg-[#F0EDFA] hover:text-[#6554C0] font-medium flex items-center gap-2"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onDelete(project);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-[#D98291] hover:bg-[#FDF3F5] font-medium flex items-center gap-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Title and Description */}
        <h3
          onClick={() => onView(project)}
          className="text-base font-semibold text-[#252238] group-hover:text-[#6554C0] transition-colors cursor-pointer line-clamp-1 mb-1.5"
        >
          {project.name}
        </h3>
        <p className="text-xs text-[#77738C] line-clamp-2 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Progress Section */}
        <div className="mb-4 bg-[#FAF9FD] p-3 rounded-xl border border-[#E8E5F0]/60">
          <div className="flex items-center justify-between text-xs text-[#77738C] mb-1.5 font-medium">
            <span>
              {completed} of {total} tasks completed
            </span>
            <span className="font-semibold text-[#6554C0]">{percent}%</span>
          </div>
          <ProgressBar progress={percent} size="sm" />
        </div>
      </div>

      {/* Bottom Footer: Dates & Member Avatars */}
      <div className="pt-3 border-t border-[#F0EDFA] flex items-center justify-between gap-2 text-xs text-[#77738C]">
        <div className="flex items-center gap-1.5 min-w-0">
          <Calendar className="w-3.5 h-3.5 text-[#77738C] shrink-0" />
          <span className="truncate">Due {project.deadline}</span>
        </div>

        <div className="flex items-center -space-x-2 shrink-0">
          {assignedMembers.slice(0, 3).map((m) => (
            <div
              key={m.id}
              title={`${m.name} (${m.role})`}
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-white shadow-2xs"
              style={{ backgroundColor: m.avatarColor }}
            >
              {m.initials}
            </div>
          ))}
          {assignedMembers.length > 3 && (
            <div className="w-6 h-6 rounded-full bg-[#F0EDFA] text-[#6554C0] flex items-center justify-center text-[10px] font-semibold ring-2 ring-white">
              +{assignedMembers.length - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

