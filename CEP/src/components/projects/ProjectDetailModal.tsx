import React from 'react';
import { Modal } from '../common/Modal';
import type { Project } from '../../types';
import { useData } from '../../context/DataContext';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';
import {
  Calendar,
  Users,
  CheckSquare,
  Edit2,
  Trash2,
  Plus,
  CheckCircle2,
} from 'lucide-react';

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  onAddTaskToProject: (projectId: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  isOpen,
  onClose,
  project,
  onEdit,
  onDelete,
  onAddTaskToProject,
}) => {
  const { tasks, members, getProjectProgress, updateTaskStatus } = useData();

  if (!project) return null;

  const projectTasks = tasks.filter((t) => t.projectId === project.id);
  const projectMembers = members.filter((m) =>
    project.memberIds.includes(m.id)
  );
  const { percent, completed, total } = getProjectProgress(project.id);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project.name}
      subtitle={project.category}
      maxWidth="xl"
    >
      <div className="space-y-6">
        {/* Top Badges & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E8E5F0]">
          <div className="flex items-center gap-2">
            <Badge label={project.status} variant="status" />
            <Badge label={project.category} variant="category" />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onEdit(project);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8E5F0] text-xs font-medium text-[#252238] hover:bg-[#F0EDFA] hover:text-[#6554C0] transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" /> Edit
            </button>
            <button
              onClick={() => {
                onClose();
                onDelete(project);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8E5F0] text-xs font-medium text-[#D98291] hover:bg-[#FDF3F5] transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        </div>

        {/* Project Description */}
        <div>
          <h4 className="text-xs font-semibold text-[#77738C] uppercase tracking-wider mb-1.5">
            Overview & Scope
          </h4>
          <p className="text-sm text-[#252238] leading-relaxed bg-[#FAF9FD] p-3.5 rounded-xl border border-[#E8E5F0]">
            {project.description}
          </p>
        </div>

        {/* Timeline & Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-xl border border-[#E8E5F0] bg-white flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F0EDFA] text-[#6554C0] flex items-center justify-center">
              <Calendar className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="text-[11px] text-[#77738C]">Project Timeline</div>
              <div className="text-xs font-semibold text-[#252238]">
                {project.startDate} to {project.deadline}
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#E8E5F0] bg-white flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F2F8F4] text-[#8BAF9B] flex items-center justify-center">
              <CheckSquare className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="text-[11px] text-[#77738C]">Progress</div>
              <div className="text-xs font-semibold text-[#252238]">
                {completed} of {total} tasks completed ({percent}%)
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <ProgressBar progress={percent} size="md" showLabel />
        </div>

        {/* Assigned Team Members */}
        <div>
          <h4 className="text-xs font-semibold text-[#77738C] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> Assigned Team Members (
            {projectMembers.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {projectMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#E8E5F0] bg-[#FAF9FD]"
              >
                <div
                  className="w-7 h-7 rounded-lg text-white font-bold text-xs flex items-center justify-center"
                  style={{ backgroundColor: member.avatarColor }}
                >
                  {member.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-[#252238] truncate">
                    {member.name}
                  </div>
                  <div className="text-[11px] text-[#77738C] truncate">
                    {member.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Associated Tasks List */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-semibold text-[#77738C] uppercase tracking-wider flex items-center gap-1.5">
              <CheckSquare className="w-3.5 h-3.5" /> Project Tasks ({total})
            </h4>
            <button
              onClick={() => {
                onClose();
                onAddTaskToProject(project.id);
              }}
              className="text-xs font-medium text-[#6554C0] hover:text-[#5644B0] flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Task
            </button>
          </div>

          {projectTasks.length === 0 ? (
            <div className="p-4 text-center text-xs text-[#77738C] rounded-xl border border-dashed border-[#E8E5F0]">
              No tasks created for this project yet. Add deliverables to begin
              tracking progress.
            </div>
          ) : (
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {projectTasks.map((task) => {
                const isDone = task.status === 'Completed';
                return (
                  <div
                    key={task.id}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-[#E8E5F0] bg-white hover:bg-[#FAF9FD] transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <button
                        onClick={() =>
                          updateTaskStatus(
                            task.id,
                            isDone ? 'In Progress' : 'Completed'
                          )
                        }
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                          isDone
                            ? 'bg-[#8BAF9B] text-white'
                            : 'border border-[#E8E5F0] text-transparent hover:border-[#6554C0]'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <div className="min-w-0">
                        <span
                          className={`text-xs font-medium block truncate ${
                            isDone
                              ? 'line-through text-[#77738C]'
                              : 'text-[#252238]'
                          }`}
                        >
                          {task.title}
                        </span>
                        <span className="text-[10px] text-[#77738C]">
                          Due: {task.dueDate}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Badge label={task.priority} variant="priority" size="sm" />
                      <Badge label={task.status} variant="status" size="sm" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

