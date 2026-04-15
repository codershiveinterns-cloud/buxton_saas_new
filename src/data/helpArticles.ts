export type HelpCategory =
  | 'Getting Started'
  | 'Project Management'
  | 'Document Management'
  | 'Team Collaboration'
  | 'Account & Settings'
  | 'Billing & Subscription';

export type HelpContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'steps'; items: string[] }
  | { type: 'list'; items: string[] }
  | { type: 'tip'; text: string };

export type HelpArticle = {
  slug: string;
  title: string;
  category: HelpCategory;
  readTime: string;
  summary: string;
  content: HelpContentBlock[];
};

export const helpArticles: HelpArticle[] = [
  {
    slug: 'how-to-create-a-new-project',
    title: 'How to create a new project',
    category: 'Getting Started',
    readTime: '2 min',
    summary:
      'Set up your first construction project in ZENTIVORA in under five minutes — from naming to inviting your team.',
    content: [
      {
        type: 'paragraph',
        text: 'Creating a new project is the first step to organizing your work inside ZENTIVORA. You can set up a full project workspace — tasks, documents, timelines, and team — in under five minutes.',
      },
      { type: 'heading', text: 'Step-by-step' },
      {
        type: 'steps',
        items: [
          'Log in to your ZENTIVORA dashboard.',
          'Click the "New Project" button in the top right corner.',
          'Enter a project name, location, and a short description.',
          'Choose a project start date and target completion date.',
          'Invite team members by email (you can add more later).',
          'Click "Create Project" to finish.',
        ],
      },
      { type: 'heading', text: 'What happens next' },
      {
        type: 'paragraph',
        text: 'Once created, you land directly on the project workspace. You can immediately add tasks, upload drawings and contracts, set milestones, and assign owners. Everything you do is autosaved.',
      },
      {
        type: 'tip',
        text: 'Use a clear, consistent naming convention like "2026-04 — Office Tower Phase 1" to keep your project list organized as you scale.',
      },
    ],
  },
  {
    slug: 'how-to-invite-team-members',
    title: 'How to invite team members',
    category: 'Team Collaboration',
    readTime: '2 min',
    summary:
      'Invite teammates, subcontractors, and clients into your workspace with the right access level for each role.',
    content: [
      {
        type: 'paragraph',
        text: 'Collaboration is the core of ZENTIVORA. You can invite unlimited teammates, subcontractors, and external collaborators with fine-grained access control.',
      },
      { type: 'heading', text: 'Invite a new member' },
      {
        type: 'steps',
        items: [
          'Go to "Team" from the left sidebar.',
          'Click "Invite Member".',
          'Enter their email address.',
          'Choose a role: Admin, Member, or Guest.',
          'Optionally select which projects they can access.',
          'Click "Send Invite" — they will receive an email with a link to join.',
        ],
      },
      { type: 'heading', text: 'Roles at a glance' },
      {
        type: 'list',
        items: [
          'Admin — full access to workspace settings, billing, and all projects.',
          'Member — access to assigned projects with edit permissions.',
          'Guest — read-only access to specific projects only.',
        ],
      },
      {
        type: 'tip',
        text: 'Guests are perfect for clients and external stakeholders. They do not count toward your paid seat limit on most plans.',
      },
    ],
  },
  {
    slug: 'how-to-upload-documents',
    title: 'How to upload documents',
    category: 'Document Management',
    readTime: '3 min',
    summary:
      'Upload drawings, contracts, and site photos — with automatic version control and secure access.',
    content: [
      {
        type: 'paragraph',
        text: 'ZENTIVORA makes it easy to centralize every file related to a project — from drawings and contracts to RFIs, permits, and site photos.',
      },
      { type: 'heading', text: 'Upload a file' },
      {
        type: 'steps',
        items: [
          'Open the project where you want to add files.',
          'Click the "Documents" tab.',
          'Click "Upload" or drag-and-drop files directly into the browser.',
          'Select a folder or create a new one.',
          'Add tags to make the file easy to find later.',
          'Click "Save" to finish.',
        ],
      },
      { type: 'heading', text: 'Version control' },
      {
        type: 'paragraph',
        text: 'If you upload a file with the same name as an existing one, ZENTIVORA automatically creates a new version and keeps the full history. You can preview older versions, compare them, or roll back at any time.',
      },
      {
        type: 'list',
        items: [
          'Supported file types: PDF, DWG, DOCX, XLSX, JPG, PNG, MP4, and more',
          'Maximum file size: 500 MB per file on standard plans',
          'Files are encrypted at rest with AES-256',
        ],
      },
      {
        type: 'tip',
        text: 'Use tags like "Drawing", "Contract", or "Permit" to filter documents in seconds — even on large projects with thousands of files.',
      },
    ],
  },
  {
    slug: 'how-to-assign-tasks',
    title: 'How to assign tasks',
    category: 'Project Management',
    readTime: '2 min',
    summary: 'Assign tasks with owners, due dates, and priorities to keep your project moving.',
    content: [
      {
        type: 'paragraph',
        text: 'Tasks are how work moves forward in ZENTIVORA. Every task can have an owner, due date, priority, and links to related documents or dependencies.',
      },
      { type: 'heading', text: 'Create and assign a task' },
      {
        type: 'steps',
        items: [
          'Open the project and click the "Tasks" tab.',
          'Click "Add Task".',
          'Enter a task title and short description.',
          'Select an assignee from your team list.',
          'Set a due date and priority (Low, Medium, High, or Urgent).',
          'Link related documents or parent tasks if needed.',
          'Click "Save".',
        ],
      },
      { type: 'heading', text: 'Keeping tasks on track' },
      {
        type: 'paragraph',
        text: 'Assignees are notified immediately. They can update status directly from the task card, add comments, and attach site photos. You can view tasks as a list, Kanban board, or Gantt chart.',
      },
      {
        type: 'tip',
        text: 'Use Urgent priority sparingly. If everything is urgent, nothing is — teams respond faster when priorities mean something.',
      },
    ],
  },
  {
    slug: 'how-to-manage-notifications',
    title: 'How to manage notifications',
    category: 'Account & Settings',
    readTime: '3 min',
    summary: 'Control what alerts you receive, where they are delivered, and when.',
    content: [
      {
        type: 'paragraph',
        text: 'Notifications keep you in the loop without overwhelming you. You can fine-tune exactly what you get notified about and where.',
      },
      { type: 'heading', text: 'Update your preferences' },
      {
        type: 'steps',
        items: [
          'Click your profile picture in the top right.',
          'Select "Settings".',
          'Go to the "Notifications" tab.',
          'Toggle email, in-app, and mobile push notifications for each event type.',
          'Set your "Do Not Disturb" hours if needed.',
          'Click "Save Changes".',
        ],
      },
      { type: 'heading', text: 'Event types you can control' },
      {
        type: 'list',
        items: [
          'Task assignments and status changes',
          'Document uploads and version updates',
          'Meeting invitations and reminders',
          'Mentions in comments or chat',
          'Project milestone changes',
          'Weekly digest emails',
        ],
      },
      {
        type: 'tip',
        text: 'Keep mentions and task assignments on, but turn off general activity notifications if you want a quieter inbox.',
      },
    ],
  },
  {
    slug: 'how-to-track-project-progress',
    title: 'How to track project progress',
    category: 'Project Management',
    readTime: '4 min',
    summary:
      'Use dashboards, Gantt charts, and live analytics to see exactly where every project stands.',
    content: [
      {
        type: 'paragraph',
        text: 'ZENTIVORA gives you multiple ways to track progress so you can find the right view for the moment — whether you are reviewing a single project or a portfolio of dozens.',
      },
      { type: 'heading', text: 'The four main views' },
      {
        type: 'list',
        items: [
          'Dashboard — live KPIs for schedule, budget, safety, and productivity.',
          'Gantt — timeline view showing tasks, dependencies, and the critical path.',
          'Kanban — task flow by status, great for weekly team reviews.',
          'Reports — drill-down analytics you can filter and export.',
        ],
      },
      { type: 'heading', text: 'Set up your dashboard' },
      {
        type: 'steps',
        items: [
          'Open the project and go to "Dashboard".',
          'Click "Customize" in the top right.',
          'Add or remove widgets (schedule, budget, RFIs, milestones, risks).',
          'Drag widgets to reorder them.',
          'Click "Save Layout".',
        ],
      },
      {
        type: 'tip',
        text: 'Keep your dashboard minimal. Three or four well-chosen widgets are easier to act on than fifteen that nobody reads.',
      },
    ],
  },
  {
    slug: 'how-to-change-subscription-plan',
    title: 'How to change your subscription plan',
    category: 'Billing & Subscription',
    readTime: '2 min',
    summary: 'Upgrade, downgrade, or switch between monthly and yearly billing at any time.',
    content: [
      {
        type: 'paragraph',
        text: 'You can change your ZENTIVORA plan at any time. Upgrades take effect immediately; downgrades apply at the end of your current billing cycle.',
      },
      { type: 'heading', text: 'Switch plans' },
      {
        type: 'steps',
        items: [
          'Click your profile picture in the top right.',
          'Go to "Settings" and then "Billing".',
          'Click "Change Plan".',
          'Choose your new plan and billing frequency (monthly or yearly).',
          'Review the prorated amount.',
          'Confirm the change.',
        ],
      },
      { type: 'heading', text: 'Good to know' },
      {
        type: 'list',
        items: [
          'Yearly billing saves roughly 20% compared to monthly.',
          'Downgrades preserve access to premium features until the cycle ends.',
          'You can cancel at any time — data stays in read-only mode for 30 days before archive.',
        ],
      },
      {
        type: 'tip',
        text: 'Contact billing@zentivora.com if you need a custom invoice, purchase order, or enterprise agreement.',
      },
    ],
  },
  {
    slug: 'how-to-set-roles-and-permissions',
    title: 'How to set user roles and permissions',
    category: 'Team Collaboration',
    readTime: '3 min',
    summary:
      'Give every teammate exactly the access they need — at the workspace, project, or document level.',
    content: [
      {
        type: 'paragraph',
        text: 'Role-based access control is core to ZENTIVORA. You can set permissions at three levels: workspace, project, and document.',
      },
      { type: 'heading', text: 'Change a user\u2019s role' },
      {
        type: 'steps',
        items: [
          'Go to "Team" from the left sidebar.',
          'Click the user you want to update.',
          'Click "Change Role".',
          'Select Admin, Member, or Guest.',
          'Optionally customize per-project access.',
          'Click "Save".',
        ],
      },
      { type: 'heading', text: 'Project-level overrides' },
      {
        type: 'paragraph',
        text: 'Even within a role, you can grant extra access on a specific project (e.g., make a Guest a Member on one project only). Go to the project settings, open the "Access" tab, and adjust per-user permissions.',
      },
      {
        type: 'tip',
        text: 'Audit logs record every permission change so you always have a trail of who granted what, and when.',
      },
    ],
  },
];

export function getArticleBySlug(slug: string): HelpArticle | undefined {
  return helpArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: HelpCategory): HelpArticle[] {
  return helpArticles.filter((a) => a.category === category);
}
