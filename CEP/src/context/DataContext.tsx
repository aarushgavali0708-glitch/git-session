import React, { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import type {
  Project,
  Task,
  TeamMember,
  ActivityLog,
  UserPreferences,
  DashboardMetrics,
  TaskStatus,
  ToastMessage,
} from '../types';
import {
  INITIAL_PROJECTS,
  INITIAL_TASKS,
  INITIAL_MEMBERS,
  INITIAL_ACTIVITIES,
  INITIAL_PREFERENCES,
} from '../data/initialData';

interface DataContextType {
  projects: Project[];
  tasks: Task[];
  members: TeamMember[];
  activities: ActivityLog[];
  preferences: UserPreferences;
  toasts: ToastMessage[];
  metrics: DashboardMetrics;
  
  // Project Actions
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  getProjectProgress: (projectId: string) => { percent: number; total: number; completed: number };
  
  // Task Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  
  // Team Actions
  addMember: (member: Omit<TeamMember, 'id' | 'joinedDate'>) => void;
  updateMember: (member: TeamMember) => void;
  deleteMember: (id: string) => void;
  getMemberTaskStats: (memberId: string) => { assigned: number; completed: number; rate: number };
  
  // Preferences & System
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  resetToDemoData: () => void;
  addToast: (type: 'success' | 'info' | 'warning' | 'error', message: string) => void;
  removeToast: (id: string) => void;
}

const STORAGE_KEYS = {
  PROJECTS: 'teamconnect_projects_v2',
  TASKS: 'teamconnect_tasks_v2',
  MEMBERS: 'teamconnect_members_v2',
  ACTIVITIES: 'teamconnect_activities_v2',
  PREFS: 'teamconnect_prefs_v2',
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or initial sample data
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  const [members, setMembers] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MEMBERS);
      return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
    } catch {
      return INITIAL_MEMBERS;
    }
  });

  const [activities, setActivities] = useState<ActivityLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
    } catch {
      return INITIAL_ACTIVITIES;
    }
  });

  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PREFS);
      return saved ? JSON.parse(saved) : INITIAL_PREFERENCES;
    } catch {
      return INITIAL_PREFERENCES;
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify(preferences));
  }, [preferences]);

  // Toast helper
  const addToast = (type: 'success' | 'info' | 'warning' | 'error', message: string) => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Activity log helper
  const logActivity = (action: string, entityType: 'project' | 'task' | 'team' | 'system', entityName: string) => {
    const newLog: ActivityLog = {
      id: 'act-' + Date.now(),
      action,
      entityType,
      entityName,
      timestamp: 'Just now',
      userName: preferences.displayName || 'You',
    };
    setActivities((prev) => [newLog, ...prev.slice(0, 19)]);
  };

  // Dynamic Dashboard Metrics
  const metrics = useMemo<DashboardMetrics>(() => {
    const totalProjects = projects.length;
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
    const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
    const todoTasks = tasks.filter((t) => t.status === 'To Do').length;
    const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    const today = new Date().toISOString().split('T')[0];
    const overdueTasksCount = tasks.filter(
      (t) => t.status !== 'Completed' && t.dueDate && t.dueDate < today
    ).length;

    return {
      totalProjects,
      totalTasks,
      completedTasks,
      inProgressTasks,
      todoTasks,
      overallProgress,
      overdueTasksCount,
      totalMembers: members.length,
    };
  }, [projects, tasks, members]);

  // Project Progress calculation based on associated tasks
  const getProjectProgress = (projectId: string) => {
    const projectTasks = tasks.filter((t) => t.projectId === projectId);
    const total = projectTasks.length;
    if (total === 0) return { percent: 0, total: 0, completed: 0 };
    const completed = projectTasks.filter((t) => t.status === 'Completed').length;
    const percent = Math.round((completed / total) * 100);
    return { percent, total, completed };
  };

  // Member Task statistics
  const getMemberTaskStats = (memberId: string) => {
    const memberTasks = tasks.filter((t) => t.assigneeId === memberId);
    const assigned = memberTasks.length;
    const completed = memberTasks.filter((t) => t.status === 'Completed').length;
    const rate = assigned > 0 ? Math.round((completed / assigned) * 100) : 0;
    return { assigned, completed, rate };
  };

  // Project CRUD
  const addProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: 'proj-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setProjects((prev) => [newProject, ...prev]);
    logActivity('Created new project', 'project', newProject.name);
    addToast('success', `Project "${newProject.name}" created successfully.`);
  };

  const updateProject = (updated: Project) => {
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    logActivity('Updated project details', 'project', updated.name);
    addToast('success', `Project "${updated.name}" updated.`);
  };

  const deleteProject = (id: string) => {
    const target = projects.find((p) => p.id === id);
    const name = target ? target.name : 'Project';
    setProjects((prev) => prev.filter((p) => p.id !== id));
    // Also remove or clean up associated tasks
    setTasks((prev) => prev.filter((t) => t.projectId !== id));
    logActivity('Deleted project and its tasks', 'project', name);
    addToast('info', `Project "${name}" and its linked tasks were deleted.`);
  };

  // Task CRUD
  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: 'task-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    logActivity('Added new task', 'task', newTask.title);
    addToast('success', `Task "${newTask.title}" added to board.`);
  };

  const updateTask = (updated: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    logActivity('Updated task details', 'task', updated.title);
    addToast('success', `Task "${updated.title}" updated.`);
  };

  const deleteTask = (id: string) => {
    const target = tasks.find((t) => t.id === id);
    const title = target ? target.title : 'Task';
    setTasks((prev) => prev.filter((t) => t.id !== id));
    logActivity('Deleted task', 'task', title);
    addToast('info', `Task "${title}" removed.`);
  };

  const updateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return { ...t, status: newStatus };
        }
        return t;
      })
    );
    const target = tasks.find((t) => t.id === taskId);
    if (target) {
      logActivity(`Moved task to ${newStatus}`, 'task', target.title);
      addToast('info', `"${target.title}" moved to ${newStatus}.`);
    }
  };

  // Team Member CRUD
  const addMember = (memberData: Omit<TeamMember, 'id' | 'joinedDate'>) => {
    const newMember: TeamMember = {
      ...memberData,
      id: 'mem-' + Date.now(),
      joinedDate: new Date().toISOString().split('T')[0],
    };
    setMembers((prev) => [...prev, newMember]);
    logActivity('Added team member', 'team', newMember.name);
    addToast('success', `Added ${newMember.name} to the team.`);
  };

  const updateMember = (updated: TeamMember) => {
    setMembers((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    logActivity('Updated team member', 'team', updated.name);
    addToast('success', `Updated details for ${updated.name}.`);
  };

  const deleteMember = (id: string) => {
    const target = members.find((m) => m.id === id);
    const name = target ? target.name : 'Member';
    setMembers((prev) => prev.filter((m) => m.id !== id));
    // Clean up member reference from projects
    setProjects((prev) =>
      prev.map((p) => ({
        ...p,
        memberIds: p.memberIds.filter((mId) => mId !== id),
      }))
    );
    // Unassign tasks assigned to this member
    setTasks((prev) =>
      prev.map((t) => (t.assigneeId === id ? { ...t, assigneeId: '' } : t))
    );
    logActivity('Removed team member', 'team', name);
    addToast('info', `Team member ${name} removed.`);
  };

  // Preferences & Demo Reset
  const updatePreferences = (newPrefs: Partial<UserPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...newPrefs }));
    addToast('success', 'Preferences updated successfully.');
  };

  const resetToDemoData = () => {
    setProjects(INITIAL_PROJECTS);
    setTasks(INITIAL_TASKS);
    setMembers(INITIAL_MEMBERS);
    setActivities(INITIAL_ACTIVITIES);
    setPreferences(INITIAL_PREFERENCES);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(INITIAL_TASKS));
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(INITIAL_MEMBERS));
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(INITIAL_ACTIVITIES));
    localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify(INITIAL_PREFERENCES));
    addToast('success', 'Demo data reset to default sample records.');
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        tasks,
        members,
        activities,
        preferences,
        toasts,
        metrics,
        addProject,
        updateProject,
        deleteProject,
        getProjectProgress,
        addTask,
        updateTask,
        deleteTask,
        updateTaskStatus,
        addMember,
        updateMember,
        deleteMember,
        getMemberTaskStats,
        updatePreferences,
        resetToDemoData,
        addToast,
        removeToast,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

