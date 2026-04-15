import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, Quote, Tag, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogPosts, getPostBySlug, type ContentBlock } from '../data/blogPosts';

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case 'heading':
      return (
        <h2
          key={index}
          className="mt-10 text-2xl font-bold text-[#1F2937] sm:text-3xl"
        >
          {block.text}
        </h2>
      );
    case 'paragraph':
      return (
        <p key={index} className="text-base leading-relaxed text-[#4B5563] sm:text-lg">
          {block.text}
        </p>
      );
    case 'list':
      return (
        <ul key={index} className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
          {block.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-base text-[#4B5563] sm:text-lg">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#1F2937]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'quote':
      return (
        <blockquote
          key={index}
          className="relative rounded-2xl border-l-4 border-[#1F2937] bg-[#F9FAFB] p-6 sm:p-8"
        >
          <Quote className="absolute right-6 top-6 h-8 w-8 text-gray-200" />
          <p className="text-lg font-medium italic leading-relaxed text-[#1F2937] sm:text-xl">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <footer className="mt-4 text-sm font-semibold not-italic text-[#6B7280]">
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      );
    default:
      return null;
  }
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <h1 className="mb-4 text-3xl font-bold text-[#1F2937]">Article Not Found</h1>
            <p className="mb-8 text-[#6B7280]">
              The article you are looking for does not exist or may have been moved.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1F2937] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#111827]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pb-20 pt-24">
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${post.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1F2937]/95 via-[#1F2937]/85 to-[#111827]/95" />
          <div className="relative px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <div className="mx-auto max-w-4xl text-white">
              <Link
                to="/blog"
                className="mb-8 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-gray-300 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
              <div className="mb-5">
                <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
                  {post.category}
                </span>
              </div>
              <h1 className="mb-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-5 text-sm text-gray-300">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <article className="mt-12">
            <p className="mb-10 border-l-4 border-[#1F2937] pl-5 text-lg font-medium leading-relaxed text-[#1F2937] sm:text-xl">
              {post.description}
            </p>

            <div className="space-y-6">
              {post.content.map((block, idx) => renderBlock(block, idx))}
            </div>

            {post.tags.length > 0 && (
              <div className="mt-12 border-t border-gray-200 pt-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="h-4 w-4 text-[#6B7280]" />
                  <span className="mr-2 text-sm font-semibold text-[#4B5563]">Tags:</span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-[#4B5563]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 flex items-start gap-4 rounded-2xl border border-gray-200 bg-[#F9FAFB] p-6 sm:p-8">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#1F2937] text-lg font-bold text-white">
                {post.author
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                  Written by
                </p>
                <p className="text-lg font-bold text-[#1F2937]">{post.author}</p>
                <p className="text-sm text-[#6B7280]">{post.authorRole}</p>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-8">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F2937] underline-offset-4 transition hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                All Articles
              </Link>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-sm font-semibold text-[#1F2937] underline-offset-4 transition hover:underline"
              >
                Back to Top ↑
              </button>
            </div>
          </article>

          {relatedPosts.length > 0 && (
            <section className="mt-20 border-t border-gray-200 pt-12">
              <h2 className="mb-8 text-2xl font-bold text-[#1F2937] sm:text-3xl">
                Related Articles
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((related) => (
                  <article
                    key={related.slug}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Link to={`/blog/${related.slug}`} aria-label={related.title}>
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={related.image}
                          alt={related.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="mb-2 text-base font-semibold leading-snug text-[#1F2937]">
                        <Link
                          to={`/blog/${related.slug}`}
                          className="transition hover:text-[#4B5563]"
                        >
                          {related.title}
                        </Link>
                      </h3>
                      <Link
                        to={`/blog/${related.slug}`}
                        aria-label={`Read more: ${related.title}`}
                        className="group/btn mt-auto inline-flex cursor-pointer items-center gap-1.5 self-start text-sm font-semibold text-[#1F2937] underline-offset-4 transition hover:text-[#4B5563] hover:underline"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="mt-20 rounded-2xl bg-[#1F2937] p-10 text-center text-white sm:p-14">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
              Want to Improve Your Project Workflow?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-gray-300">
              Discover how ZENTIVORA helps teams stay organized, aligned, and efficient.
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
