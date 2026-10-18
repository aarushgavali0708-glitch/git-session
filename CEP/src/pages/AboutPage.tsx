import React from 'react';
import {
  BookOpen,
  Target,
  Sparkles,
  Layers,
  Code2,
  CheckCircle2,
  GraduationCap,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="pb-4 border-b border-[#E8E5F0]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F0EDFA] text-[#6554C0] border border-[#E7E1F7]">
            Academic Project Documentation
          </span>
          <span className="text-xs text-[#77738C]">• CEP Assessment 2026</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#252238] tracking-tight">
          About TeamConnect
        </h1>
        <p className="text-xs sm:text-sm text-[#77738C] mt-1">
          A dedicated student collaboration and Community Engagement Project
          (CEP) management platform.
        </p>
      </div>

      {/* Project Overview */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E5F0] shadow-2xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F0EDFA] text-[#6554C0] flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#252238]">Project Overview</h2>
            <p className="text-xs text-[#77738C]">
              Context, purpose, and community focus
            </p>
          </div>
        </div>

        <p className="text-sm text-[#77738C] leading-relaxed">
          <strong className="text-[#252238]">TeamConnect</strong> was conceived
          and engineered as a centralized collaboration platform specifically
          tailored for undergraduate students undertaking{' '}
          <strong className="text-[#252238]">
            Community Engagement Projects (CEP)
          </strong>
          . In academic curricula, CEP initiatives require multi-disciplinary
          student teams to identify real-world societal problems—ranging from
          waste management and rural digital literacy to community healthcare
          awareness—and implement concrete, measurable interventions.
        </p>
        <p className="text-sm text-[#77738C] leading-relaxed">
          Rather than relying on informal messaging apps and disorganized
          spreadsheets, TeamConnect provides students and faculty supervisors
          with a structured, aesthetic, and dependable productivity workspace
          that tracks milestones, individual responsibilities, and overall
          delivery.
        </p>
      </section>

      {/* Problem Statement & Objectives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Problem Statement */}
        <section className="bg-white rounded-2xl p-6 border border-[#E8E5F0] shadow-2xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FDF3F5] text-[#D98291] flex items-center justify-center shrink-0">
              <Target className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#252238]">
                Problem Statement
              </h3>
              <p className="text-xs text-[#77738C]">Challenges in student CEP</p>
            </div>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-[#77738C] leading-relaxed list-disc list-inside">
            <li>
              <strong className="text-[#252238]">Fragmented Communication:</strong>{' '}
              Critical project deliverables get buried inside WhatsApp and chat
              groups.
            </li>
            <li>
              <strong className="text-[#252238]">Unequal Workload Distribution:</strong>{' '}
              Lack of clear task assignment obscures who is responsible for each
              deliverable.
            </li>
            <li>
              <strong className="text-[#252238]">Missed Submission Deadlines:</strong>{' '}
              Student teams struggle to balance coursework with community field
              visits without automated tracking.
            </li>
            <li>
              <strong className="text-[#252238]">Difficult Viva Assessment:</strong>{' '}
              Faculty evaluators lack an audit trail of genuine student
              contributions.
            </li>
          </ul>
        </section>

        {/* Project Objectives */}
        <section className="bg-white rounded-2xl p-6 border border-[#E8E5F0] shadow-2xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F2F8F4] text-[#8BAF9B] flex items-center justify-center shrink-0">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#252238]">
                Project Objectives
              </h3>
              <p className="text-xs text-[#77738C]">What TeamConnect delivers</p>
            </div>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-[#77738C] leading-relaxed list-disc list-inside">
            <li>
              <strong className="text-[#252238]">Centralized Coordination:</strong>{' '}
              Consolidate all project scopes, tasks, and deadlines in one place.
            </li>
            <li>
              <strong className="text-[#252238]">Transparent Accountability:</strong>{' '}
              Map every task to a team member with visible completion metrics.
            </li>
            <li>
              <strong className="text-[#252238]">Dynamic Progress Computation:</strong>{' '}
              Automatically derive project completion percentages from verified task
              statuses.
            </li>
            <li>
              <strong className="text-[#252238]">Zero-Friction Adoption:</strong>{' '}
              Zero database overhead, immediate offline-capable browser persistence.
            </li>
          </ul>
        </section>
      </div>

      {/* Key Features & Architecture */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E5F0] shadow-2xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F0EDFA] text-[#6554C0] flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#252238]">Key Features</h2>
            <p className="text-xs text-[#77738C]">
              Engineered for seamless productivity
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-[#FAF9FD] border border-[#E8E5F0] space-y-1">
            <div className="flex items-center gap-2 font-semibold text-xs text-[#252238]">
              <CheckCircle2 className="w-4 h-4 text-[#8BAF9B]" /> 3-Column Kanban Board
            </div>
            <p className="text-xs text-[#77738C] leading-relaxed">
              Interactive HTML5 drag-and-drop workflow across To Do, In Progress,
              and Completed states with priority and overdue alerts.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9FD] border border-[#E8E5F0] space-y-1">
            <div className="flex items-center gap-2 font-semibold text-xs text-[#252238]">
              <CheckCircle2 className="w-4 h-4 text-[#8BAF9B]" /> Reactive Project Progress
            </div>
            <p className="text-xs text-[#77738C] leading-relaxed">
              Project progress bars and dashboard health rings calculate in real-time
              as tasks are updated, without hardcoded estimations.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9FD] border border-[#E8E5F0] space-y-1">
            <div className="flex items-center gap-2 font-semibold text-xs text-[#252238]">
              <CheckCircle2 className="w-4 h-4 text-[#8BAF9B]" /> Team Member Analytics
            </div>
            <p className="text-xs text-[#77738C] leading-relaxed">
              Individual workload balance metrics, completion percentages, and
              academic role details for fair contribution scoring.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9FD] border border-[#E8E5F0] space-y-1">
            <div className="flex items-center gap-2 font-semibold text-xs text-[#252238]">
              <CheckCircle2 className="w-4 h-4 text-[#8BAF9B]" /> Persistent Browser Storage
            </div>
            <p className="text-xs text-[#77738C] leading-relaxed">
              Reliable localStorage integration ensures modifications persist
              through browser refreshes, with a one-click demo data reset option.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E5F0] shadow-2xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F0EDFA] text-[#6554C0] flex items-center justify-center shrink-0">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#252238]">Technology Stack</h2>
            <p className="text-xs text-[#77738C]">
              Modern, robust, and lightweight client architecture
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl border border-[#E8E5F0] bg-[#FAF9FD]">
            <span className="text-[11px] text-[#77738C] block">Framework</span>
            <span className="text-sm font-bold text-[#252238]">React 19</span>
          </div>
          <div className="p-3.5 rounded-xl border border-[#E8E5F0] bg-[#FAF9FD]">
            <span className="text-[11px] text-[#77738C] block">Language</span>
            <span className="text-sm font-bold text-[#252238]">TypeScript</span>
          </div>
          <div className="p-3.5 rounded-xl border border-[#E8E5F0] bg-[#FAF9FD]">
            <span className="text-[11px] text-[#77738C] block">Styling</span>
            <span className="text-sm font-bold text-[#252238]">Tailwind CSS v4</span>
          </div>
          <div className="p-3.5 rounded-xl border border-[#E8E5F0] bg-[#FAF9FD]">
            <span className="text-[11px] text-[#77738C] block">Build Tool</span>
            <span className="text-sm font-bold text-[#252238]">Vite 8</span>
          </div>
          <div className="p-3.5 rounded-xl border border-[#E8E5F0] bg-[#FAF9FD]">
            <span className="text-[11px] text-[#77738C] block">Navigation</span>
            <span className="text-sm font-bold text-[#252238]">React Router 7</span>
          </div>
          <div className="p-3.5 rounded-xl border border-[#E8E5F0] bg-[#FAF9FD]">
            <span className="text-[11px] text-[#77738C] block">Icons</span>
            <span className="text-sm font-bold text-[#252238]">Lucide React</span>
          </div>
        </div>
      </section>

      {/* CEP Assessment & Submission Conclusion */}
      <section className="bg-gradient-to-r from-[#FAF9FD] to-[#F0EDFA] rounded-2xl p-6 sm:p-8 border border-[#E7E1F7] flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-white text-[#6554C0] flex items-center justify-center shrink-0 shadow-2xs">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div className="space-y-2">
          <h3 className="text-base font-bold text-[#252238]">
            Conclusion & CEP Submission Note
          </h3>
          <p className="text-xs sm:text-sm text-[#77738C] leading-relaxed">
            TeamConnect bridges the gap between academic theory and community
            fieldwork. By offering student teams an aesthetic, intuitive, and
            reliable management platform, it cultivates accountability, team
            harmony, and timely milestone delivery. As a CEP submission, it
            demonstrates both technical competence in modern web engineering and
            a genuine social utility for college communities.
          </p>
        </div>
      </section>
    </div>
  );
};

