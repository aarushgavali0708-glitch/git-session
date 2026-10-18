# TeamConnect — College Community Engagement Project (CEP) Platform

> **"Your Team. Your Tasks. One Connected Workspace."**

TeamConnect is a modern, responsive student collaboration and project management web application developed for College Community Engagement Projects (CEP). It helps student teams organize community initiatives, assign deliverables, maintain transparent peer accountability, and provide faculty evaluators with verifiable progress metrics.

---

## 🎨 Aesthetic Design System

TeamConnect is styled according to a calm, modern productivity SaaS design language:

| Design Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Main Background** | `#F8F7FC` | Calm, warm lavender-tinted background |
| **Primary Accent** | `#6554C0` | Primary buttons, active tabs, brand icons |
| **Deep Accent** | `#403477` | Strong contrast badges and dark accents |
| **Cards & Modals** | `#FFFFFF` | Crisp elevated surfaces with soft shadows |
| **Lavender Surface** | `#F0EDFA` | Pill badges, hover states, subtle containers |
| **Soft Lilac Highlight**| `#E7E1F7` | Accent borders and decorative focus rings |
| **Primary Text** | `#252238` | Deep readable indigo text for headings & labels |
| **Secondary Text** | `#77738C` | Muted descriptions, timestamps, and secondary info |
| **Borders** | `#E8E5F0` | Clean structural dividing lines |
| **Success Accent** | `#8BAF9B` | Completed deliverables and positive indicators |
| **Warning Accent** | `#D8A65A` | In-review states and caution alerts |
| **Error Accent** | `#D98291` | Overdue task warnings and destructive actions |

---

## 🚀 Key Features

1. **Reactive Project Analytics**:
   - Project progress bars automatically derive completion percentages from linked tasks.
   - Real-time updates without hardcoded estimates or manual synchronization.

2. **3-Column Kanban Board**:
   - Visual workflow tracking across **To Do**, **In Progress**, and **Completed**.
   - HTML5 Drag-and-Drop capability between columns.
   - Quick-move menus on every card for easy mobile and touchpad interaction.
   - High-contrast overdue badges for tasks past their due date.

3. **Multi-Initiative Project Management**:
   - Full CRUD: Create, read, edit, and delete projects.
   - Categorization: *Campus Sustainability*, *Digital Literacy*, *Community Outreach*, *College CEP*, *Research*.
   - Filter by status and search by keywords with instant feedback.
   - Project detail inspection modal with real-time task checklist.

4. **Team Member Allocation & Workload Tracking**:
   - Manage student collaborators with academic department affiliations.
   - Individual task distribution and completion performance percentages.
   - Safe removal with automatic task unassignment.

5. **Persistent Local Data with Sample Records**:
   - Powered by browser `localStorage`.
   - Pre-populated with realistic student CEP sample projects, tasks, and members.
   - Changes persist across browser refreshes.
   - One-click **"Reset Demo to Sample Data"** in Settings for repeated live demonstrations.

6. **Notification System & Confirmation Modals**:
   - Floating toast alerts for all state changes.
   - Modal confirmation before destructive actions (deletions and resets).

---

## 📁 Project Structure

```text
CEP/
├── README.md                 # Project documentation & presentation guide
├── index.html                # Entry HTML with Google Fonts and meta tags
├── package.json              # Dependencies and build scripts
├── package-lock.json         # Pinned dependency lockfile
├── tsconfig.json             # Root TypeScript project references
├── tsconfig.app.json         # Client application TypeScript configuration
├── tsconfig.node.json        # Vite node configuration
├── vite.config.ts            # Vite 8 with React & Tailwind CSS v4 plugins
├── vercel.json               # Vercel SPA routing rewrite configuration
├── public/
│   ├── favicon.svg           # TeamConnect branded SVG favicon
│   └── _redirects            # Netlify single-page application redirect rules
└── src/
    ├── main.tsx              # React DOM entry point
    ├── App.tsx               # Client routes & layout providers
    ├── index.css             # Tailwind CSS v4 theme variables & utilities
    ├── types/
    │   └── index.ts          # TypeScript domain interfaces
    ├── data/
    │   └── initialData.ts    # Realistic student CEP sample records
    ├── context/
    │   └── DataContext.tsx   # Reactive state management & localStorage persistence
    ├── components/
    │   ├── common/
    │   │   ├── Badge.tsx          # Status, priority, and category pill badges
    │   │   ├── ConfirmDialog.tsx  # Destructive action modal confirmation
    │   │   ├── EmptyState.tsx     # Clean empty list and zero-search placeholder
    │   │   ├── Modal.tsx          # Accessible modal dialog with backdrop blur
    │   │   ├── ProgressBar.tsx    # Smooth animated progress indicators
    │   │   └── ToastContainer.tsx # Floating notification alerts
    │   ├── layout/
    │   │   ├── AppLayout.tsx      # Main wrapper with Sidebar and Topbar
    │   │   ├── Sidebar.tsx        # Collapsible responsive navigation drawer
    │   │   └── Topbar.tsx         # Quick actions, notifications, and profile
    │   ├── dashboard/
    │   │   ├── ActivityFeed.tsx       # Live audit feed of user actions
    │   │   ├── ProgressOverview.tsx   # Aggregated delivery statistics
    │   │   ├── RecentProjects.tsx     # Active initiatives snapshot
    │   │   ├── StatCard.tsx           # Stat metric cards with theme accents
    │   │   └── UpcomingDeadlines.tsx  # Prioritized deliverables & overdue flags
    │   ├── projects/
    │   │   ├── ProjectCard.tsx        # Project card with progress and team avatars
    │   │   ├── ProjectDetailModal.tsx # Project inspection view with tasks
    │   │   └── ProjectModal.tsx       # Create/edit project form with validation
    │   ├── tasks/
    │   │   ├── KanbanBoard.tsx        # 3-column Kanban board with drop targets
    │   │   ├── TaskCard.tsx           # Drag-enabled task card with move controls
    │   │   └── TaskModal.tsx          # Task creation and editing form
    │   └── team/
    │       ├── TeamMemberCard.tsx     # Student profile card with task stats
    │       └── TeamMemberModal.tsx    # Team member registration modal
    └── pages/
        ├── AboutPage.tsx      # CEP objectives, problem statement & architecture
        ├── DashboardPage.tsx  # Central command center with dynamic metrics
        ├── LandingPage.tsx    # Aesthetic marketing overview with live preview
        ├── NotFoundPage.tsx   # 404 recovery page
        ├── ProjectsPage.tsx   # Searchable project directory
        ├── SettingsPage.tsx   # Profile preferences and demo data reset
        ├── TasksPage.tsx      # Kanban board view
        └── TeamPage.tsx       # Team member roster and workload analytics
```

