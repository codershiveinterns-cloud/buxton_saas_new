import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronDown,
  CreditCard,
  FileText,
  FolderKanban,
  LifeBuoy,
  Mail,
  MessageSquare,
  Rocket,
  Search,
  Settings,
  Users,
  X,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { helpArticles, type HelpCategory } from '../data/helpArticles';

const categories: { icon: typeof Rocket; title: HelpCategory; description: string }[] = [
  {
    icon: Rocket,
    title: 'Getting Started',
    description: 'Set up your account, create your first project, and invite your team.',
  },
  {
    icon: FolderKanban,
    title: 'Project Management',
    description: 'Manage tasks, build timelines, and track progress across active projects.',
  },
  {
    icon: FileText,
    title: 'Document Management',
    description: 'Upload files, control versions, and organize drawings and contracts.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Invite teammates, assign roles, and coordinate office and field work.',
  },
  {
    icon: Settings,
    title: 'Account & Settings',
    description: 'Update your profile, permissions, and notification preferences.',
  },
  {
    icon: CreditCard,
    title: 'Billing & Subscription',
    description: 'Manage plans, payments, invoices, and upgrades for your workspace.',
  },
];

const faqs = [
  {
    q: 'How do I create my first project?',
    a: 'From your dashboard, click "New Project" in the top right. Give it a name, set a start and target end date, and invite your team. You can add tasks, upload documents, and set milestones right after — it takes under five minutes to get a workspace up and running.',
  },
  {
    q: 'Can I invite external subcontractors?',
    a: 'Yes. You can invite unlimited collaborators with scoped access — they see only the projects and files you share with them. External users do not count toward your paid seat limit on most plans.',
  },
  {
    q: 'How does document version control work?',
    a: 'Every time a file is re-uploaded with the same name, ZENTIVORA creates a new version and keeps the full history. You can preview older versions, compare side-by-side, and roll back with one click if needed.',
  },
  {
    q: 'Is my data secure?',
    a: 'All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We run daily backups, support SSO and two-factor authentication, and our infrastructure is aligned with SOC 2 practices.',
  },
  {
    q: 'Can I use ZENTIVORA on mobile?',
    a: 'Yes. The web app is fully responsive, and our iOS and Android apps let field teams capture progress, upload photos, and update tasks directly from the job site — online or offline.',
  },
  {
    q: 'Do you offer onboarding support?',
    a: 'Every new workspace gets free onboarding resources and guided tours. Customers on the Business and Enterprise plans get a dedicated onboarding specialist to migrate data and train the team.',
  },
];

