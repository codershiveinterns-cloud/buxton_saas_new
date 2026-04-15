export type BlogCategory =
  | 'Project Management'
  | 'Team Collaboration'
  | 'Workflow Automation'
  | 'Productivity Tips';

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string; attribution?: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  image: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  featured?: boolean;
  tags: string[];
  content: ContentBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'improve-construction-project-tracking',
    title: '5 Ways to Improve Construction Project Tracking',
    description:
      'From milestone planning to real-time field updates, learn the five practical changes that help construction teams stay on schedule and on budget without adding admin overhead.',
    category: 'Project Management',
    image:
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80',
    date: 'Apr 10, 2026',
    readTime: '7 min read',
    author: 'Priya Sharma',
    authorRole: 'Head of Product, ZENTIVORA',
    featured: true,
    tags: ['Tracking', 'Scheduling', 'KPIs', 'Field Operations'],
    content: [
      {
        type: 'paragraph',
        text: 'Accurate project tracking is the difference between a project that finishes on time and one that quietly slips week after week. The good news is that most tracking problems are not caused by lack of effort — they come from fragmented information, inconsistent reporting, and an over-reliance on memory and gut feel.',
      },
      {
        type: 'paragraph',
        text: 'After working with hundreds of construction teams across residential, commercial, and infrastructure projects, we have seen the same five high-leverage changes come up again and again. Here is how they work, why they matter, and how to roll them out without disrupting your current operations.',
      },
      { type: 'heading', text: '1. Centralize your milestones' },
      {
        type: 'paragraph',
        text: 'Every project should have one source of truth for milestones, dependencies, and deadlines. Spreadsheets work until they do not — the moment a second PM needs to edit the same file, you have a divergence problem. A shared workspace keeps everyone looking at the same schedule, and every change leaves an audit trail.',
      },
      {
        type: 'paragraph',
        text: 'Start by mapping the critical path. Identify the tasks that, if delayed by a single day, push the end date. Those are your non-negotiables and deserve the most attention in weekly reviews.',
      },
      { type: 'heading', text: '2. Tie tasks to budgets and materials' },
      {
        type: 'paragraph',
        text: 'When tasks are linked to cost codes and materials, overruns surface early — not in the month-end report when it is too late to course-correct. The biggest wins usually come from catching small variances while they are still small.',
      },
      {
        type: 'list',
        items: [
          'Link every task to a cost code before work starts',
          'Reconcile actuals to estimates weekly, not monthly',
          'Flag any line item more than 5% over budget for same-week review',
          'Keep one person accountable for the overall budget health number',
        ],
      },
      { type: 'heading', text: '3. Capture field updates in real time' },
      {
        type: 'paragraph',
        text: 'Photo-based daily logs with geo-tags give office teams visibility without chasing phone calls. The superintendent snaps a picture, tags the location, and moves on. No extra reporting meeting, no end-of-week catch-up email.',
      },
      {
        type: 'quote',
        text: 'We cut our daily reporting time from ninety minutes to under fifteen just by letting the field team send photos directly into the project log.',
        attribution: 'Daniel Ortiz, Project Director at a $180M civil contractor',
      },
      { type: 'heading', text: '4. Use predictive indicators, not lagging ones' },
      {
        type: 'paragraph',
        text: 'RAG status and critical-path views highlight at-risk work before it becomes a crisis. Track RFI response times, submittal turnarounds, and approval cycles — these predict schedule slippage weeks before it shows up on the Gantt.',
      },
      {
        type: 'paragraph',
        text: 'A rule of thumb: any submittal sitting for more than seven days is a leading indicator of a delay. Build a workflow that auto-escalates those before they turn into a problem.',
      },
      { type: 'heading', text: '5. Review weekly, not monthly' },
      {
        type: 'paragraph',
        text: 'Short weekly reviews catch drift early. Monthly reviews only confirm what you already suspected — and by then the recovery options are narrower and more expensive.',
      },
      {
        type: 'paragraph',
        text: 'Keep the review to thirty minutes. Three questions: What slipped this week? What is at risk next week? What are we doing about both? Close the loop before you leave the room.',
      },
      { type: 'heading', text: 'Bringing it all together' },
      {
        type: 'paragraph',
        text: 'None of these changes are revolutionary on their own. What makes them powerful is the compounding effect: centralized data feeds better reviews, which surface leading indicators faster, which drive earlier action. Pick one to start this week, and layer the others in over the next month.',
      },
    ],
  },
  {
    slug: 'how-digital-tools-simplify-site-management',
    title: 'How Digital Tools Simplify Site Management',
    description:
      'Paper logs, WhatsApp groups, and scattered spreadsheets slow projects down. Here is how modern digital workspaces bring field and office teams onto the same page.',
    category: 'Workflow Automation',
    image:
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1600&q=80',
    date: 'Apr 4, 2026',
    readTime: '6 min read',
    author: 'Marcus Lee',
    authorRole: 'Solutions Engineer, ZENTIVORA',
    featured: true,
    tags: ['Digital Transformation', 'Field Management', 'Software'],
    content: [
      {
        type: 'paragraph',
        text: 'Most construction sites still rely on a messy mix of paper, chat apps, and email. It works — barely — but it costs hours every week and creates gaps that lead to rework, missed deadlines, and strained client relationships.',
      },
      { type: 'heading', text: 'The hidden cost of fragmented tools' },
      {
        type: 'paragraph',
        text: 'The problem is not any single tool. WhatsApp is great for quick updates. Email is fine for formal communication. Paper works on a windy site with no Wi-Fi. The problem is that none of them talk to each other — and the work of stitching them together falls on project managers who should be solving bigger problems.',
      },
      {
        type: 'list',
        items: [
          'Estimated 10–15 hours per project manager per week spent on status admin',
          '60% of rework traced to information not reaching the right person on time',
          'Average construction project uses 8–12 disconnected apps',
          'Field-to-office delay averages 24–48 hours on traditional workflows',
        ],
      },
      { type: 'heading', text: 'What digital site management actually looks like' },
      {
        type: 'paragraph',
        text: 'Modern digital workspaces put drawings, tasks, documents, and communication in one place. Crews update progress from their phones. Office teams see it instantly. Issues raised on site become tracked tasks with owners and due dates — not buried in a chat thread.',
      },
      {
        type: 'paragraph',
        text: 'The biggest wins come from reducing context switching. When a site supervisor does not have to juggle five apps to find the latest drawing, they spend more time on the work that actually moves the project forward.',
      },
      { type: 'heading', text: 'How to roll it out without disrupting work' },
      {
        type: 'paragraph',
        text: 'Do not try to digitize everything at once. Pick one workflow — daily reports, RFIs, or punch lists — and move it fully digital for 30 days. Measure the time saved. Then expand.',
      },
      {
        type: 'list',
        items: [
          'Start with one high-friction workflow everyone already hates',
          'Get buy-in from the field before the office mandates the change',
          'Run paper and digital in parallel for the first week only',
          'Measure time saved, not features used',
          'Expand to the next workflow once adoption is above 80%',
        ],
      },
      {
        type: 'quote',
        text: 'The moment our foremen realized they could skip the Monday morning status meeting because the office already had all the updates — that was the turning point.',
        attribution: 'Rena Kapoor, Operations Director',
      },
      { type: 'heading', text: 'The payoff' },
      {
        type: 'paragraph',
        text: 'Teams that fully adopt digital site management typically see 20–30% reduction in admin overhead, 40% faster issue resolution, and measurably fewer disputes with clients and subs — because everything is documented by default.',
      },
    ],
  },
  {
    slug: 'common-mistakes-in-project-planning',
    title: 'Common Mistakes in Project Planning',
    description:
      'The planning errors we see most often on construction projects — and the simple habits that prevent them.',
    category: 'Project Management',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    date: 'Mar 28, 2026',
    readTime: '5 min read',
    author: 'Ana Rodriguez',
    authorRole: 'Senior Project Consultant, ZENTIVORA',
    tags: ['Planning', 'Risk Management', 'Scheduling'],
    content: [
      {
        type: 'paragraph',
        text: 'Great execution cannot save a badly planned project. Yet the same planning mistakes show up again and again — and they are almost always avoidable with a bit of discipline and the right collaboration habits.',
      },
      { type: 'heading', text: 'Mistake 1: Underestimating dependencies' },
      {
        type: 'paragraph',
        text: 'Most schedules look at tasks in isolation. The reality is that every trade depends on the one before it, and one missed handoff can ripple through the entire project. Map dependencies explicitly, and review them every time scope changes.',
      },
      { type: 'heading', text: 'Mistake 2: Skipping buffer time' },
      {
        type: 'paragraph',
        text: 'A schedule with zero slack is a schedule that will slip. Weather, inspections, and material delays are not exceptions — they are part of construction. Build realistic buffers into the critical path, not just at the end of the project.',
      },
      { type: 'heading', text: 'Mistake 3: Planning without the field' },
      {
        type: 'paragraph',
        text: 'The people doing the work know things the schedule cannot. Involve superintendents and foremen when the plan is still in draft. Their input prevents the kind of unpleasant surprises that derail week one.',
      },
      {
        type: 'list',
        items: [
          'Involve trades early — ideally during bid review',
          'Document assumptions alongside the schedule',
          'Revisit the plan weekly; do not treat it as a monument',
          'Flag scope creep immediately with a written impact note',
          'Keep a living risk register with owners and mitigation actions',
        ],
      },
      { type: 'heading', text: 'The fix: collaborative planning' },
      {
        type: 'paragraph',
        text: 'Plans are living documents, not monuments. The best teams treat the schedule as a weekly conversation, not a quarterly artifact. The result is a plan that gets more accurate over time instead of more obsolete.',
      },
    ],
  },
  {
    slug: 'best-practices-for-team-collaboration',
    title: 'Best Practices for Team Collaboration',
    description:
      'How high-performing construction teams keep office and field communication fast, clear, and documented.',
    category: 'Team Collaboration',
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    date: 'Mar 21, 2026',
    readTime: '6 min read',
    author: "James O'Connor",
    authorRole: 'Customer Success Lead, ZENTIVORA',
    tags: ['Collaboration', 'Communication', 'Culture'],
    content: [
      {
        type: 'paragraph',
        text: 'Collaboration breaks down most often at the seams — between trades, between office and field, between this week and next. The teams that get it right share a handful of habits that look simple on paper but take real discipline to maintain.',
      },
      { type: 'heading', text: 'Write things down by default' },
      {
        type: 'paragraph',
        text: 'Verbal agreements on a noisy job site are how disputes are born. Every meaningful decision — scope change, schedule shift, material substitution — should have a written record visible to everyone affected. Not buried in email. Not in one manager\u2019s notebook. In the shared project record.',
      },
      { type: 'heading', text: 'Keep channels project-scoped, not person-scoped' },
      {
        type: 'paragraph',
        text: 'When communication lives in DMs and one-off group chats, knowledge walks out the door with every role change. Project-scoped channels keep the institutional memory where it belongs: with the project.',
      },
      { type: 'heading', text: 'Every decision has an owner and a deadline' },
      {
        type: 'paragraph',
        text: 'The two most common collaboration failures: everyone thinks someone else is handling it, or someone is handling it but no one knows when it is due. Fix both with a simple rule — nothing leaves a meeting without an owner and a date.',
      },
      {
        type: 'list',
        items: [
          'Start every project with a shared communication playbook',
          'Use channels for topics, not people',
          'Close decisions with: Who, What, When',
          'Archive finished work instead of deleting it',
          'Do monthly retrospectives to surface what is not working',
        ],
      },
      {
        type: 'quote',
        text: 'The single biggest improvement we made was agreeing that if it is not written down, it did not happen. Everything else followed from that.',
        attribution: 'Aisha Webb, VP of Operations',
      },
      { type: 'heading', text: 'Tools help, but culture wins' },
      {
        type: 'paragraph',
        text: 'The best tool in the world will fail if the team has not agreed on how to use it. A shared playbook — even a one-page document — beats the fanciest software every time. Start with the habits, then pick tools that reinforce them.',
      },
    ],
  },
  {
    slug: 'why-document-management-matters',
    title: 'Why Document Management Matters in Construction',
    description:
      'Version chaos is expensive. Here is how centralized document control prevents rework and protects margins.',
    category: 'Workflow Automation',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    date: 'Mar 15, 2026',
    readTime: '5 min read',
    author: 'Priya Sharma',
    authorRole: 'Head of Product, ZENTIVORA',
    tags: ['Documents', 'Version Control', 'Compliance'],
    content: [
      {
        type: 'paragraph',
        text: 'A single outdated drawing on site can cost tens of thousands in rework. Multiply that across a year and document control stops being an admin issue — it becomes a margin issue.',
      },
      { type: 'heading', text: 'The three problems good document management solves' },
      {
        type: 'list',
        items: [
          'Version control — everyone works from the latest revision, every time',
          'Access control — the right people see the right files, nothing more',
          'Audit trail — every view, download, and edit is logged',
        ],
      },
      { type: 'heading', text: 'What "centralized" actually means' },
      {
        type: 'paragraph',
        text: 'A shared Dropbox folder is not centralized document management. Real document control includes version history, granular permissions, markup and comparison tools, and a single definitive location for each document type — drawings, submittals, RFIs, contracts, and permits.',
      },
      {
        type: 'paragraph',
        text: 'The goal is simple: no one on the project should ever have to ask "is this the latest version?" If they do, the system has already failed.',
      },
      { type: 'heading', text: 'Compliance is a bonus, not the goal' },
      {
        type: 'paragraph',
        text: 'Good document management makes compliance almost automatic — audits become a matter of exporting logs rather than reconstructing history. But the real value is preventing rework in the first place.',
      },
      {
        type: 'quote',
        text: 'We paid for the software in one quarter — just from stopping two rework incidents that would have happened on old drawings.',
        attribution: 'Tom Reiner, Director of Preconstruction',
      },
      {
        type: 'paragraph',
        text: 'If you are still emailing PDFs between office and site, you are one misnamed file away from an expensive mistake. The fix is not complicated — it is just a matter of picking the system and committing to use it.',
      },
    ],
  },
  {
    slug: 'how-to-reduce-project-delays',
    title: 'How to Reduce Project Delays',
    description:
      'A field-tested playbook for spotting delay risks early and keeping projects on the critical path.',
    category: 'Project Management',
    image:
      'https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?auto=format&fit=crop&w=1200&q=80',
    date: 'Mar 8, 2026',
    readTime: '7 min read',
    author: 'Marcus Lee',
    authorRole: 'Solutions Engineer, ZENTIVORA',
    tags: ['Delays', 'Risk', 'Scheduling'],
    content: [
      {
        type: 'paragraph',
        text: 'Delays rarely arrive all at once. They build up quietly — a late submittal here, a missing approval there — until the schedule is suddenly weeks behind and no one remembers exactly when things went wrong.',
      },
      { type: 'heading', text: 'Track leading indicators, not lagging ones' },
      {
        type: 'paragraph',
        text: 'A Gantt chart tells you what already slipped. Leading indicators tell you what is about to slip. Watch these three religiously:',
      },
      {
        type: 'list',
        items: [
          'RFI response times — anything over 7 days is a red flag',
          'Submittal turnarounds — target under 14 days for standard items',
          'Approval cycles — count the number of handoffs and reduce them',
        ],
      },
      { type: 'heading', text: 'Build a weekly risk rhythm' },
      {
        type: 'paragraph',
        text: 'Every Friday, identify the top two risks for the coming week. Not five. Two. Assign an owner and a mitigation action to each. The following Friday, review and adjust. Focus beats volume every single time.',
      },
      { type: 'heading', text: 'Make delays expensive to ignore' },
      {
        type: 'paragraph',
        text: 'Most delays survive because nobody is directly accountable for them. Name an owner for every at-risk item and make progress visible in the weekly review. Accountability alone resolves half the cases before they escalate.',
      },
      {
        type: 'quote',
        text: 'We stopped tracking fifty metrics and started tracking three. The schedule improved within a month.',
        attribution: 'Elena Markov, Senior PM',
      },
      { type: 'heading', text: 'When a delay happens anyway' },
      {
        type: 'paragraph',
        text: 'No process prevents every delay. When one hits, respond fast: confirm the impact, communicate to stakeholders within 24 hours, and adjust the plan transparently. Teams that communicate early recover faster — and keep client trust in the process.',
      },
    ],
  },
  {
    slug: 'automating-daily-reports',
    title: 'Automating Daily Reports Without Losing Context',
    description:
      'Automation saves hours — but only if the reports still tell the story. How to strike the right balance.',
    category: 'Workflow Automation',
    image:
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    date: 'Feb 28, 2026',
    readTime: '6 min read',
    author: 'Ana Rodriguez',
    authorRole: 'Senior Project Consultant, ZENTIVORA',
    tags: ['Automation', 'Reporting', 'Daily Logs'],
    content: [
      {
        type: 'paragraph',
        text: 'Daily reports are the heartbeat of a project — but they are also the most hated task on most sites. Automation helps, if you do it right. Done wrong, it produces reports that are technically complete but practically useless.',
      },
      { type: 'heading', text: 'Automate the inputs, not the insights' },
      {
        type: 'paragraph',
        text: 'The rule of thumb: automate anything that is observable and structured. Keep human hands on anything that requires judgment or narrative.',
      },
      {
        type: 'list',
        items: [
          'Automate: weather, manpower counts, equipment on site, delivery logs',
          'Automate: photo timestamps, geo-tags, task status updates',
          'Keep manual: daily narrative, safety observations, client interactions',
          'Keep manual: notes on subcontractor performance and blockers',
        ],
      },
      {
        type: 'paragraph',
        text: 'That one paragraph from the superintendent is usually worth more than the rest of the report combined. Free them up to write it well by automating everything around it.',
      },
      { type: 'heading', text: 'Design reports for the reader' },
      {
        type: 'paragraph',
        text: 'A good daily report answers three questions within ten seconds: what happened today, what is blocking progress, and what needs attention from leadership. If your report buries that in a wall of data, the reader will stop opening it.',
      },
      {
        type: 'quote',
        text: 'We cut our reports in half and engagement doubled. Turns out executives were skimming the old ones anyway.',
        attribution: 'Liam Chen, Construction Executive',
      },
      { type: 'heading', text: 'The payoff' },
      {
        type: 'paragraph',
        text: 'The goal is not to remove people from reporting. It is to give them time to write the parts that actually matter — and to free leadership from drowning in data that does not change decisions.',
      },
    ],
  },
  {
    slug: 'running-effective-site-standups',
    title: 'Running Effective Site Stand-Ups',
    description:
      'Fifteen-minute site meetings that actually move work forward — the agenda, cadence, and tools that work.',
    category: 'Team Collaboration',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    date: 'Feb 20, 2026',
    readTime: '4 min read',
    author: "James O'Connor",
    authorRole: 'Customer Success Lead, ZENTIVORA',
    tags: ['Meetings', 'Daily Standups', 'Productivity'],
    content: [
      {
        type: 'paragraph',
        text: 'A good site stand-up is fifteen minutes and ends with everyone clearer on what happens today. A bad one is forty-five minutes, everyone checking their phones, and nobody walks away with a concrete next step.',
      },
      { type: 'heading', text: 'The three-question format' },
      {
        type: 'list',
        items: [
          'What did you complete yesterday?',
          'What will you complete today?',
          'What is blocking you?',
        ],
      },
      {
        type: 'paragraph',
        text: 'That is the entire agenda. No status theater, no tangents. If a discussion needs more than thirty seconds, take it offline with the two or three people actually involved.',
      },
      { type: 'heading', text: 'Capture blockers in real time' },
      {
        type: 'paragraph',
        text: 'Every blocker raised needs an owner before the meeting ends. Log it in your shared tool. Revisit tomorrow. If the same blocker shows up three days in a row, escalate it — do not let it normalize.',
      },
      { type: 'heading', text: 'Pick the right cadence' },
      {
        type: 'paragraph',
        text: 'Daily during active phases. Three times a week during steady-state. Do not meet for the sake of meeting — if there is nothing to say, cancel and send the time back to the team.',
      },
      {
        type: 'quote',
        text: 'The day we cut our stand-up from forty minutes to twelve was the day our foremen started actually paying attention.',
        attribution: 'Derek Yoo, Superintendent',
      },
    ],
  },
  {
    slug: 'time-management-tips-for-pms',
    title: 'Time Management Tips for Project Managers',
    description:
      'Seven tactical habits busy PMs use to protect deep work, escape status-update fatigue, and ship on time.',
    category: 'Productivity Tips',
    image:
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80',
    date: 'Feb 14, 2026',
    readTime: '5 min read',
    author: 'Priya Sharma',
    authorRole: 'Head of Product, ZENTIVORA',
    tags: ['Productivity', 'Habits', 'Leadership'],
    content: [
      {
        type: 'paragraph',
        text: 'The average project manager spends a third of their week on status updates. That is time not spent solving problems, supporting the team, or thinking about what is around the corner. The seven habits below consistently give PMs that time back.',
      },
      { type: 'heading', text: 'The seven habits' },
      {
        type: 'list',
        items: [
          'Batch meetings into two or three days per week',
          'Protect two hours of deep work daily — no exceptions',
          'Automate recurring reports so you only edit, not author',
          'Delegate with clear outcomes, not tasks',
          'Use async updates wherever real-time is not required',
          'Say no to meetings without an agenda',
          'Review your week every Friday — what worked, what did not',
        ],
      },
      { type: 'heading', text: 'Start with one, not seven' },
      {
        type: 'paragraph',
        text: 'Trying to adopt all seven at once is the fastest way to adopt none of them. Pick one, run it for two weeks, and only add the next one once the first is automatic. Small changes compound into large ones.',
      },
      {
        type: 'quote',
        text: 'Protecting ninety minutes every morning for deep work was the single highest-leverage change I made in my career.',
        attribution: 'Nisha Patel, Senior PM',
      },
      { type: 'heading', text: 'The goal is leverage, not busyness' },
      {
        type: 'paragraph',
        text: 'Busy is not the same as productive. A good PM is measured by the outcomes of the project, not the fullness of the calendar. Every habit here is designed to trade low-leverage activity for high-leverage decisions.',
      },
    ],
  },
  {
    slug: 'dashboards-that-drive-decisions',
    title: 'Dashboards That Drive Better Decisions',
    description:
      'The metrics worth tracking, the ones to ignore, and how to design dashboards your team will actually open.',
    category: 'Productivity Tips',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    date: 'Feb 6, 2026',
    readTime: '6 min read',
    author: 'Marcus Lee',
    authorRole: 'Solutions Engineer, ZENTIVORA',
    tags: ['Analytics', 'Dashboards', 'KPIs'],
    content: [
      {
        type: 'paragraph',
        text: 'Most construction dashboards fail not because the data is wrong, but because they answer questions no one is asking. A beautifully designed chart of irrelevant data is still irrelevant.',
      },
      { type: 'heading', text: 'Three questions a good dashboard must answer' },
      {
        type: 'list',
        items: [
          'Are we on schedule?',
          'Are we on budget?',
          'What needs attention this week?',
        ],
      },
      {
        type: 'paragraph',
        text: 'Everything else is secondary. If your dashboard cannot answer those three in under five seconds, it is overdesigned.',
      },
      { type: 'heading', text: 'Metrics worth tracking' },
      {
        type: 'list',
        items: [
          'Schedule variance by phase — not just overall',
          'Budget variance tied to cost codes, not broad categories',
          'Open RFIs and their aging — the oldest ones tell the real story',
          'Safety incidents and near-misses',
          'Daily manpower vs planned manpower',
        ],
      },
      { type: 'heading', text: 'Metrics to ignore (or deprioritize)' },
      {
        type: 'list',
        items: [
          'Vanity volume counts ("documents uploaded this week")',
          'Anything not tied to a decision someone will make',
          'Metrics with no target or threshold',
        ],
      },
      {
        type: 'quote',
        text: 'We deleted half our KPIs. Nobody noticed. The ones that remained became the ones we actually used.',
        attribution: 'Carla Mendes, Director of PMO',
      },
      { type: 'heading', text: 'Design for the 7 AM coffee test' },
      {
        type: 'paragraph',
        text: 'Design for the person opening the dashboard at 7 AM with coffee in one hand. If it takes more than five seconds to understand, it needs to be simpler. Strip away, do not add. The best dashboards look almost embarrassingly minimal.',
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
