import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  accent?: 'lavender' | 'sage' | 'amber' | 'rose' | 'deep';
  trend?: {
    label: string;
    positive?: boolean;
  };
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  accent = 'lavender',
  trend,
}) => {
  const accentStyles = {
    lavender: {
      bg: 'bg-[#F0EDFA]',
      text: 'text-[#6554C0]',
      border: 'border-[#E7E1F7]',
    },
    sage: {
      bg: 'bg-[#F2F8F4]',
      text: 'text-[#8BAF9B]',
      border: 'border-[#d6ebd0]',
    },
    amber: {
      bg: 'bg-[#FDF9F2]',
      text: 'text-[#D8A65A]',
      border: 'border-[#f4e2c0]',
    },
    rose: {
      bg: 'bg-[#FDF3F5]',
      text: 'text-[#D98291]',
      border: 'border-[#f7d5dc]',
    },
    deep: {
      bg: 'bg-[#F0EDFA]',
      text: 'text-[#403477]',
      border: 'border-[#E7E1F7]',
    },
  }[accent];

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E8E5F0] shadow-2xs hover:shadow-sm transition-all duration-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#77738C] uppercase tracking-wider">
          {title}
        </span>
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${accentStyles.bg} ${accentStyles.text} ${accentStyles.border}`}
        >
          <Icon className="w-4.5 h-4.5" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-bold text-[#252238] tracking-tight">
          {value}
        </span>
        {trend && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              trend.positive
                ? 'bg-[#F2F8F4] text-[#638f75]'
                : 'bg-[#FAF9FD] text-[#77738C]'
            }`}
          >
            {trend.label}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-[#77738C] font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

