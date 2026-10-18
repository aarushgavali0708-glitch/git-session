import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import {
  User,
  RotateCcw,
  Info,
  CheckCircle2,
  Sliders,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { preferences, updatePreferences, resetToDemoData } = useData();

  const [displayName, setDisplayName] = useState(preferences.displayName);
  const [email, setEmail] = useState(preferences.email);
  const [college, setCollege] = useState(preferences.college);
  const [department, setDepartment] = useState(preferences.department);
  const [studentId, setStudentId] = useState(preferences.studentId);
  const [academicYear, setAcademicYear] = useState(preferences.academicYear);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferences({
      displayName,
      email,
      college,
      department,
      studentId,
      academicYear,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="pb-2 border-b border-[#E8E5F0]">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#252238] tracking-tight">
          Settings & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-[#77738C] mt-1">
          Customize your student profile, academic affiliation, and demo environment.
        </p>
      </div>

      {/* Student Profile Form */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E5F0] shadow-2xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F0EDFA] text-[#6554C0] flex items-center justify-center shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#252238]">
              Student Profile
            </h2>
            <p className="text-xs text-[#77738C]">
              Your student identity displayed across the CEP platform
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E5F0] text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-1.5">
                Institutional Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E5F0] text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-1.5">
                Roll Number / Student ID
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E5F0] text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-1.5">
                Academic Year / Semester
              </label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E5F0] text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-1.5">
                Academic Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E5F0] text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#252238] uppercase tracking-wider mb-1.5">
                College / Institution Name
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E5F0] text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6554C0] hover:bg-[#5644B0] text-white text-xs sm:text-sm font-medium transition-all shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save Preferences</span>
            </button>
          </div>
        </form>
      </section>

      {/* Interface & Theme Details */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E5F0] shadow-2xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F0EDFA] text-[#6554C0] flex items-center justify-center shrink-0">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#252238]">
              Design System & Palette
            </h2>
            <p className="text-xs text-[#77738C]">
              Cohesive color hierarchy configured for TeamConnect
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-xl border border-[#E8E5F0] bg-white flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-[#6554C0] shrink-0" />
            <div>
              <div className="text-xs font-semibold text-[#252238]">#6554C0</div>
              <div className="text-[10px] text-[#77738C]">Primary Accent</div>
            </div>
          </div>

          <div className="p-3 rounded-xl border border-[#E8E5F0] bg-white flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-[#403477] shrink-0" />
            <div>
              <div className="text-xs font-semibold text-[#252238]">#403477</div>
              <div className="text-[10px] text-[#77738C]">Deep Accent</div>
            </div>
          </div>

          <div className="p-3 rounded-xl border border-[#E8E5F0] bg-white flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-[#F0EDFA] border border-[#E7E1F7] shrink-0" />
            <div>
              <div className="text-xs font-semibold text-[#252238]">#F0EDFA</div>
              <div className="text-[10px] text-[#77738C]">Lavender Surface</div>
            </div>
          </div>

          <div className="p-3 rounded-xl border border-[#E8E5F0] bg-white flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-[#8BAF9B] shrink-0" />
            <div>
              <div className="text-xs font-semibold text-[#252238]">#8BAF9B</div>
              <div className="text-[10px] text-[#77738C]">Sage Success</div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Reset & Data Management */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E5F0] shadow-2xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FDF9F2] text-[#D8A65A] flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#252238]">
              Demo Data Management
            </h2>
            <p className="text-xs text-[#77738C]">
              Reset demo tasks, projects, and activities for evaluation
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#77738C] leading-relaxed">
          Need to present a clean slate or return to the original sample projects?
          Clicking the reset button will restore the default projects, tasks, and
          team members while preserving the lavender design configuration.
        </p>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#D8A65A]/40 bg-[#FDF9F2] hover:bg-[#faeed6] text-[#b07d2f] text-xs sm:text-sm font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo to Sample Data</span>
          </button>
        </div>
      </section>

      {/* App Information */}
      <div className="bg-[#FAF9FD] rounded-2xl p-4 sm:p-5 border border-[#E8E5F0] flex items-start gap-3">
        <Info className="w-4 h-4 text-[#6554C0] shrink-0 mt-0.5" />
        <div className="text-xs text-[#77738C] leading-relaxed">
          <strong className="text-[#252238]">TeamConnect v1.0.0</strong> • College
          Community Engagement Project (CEP) Evaluation Build. Persistent via
          HTML5 LocalStorage. No paid APIs or server credentials required.
        </div>
      </div>

      {/* Confirm Reset Dialog */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={() => {
          resetToDemoData();
          setDisplayName('Aarav Sharma');
          setEmail('aarav.sharma@college.edu');
          setCollege('Apex Institute of Technology & Engineering');
          setDepartment('Computer Science & Engineering');
          setStudentId('CEP-2026-CSE-042');
          setAcademicYear('Final Year (2026-2027)');
        }}
        title="Reset Demo Records"
        message="Are you sure you want to restore the default sample projects, tasks, and team members? Any custom records you have created will be replaced."
        confirmLabel="Reset Demo Data"
        isDestructive={false}
      />
    </div>
  );
};

