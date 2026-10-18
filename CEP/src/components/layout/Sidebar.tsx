import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  Info,
  Settings,
  X,
  ExternalLink,
} from 'lucide-react';
import { useData } from '../../context/DataContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { metrics } = useData();

  const navItems = [
    {
      name: 'Overview',
      path: '/app/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Projects',
      path: '/app/projects',
      icon: FolderKanban,
      badge: metrics.totalProjects,
    },
    {
      name: 'Tasks',
      path: '/app/tasks',
      icon: CheckSquare,
      badge: metrics.totalTasks,
    },
    {
      name: 'Team',
      path: '/app/team',
      icon: Users,
      badge: metrics.totalMembers,
    },
    {
      name: 'About CEP',
      path: '/app/about',
      icon: Info,
    },
    {
      name: 'Settings',
      path: '/app/settings',
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#252238]/30 backdrop-blur-xs md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-white border-r border-[#E8E5F0] flex flex-col transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#E8E5F0]">
          <NavLink
            to="/"
            className="flex items-center gap-2.5 group focus:outline-hidden"
          >
            <div className="w-9 h-9 rounded-xl bg-[#6554C0] flex items-center justify-center text-white font-bold text-lg shadow-xs group-hover:scale-105 transition-transform">
              TC
            </div>
            <div>
              <span className="font-bold text-[#252238] text-lg tracking-tight block leading-tight">
                TeamConnect
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8BAF9B]">
                College CEP
              </span>
            </div>
          </NavLink>
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-[#77738C] hover:text-[#252238] hover:bg-[#F0EDFA]"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-3.5 space-y-1.5">
          <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-[#77738C] uppercase">
            Platform Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    onClose();
                  }
                }}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#F0EDFA] text-[#6554C0] shadow-xs'
                      : 'text-[#77738C] hover:text-[#252238] hover:bg-[#FAF9FD]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-[#6554C0]' : 'text-[#77738C]'
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          isActive
                            ? 'bg-[#6554C0] text-white'
                            : 'bg-[#F4F3F8] text-[#77738C]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Public Landing Link & Project Notice Footer */}
        <div className="p-4 border-t border-[#E8E5F0] bg-[#FAF9FD]">
          <NavLink
            to="/"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E8E5F0] text-xs font-medium text-[#403477] hover:border-[#6554C0] transition-colors shadow-2xs"
          >
            <span>Landing Page</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#6554C0]" />
          </NavLink>
          <p className="text-[11px] text-[#77738C] text-center mt-3">
            ACES CEP 2026 • Local Demo
          </p>
        </div>
      </aside>
    </>
  );
};

