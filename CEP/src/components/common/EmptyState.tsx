import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-2xl border border-dashed border-[#E8E5F0] my-4">
      <div className="w-14 h-14 rounded-2xl bg-[#F0EDFA] text-[#6554C0] flex items-center justify-center mb-4 shadow-xs">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-[#252238] mb-1.5">{title}</h3>
      <p className="text-xs sm:text-sm text-[#77738C] max-w-sm mb-5 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-[#6554C0] text-white hover:bg-[#5644B0] transition-colors shadow-xs"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

