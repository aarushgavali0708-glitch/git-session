export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type TaskStatus = 'To Do' | 'In Progress' | 'Completed';
export type ProjectStatus = 'Planning' | 'In Progress' | 'Under Review' | 'Completed';
export type ProjectCategory = 'College CEP' | 'Community Outreach' | 'Campus Sustainability' | 'Digital Literacy' | 'Research';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  department: string;
  avatarColor: string;
  initials: string;
  joinedDate: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  startDate: string;
  deadline: string;
  memberIds: string[];
  accentColor: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assigneeId: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  entityType: 'project' | 'task' | 'team' | 'system';
  entityName: string;
  timestamp: string;
  userName: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

export interface UserPreferences {
  displayName: string;
  email: string;
  college: string;
  department: string;
  academicYear: string;
  studentId: string;
  compactCards: boolean;
}

export interface DashboardMetrics {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  todoTasks: number;
  overallProgress: number;
  overdueTasksCount: number;
  totalMembers: number;
}

