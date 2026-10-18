import React from 'react';
import { useData } from '../../context/DataContext';
import { History, Activity } from 'lucide-react';

export const ActivityFeed: React.FC = () => {
  const { activities } = useData();

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8E5F0] shadow-2xs">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-[#252238] flex items-center gap-2">
            <History className="w-4 h-4 text-[#6554C0]" /> Real-Time Activity Feed
          </h3>
          <p className="text-xs text-[#77738C] mt-0.5">
            Audit trail of team actions and deliverables
          </p>
        </div>
        <span className="text-xs font-medium text-[#6554C0] bg-[#F0EDFA] px-2.5 py-1 rounded-full flex items-center gap-1">
          <Activity className="w-3 h-3 animate-pulse" /> Live
        </span>
      </div>

      <div className="space-y-4">
        {activities.slice(0, 6).map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#F0EDFA] text-[#6554C0] flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
              {activity.userName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .substring(0, 2)
                .toUpperCase()}
            </div>
            <div className="min-w-0 flex-1 text-xs">
              <p className="text-[#252238] font-medium leading-tight">
                <span className="text-[#6554C0] font-semibold">
                  {activity.userName}
                </span>{' '}
                {activity.action.toLowerCase()}:{' '}
                <span className="font-semibold text-[#252238]">
                  "{activity.entityName}"
                </span>
              </p>
              <span className="text-[11px] text-[#77738C] mt-0.5 block">
                {activity.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

