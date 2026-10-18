import React from 'react';
import type { TaskPriority, TaskStatus, ProjectStatus } from '../../types';

interface BadgeProps {
  label: string;
  variant?: 'priority' | 'status' | 'category' | 'default';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'md',
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  let colorClasses = 'bg-[#F0EDFA] text-[#403477] border border-[#E7E1F7]';

  if (variant === 'priority') {
    const priority = label as TaskPriority;
    switch (priority) {
      case 'Urgent':
        colorClasses = 'bg-[#FDF3F5] text-[#D98291] border border-[#f7d5dc] font-semibold';
        break;
      case 'High':
        colorClasses = 'bg-[#FDF9F2] text-[#D8A65A] border border-[#f4e2c0] font-medium';
        break;
      case 'Medium':
        colorClasses = 'bg-[#F0EDFA] text-[#6554C0] border border-[#E7E1F7] font-medium';
        break;
      case 'Low':
        colorClasses = 'bg-[#F2F8F4] text-[#8BAF9B] border border-[#d6ebd0] font-medium';
        break;
    }
  } else if (variant === 'status') {
    const status = label as TaskStatus | ProjectStatus;
    switch (status) {
      case 'Completed':
        colorClasses = 'bg-[#F2F8F4] text-[#638f75] border border-[#cbe6d7] font-medium';
        break;
      case 'In Progress':
        colorClasses = 'bg-[#F0EDFA] text-[#6554C0] border border-[#E7E1F7] font-medium';
        break;
      case 'To Do':
      case 'Planning':
        colorClasses = 'bg-[#F4F3F8] text-[#77738C] border border-[#E8E5F0] font-medium';
        break;
      case 'Under Review':
        colorClasses = 'bg-[#FDF9F2] text-[#D8A65A] border border-[#f4e2c0] font-medium';
        break;
    }
  } else if (variant === 'category') {
    colorClasses = 'bg-[#FAF9FD] text-[#55479E] border border-[#E8E5F0] font-medium';
  }

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium tracking-wide ${sizeClasses} ${colorClasses}`}
    >
      {label}
    </span>
  );
};