---

## 🛠️ Getting Started (Local Development)

### Prerequisites

- [Node.js](https://nodejs.org/) version 18.0.0 or higher.
- A modern web browser (Google Chrome, Firefox, Safari, Edge).

### 1. Open the Project in Visual Studio Code

Open your terminal or command prompt and navigate to the project directory:

```bash
cd CEP
code .
```

Alternatively, open VS Code, click **File > Open Folder...**, and select the `CEP` folder.

### 2. Install Dependencies

Inside the `CEP` folder, run:

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Vite will start the local server (typically at `http://localhost:5173`). Open that URL in your browser to interact with TeamConnect.

### 4. Build for Production

To test the optimized production build:

```bash
npm run build
```

To preview the generated production build locally:

```bash
npm run preview
```

---

## 🌐 Free Public Deployment Instructions

TeamConnect is configured for zero-configuration deployment to free static hosting providers.

### Option A: Deploy to Vercel (Recommended)

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Sign in to [Vercel](https://vercel.com/) with your Git provider.
3. Click **"Add New..." > "Project"** and import your repository.
4. If your repository root contains the `CEP` folder, set the **Root Directory** to `CEP`.
5. The build settings will automatically be detected:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**. Vercel will build and assign you a free `https://<project-name>.vercel.app` URL.

*Note: The included `vercel.json` ensures that direct navigation to paths like `/app/projects` does not trigger 404 errors.*

### Option B: Deploy to Netlify

1. Sign in to [Netlify](https://www.netlify.com/).
2. Click **"Add new site" > "Import an existing project"**.
3. Select your repository.
4. Configure the build parameters:
   - **Base directory**: `CEP`
   - **Build command**: `npm run build`
   - **Publish directory**: `CEP/dist`
5. Click **Deploy site**.

*Note: The included `public/_redirects` file automatically handles single-page app routing on Netlify.*

---

## 🎓 CEP Presentation & Demonstration Guide

Follow this suggested sequence during your college viva or project demonstration:

1. **Landing Page Showcase (`/`)**:
   - Highlight the value proposition: *“Your Team. Your Tasks. One Connected Workspace.”*
   - Point out the interactive live preview card which dynamically reflects the underlying project data.

2. **Dashboard Overview (`/app/dashboard`)**:
   - Showcase the 6 dynamic KPI cards (Total Projects, Tasks, In Progress, Pending, Completed, Overall Progress).
   - Show how the Progress Overview ring visually splits the tasks.
   - Mention the upcoming deadlines and note how overdue tasks are highlighted in soft rose (`#D98291`).

3. **Project Management Demonstration (`/app/projects`)**:
   - Search for *"Waste"* or filter by status (*"In Progress"*).
   - Click **"Details"** on a project to show the modal with linked deliverables and assigned students.
   - Create a new project using **"New Project"** and watch the total project count update in the dashboard in real-time.

4. **Task Kanban Board Demonstration (`/app/tasks`)**:
   - Drag a task from **"To Do"** to **"In Progress"** or **"Completed"**.
   - Use the card menu to move a task and notice how the overall project completion percentage increases automatically!
   - Create a new deliverable with an upcoming deadline.

5. **Team Workload Tracking (`/app/team`)**:
   - Show how each student collaborator has an individual completion bar and count of assigned tasks.
   - Explain how this provides transparent contribution metrics for academic grading.

6. **Academic Documentation (`/app/about`)**:
   - Walk through the problem statement, objectives, and technology stack.
   - Explain how TeamConnect satisfies the Community Engagement Project requirements.

7. **Demo Reset in Settings (`/app/settings`)**:
   - Demonstrate the **"Reset Demo to Sample Data"** feature to show that the system can be restored cleanly at any moment.

---

## 📄 License & Attribution

Developed for the College Community Engagement Project (CEP) Evaluation 2026. Built with React 19, TypeScript, Vite, and Tailwind CSS.
