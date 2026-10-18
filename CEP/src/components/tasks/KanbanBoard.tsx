import React, { useState } from 'react';
import type { Task, TaskStatus } from '../../types';
import { TaskCard } from './TaskCard';
import { Plus, CheckCircle2, Clock, ListTodo } from 'lucide-react';

interface KanbanBoardProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
  onUpdateStatus: (taskId: string, status: TaskStatus) => void;
  onAddTaskInColumn: (status: TaskStatus) => void;
}

const COLUMNS: {
  status: TaskStatus;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}[] = [
  {
    status: 'To Do',
    title: 'To Do',
    icon: ListTodo,
    accentColor: '#77738C',
  },
  {
    status: 'In Progress',
    title: 'In Progress',
    icon: Clock,
    accentColor: '#6554C0',
  },
  {
    status: 'Completed',
    title: 'Completed',
    icon: CheckCircle2,
    accentColor: '#8BAF9B',
  },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tasks,
  onEditTask,
  onDeleteTask,
  onUpdateStatus,
  onAddTaskInColumn,
}) => {
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<TaskStatus | null>(null);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
    setActiveDragId(taskId);
  };

  const handleDragOver = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    if (dragOverColumn !== status) {
      setDragOverColumn(status);
    }
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, targetStatus: TaskStatus) => {
    e.preventDefault();
    setDragOverColumn(null);
    const taskId = e.dataTransfer.getData('text/plain') || activeDragId;
    if (taskId) {
      onUpdateStatus(taskId, targetStatus);
    }
    setActiveDragId(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      {COLUMNS.map((col) => {
        const Icon = col.icon;
        const columnTasks = tasks.filter((t) => t.status === col.status);
        const isTargeted = dragOverColumn === col.status;

        return (
          <div
            key={col.status}
            onDragOver={(e) => handleDragOver(e, col.status)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, col.status)}
            className={`bg-[#FAF9FD] rounded-2xl p-4 border transition-all duration-200 flex flex-col min-h-[500px] ${
              isTargeted
                ? 'border-[#6554C0] ring-2 ring-[#6554C0]/20 bg-[#F0EDFA]/40 scale-[1.01]'
                : 'border-[#E8E5F0]'
            }`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8E5F0]">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-[#6554C0]" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#252238]">
                  {col.title}
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-[#F0EDFA] text-[#6554C0]">
                  {columnTasks.length}
                </span>
              </div>

              <button
                onClick={() => onAddTaskInColumn(col.status)}
                className="p-1 rounded-lg text-[#77738C] hover:text-[#6554C0] hover:bg-[#F0EDFA] transition-colors"
                title={`Add task to ${col.title}`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Task Cards Container */}
            <div className="space-y-3 flex-1">
              {columnTasks.length === 0 ? (
                <div className="h-32 flex flex-col items-center justify-center text-center p-4 border border-dashed border-[#E8E5F0] rounded-xl text-xs text-[#77738C]">
                  <span>No tasks in {col.title.toLowerCase()}</span>
                  <button
                    onClick={() => onAddTaskInColumn(col.status)}
                    className="mt-2 text-[#6554C0] font-medium hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add one now
                  </button>
                </div>
              ) : (
                columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                    onDragStart={handleDragStart}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

