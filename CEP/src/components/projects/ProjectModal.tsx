import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import type { Project, ProjectCategory, ProjectStatus } from '../../types';
import { useData } from '../../context/DataContext';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectToEdit?: Project | null;
}

const CATEGORIES: ProjectCategory[] = [
  'College CEP',
  'Community Outreach',
  'Campus Sustainability',
  'Digital Literacy',
  'Research',
];

const STATUSES: ProjectStatus[] = [
  'Planning',
  'In Progress',
  'Under Review',
  'Completed',
];

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  projectToEdit,
}) => {
  const { members, addProject, updateProject } = useData();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('College CEP');
  const [status, setStatus] = useState<ProjectStatus>('Planning');
  const [startDate, setStartDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [accentColor, setAccentColor] = useState('#6554C0');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (projectToEdit) {
      setName(projectToEdit.name);
      setDescription(projectToEdit.description);
      setCategory(projectToEdit.category);
      setStatus(projectToEdit.status);
      setStartDate(projectToEdit.startDate);
      setDeadline(projectToEdit.deadline);
      setSelectedMemberIds(projectToEdit.memberIds);
      setAccentColor(projectToEdit.accentColor);
    } else {
      const today = new Date().toISOString().split('T')[0];
      const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
      setName('');
      setDescription('');
      setCategory('College CEP');
      setStatus('In Progress');
      setStartDate(today);
      setDeadline(nextMonth);
      setSelectedMemberIds(members.length > 0 ? [members[0].id] : []);
      setAccentColor('#6554C0');
    }
    setErrors({});
  }, [projectToEdit, isOpen, members]);

  const handleToggleMember = (id: string) => {
    setSelectedMemberIds((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) {
      newErrors.name = 'Project name is required';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!deadline) {
      newErrors.deadline = 'Deadline is required';
    } else if (startDate && deadline < startDate) {
      newErrors.deadline = 'Deadline cannot be before start date';
    }

    if (selectedMemberIds.length === 0) {
      newErrors.members = 'Select at least one assigned team member';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (projectToEdit) {
      updateProject({
        ...projectToEdit,
        name: name.trim(),
        description: description.trim(),
        category,
        status,
        startDate,
        deadline,
        memberIds: selectedMemberIds,
        accentColor,
      });
    } else {
      addProject({
        name: name.trim(),
        description: description.trim(),
        category,
        status,
        startDate,
        deadline,
        memberIds: selectedMemberIds,
        accentColor,
      });
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={projectToEdit ? 'Edit Project' : 'Create New Project'}
      subtitle={
        projectToEdit
          ? 'Update project details and assigned team members.'
          : 'Organize a new community or student initiative.'
      }
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Project Name */}
        <div>
          <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-1.5">
            Project Title *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Smart Campus Waste Reduction Drive"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0] transition-colors ${
              errors.name ? 'border-[#D98291]' : 'border-[#E8E5F0]'
            }`}
          />
          {errors.name && (
            <p className="text-xs text-[#D98291] mt-1">{errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-1.5">
            Project Scope & Objective *
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the problem, objectives, and community beneficiaries..."
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0] transition-colors ${
              errors.description ? 'border-[#D98291]' : 'border-[#E8E5F0]'
            }`}
          />
          {errors.description && (
            <p className="text-xs text-[#D98291] mt-1">{errors.description}</p>
          )}
        </div>

        {/* Category & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ProjectCategory)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E5F0] text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-1.5">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectStatus)}
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

        {/* Start Date & Deadline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-1.5">
              Start Date *
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0] ${
                errors.startDate ? 'border-[#D98291]' : 'border-[#E8E5F0]'
              }`}
            />
            {errors.startDate && (
              <p className="text-xs text-[#D98291] mt-1">{errors.startDate}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-1.5">
              Submission Deadline *
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0] ${
                errors.deadline ? 'border-[#D98291]' : 'border-[#E8E5F0]'
              }`}
            />
            {errors.deadline && (
              <p className="text-xs text-[#D98291] mt-1">{errors.deadline}</p>
            )}
          </div>
        </div>

        {/* Team Members Selection */}
        <div>
          <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-1.5">
            Assign Team Members *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-36 overflow-y-auto p-2 bg-[#FAF9FD] rounded-xl border border-[#E8E5F0]">
            {members.map((member) => {
              const isChecked = selectedMemberIds.includes(member.id);
              return (
                <label
                  key={member.id}
                  className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-colors text-xs ${
                    isChecked
                      ? 'bg-white text-[#252238] shadow-2xs font-medium'
                      : 'hover:bg-white/60 text-[#77738C]'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggleMember(member.id)}
                    className="rounded text-[#6554C0] focus:ring-[#6554C0]"
                  />
                  <div className="w-5 h-5 rounded-full bg-[#F0EDFA] text-[#6554C0] flex items-center justify-center font-bold text-[10px]">
                    {member.initials}
                  </div>
                  <span className="truncate">{member.name}</span>
                </label>
              );
            })}
          </div>
          {errors.members && (
            <p className="text-xs text-[#D98291] mt-1">{errors.members}</p>
          )}
        </div>

        {/* Modal Action Buttons */}
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
            {projectToEdit ? 'Save Changes' : 'Create Project'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

