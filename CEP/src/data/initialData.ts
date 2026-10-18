import type { Project, Task, TeamMember, ActivityLog, UserPreferences } from '../types';

export const INITIAL_MEMBERS: TeamMember[] = [
  {
    id: 'mem-1',
    name: 'Aarav Sharma',
    role: 'Project Lead & CEP Coordinator',
    email: 'aarav.sharma@college.edu',
    department: 'Computer Science & Engineering',
    avatarColor: '#6554C0',
    initials: 'AS',
    joinedDate: '2026-08-01',
  },
  {
    id: 'mem-2',
    name: 'Priya Patel',
    role: 'UI/UX & Documentation Lead',
    email: 'priya.patel@college.edu',
    department: 'Information Technology',
    avatarColor: '#8BAF9B',
    initials: 'PP',
    joinedDate: '2026-08-05',
  },
  {
    id: 'mem-3',
    name: 'Rohan Verma',
    role: 'Field Operations & Data Analyst',
    email: 'rohan.verma@college.edu',
    department: 'Computer Science & Engineering',
    avatarColor: '#D8A65A',
    initials: 'RV',
    joinedDate: '2026-08-10',
  },
  {
    id: 'mem-4',
    name: 'Ananya Iyer',
    role: 'Community Liaison & Outreach',
    email: 'ananya.iyer@college.edu',
    department: 'Electronics & Communication',
    avatarColor: '#D98291',
    initials: 'AI',
    joinedDate: '2026-08-12',
  },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'Smart Campus Waste Reduction & Recycling',
    description:
      'Audit campus plastic waste generation, install segregated smart collection bins, and run behavioral awareness drives across academic blocks.',
    category: 'Campus Sustainability',
    status: 'In Progress',
    startDate: '2026-09-01',
    deadline: '2026-11-20',
    memberIds: ['mem-1', 'mem-2', 'mem-3'],
    accentColor: '#6554C0',
    createdAt: '2026-09-01T09:00:00Z',
  },
  {
    id: 'proj-2',
    name: 'Digital Literacy for Rural Secondary Schools',
    description:
      'Deliver weekend interactive workshops covering internet safety, digital identity, and introductory coding for 8th-10th grade students at local adopted schools.',
    category: 'Digital Literacy',
    status: 'In Progress',
    startDate: '2026-09-10',
    deadline: '2026-12-05',
    memberIds: ['mem-1', 'mem-3', 'mem-4'],
    accentColor: '#8BAF9B',
    createdAt: '2026-09-10T10:30:00Z',
  },
  {
    id: 'proj-3',
    name: 'Peer Tutoring & Academic Support Network',
    description:
      'Structured peer mentoring program connecting senior students with first-year undergraduates in foundational mathematics and basic computing.',
    category: 'College CEP',
    status: 'Completed',
    startDate: '2026-08-15',
    deadline: '2026-10-10',
    memberIds: ['mem-2', 'mem-4'],
    accentColor: '#403477',
    createdAt: '2026-08-15T08:15:00Z',
  },
  {
    id: 'proj-4',
    name: 'Community Health & Hygiene Information Hub',
    description:
      'Publish bilingual vernacular infographics and print guides on water safety, seasonal viral prevention, and local primary health center contact directories.',
    category: 'Community Outreach',
    status: 'Planning',
    startDate: '2026-10-15',
    deadline: '2026-12-25',
    memberIds: ['mem-1', 'mem-2', 'mem-4'],
    accentColor: '#D8A65A',
    createdAt: '2026-10-15T11:00:00Z',
  },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Audit campus plastic waste generation per building',
    description:
      'Collect daily waste bin weight data from Cafeteria, Admin Block, and Lab Complex over a 7-day period for baseline comparison.',
    projectId: 'proj-1',
    assigneeId: 'mem-3',
    priority: 'High',
    status: 'Completed',
    dueDate: '2026-09-25',
    createdAt: '2026-09-02T10:00:00Z',
  },
  {
    id: 'task-2',
    title: 'Design color-coded bin signage & educational posters',
    description:
      'Create high-contrast visual cues for Wet, Dry, and Recyclable e-waste bins conforming to campus environmental standards.',
    projectId: 'proj-1',
    assigneeId: 'mem-2',
    priority: 'Medium',
    status: 'In Progress',
    dueDate: '2026-10-25',
    createdAt: '2026-09-12T14:20:00Z',
  },
  {
    id: 'task-3',
    title: 'Procure 12 dual-compartment segregation bins',
    description:
      'Finalize vendor quotation with college estate office and arrange delivery to designated drop zones in Academic Block A & B.',
    projectId: 'proj-1',
    assigneeId: 'mem-1',
    priority: 'Urgent',
    status: 'To Do',
    dueDate: '2026-10-28',
    createdAt: '2026-09-18T16:00:00Z',
  },
  {
    id: 'task-4',
    title: 'Draft curriculum modules for village school digital training',
    description:
      'Module 1: Operating System basics; Module 2: Safe web browsing; Module 3: Word processing & presentations.',
    projectId: 'proj-2',
    assigneeId: 'mem-1',
    priority: 'High',
    status: 'Completed',
    dueDate: '2026-09-28',
    createdAt: '2026-09-11T11:00:00Z',
  },
  {
    id: 'task-5',
    title: 'Permission letter approval from District Education Officer',
    description:
      'Submit formal college CEP endorsement letter and secure headmaster clearance for four weekend lab sessions.',
    projectId: 'proj-2',
    assigneeId: 'mem-4',
    priority: 'Urgent',
    status: 'In Progress',
    dueDate: '2026-10-22',
    createdAt: '2026-09-15T09:30:00Z',
  },
  {
    id: 'task-6',
    title: 'Prepare hardware kit & test offline software packages',
    description:
      'Set up 10 offline Linux bootable drives and bundle interactive typing tutors and educational games.',
    projectId: 'proj-2',
    assigneeId: 'mem-3',
    priority: 'Medium',
    status: 'To Do',
    dueDate: '2026-11-05',
    createdAt: '2026-09-22T13:45:00Z',
  },
  {
    id: 'task-7',
    title: 'Consolidate student feedback forms & attendance registers',
    description:
      'Digitize 120 peer tutoring participant surveys and compile grade performance improvement metrics for evaluation.',
    projectId: 'proj-3',
    assigneeId: 'mem-2',
    priority: 'Medium',
    status: 'Completed',
    dueDate: '2026-10-08',
    createdAt: '2026-08-20T10:15:00Z',
  },
  {
    id: 'task-8',
    title: 'Stakeholder meeting with Community Health Center doctor',
    description:
      'Review medical accuracy of seasonal hygiene checklist and verify primary emergency contact numbers.',
    projectId: 'proj-4',
    assigneeId: 'mem-4',
    priority: 'High',
    status: 'To Do',
    dueDate: '2026-10-30',
    createdAt: '2026-10-15T15:30:00Z',
  },
];

