import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogPosts } from '../data/blogPosts';

const categories = [
  'All',
  'Project Management',
  'Team Collaboration',
  'Workflow Automation',
  'Productivity Tips',
] as const;

type Category = (typeof categories)[number];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const listPosts = blogPosts.filter((post) => !post.featured);

  const filteredPosts =
    activeCategory === 'All'
      ? listPosts
      : listPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pb-20 pt-24">
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1F2937]/95 via-[#1F2937]/90 to-[#111827]/95" />
          <div className="relative px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-4xl text-center text-white">
              <span className="mb-5 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
                ZENTIVORA Blog
              </span>
              <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Insights & Resources for Smarter Project Management
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-200 sm:text-xl">
                Practical guides, tips, and strategies to improve construction workflows, team
                coordination, and project delivery.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {featuredPosts.length > 0 && (
            <section className="mt-16">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1F2937] sm:text-3xl">Featured Articles</h2>
                <p className="mt-2 text-sm text-[#6B7280] sm:text-base">
                  Hand-picked reads for construction leaders this month.
                </p>
              </div>
              <div className="grid gap-8 lg:grid-cols-2">
                {featuredPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      aria-label={`Read the article: ${post.title}`}
                      className="block"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#1F2937] backdrop-blur">
                          {post.category}
                        </span>
                      </div>
                    </Link>
                    <div className="p-6 sm:p-8">
                      <div className="mb-3 flex items-center gap-4 text-xs text-[#6B7280]">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="mb-3 text-xl font-bold leading-snug text-[#1F2937] sm:text-2xl">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="transition hover:text-[#4B5563]"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mb-5 text-sm leading-relaxed text-[#6B7280] sm:text-base">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#4B5563]">By {post.author}</span>
                        <Link
                          to={`/blog/${post.slug}`}
                          aria-label={`Read more: ${post.title}`}
                          className="group/btn inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-[#1F2937] underline-offset-4 transition hover:text-[#4B5563] hover:underline"
                        >
                          Read More
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="mt-20">
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-2xl font-bold text-[#1F2937] sm:text-3xl">Latest Articles</h2>
                <p className="mt-2 text-sm text-[#6B7280] sm:text-base">
                  Fresh ideas on project delivery, collaboration, and productivity.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                <Tag className="h-4 w-4" />
                <span>{filteredPosts.length} articles</span>
              </div>
            </div>

            <div className="mb-10 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    activeCategory === category
                      ? 'border-[#1F2937] bg-[#1F2937] text-white'
                      : 'border-gray-200 bg-white text-[#4B5563] hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {filteredPosts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
                <p className="text-[#6B7280]">No articles in this category yet. Check back soon.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      aria-label={`Read the article: ${post.title}`}
                      className="block"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-[#1F2937] backdrop-blur">
                          {post.category}
                        </span>
                      </div>
                    </Link>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="mb-3 flex items-center gap-3 text-xs text-[#6B7280]">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="mb-2 text-lg font-semibold leading-snug text-[#1F2937]">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="transition hover:text-[#4B5563]"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-[#6B7280]">
                        {post.description}
                      </p>
                      <Link
                        to={`/blog/${post.slug}`}
                        aria-label={`Read more: ${post.title}`}
                        className="group/btn mt-auto inline-flex cursor-pointer items-center gap-1.5 self-start text-sm font-semibold text-[#1F2937] underline-offset-4 transition hover:text-[#4B5563] hover:underline"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="mt-24 rounded-2xl bg-[#1F2937] p-10 text-center text-white sm:p-16">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Want to Improve Your Project Workflow?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
              Discover how ZENTIVORA helps teams stay organized, aligned, and efficient — from
              blueprint to handover.
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
                to="/features"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Explore Features
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
