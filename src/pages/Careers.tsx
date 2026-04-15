import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Rocket,
  Target,
  TrendingUp,
  Users,
  Clock,
  Briefcase,
  Code2,
  Server,
  Palette,
  ClipboardList,
  Headphones,
  FileText,
  Search,
  CheckCircle2,
  MessageSquare,
  Award,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const reasons = [
  {
    icon: Rocket,
    title: 'Fast-Growing Startup',
    description:
      'Join at an early stage where your contributions directly shape the product, the team, and the company trajectory.',
  },
  {
    icon: Target,
    title: 'Real Impact on Users',
    description:
      'Ship features that construction teams use every day on active job sites — your work matters from week one.',
  },
  {
    icon: TrendingUp,
    title: 'Learning & Growth',
    description:
      'Wide ownership, mentorship from experienced builders, and a learning budget to keep sharpening your craft.',
  },
  {
    icon: Users,
    title: 'Collaborative Culture',
    description:
      'Low-ego, high-trust teammates who give honest feedback, share credit, and help each other do the best work of their careers.',
  },
  {
    icon: Clock,
    title: 'Flexible Work',
    description:
      'Remote-friendly schedules, async-first communication, and trust to manage your time around what works for you.',
  },
  {
    icon: Briefcase,
    title: 'Real-World Projects',
    description:
      'Visit job sites, talk directly to customers, and see how your decisions play out in concrete, steel, and timelines.',
  },
];

const values = [
  {
    title: 'Ownership & Accountability',
    description:
      "You own outcomes, not just tasks. When something breaks or slips, we fix it and we learn — no finger-pointing.",
  },
  {
    title: 'Clear Communication',
    description:
      'Write things down. Say what you mean. Disagree early. We prefer short, direct messages over long meetings.',
  },
  {
    title: 'Continuous Improvement',
    description:
      'Every sprint, every review, every release — we look for one thing to do better next time. Small gains compound.',
  },
  {
    title: 'Practical Problem Solving',
    description:
      "We build what solves the user's real problem today, not what looks clever on a whiteboard. Simplicity wins.",
  },
  {
    title: 'Team Collaboration',
    description:
      'Engineering, design, support, and ops work shoulder to shoulder. The best ideas come from the edges of the team.',
  },
];

const openRoles = [
  {
    icon: Code2,
    title: 'Frontend Developer (React)',
    description:
      'Build fast, accessible, and polished interfaces using React, TypeScript, and Tailwind. Work closely with design to ship features end-to-end.',
    location: 'Remote',
  },
  {
    icon: Server,
    title: 'Backend Developer (Node.js)',
    description:
      'Design and scale APIs, data models, and integrations that power project workflows for construction teams worldwide.',
    location: 'Remote',
  },
  {
    icon: Palette,
    title: 'UI/UX Designer',
    description:
      'Shape the look and feel of ZENTIVORA. Run user research, prototype flows, and partner with engineering to deliver pixel-perfect experiences.',
    location: 'Remote / On-site',
  },
  {
    icon: ClipboardList,
    title: 'Project Manager',
    description:
      'Coordinate cross-functional delivery, own roadmaps, and keep engineering, design, and customer teams aligned on outcomes.',
    location: 'On-site',
  },
  {
    icon: Headphones,
    title: 'Customer Support Executive',
    description:
      'Be the voice of ZENTIVORA for our customers. Resolve issues, onboard new teams, and feed insights back into product.',
    location: 'Remote',
  },
];