export default function HelpCenter() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<HelpCategory | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredArticles = useMemo(() => {
    let list = helpArticles;
    if (activeCategory) list = list.filter((a) => a.category === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q),
      );
    }
    return list;
  }, [query, activeCategory]);

  const filteredFaqs = useMemo(() => {
    if (!query.trim()) return faqs;
    const q = query.toLowerCase();
    return faqs.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
  }, [query]);

  const filteredCategories = useMemo(() => {
    if (!query.trim()) return categories;
    const q = query.toLowerCase();
    return categories.filter(
      (c) => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q),
    );
  }, [query]);

  const countByCategory = (cat: HelpCategory) =>
    helpArticles.filter((a) => a.category === cat).length;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pb-20 pt-24">
        <section className="relative overflow-hidden bg-gradient-to-br from-[#1F2937] via-[#1F2937] to-[#111827] px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center text-white">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
              <LifeBuoy className="h-7 w-7" />
            </div>
            <h1 className="mb-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              How Can We Help You?
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-200 sm:text-xl">
              Find answers, guides, and support to get the most out of ZENTIVORA.
            </p>

            <label htmlFor="help-search" className="sr-only">
              Search help articles
            </label>
            <div className="relative mx-auto max-w-2xl">
              <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="help-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for help..."
                className="w-full rounded-full border border-white/20 bg-white py-4 pl-14 pr-5 text-base text-[#1F2937] placeholder:text-gray-400 shadow-lg focus:border-white focus:outline-none focus:ring-2 focus:ring-white/40 sm:text-lg"
              />
            </div>

            <div className="mt-4 text-sm text-gray-300">
              Popular searches: <span className="text-white">create project</span>,{' '}
              <span className="text-white">invite team</span>,{' '}
              <span className="text-white">upload documents</span>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section className="mt-16">
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-3xl font-bold text-[#1F2937] sm:text-4xl">
                Browse by Category
              </h2>
              <p className="mx-auto max-w-2xl text-base text-[#6B7280] sm:text-lg">
                Pick a topic and we'll take you straight to the guides that matter most.
              </p>
            </div>

            {filteredCategories.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center text-[#6B7280]">
                No categories match your search.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCategories.map(({ icon: Icon, title, description }) => {
                  const isActive = activeCategory === title;
                  const count = countByCategory(title);
                  return (
                    <button
                      key={title}
                      type="button"
                      onClick={() => {
                        setActiveCategory(isActive ? null : title);
                        document
                          .getElementById('articles-section')
                          ?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`group flex flex-col items-start rounded-2xl border p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-7 ${
                        isActive
                          ? 'border-[#1F2937] bg-[#F9FAFB]'
                          : 'border-gray-200 bg-white hover:border-[#1F2937]'
                      }`}
                    >
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1F2937] text-white transition group-hover:scale-105">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-[#1F2937]">{title}</h3>
                      <p className="mb-4 text-sm leading-relaxed text-[#6B7280]">{description}</p>
                      <div className="mt-auto flex w-full items-center justify-between">
                        <span className="text-xs font-medium text-[#6B7280]">
                          {count} {count === 1 ? 'article' : 'articles'}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1F2937] transition group-hover:gap-2.5">
                          {isActive ? 'Viewing' : 'Browse articles'}
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          <section id="articles-section" className="mt-20 scroll-mt-24">
            <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="mb-3 text-3xl font-bold text-[#1F2937] sm:text-4xl">
                  {activeCategory ? `${activeCategory} Articles` : 'Popular Help Articles'}
                </h2>
                <p className="text-base text-[#6B7280] sm:text-lg">
                  {activeCategory
                    ? `Guides specific to ${activeCategory.toLowerCase()}.`
                    : 'The guides our customers open most often.'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {activeCategory && (
                  <button
                    type="button"
                    onClick={() => setActiveCategory(null)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-[#4B5563] transition hover:border-[#1F2937] hover:text-[#1F2937]"
                  >
                    <X className="h-3.5 w-3.5" />
                    Clear filter
                  </button>
                )}
                <span className="text-sm text-[#6B7280]">
                  {filteredArticles.length} articles
                </span>
              </div>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center text-[#6B7280]">
                No articles match your search. Try a different keyword.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredArticles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/help/article/${article.slug}`}
                    aria-label={`Read article: ${article.title}`}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#1F2937] hover:shadow-md"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="mb-1.5 text-base font-semibold text-[#1F2937]">
                        {article.title}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 font-medium">
                          {article.category}
                        </span>
                        <span>{article.readTime} read</span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 flex-shrink-0 text-[#6B7280] transition group-hover:translate-x-1 group-hover:text-[#1F2937]" />
                  </Link>
                ))}
              </div>
            )}
          </section>

          <section className="mt-20">
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-3xl font-bold text-[#1F2937] sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mx-auto max-w-2xl text-base text-[#6B7280] sm:text-lg">
                Quick answers to the questions we hear most often.
              </p>
            </div>

            {filteredFaqs.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center text-[#6B7280]">
                No FAQs match your search.
              </div>
            ) : (
              <div className="mx-auto max-w-3xl space-y-3">
                {filteredFaqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={faq.q}
                      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                      >
                        <span className="text-base font-semibold text-[#1F2937] sm:text-lg">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 flex-shrink-0 text-[#6B7280] transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="border-t border-gray-100 bg-[#F9FAFB] px-5 py-4 sm:px-6 sm:py-5">
                          <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
                            {faq.a}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <section className="mt-20 overflow-hidden rounded-2xl bg-[#1F2937] p-10 text-white sm:p-14">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Still Need Help?</h2>
              <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-gray-300 sm:text-lg">
                Our support team is ready to help. Most questions get a response within a few
                hours during business days.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-[#1F2937] transition hover:bg-gray-100"
                >
                  <MessageSquare className="h-4 w-4" />
                  Contact Support
                </Link>
                <a
                  href="mailto:support@zentivora.com"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  <Mail className="h-4 w-4" />
                  Email Us
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
