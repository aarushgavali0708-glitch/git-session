import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import type { TeamMember } from '../../types';
import { useData } from '../../context/DataContext';

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberToEdit?: TeamMember | null;
}

const AVATAR_COLORS = [
  '#6554C0', // Primary Accent
  '#8BAF9B', // Sage Green
  '#D8A65A', // Muted Amber
  '#D98291', // Muted Rose
  '#403477', // Deep Indigo
  '#5B7C99', // Slate Blue
];

export const TeamMemberModal: React.FC<TeamMemberModalProps> = ({
  isOpen,
  onClose,
  memberToEdit,
}) => {
  const { addMember, updateMember } = useData();

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [avatarColor, setAvatarColor] = useState(AVATAR_COLORS[0]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (memberToEdit) {
      setName(memberToEdit.name);
      setRole(memberToEdit.role);
      setEmail(memberToEdit.email);
      setDepartment(memberToEdit.department);
      setAvatarColor(memberToEdit.avatarColor);
    } else {
      setName('');
      setRole('');
      setEmail('');
      setDepartment('');
      setAvatarColor(AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)]);
    }
    setErrors({});
  }, [memberToEdit, isOpen]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!role.trim()) {
      newErrors.role = 'Role or responsibility title is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!department.trim()) {
      newErrors.department = 'Academic department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getInitials = (fullName: string) => {
    return fullName
      .trim()
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'ST';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const initials = getInitials(name);

    if (memberToEdit) {
      updateMember({
        ...memberToEdit,
        name: name.trim(),
        role: role.trim(),
        email: email.trim(),
        department: department.trim(),
        avatarColor,
        initials,
      });
    } else {
      addMember({
        name: name.trim(),
        role: role.trim(),
        email: email.trim(),
        department: department.trim(),
        avatarColor,
        initials,
      });
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={memberToEdit ? 'Edit Team Member' : 'Add Team Member'}
      subtitle={
        memberToEdit
          ? 'Update contact details and project assignments.'
          : 'Invite or register a student collaborator for your CEP group.'
      }
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Maya Sundaram"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0] ${
              errors.name ? 'border-[#D98291]' : 'border-[#E8E5F0]'
            }`}
          />
          {errors.name && (
            <p className="text-xs text-[#D98291] mt-1">{errors.name}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-1.5">
            Role / Functional Responsibility *
          </label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Field Researcher & Outreach Coordinator"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0] ${
              errors.role ? 'border-[#D98291]' : 'border-[#E8E5F0]'
            }`}
          />
          {errors.role && (
            <p className="text-xs text-[#D98291] mt-1">{errors.role}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-1.5">
            Institutional Email *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. student@college.edu"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0] ${
              errors.email ? 'border-[#D98291]' : 'border-[#E8E5F0]'
            }`}
          />
          {errors.email && (
            <p className="text-xs text-[#D98291] mt-1">{errors.email}</p>
          )}
        </div>

        {/* Department */}
        <div>
          <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-1.5">
            Academic Department *
          </label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="e.g. Computer Science & Engineering"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0] ${
              errors.department ? 'border-[#D98291]' : 'border-[#E8E5F0]'
            }`}
          />
          {errors.department && (
            <p className="text-xs text-[#D98291] mt-1">{errors.department}</p>
          )}
        </div>

        {/* Avatar Color */}
        <div>
          <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-2">
            Avatar Theme Accent
          </label>
          <div className="flex items-center gap-3">
            {AVATAR_COLORS.map((col) => (
              <button
                type="button"
                key={col}
                onClick={() => setAvatarColor(col)}
                className={`w-8 h-8 rounded-full transition-transform ${
                  avatarColor === col
                    ? 'ring-2 ring-offset-2 ring-[#6554C0] scale-110'
                    : 'hover:scale-105'
                }`}
                style={{ backgroundColor: col }}
              />
            ))}
          </div>
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
            {memberToEdit ? 'Save Member' : 'Add Member'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

