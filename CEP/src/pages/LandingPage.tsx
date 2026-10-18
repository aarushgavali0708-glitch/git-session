import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import {
  FolderKanban,
  CheckSquare,
  Users,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { metrics, projects } = useData();

  return (
    <div className="min-h-screen bg-[#F8F7FC] text-[#252238] flex flex-col selection:bg-[#E7E1F7] selection:text-[#403477]">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#F8F7FC]/90 backdrop-blur-md border-b border-[#E8E5F0] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#6554C0] flex items-center justify-center text-white font-bold text-lg shadow-xs group-hover:scale-105 transition-transform">
              TC
            </div>
            <div>
              <span className="font-bold text-[#252238] text-lg tracking-tight block leading-tight">
                TeamConnect
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#6554C0]">
                CEP Workspace
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-[#77738C]">
            <a
              href="#features"
              className="hover:text-[#6554C0] transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-[#6554C0] transition-colors"
            >
              How It Works
            </a>
            <a
              href="#benefits"
              className="hover:text-[#6554C0] transition-colors"
            >
              Benefits
            </a>
            <Link
              to="/app/about"
              className="hover:text-[#6554C0] transition-colors"
            >
              About CEP
            </Link>
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <Link
              to="/app/dashboard"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6554C0] text-white text-xs sm:text-sm font-semibold hover:bg-[#5644B0] transition-all shadow-xs"
            >
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          {/* Highlight pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0EDFA] border border-[#E7E1F7] text-xs font-semibold text-[#6554C0] animate-in fade-in duration-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Engagement Project (CEP) Collaboration Suite</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#252238] tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Your Team. Your Tasks.{' '}
            <span className="text-[#6554C0] block sm:inline">
              One Connected Workspace.
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-lg text-[#77738C] max-w-2xl mx-auto font-normal leading-relaxed">
            TeamConnect simplifies student collaboration, project governance, and
            task tracking. Built specifically for college community engagement
            teams to execute real-world impact seamlessly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              to="/app/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#6554C0] text-white text-sm sm:text-base font-semibold hover:bg-[#5644B0] transition-all shadow-md hover:shadow-lg"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#E8E5F0] text-[#252238] text-sm sm:text-base font-semibold hover:bg-[#F0EDFA] hover:text-[#6554C0] transition-all shadow-2xs"
            >
              <span>Explore Features</span>
            </a>
          </div>

          {/* Live Interactive SaaS Preview Mockup */}
          <div className="pt-10 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E8E5F0] shadow-xl text-left space-y-6">
              {/* Mockup Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E5F0]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#D98291]/60" />
                    <div className="w-3 h-3 rounded-full bg-[#D8A65A]/60" />
                    <div className="w-3 h-3 rounded-full bg-[#8BAF9B]/60" />
                  </div>
                  <span className="text-xs font-semibold text-[#77738C] pl-2 border-l border-[#E8E5F0]">
                    TeamConnect Dashboard Preview
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#8BAF9B] bg-[#F2F8F4] px-2.5 py-0.5 rounded-full">
                  • System Active
                </span>
              </div>

              {/* Preview Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#FAF9FD] border border-[#E8E5F0]">
                  <span className="text-[11px] text-[#77738C] uppercase font-semibold">
                    Projects
                  </span>
                  <div className="text-xl font-bold text-[#252238] mt-1">
                    {metrics.totalProjects} Active
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#FAF9FD] border border-[#E8E5F0]">
                  <span className="text-[11px] text-[#77738C] uppercase font-semibold">
                    Tasks
                  </span>
                  <div className="text-xl font-bold text-[#252238] mt-1">
                    {metrics.totalTasks} Tracked
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F0EDFA] border border-[#E7E1F7]">
                  <span className="text-[11px] text-[#6554C0] uppercase font-semibold">
                    Execution
                  </span>
                  <div className="text-xl font-bold text-[#6554C0] mt-1">
                    {metrics.overallProgress}% Complete
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F2F8F4] border border-[#d6ebd0]">
                  <span className="text-[11px] text-[#638f75] uppercase font-semibold">
                    Completed
                  </span>
                  <div className="text-xl font-bold text-[#638f75] mt-1">
                    {metrics.completedTasks} Done
                  </div>
                </div>
              </div>

              {/* Preview Sample Project Card */}
              {projects.length > 0 && (
                <div className="p-4 rounded-2xl border border-[#E8E5F0] bg-[#FAF9FD] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#6554C0] uppercase tracking-wider">
                      Featured Milestone
                    </span>
                    <h4 className="text-sm font-bold text-[#252238]">
                      {projects[0].name}
                    </h4>
                    <p className="text-xs text-[#77738C] line-clamp-1">
                      {projects[0].description}
                    </p>
                  </div>
                  <Link
                    to="/app/projects"
                    className="shrink-0 text-xs font-semibold px-4 py-2 rounded-xl bg-white border border-[#E8E5F0] text-[#6554C0] hover:bg-[#F0EDFA] transition-colors"
                  >
                    Open In Workspace →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 px-4 sm:px-8 bg-white border-y border-[#E8E5F0]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F0EDFA] text-[#6554C0] uppercase tracking-wider">
              Product Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#252238] tracking-tight">
              Purpose-Built for Student Project Excellence
            </h2>
            <p className="text-xs sm:text-sm text-[#77738C] max-w-xl mx-auto">
              Everything your team needs to plan, divide responsibilities, and
              verify field results for community impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF9FD] border border-[#E8E5F0] hover:border-[#6554C0]/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F0EDFA] text-[#6554C0] flex items-center justify-center">
                <FolderKanban className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#252238]">
                Multi-Initiative Management
              </h3>
              <p className="text-xs sm:text-sm text-[#77738C] leading-relaxed">
                Organize distinct Community Engagement Projects with target
                deadlines, categories, assigned student rosters, and progress rings.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9FD] border border-[#E8E5F0] hover:border-[#6554C0]/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F0EDFA] text-[#6554C0] flex items-center justify-center">
                <CheckSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#252238]">
                Interactive Kanban Board
              </h3>
              <p className="text-xs sm:text-sm text-[#77738C] leading-relaxed">
                Drag-and-drop workflow across To Do, In Progress, and Completed
                columns with priority badges, overdue warnings, and assignee avatars.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9FD] border border-[#E8E5F0] hover:border-[#6554C0]/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F0EDFA] text-[#6554C0] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#252238]">
                Fair Peer Accountability
              </h3>
              <p className="text-xs sm:text-sm text-[#77738C] leading-relaxed">
                Track each member's assigned deliverables and completion rate to
                provide faculty reviewers with an authentic contribution record.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9FD] border border-[#E8E5F0] hover:border-[#6554C0]/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F0EDFA] text-[#6554C0] flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#252238]">
                Dynamic Real-Time Metrics
              </h3>
              <p className="text-xs sm:text-sm text-[#77738C] leading-relaxed">
                Project progress percentages update immediately from task
                completions without inaccurate hardcoded approximations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9FD] border border-[#E8E5F0] hover:border-[#6554C0]/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F0EDFA] text-[#6554C0] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#252238]">
                Milestone Due Date Tracking
              </h3>
              <p className="text-xs sm:text-sm text-[#77738C] leading-relaxed">
                Upcoming deadlines feed automatically prioritizes upcoming
                commitments and flags overdue activities in soft rose accents.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9FD] border border-[#E8E5F0] hover:border-[#6554C0]/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F0EDFA] text-[#6554C0] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#252238]">
                Persistent Local Storage
              </h3>
              <p className="text-xs sm:text-sm text-[#77738C] leading-relaxed">
                All records persist automatically in the browser localStorage
                across page reloads, accompanied by a single-click demo reset.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F0EDFA] text-[#6554C0] uppercase tracking-wider">
              Project Lifecycle
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#252238] tracking-tight">
              Three Steps to a Successful CEP Submission
            </h2>
            <p className="text-xs sm:text-sm text-[#77738C] max-w-lg mx-auto">
              How student groups use TeamConnect from initial idea to final viva.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-[#E8E5F0] shadow-2xs relative space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#6554C0] text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="text-base font-bold text-[#252238]">
                Register Project & Team
              </h3>
              <p className="text-xs sm:text-sm text-[#77738C] leading-relaxed">
                Define the community problem, target village or campus block,
                scope, and assign core responsibilities to team members.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E8E5F0] shadow-2xs relative space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#6554C0] text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="text-base font-bold text-[#252238]">
                Break Down Field Deliverables
              </h3>
              <p className="text-xs sm:text-sm text-[#77738C] leading-relaxed">
                Create discrete actionable tasks, allocate priorities and due
                dates, and move deliverables smoothly through the Kanban board.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E8E5F0] shadow-2xs relative space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#8BAF9B] text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="text-base font-bold text-[#252238]">
                Demonstrate Verifiable Impact
              </h3>
              <p className="text-xs sm:text-sm text-[#77738C] leading-relaxed">
                Present the live dynamic dashboard, completion analytics, and
                activity trail during academic committee viva evaluations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Student Teams Section */}
      <section id="benefits" className="py-20 px-4 sm:px-8 bg-[#FAF9FD] border-t border-[#E8E5F0]">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F0EDFA] text-[#6554C0] uppercase tracking-wider">
              Student Value
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#252238] tracking-tight">
              Why Students & Evaluators Choose TeamConnect
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-white border border-[#E8E5F0] flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-[#F2F8F4] text-[#8BAF9B] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#252238]">
                  Zero Disorganized Chat Group Delays
                </h4>
                <p className="text-xs text-[#77738C] mt-1 leading-relaxed">
                  No more chasing teammates across chat channels for status updates.
                  Everyone can see active tasks and upcoming due dates in one place.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E8E5F0] flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-[#F0EDFA] text-[#6554C0] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#252238]">
                  Faculty-Ready Reporting
                </h4>
                <p className="text-xs text-[#77738C] mt-1 leading-relaxed">
                  Live metrics, task completion rates, and historical logs make
                  preparing intermediate progress reports straightforward.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E8E5F0] flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-[#FDF9F2] text-[#D8A65A] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#252238]">
                  Balanced Workload Distribution
                </h4>
                <p className="text-xs text-[#77738C] mt-1 leading-relaxed">
                  Clear visibility into member task counts ensures no single student
                  is overwhelmed while others remain unassigned.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E8E5F0] flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-[#F0EDFA] text-[#403477] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#252238]">
                  Instant Offline-Ready Access
                </h4>
                <p className="text-xs text-[#77738C] mt-1 leading-relaxed">
                  Runs without server dependencies or paid subscriptions. Works
                  reliably even during field visits with intermittent connectivity.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#6554C0] to-[#403477] text-white text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-md">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold">
                Ready to organize your CEP team?
              </h3>
              <p className="text-xs sm:text-sm text-[#E7E1F7] mt-1 max-w-md">
                Launch the interactive live workspace directly. Pre-loaded with
                sample projects ready for evaluation.
              </p>
            </div>
            <Link
              to="/app/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-[#403477] font-semibold text-sm hover:bg-[#F0EDFA] transition-colors shrink-0 shadow-xs"
            >
              <span>Open Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-12 px-4 sm:px-8 bg-white border-t border-[#E8E5F0] text-xs text-[#77738C]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#6554C0] text-white font-bold flex items-center justify-center text-xs">
              TC
            </div>
            <div>
              <span className="font-bold text-[#252238] block">TeamConnect</span>
              <span className="text-[11px] text-[#77738C]">
                College Community Engagement Project (CEP)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/app/dashboard" className="hover:text-[#6554C0]">
              Dashboard
            </Link>
            <Link to="/app/projects" className="hover:text-[#6554C0]">
              Projects
            </Link>
            <Link to="/app/tasks" className="hover:text-[#6554C0]">
              Kanban Board
            </Link>
            <Link to="/app/team" className="hover:text-[#6554C0]">
              Team
            </Link>
            <Link to="/app/about" className="hover:text-[#6554C0]">
              About CEP
            </Link>
          </div>

          <div className="text-center md:text-right text-[11px]">
            <div>Built for College CEP Assessment 2026</div>
            <div className="text-[#8BAF9B] font-medium mt-0.5">
              Ready for Free Public Deployment
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

