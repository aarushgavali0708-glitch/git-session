import React from 'react';

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  animate?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  showLabel = false,
  size = 'md',
  color = '#6554C0',
}) => {
  const clamped = Math.min(100, Math.max(0, Math.round(progress)));

  const heightClass = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  }[size];

  // Dynamic success accent when 100%
  const barColor = clamped === 100 ? '#8BAF9B' : color;

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between text-xs text-[#77738C] mb-1.5 font-medium">
          <span>Completion</span>
          <span className="font-semibold text-[#252238]">{clamped}%</span>
        </div>
      )}
      <div className={`w-full bg-[#F0EDFA] rounded-full overflow-hidden ${heightClass}`}>
        <div
          className={`${heightClass} rounded-full transition-all duration-500 ease-out`}
          style={{
            width: `${clamped}%`,
            backgroundColor: barColor,
          }}
        />
      </div>
    </div>
  );
};

