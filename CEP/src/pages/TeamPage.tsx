import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import type { TeamMember } from '../types';
import { TeamMemberCard } from '../components/team/TeamMemberCard';
import { TeamMemberModal } from '../components/team/TeamMemberModal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { EmptyState } from '../components/common/EmptyState';
import { Users, Plus, Search, ShieldCheck } from 'lucide-react';

export const TeamPage: React.FC = () => {
  const { members, deleteMember } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState<TeamMember | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);

  const filteredMembers = members.filter((member) => {
    return (
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E8E5F0]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#252238] tracking-tight">
              CEP Team Members & Roles
            </h1>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F0EDFA] text-[#6554C0] border border-[#E7E1F7]">
              {members.length} Members
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#77738C] mt-1">
            Student collaborators, responsibilities, and individual delivery tracking.
          </p>
        </div>

        <button
          onClick={() => {
            setMemberToEdit(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6554C0] text-white text-xs sm:text-sm font-medium hover:bg-[#5644B0] transition-all shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Member</span>
        </button>
      </div>

      {/* Notice Card on Academic CEP Collaboration */}
      <div className="bg-[#FAF9FD] rounded-2xl p-4 sm:p-5 border border-[#E8E5F0] flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-[#F0EDFA] text-[#6554C0] flex items-center justify-center shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="text-xs text-[#77738C] leading-relaxed">
          <span className="font-semibold text-[#252238] block text-sm mb-0.5">
            Peer Accountability & Fair Contribution
          </span>
          All metrics and task assignments are synchronized across projects.
          Team members can take ownership of specific project milestones,
          facilitating transparent contribution tracking for final CEP viva
          assessment.
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8E5F0] shadow-2xs">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-[#77738C] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search team members by name, role, or department..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E8E5F0] text-xs sm:text-sm bg-[#FAF9FD] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0] transition-colors"
          />
        </div>
      </div>

      {/* Member Cards Grid */}
      {filteredMembers.length === 0 ? (
        <EmptyState
          icon={Users}
          title={
            members.length === 0
              ? 'No team members registered'
              : 'No members match search'
          }
          description={
            members.length === 0
              ? 'Add your project teammates to assign tasks and evaluate project progress.'
              : 'No student matches your current filter criteria. Check your spelling or clear search.'
          }
          actionLabel={members.length === 0 ? 'Add Team Member' : undefined}
          onAction={() => {
            setMemberToEdit(null);
            setIsModalOpen(true);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              onEdit={(m) => {
                setMemberToEdit(m);
                setIsModalOpen(true);
              }}
              onDelete={(m) => setMemberToDelete(m)}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Member Modal */}
      <TeamMemberModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setMemberToEdit(null);
        }}
        memberToEdit={memberToEdit}
      />

      {/* Remove Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!memberToDelete}
        onClose={() => setMemberToDelete(null)}
        onConfirm={() => {
          if (memberToDelete) {
            deleteMember(memberToDelete.id);
            setMemberToDelete(null);
          }
        }}
        title="Remove Team Member"
        message={`Are you sure you want to remove ${memberToDelete?.name}? Their task assignments will be unassigned and they will be removed from assigned project rosters.`}
        confirmLabel="Remove Member"
        isDestructive={true}
      />
    </div>
  );
};