const hiringSteps = [
  {
    icon: FileText,
    title: 'Apply Online',
    description: 'Submit your application and a short note on why the role excites you.',
  },
  {
    icon: Search,
    title: 'Initial Screening',
    description: 'A 30-minute call with our team to learn about your background and goals.',
  },
  {
    icon: Code2,
    title: 'Technical / Skill Round',
    description: 'A practical exercise or portfolio review — no trick questions, just real work.',
  },
  {
    icon: MessageSquare,
    title: 'Final Interview',
    description: 'Meet the team you will work with and ask us anything about the role or company.',
  },
  {
    icon: Award,
    title: 'Offer',
    description: 'We move fast — expect a decision within a few days of the final round.',
  },
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <section className="text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-[#1F2937] sm:text-5xl lg:text-6xl">
              Build the Future of Construction Technology with Us
            </h1>
            <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-[#6B7280] sm:text-xl">
              Join a fast-growing team building tools that simplify project management for
              construction companies worldwide.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#open-positions"
                className="inline-flex items-center gap-2 rounded-lg bg-[#1F2937] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#111827]"
              >
                View Open Positions
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#open-positions"
                className="inline-flex items-center gap-2 rounded-lg border border-[#1F2937] px-6 py-3 text-base font-semibold text-[#1F2937] transition hover:bg-gray-50"
              >
                Apply Now
              </a>
            </div>
          </section>

          <section className="mt-20 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-12">
            <h2 className="mb-6 text-3xl font-bold text-[#1F2937] sm:text-4xl">
              About Working at ZENTIVORA
            </h2>
            <div className="space-y-5 text-base leading-relaxed text-[#4B5563] sm:text-lg">
              <p>
                ZENTIVORA exists to bring clarity and control to one of the world's largest and
                most fragmented industries. Construction teams lose billions every year to missed
                deadlines, lost documents, and broken communication — and we believe better
                software can change that. Our mission is to build the operating system for modern
                construction, one that field crews and executives actually want to use.
              </p>
              <p>
                We are a product-driven company. That means we talk to customers every week, ship
                fast, and measure success by outcomes on real job sites, not by lines of code or
                screens shipped. The work is hard, the problems are meaty, and the wins are
                tangible — we often hear from customers who tell us we gave them their weekends
                back.
              </p>
              <p>
                If you want to solve real-world problems, work with people who take their craft
                seriously, and help shape a product that leaves the industry better than we found
                it, you will feel at home here.
              </p>
            </div>
          </section>

          <section className="mt-20">
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#1F2937] sm:text-4xl">Why Join Us</h2>
              <p className="mx-auto max-w-2xl text-base text-[#6B7280] sm:text-lg">
                Great work, honest feedback, and the freedom to do the best work of your career.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reasons.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1F2937] text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-[#1F2937]">{title}</h3>
                  <p className="text-sm leading-relaxed text-[#6B7280]">{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-20 rounded-2xl bg-[#F9FAFB] p-8 sm:p-12">
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#1F2937] sm:text-4xl">Our Values</h2>
              <p className="mx-auto max-w-2xl text-base text-[#6B7280] sm:text-lg">
                The principles that shape how we build, communicate, and make decisions every day.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {values.map(({ title, description }) => (
                <div
                  key={title}
                  className="rounded-xl border border-gray-200 bg-white p-6"
                >
                  <h3 className="mb-2 text-lg font-semibold text-[#1F2937]">{title}</h3>
                  <p className="text-sm leading-relaxed text-[#6B7280]">{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="open-positions" className="mt-20 scroll-mt-24">
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#1F2937] sm:text-4xl">
                Open Positions
              </h2>
              <p className="mx-auto max-w-2xl text-base text-[#6B7280] sm:text-lg">
                Find a role that fits your skills — and apply in under two minutes.
              </p>
            </div>
            <div className="space-y-4">
              {openRoles.map(({ icon: Icon, title, description, location }) => (
                <div
                  key={title}
                  className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-7"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#1F2937] text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg font-semibold text-[#1F2937]">{title}</h3>
                      <p className="mb-2 text-sm leading-relaxed text-[#6B7280]">{description}</p>
                      <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-[#4B5563]">
                        {location}
                      </span>
                    </div>
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1F2937] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#111827] sm:flex-shrink-0"
                  >
                    Apply Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-20">
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#1F2937] sm:text-4xl">
                Our Hiring Process
              </h2>
              <p className="mx-auto max-w-2xl text-base text-[#6B7280] sm:text-lg">
                Simple, transparent, and respectful of your time — from application to offer in
                about two weeks.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {hiringSteps.map(({ icon: Icon, title, description }, index) => (
                <div
                  key={title}
                  className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="absolute -top-3 left-6 rounded-full bg-[#1F2937] px-3 py-1 text-xs font-semibold text-white">
                    Step {index + 1}
                  </div>
                  <div className="mb-4 mt-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-[#1F2937]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-[#1F2937]">{title}</h3>
                  <p className="text-sm leading-relaxed text-[#6B7280]">{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-20 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="mb-5 text-3xl font-bold text-[#1F2937] sm:text-4xl">
                  A Culture Built Around Focused, Meaningful Work
                </h2>
                <p className="mb-4 text-base leading-relaxed text-[#4B5563] sm:text-lg">
                  We are builders who care about the craft. That means quiet time to do deep
                  work, short meetings with clear outcomes, and honest conversations when things
                  don't go to plan. No politics, no ego, no busywork for the sake of looking busy.
                </p>
                <p className="text-base leading-relaxed text-[#4B5563] sm:text-lg">
                  We celebrate wins together, learn from our mistakes openly, and invest in each
                  other's growth. Whether you're pairing on a tricky bug or onboarding a new
                  customer, you'll be surrounded by teammates who want you to succeed.
                </p>
              </div>
              <ul className="space-y-4">
                {[
                  'Remote-first with optional in-person offsites twice a year',
                  'Async-by-default communication — fewer meetings, more making',
                  'Annual learning budget for books, courses, and conferences',
                  'Transparent compensation and equity for every teammate',
                  'Direct access to customers and real construction job sites',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#1F2937]" />
                    <span className="text-base text-[#4B5563]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-20 rounded-2xl bg-[#1F2937] p-10 text-center text-white sm:p-16">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Ready to Grow with Us?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
              If you're excited to solve real problems, work with people who care, and help shape
              the future of construction technology — we'd love to hear from you.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#open-positions"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-[#1F2937] transition hover:bg-gray-100"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
