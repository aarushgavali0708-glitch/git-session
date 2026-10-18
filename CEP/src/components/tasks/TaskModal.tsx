import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import type { Task, TaskPriority, TaskStatus } from '../../types';
import { useData } from '../../context/DataContext';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: Task | null;
  defaultStatus?: TaskStatus;
  defaultProjectId?: string;
}

const PRIORITIES: TaskPriority[] = ['Low', 'Medium', 'High', 'Urgent'];
const STATUSES: TaskStatus[] = ['To Do', 'In Progress', 'Completed'];

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  taskToEdit,
  defaultStatus = 'To Do',
  defaultProjectId = '',
}) => {
  const { projects, members, addTask, updateTask } = useData();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('Medium');
  const [status, setStatus] = useState<TaskStatus>(defaultStatus);
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setProjectId(taskToEdit.projectId);
      setAssigneeId(taskToEdit.assigneeId);
      setPriority(taskToEdit.priority);
      setStatus(taskToEdit.status);
      setDueDate(taskToEdit.dueDate);
    } else {
      const weekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
      setTitle('');
      setDescription('');
      setProjectId(defaultProjectId || (projects.length > 0 ? projects[0].id : ''));
      setAssigneeId(members.length > 0 ? members[0].id : '');
      setPriority('Medium');
      setStatus(defaultStatus);
      setDueDate(weekFromNow);
    }
    setErrors({});
  }, [taskToEdit, isOpen, defaultStatus, defaultProjectId, projects, members]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!projectId) {
      newErrors.projectId = 'Please select a project';
    }

    if (!dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (taskToEdit) {
      updateTask({
        ...taskToEdit,
        title: title.trim(),
        description: description.trim(),
        projectId,
        assigneeId,
        priority,
        status,
        dueDate,
      });
    } else {
      addTask({
        title: title.trim(),
        description: description.trim(),
        projectId,
        assigneeId,
        priority,
        status,
        dueDate,
      });
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={taskToEdit ? 'Edit Task' : 'Create New Task'}
      subtitle={
        taskToEdit
          ? 'Modify task status, deadlines, and assignment.'
          : 'Break down project milestones into actionable deliverables.'
      }
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-1.5">
            Task Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Conduct baseline survey in Block C"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0] ${
              errors.title ? 'border-[#D98291]' : 'border-[#E8E5F0]'
            }`}
          />
          {errors.title && (
            <p className="text-xs text-[#D98291] mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-1.5">
            Details & Notes
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Specific deliverables or instructions..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E5F0] text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0]"
          />
        </div>

        {/* Project & Assignee */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-1.5">
              Associated Project *
            </label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0] ${
                errors.projectId ? 'border-[#D98291]' : 'border-[#E8E5F0]'
              }`}
            >
              {projects.length === 0 ? (
                <option value="">No projects available</option>
              ) : (
                projects.map((proj) => (
                  <option key={proj.id} value={proj.id}>
                    {proj.name}
                  </option>
                ))
              )}
            </select>
            {errors.projectId && (
              <p className="text-xs text-[#D98291] mt-1">{errors.projectId}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-1.5">
              Assigned Member
            </label>
            <select
              value={assigneeId}
              onChange={(e) => setAssigneeId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E5F0] text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0]"
            >
              <option value="">Unassigned</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} ({member.role})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Priority & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-1.5">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E5F0] text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0]"
            >
              {PRIORITIES.map((pri) => (
                <option key={pri} value={pri}>
                  {pri}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-1.5">
              Status Column
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E5F0] text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0]"
            >
              {STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-1.5">
            Due Date *
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0] ${
              errors.dueDate ? 'border-[#D98291]' : 'border-[#E8E5F0]'
            }`}
          />
          {errors.dueDate && (
            <p className="text-xs text-[#D98291] mt-1">{errors.dueDate}</p>
          )}
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8E5F0]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#77738C] hover:text-[#252238] hover:bg-[#F0EDFA] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-sm font-medium bg-[#6554C0] hover:bg-[#5644B0] text-white shadow-xs transition-all"
          >
            {taskToEdit ? 'Save Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

