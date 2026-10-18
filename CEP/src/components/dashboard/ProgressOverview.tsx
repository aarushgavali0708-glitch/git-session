import React from 'react';
import { useData } from '../../context/DataContext';
import { Target, CheckCircle2, Clock, ListTodo } from 'lucide-react';

export const ProgressOverview: React.FC = () => {
  const { metrics } = useData();

  const todoPercent =
    metrics.totalTasks > 0
      ? Math.round((metrics.todoTasks / metrics.totalTasks) * 100)
      : 0;
  const inProgressPercent =
    metrics.totalTasks > 0
      ? Math.round((metrics.inProgressTasks / metrics.totalTasks) * 100)
      : 0;
  const completedPercent =
    metrics.totalTasks > 0
      ? Math.round((metrics.completedTasks / metrics.totalTasks) * 100)
      : 0;

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8E5F0] shadow-2xs">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-[#252238] flex items-center gap-2">
            <Target className="w-4 h-4 text-[#6554C0]" /> Overall CEP Execution
          </h3>
          <p className="text-xs text-[#77738C] mt-0.5">
            Aggregated delivery across all active projects
          </p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-[#6554C0]">
            {metrics.overallProgress}%
          </span>
          <span className="text-xs text-[#77738C] block">Completed</span>
        </div>
      </div>

      {/* Segmented Progress Bar */}
      <div className="w-full h-3 bg-[#F0EDFA] rounded-full overflow-hidden flex mb-6 p-0.5">
        <div
          style={{ width: `${completedPercent}%` }}
          className="h-full bg-[#8BAF9B] rounded-l-full transition-all duration-500"
          title={`Completed: ${metrics.completedTasks} tasks (${completedPercent}%)`}
        />
        <div
          style={{ width: `${inProgressPercent}%` }}
          className="h-full bg-[#6554C0] transition-all duration-500"
          title={`In Progress: ${metrics.inProgressTasks} tasks (${inProgressPercent}%)`}
        />
        <div
          style={{ width: `${todoPercent}%` }}
          className="h-full bg-[#D8D2EB] rounded-r-full transition-all duration-500"
          title={`To Do: ${metrics.todoTasks} tasks (${todoPercent}%)`}
        />
      </div>

      {/* Metrics Legend Breakdown */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-[#FAF9FD] border border-[#E8E5F0]">
          <div className="flex items-center gap-1.5 text-xs text-[#77738C] mb-1">
            <ListTodo className="w-3.5 h-3.5 text-[#77738C]" />
            <span>To Do</span>
          </div>
          <div className="text-lg font-bold text-[#252238]">
            {metrics.todoTasks}
          </div>
          <div className="text-[11px] text-[#77738C]">{todoPercent}% total</div>
        </div>

        <div className="p-3 rounded-xl bg-[#F0EDFA]/60 border border-[#E7E1F7]">
          <div className="flex items-center gap-1.5 text-xs text-[#6554C0] mb-1">
            <Clock className="w-3.5 h-3.5 text-[#6554C0]" />
            <span>In Progress</span>
          </div>
          <div className="text-lg font-bold text-[#252238]">
            {metrics.inProgressTasks}
          </div>
          <div className="text-[11px] text-[#6554C0]">
            {inProgressPercent}% total
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#F2F8F4] border border-[#d6ebd0]">
          <div className="flex items-center gap-1.5 text-xs text-[#638f75] mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#638f75]" />
            <span>Completed</span>
          </div>
          <div className="text-lg font-bold text-[#252238]">
            {metrics.completedTasks}
          </div>
          <div className="text-[11px] text-[#638f75]">
            {completedPercent}% total
          </div>
        </div>
      </div>
    </div>
  );
};

