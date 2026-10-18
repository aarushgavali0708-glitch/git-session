import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import type { Project } from '../types';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectModal } from '../components/projects/ProjectModal';
import { ProjectDetailModal } from '../components/projects/ProjectDetailModal';
import { TaskModal } from '../components/tasks/TaskModal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { EmptyState } from '../components/common/EmptyState';
import { Search, Plus, FolderKanban, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { projects, deleteProject } = useData();

  // Search, filter, and sort state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'deadline' | 'name' | 'newest'>('deadline');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [projectToView, setProjectToView] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskDefaultProjectId, setTaskDefaultProjectId] = useState<string>('');

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const matchesSearch =
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.category.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
          selectedStatus === 'All' || project.status === selectedStatus;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'deadline') {
          return a.deadline.localeCompare(b.deadline);
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return b.createdAt.localeCompare(a.createdAt);
      });
  }, [projects, searchQuery, selectedStatus, sortBy]);

  const handleAddTaskToProject = (projectId: string) => {
    setTaskDefaultProjectId(projectId);
    setIsTaskModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E8E5F0]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#252238] tracking-tight">
            Community Engagement Projects
          </h1>
          <p className="text-xs sm:text-sm text-[#77738C] mt-1">
            Manage student outreach initiatives, deliverables, and field milestones.
          </p>
        </div>

        <button
          onClick={() => {
            setProjectToEdit(null);
            setIsCreateModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6554C0] text-white text-xs sm:text-sm font-medium hover:bg-[#5644B0] transition-all shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8E5F0] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-[#77738C] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title, scope, or category..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E8E5F0] text-xs sm:text-sm bg-[#FAF9FD] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0] transition-colors"
          />
        </div>

        {/* Filters and sorting */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs text-[#77738C]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#77738C]" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#E8E5F0] text-xs font-medium text-[#252238] bg-[#FAF9FD] focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0]"
            >
              <option value="All">All Statuses</option>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Under Review">Under Review</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5 text-xs text-[#77738C]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#77738C]" />
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as 'deadline' | 'name' | 'newest')
              }
              className="px-3 py-2 rounded-xl border border-[#E8E5F0] text-xs font-medium text-[#252238] bg-[#FAF9FD] focus:outline-hidden focus:ring-2 focus:ring-[#6554C0]/20 focus:border-[#6554C0]"
            >
              <option value="deadline">Sort by Deadline</option>
              <option value="name">Sort by Name</option>
              <option value="newest">Sort by Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Project Cards Grid or Empty State */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title={
            projects.length === 0
              ? 'No projects created yet'
              : 'No matching projects found'
          }
          description={
            projects.length === 0
              ? 'Start by creating your first Community Engagement Project to assign tasks and monitor group impact.'
              : 'Try clearing your search query or switching your status filter to see other projects.'
          }
          actionLabel={projects.length === 0 ? 'Create Project' : undefined}
          onAction={() => {
            setProjectToEdit(null);
            setIsCreateModalOpen(true);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={(proj) => {
                setProjectToEdit(proj);
                setIsCreateModalOpen(true);
              }}
              onDelete={(proj) => setProjectToDelete(proj)}
              onView={(proj) => setProjectToView(proj)}
            />
          ))}
        </div>
      )}

      {/* Create / Edit Project Modal */}
      <ProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setProjectToEdit(null);
        }}
        projectToEdit={projectToEdit}
      />

      {/* Project Detail Modal */}
      <ProjectDetailModal
        isOpen={!!projectToView}
        onClose={() => setProjectToView(null)}
        project={projectToView}
        onEdit={(proj) => {
          setProjectToEdit(proj);
          setIsCreateModalOpen(true);
        }}
        onDelete={(proj) => setProjectToDelete(proj)}
        onAddTaskToProject={handleAddTaskToProject}
      />

      {/* Add Task Modal for specific project */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        defaultProjectId={taskDefaultProjectId}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        onConfirm={() => {
          if (projectToDelete) {
            deleteProject(projectToDelete.id);
            setProjectToDelete(null);
          }
        }}
        title="Delete Project"
        message={`Are you sure you want to delete "${projectToDelete?.name}"? All associated tasks linked to this project will also be removed permanently.`}
        confirmLabel="Delete Project"
        isDestructive={true}
      />
    </div>
  );
};