export const INITIAL_ACTIVITIES: ActivityLog[] = [
  {
    id: 'act-1',
    action: 'Marked task as Completed',
    entityType: 'task',
    entityName: 'Audit campus plastic waste generation per building',
    timestamp: '2 hours ago',
    userName: 'Rohan Verma',
  },
  {
    id: 'act-2',
    action: 'Updated project status to In Progress',
    entityType: 'project',
    entityName: 'Smart Campus Waste Reduction & Recycling',
    timestamp: '5 hours ago',
    userName: 'Aarav Sharma',
  },
  {
    id: 'act-3',
    action: 'Added new task',
    entityType: 'task',
    entityName: 'Stakeholder meeting with Community Health Center doctor',
    timestamp: '1 day ago',
    userName: 'Ananya Iyer',
  },
  {
    id: 'act-4',
    action: 'Completed project milestone',
    entityType: 'project',
    entityName: 'Peer Tutoring & Academic Support Network',
    timestamp: '3 days ago',
    userName: 'Priya Patel',
  },
  {
    id: 'act-5',
    action: 'Created new project',
    entityType: 'project',
    entityName: 'Community Health & Hygiene Information Hub',
    timestamp: '4 days ago',
    userName: 'Aarav Sharma',
  },
];

export const INITIAL_PREFERENCES: UserPreferences = {
  displayName: 'Aarav Sharma',
  email: 'aarav.sharma@college.edu',
  college: 'Apex Institute of Technology & Engineering',
  department: 'Computer Science & Engineering',
  academicYear: 'Final Year (2026-2027)',
  studentId: 'CEP-2026-CSE-042',
  compactCards: false,
};

