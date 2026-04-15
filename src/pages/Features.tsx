import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  FileText,
  Users,
  Calendar,
  Zap,
  BarChart3,
  ShieldCheck,
  TrendingUp,
  Check,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const features = [
  {
    icon: Briefcase,
    title: 'Project Management & Tracking',
    description:
      'Plan, execute, and deliver multiple construction projects from a unified command center. Track timelines, milestones, budgets, and dependencies without switching between tools.',
    benefits: [
      'Manage unlimited projects with Gantt charts, critical-path views, and milestone tracking',
      'Link tasks to budgets and materials to catch overruns before they happen',
      'Monitor project health with RAG status indicators and predictive delay alerts',
    ],
  },
  {
    icon: FileText,
    title: 'Document Management System',
    description:
      'A secure, centralized vault for every drawing, contract, RFI, and permit. Version control ensures your crew is always building from the latest revision — never an outdated plan.',
    benefits: [
      'Automatic version history with rollback and side-by-side comparison',
      'AES-256 encrypted storage with audit trails for compliance',
      'Tag, search, and retrieve any document in seconds from desktop or mobile',
    ],
  },
  {
    icon: Users,
    title: 'Team Collaboration Tools',
    description:
      'Keep the office, field crews, architects, and subcontractors aligned in real time. Assign tasks, share updates, and resolve issues without chasing email threads.',
    benefits: [
      'Threaded project channels with @mentions, file attachments, and photo markup',
      'Assign tasks with due dates, priorities, and dependency chains',
      'Real-time mobile sync so field updates reach the office instantly',
    ],
  },
  {
    icon: Calendar,
    title: 'Meeting & Schedule Management',
    description:
      'Coordinate stand-ups, client reviews, and subcontractor walkthroughs without the back-and-forth. ZENTIVORA handles scheduling, reminders, and follow-ups automatically.',
    benefits: [
      'Smart calendar sync with Google, Outlook, and Apple',
      'Automated reminders via email, SMS, and push notifications',
      'Built-in meeting notes and action items tied to project records',
    ],
  },
  {
    icon: Zap,
    title: 'Workflow Automation',
    description:
      'Stop doing repetitive admin work. Build custom workflows that assign tasks, chase approvals, and escalate delays — so your team focuses on building, not bookkeeping.',
    benefits: [
      'Drag-and-drop automation builder — no coding required',
      'Auto-assign tasks based on trade, role, or project phase',
      'Deadline escalations and approval routing that keep work moving 24/7',
    ],
  },
  {
    icon: BarChart3,
    title: 'Real-Time Progress Monitoring',
    description:
      'Executive dashboards and live analytics show exactly where every project stands. Spot bottlenecks the day they appear, not the week they blow your budget.',
    benefits: [
      'Live KPI dashboards for schedule, budget, safety, and productivity',
      'Drill-down reports from portfolio view to individual task',
      'Photo-based daily progress logs with geo-tagged site updates',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Secure Access & Permissions',
    description:
      'Enterprise-grade security with granular role-based controls. Give clients, subs, and staff exactly the access they need — nothing more, nothing less.',
    benefits: [
      'Role-based permissions down to the document and field level',
      'SSO, two-factor authentication, and SOC 2-aligned infrastructure',
      'Full audit logs for every view, edit, and download',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Scalable Workspace',
    description:
      "Whether you're running one renovation or a hundred commercial builds, ZENTIVORA scales with you. Add users, projects, and integrations without re-platforming.",
    benefits: [
      'Unlimited project capacity with enterprise-grade performance',
      'Modular add-ons for estimating, accounting, and equipment tracking',
      'Open API and native integrations with QuickBooks, Xero, and more',
    ],
  },
];

const comparison = [
  { instead: 'Project management software', zentivora: 'Built-in Gantt, Kanban, and milestone tracking' },
  { instead: 'Separate document storage', zentivora: 'Unlimited versioned document vault' },
  { instead: 'Chat and messaging apps', zentivora: 'Project-linked collaboration channels' },
  { instead: 'Meeting & scheduling tools', zentivora: 'Unified calendar and automated coordination' },
  { instead: 'Reporting dashboards', zentivora: 'Real-time analytics and custom reports' },
];

export default function Features() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <section className="text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-[#1F2937] sm:text-5xl">
              Powerful Features Built for Modern Construction Teams
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[#6B7280] sm:text-xl">
              ZENTIVORA brings every moving part of your construction business into one intelligent
              workspace. From blueprint to handover, we eliminate the chaos of scattered
              spreadsheets, disconnected chat apps, and lost paperwork — giving project managers,
              site supervisors, and executives a single source of truth. Teams ship projects faster,
              reduce costly rework, and keep stakeholders aligned at every phase of the build.
            </p>
          </section>

          <section className="mt-16 grid gap-6 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, description, benefits }) => (
              <div
                key={title}
                className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1F2937] text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-[#1F2937]">{title}</h3>
                <p className="mb-5 text-base leading-relaxed text-[#6B7280]">{description}</p>
                <ul className="mt-auto space-y-2.5">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5 text-sm text-[#4B5563]">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1F2937]" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="mt-20 rounded-2xl border border-gray-200 bg-[#F9FAFB] p-8 sm:p-12">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#1F2937] sm:text-4xl">
                One Platform. Every Tool You Need.
              </h2>
              <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#6B7280] sm:text-lg">
                Most construction teams juggle 8–12 disconnected apps: one for scheduling, another
                for documents, a group chat for communication, spreadsheets for budgets, and email
                for everything else. ZENTIVORA replaces that stack with a single, integrated
                platform.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-left">
                <thead className="bg-[#1F2937] text-white">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold sm:px-6 sm:py-4">
                      Instead of paying for…
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold sm:px-6 sm:py-4">
                      ZENTIVORA gives you…
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparison.map(({ instead, zentivora }) => (
                    <tr key={instead}>
                      <td className="px-4 py-3 text-sm text-[#6B7280] sm:px-6 sm:py-4 sm:text-base">
                        {instead}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-[#1F2937] sm:px-6 sm:py-4 sm:text-base">
                        {zentivora}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-center text-base text-[#4B5563] sm:text-lg">
              <span className="font-semibold text-[#1F2937]">The result:</span> lower software
              costs, less context switching, and one source of truth your entire team actually uses.
            </p>
          </section>

          <section className="mt-20 rounded-2xl bg-[#1F2937] p-10 text-center text-white sm:p-16">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Ready to Simplify Your Project Management?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
              Join the construction teams using ZENTIVORA to deliver projects on time, on budget,
              and without the chaos. Get up and running in under an hour — no complex onboarding,
              no long-term contracts.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-[#1F2937] transition hover:bg-gray-100"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Book a Demo
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
