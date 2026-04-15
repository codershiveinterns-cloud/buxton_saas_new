import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Lightbulb, Mail, MessageSquare } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  getArticleBySlug,
  helpArticles,
  type HelpContentBlock,
} from '../data/helpArticles';

function renderBlock(block: HelpContentBlock, index: number) {
  switch (block.type) {
    case 'heading':
      return (
        <h2 key={index} className="mt-10 text-2xl font-bold text-[#1F2937] sm:text-3xl">
          {block.text}
        </h2>
      );
    case 'paragraph':
      return (
        <p key={index} className="text-base leading-relaxed text-[#4B5563] sm:text-lg">
          {block.text}
        </p>
      );
    case 'steps':
      return (
        <ol key={index} className="space-y-3">
          {block.items.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1F2937] text-sm font-bold text-white">
                {idx + 1}
              </span>
              <span className="text-base text-[#4B5563] sm:text-lg">{item}</span>
            </li>
          ))}
        </ol>
      );
    case 'list':
      return (
        <ul key={index} className="space-y-2.5 rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
          {block.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-base text-[#4B5563] sm:text-lg">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#1F2937]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'tip':
      return (
        <div
          key={index}
          className="flex items-start gap-4 rounded-xl border border-amber-200 bg-amber-50 p-5 sm:p-6"
        >
          <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
          <div>
            <p className="mb-1 text-sm font-bold uppercase tracking-wider text-amber-700">Pro tip</p>
            <p className="text-base leading-relaxed text-[#4B5563]">{block.text}</p>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default function HelpArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <h1 className="mb-4 text-3xl font-bold text-[#1F2937]">Article Not Found</h1>
            <p className="mb-8 text-[#6B7280]">
              The help article you are looking for does not exist or may have been moved.
            </p>
            <Link
              to="/help"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1F2937] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#111827]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Help Center
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const related = helpArticles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pb-20 pt-24">
        <section className="bg-gradient-to-br from-[#1F2937] via-[#1F2937] to-[#111827] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-4xl text-white">
            <Link
              to="/help"
              className="mb-8 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-gray-300 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Help Center
            </Link>
            <div className="mb-5">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
              {article.category}
              </span>
            </div>
            <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {article.readTime} read
              </span>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <article className="mt-12">
            <p className="mb-10 border-l-4 border-[#1F2937] pl-5 text-lg font-medium leading-relaxed text-[#1F2937] sm:text-xl">
              {article.summary}
            </p>
            <div className="space-y-6">
              {article.content.map((block, idx) => renderBlock(block, idx))}
            </div>

            <div className="mt-12 rounded-2xl border border-gray-200 bg-[#F9FAFB] p-6 text-center sm:p-8">
              <p className="mb-4 text-base font-semibold text-[#1F2937]">Was this article helpful?</p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  className="rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-[#4B5563] transition hover:border-[#1F2937] hover:text-[#1F2937]"
                >
                  👍 Yes
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-[#4B5563] transition hover:border-[#1F2937] hover:text-[#1F2937]"
                >
                  👎 No
                </button>
              </div>
            </div>
          </article>

          {related.length > 0 && (
            <section className="mt-20 border-t border-gray-200 pt-12">
              <h2 className="mb-8 text-2xl font-bold text-[#1F2937] sm:text-3xl">
                Related Articles
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/help/article/${r.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1F2937] hover:shadow-md"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="mb-1.5 text-base font-semibold text-[#1F2937]">{r.title}</p>
                      <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 font-medium">
                          {r.category}
                        </span>
                        <span>{r.readTime} read</span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 flex-shrink-0 text-[#6B7280] transition group-hover:translate-x-1 group-hover:text-[#1F2937]" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mt-20 rounded-2xl bg-[#1F2937] p-10 text-center text-white sm:p-14">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Still Need Help?</h2>
            <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-gray-300">
              Can't find what you need? Our support team is ready to help.
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
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
