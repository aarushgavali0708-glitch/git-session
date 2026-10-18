import React, { useState } from 'react';
import type { Task, TaskStatus } from '../../types';
import { useData } from '../../context/DataContext';
import { Badge } from '../common/Badge';
import {
  Calendar,
  AlertCircle,
  MoreVertical,
  Edit2,
  Trash2,
  ArrowRightCircle,
  Folder,
} from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onDragStart,
}) => {
  const { projects, members, updateTaskStatus } = useData();
  const [menuOpen, setMenuOpen] = useState(false);

  const project = projects.find((p) => p.id === task.projectId);
  const assignee = members.find((m) => m.id === task.assigneeId);

  const today = new Date().toISOString().split('T')[0];
  const isOverdue = task.status !== 'Completed' && task.dueDate && task.dueDate < today;

  const nextStatusOptions: TaskStatus[] = (['To Do', 'In Progress', 'Completed'] as TaskStatus[]).filter(
    (s) => s !== task.status
  );

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className={`bg-white rounded-xl p-4 border transition-all cursor-grab active:cursor-grabbing hover:shadow-sm relative group ${
        isOverdue ? 'border-[#f7d5dc] bg-[#FDF3F5]/30' : 'border-[#E8E5F0]'
      }`}
    >
      {/* Top Badges & Card Menu */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge label={task.priority} variant="priority" size="sm" />
          {project && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#6554C0] bg-[#F0EDFA] px-2 py-0.5 rounded-md truncate max-w-[130px]">
              <Folder className="w-3 h-3 shrink-0" />
              <span className="truncate">{project.name}</span>
            </span>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 rounded-md text-[#77738C] hover:text-[#252238] hover:bg-[#F0EDFA] transition-colors"
            aria-label="Task options"
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-lg border border-[#E8E5F0] py-1.5 z-30 animate-in fade-in zoom-in-95">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onEdit(task);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-[#252238] hover:bg-[#F0EDFA] hover:text-[#6554C0] font-medium flex items-center gap-2"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <div className="px-3 py-1 text-[10px] uppercase font-semibold text-[#77738C] border-t border-[#F0EDFA] mt-1">
                  Move To
                </div>
                {nextStatusOptions.map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      setMenuOpen(false);
                      updateTaskStatus(task.id, st);
                    }}
                    className="w-full text-left px-3 py-1 text-xs text-[#252238] hover:bg-[#F0EDFA] hover:text-[#6554C0] flex items-center gap-1.5"
                  >
                    <ArrowRightCircle className="w-3 h-3 text-[#6554C0]" /> {st}
                  </button>
                ))}
                <div className="border-t border-[#F0EDFA] mt-1 pt-1">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onDelete(task);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-[#D98291] hover:bg-[#FDF3F5] font-medium flex items-center gap-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Task Title & Description */}
      <h4
        onClick={() => onEdit(task)}
        className="text-xs sm:text-sm font-semibold text-[#252238] hover:text-[#6554C0] transition-colors cursor-pointer leading-snug mb-1"
      >
        {task.title}
      </h4>

      {task.description && (
        <p className="text-[11px] text-[#77738C] line-clamp-2 mb-3 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Footer: Due date & Assignee */}
      <div className="pt-2.5 border-t border-[#F0EDFA] flex items-center justify-between gap-2 text-[11px]">
        {/* Due Date */}
        <div
          className={`flex items-center gap-1.5 font-medium ${
            isOverdue ? 'text-[#D98291]' : 'text-[#77738C]'
          }`}
        >
          {isOverdue ? (
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          ) : (
            <Calendar className="w-3.5 h-3.5 shrink-0" />
          )}
          <span>{task.dueDate}</span>
        </div>

        {/* Assignee Avatar */}
        {assignee ? (
          <div
            title={`Assigned to ${assignee.name} (${assignee.role})`}
            className="flex items-center gap-1.5"
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-2xs"
              style={{ backgroundColor: assignee.avatarColor }}
            >
              {assignee.initials}
            </div>
            <span className="text-[11px] text-[#252238] font-medium hidden sm:inline max-w-[80px] truncate">
              {assignee.name.split(' ')[0]}
            </span>
          </div>
        ) : (
          <span className="text-[10px] text-[#77738C] italic">Unassigned</span>
        )}
      </div>
    </div>
  );
};

