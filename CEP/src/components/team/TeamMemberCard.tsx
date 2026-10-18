import React, { useState } from 'react';
import type { TeamMember } from '../../types';
import { useData } from '../../context/DataContext';
import { ProgressBar } from '../common/ProgressBar';
import { Mail, GraduationCap, MoreVertical, Edit2, Trash2, CheckCircle2 } from 'lucide-react';

interface TeamMemberCardProps {
  member: TeamMember;
  onEdit: (member: TeamMember) => void;
  onDelete: (member: TeamMember) => void;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  onEdit,
  onDelete,
}) => {
  const { getMemberTaskStats } = useData();
  const [menuOpen, setMenuOpen] = useState(false);

  const { assigned, completed, rate } = getMemberTaskStats(member.id);

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E8E5F0] hover:border-[#6554C0]/40 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
      <div>
        {/* Top Header: Avatar, Info, Action Menu */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-xs"
              style={{ backgroundColor: member.avatarColor }}
            >
              {member.initials}
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#252238] leading-tight">
                {member.name}
              </h3>
              <p className="text-xs text-[#6554C0] font-medium mt-0.5">
                {member.role}
              </p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 rounded-lg text-[#77738C] hover:text-[#252238] hover:bg-[#F0EDFA] transition-colors"
              aria-label="Member options"
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
                      onEdit(member);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-[#252238] hover:bg-[#F0EDFA] hover:text-[#6554C0] font-medium flex items-center gap-2"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onDelete(member);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-[#D98291] hover:bg-[#FDF3F5] font-medium flex items-center gap-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Contact & Department Details */}
        <div className="space-y-1.5 mb-5 text-xs text-[#77738C]">
          <div className="flex items-center gap-2 truncate">
            <GraduationCap className="w-3.5 h-3.5 shrink-0 text-[#77738C]" />
            <span className="truncate">{member.department}</span>
          </div>
          <div className="flex items-center gap-2 truncate">
            <Mail className="w-3.5 h-3.5 shrink-0 text-[#77738C]" />
            <a
              href={`mailto:${member.email}`}
              className="text-[#6554C0] hover:underline truncate"
            >
              {member.email}
            </a>
          </div>
        </div>
      </div>

      {/* Task Performance Metrics */}
      <div className="pt-3.5 border-t border-[#F0EDFA]">
        <div className="flex items-center justify-between text-xs text-[#77738C] mb-2 font-medium">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#8BAF9B]" /> Task Completion
          </span>
          <span className="text-[#252238] font-semibold">
            {completed} / {assigned} ({rate}%)
          </span>
        </div>
        <ProgressBar progress={rate} size="sm" />
      </div>
    </div>
  );
};

