import React, { useState } from 'react';
import { Menu, Plus, Bell, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface TopbarProps {
  onOpenSidebar: () => void;
  onOpenNewProject?: () => void;
  onOpenNewTask?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  onOpenSidebar,
  onOpenNewProject,
  onOpenNewTask,
}) => {
  const { preferences, activities, metrics } = useData();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-[#E8E5F0] px-4 sm:px-8 flex items-center justify-between gap-4">
      {/* Left section: mobile hamburger & title context */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="md:hidden p-2 rounded-xl text-[#77738C] hover:text-[#252238] hover:bg-[#F0EDFA] transition-colors"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden sm:flex items-center gap-2 text-xs text-[#77738C]">
          <span className="font-semibold text-[#6554C0] bg-[#F0EDFA] px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> CEP Active Workspace
          </span>
          <span>•</span>
          <span>{metrics.totalProjects} Projects</span>
          <span>•</span>
          <span>{metrics.totalTasks} Tasks</span>
        </div>
      </div>

      {/* Right section: Quick action, notifications & student profile */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Quick Add Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowQuickMenu(!showQuickMenu)}
            className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-[#6554C0] text-white hover:bg-[#5644B0] text-xs sm:text-sm font-medium transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Create New</span>
          </button>

          {showQuickMenu && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setShowQuickMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#E8E5F0] py-2 z-40 animate-in fade-in zoom-in-95">
                {onOpenNewProject && (
                  <button
                    onClick={() => {
                      setShowQuickMenu(false);
                      onOpenNewProject();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-[#252238] hover:bg-[#F0EDFA] hover:text-[#6554C0] font-medium flex items-center gap-2"
                  >
                    <span>📁</span> New Project
                  </button>
                )}
                {onOpenNewTask && (
                  <button
                    onClick={() => {
                      setShowQuickMenu(false);
                      onOpenNewTask();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-[#252238] hover:bg-[#F0EDFA] hover:text-[#6554C0] font-medium flex items-center gap-2"
                  >
                    <span>✓</span> New Task
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 sm:p-2.5 rounded-xl border border-[#E8E5F0] hover:bg-[#F0EDFA] text-[#77738C] hover:text-[#252238] transition-colors relative"
            aria-label="View activity alerts"
          >
            <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            {activities.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#6554C0] ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-[#E8E5F0] py-3 z-40 animate-in fade-in zoom-in-95">
                <div className="px-4 pb-2 border-b border-[#E8E5F0] flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#77738C]">
                    Recent Activity
                  </h4>
                  <span className="text-[11px] text-[#6554C0] font-medium">
                    Live Feed
                  </span>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-[#F0EDFA]">
                  {activities.slice(0, 5).map((act) => (
                    <div key={act.id} className="p-3 hover:bg-[#FAF9FD] transition-colors">
                      <p className="text-xs font-medium text-[#252238] leading-tight">
                        {act.action}:{' '}
                        <span className="text-[#6554C0] font-normal">
                          {act.entityName}
                        </span>
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-[#77738C] mt-1">
                        <span>by {act.userName}</span>
                        <span>{act.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile Avatar Area */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-[#E8E5F0]">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F0EDFA] border border-[#E7E1F7] text-[#6554C0] font-bold text-xs sm:text-sm flex items-center justify-center shadow-2xs">
            {preferences.displayName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .substring(0, 2)
              .toUpperCase()}
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-semibold text-[#252238] leading-tight">
              {preferences.displayName}
            </div>
            <div className="text-[10px] text-[#77738C] leading-none mt-0.5">
              CEP Lead
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

