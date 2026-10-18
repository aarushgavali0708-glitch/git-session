import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import type { Task, TaskStatus } from '../types';
import { KanbanBoard } from '../components/tasks/KanbanBoard';
import { TaskModal } from '../components/tasks/TaskModal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { Search, Plus, Filter, AlertCircle } from 'lucide-react';

export const TasksPage: React.FC = () => {
  const { tasks, projects, deleteTask, updateTaskStatus, metrics } = useData();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');

  // Modals
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [defaultColumnStatus, setDefaultColumnStatus] = useState<TaskStatus>('To Do');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesProject =
        selectedProject === 'All' || task.projectId === selectedProject;

      const matchesPriority =
        selectedPriority === 'All' || task.priority === selectedPriority;

      return matchesSearch && matchesProject && matchesPriority;
    });
  }, [tasks, searchQuery, selectedProject, selectedPriority]);

  const handleOpenAddTask = (status: TaskStatus = 'To Do') => {
    setDefaultColumnStatus(status);
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E8E5F0]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#252238] tracking-tight">
              Task Kanban Board
            </h1>
            {metrics.overdueTasksCount > 0 && (
              <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FDF3F5] text-[#D98291] border border-[#f7d5dc]">
                <AlertCircle className="w-3.5 h-3.5" />
                {metrics.overdueTasksCount} Overdue
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-[#77738C] mt-1">
            Track student sprint progress, assignments, and milestones across Kanban columns.
          </p>
        </div>

        <button
          onClick={() => handleOpenAddTask('To Do')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6554C0] text-white text-xs sm:text-sm font-medium hover:bg-[#5644B0] transition-all shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8E5F0] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-[#77738C] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks by title or deliverables..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E8E5F0] text-xs sm:text-sm bg-[#FAF9FD] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0] transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Project Filter */}
          <div className="flex items-center gap-1.5 text-xs text-[#77738C]">
            <Filter className="w-3.5 h-3.5 text-[#77738C]" />
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#E8E5F0] text-xs font-medium text-[#252238] bg-[#FAF9FD] focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0] max-w-[180px] truncate"
            >
              <option value="All">All Projects</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div className="flex items-center gap-1.5 text-xs text-[#77738C]">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#E8E5F0] text-xs font-medium text-[#252238] bg-[#FAF9FD] focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0]"
            >
              <option value="All">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Kanban Board with Drag & Drop */}
      <div className="overflow-x-auto pb-4">
        <KanbanBoard
          tasks={filteredTasks}
          onEditTask={(task) => {
            setTaskToEdit(task);
            setIsTaskModalOpen(true);
          }}
          onDeleteTask={(task) => setTaskToDelete(task)}
          onUpdateStatus={updateTaskStatus}
          onAddTaskInColumn={handleOpenAddTask}
        />
      </div>

      {/* Create / Edit Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setTaskToEdit(null);
        }}
        taskToEdit={taskToEdit}
        defaultStatus={defaultColumnStatus}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={() => {
          if (taskToDelete) {
            deleteTask(taskToDelete.id);
            setTaskToDelete(null);
          }
        }}
        title="Delete Task"
        message={`Are you sure you want to remove the task "${taskToDelete?.title}" from the board?`}
        confirmLabel="Delete Task"
        isDestructive={true}
      />
    </div>
  );
};

