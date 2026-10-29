import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getArticleBySlug,
  getAdjacentArticles
} from "../data/articles";
import { updateSEO } from "../lib/seo";
import { trackArticleView } from "../lib/analytics";
import { CategoryBadge, TagBadge } from "../components/ui/Badge";
import { BookmarkButton } from "../components/articles/BookmarkButton";
import { ShareButtons } from "../components/articles/ShareButtons";
import { ShareModal } from "../components/articles/ShareModal";
import { TableOfContents } from "../components/articles/TableOfContents";
import { ReadingProgress } from "../components/articles/ReadingProgress";
import { RelatedArticles } from "../components/articles/RelatedArticles";
import {
  TopArticleAd,
  InArticleAd,
  PostArticleAd,
  StickySidebarAd
} from "../components/ads/InArticleAd";
import { NewsletterForm } from "../components/forms/NewsletterForm";
import { OptimizedImage } from "../components/ui/OptimizedImage";
import { useReaderPreferences } from "../context/ReaderPreferencesContext";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  HelpCircle,
  AlertCircle,
  Info,
  Sliders,
  Eye,
  EyeOff
} from "lucide-react";

export function ArticleDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = getArticleBySlug(slug);
  const adjacent = getAdjacentArticles(slug);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const {
    getProseClasses,
    getContentWidthClass,
    focusMode,
    toggleFocusMode,
    setIsReaderModalOpen
  } = useReaderPreferences();

  useEffect(() => {
    if (!article) {
      navigate("/404", { replace: true });
      return;
    }

    // Scroll to top
    window.scrollTo(0, 0);

    // Track analytics
    trackArticleView(article);

    // Dynamic Comprehensive SEO Schema (NewsArticle + BreadcrumbList)
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "NewsArticle",
          headline: article.title,
          description: article.excerpt,
          image: [article.heroImage],
          datePublished: `${article.publishedAt}T08:00:00+00:00`,
          dateModified: `${article.updatedAt}T10:00:00+00:00`,
          author: [
            {
              "@type": "Person",
              name: article.author?.name || "DailySignal Editorial",
              jobTitle: article.author?.role || "Staff Journalist"
            }
          ],
          publisher: {
            "@type": "Organization",
            name: "DailySignal",
            logo: {
              "@type": "ImageObject",
              url: "https://dailysignal.dev/favicon.svg"
            }
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": window.location.href
          }
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://dailysignal.dev"
            },
            {
              "@type": "ListItem",
              position: 2,
              name: article.category.replace("-", " "),
              item: `https://dailysignal.dev/category/${article.category}`
            },
            {
              "@type": "ListItem",
              position: 3,
              name: article.title,
              item: window.location.href
            }
          ]
        }
      ]
    };

    updateSEO({
      title: article.title,
      description: article.excerpt,
      keywords: article.tags,
      ogType: "article",
      image: article.heroImage,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
      authorName: article.author?.name,
      schema
    });
  }, [slug, article, navigate]);

  if (!article) return null;

  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  const formattedUpdateDate = new Date(article.updatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  const sections = article.content?.sections || [];

  return (
    <>
      <ReadingProgress />

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumbs" className="mb-5">
          <ol className="flex items-center space-x-2 text-xs text-stone-500">
            <li>
              <Link to="/" className="hover:text-stone-900 transition">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-stone-400" />
            </li>
            <li>
              <Link
                to={`/category/${article.category}`}
                className="hover:text-stone-900 transition uppercase font-medium"
              >
                {article.category.replace("-", " ")}
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-stone-400" />
            </li>
            <li className="truncate max-w-[200px] sm:max-w-sm text-stone-900 font-semibold">
              {article.title}
            </li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto mb-8 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-3.5">
            <CategoryBadge categorySlug={article.category} size="md" />
            <span className="text-xs text-stone-500 flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              Published: {formattedDate}
            </span>
            <span className="text-xs text-stone-400">•</span>
            <span className="text-xs text-stone-500 flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime} ({article.wordCount} words)
            </span>
            {article.updatedAt && (
              <>
                <span className="text-xs text-stone-400">•</span>
                <span className="text-xs text-stone-500 font-medium">
                  Updated: {formattedUpdateDate}
                </span>
              </>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-950 leading-[1.18] mb-5">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-stone-700 font-reading leading-relaxed mb-6 font-normal">
            {article.excerpt}
          </p>

          {/* Author & Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3.5 border-y border-stone-200">
            {article.author && (
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-stone-300 shadow-xs"
                />
                <div className="text-left">
                  <div className="font-semibold text-sm text-stone-900">
                    {article.author.name}
                  </div>
                  <div className="text-xs text-stone-500 font-medium">
                    {article.author.role}
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2">
              {/* Reader Customization / Appearance Controls */}
              <button
                onClick={() => setIsReaderModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium transition shadow-xs cursor-pointer"
                title="Customize typography, font, and spacing"
              >
                <Sliders className="w-3.5 h-3.5 text-amber-700" />
                <span className="hidden sm:inline">Appearance</span>
              </button>

              {/* Distraction-Free Focus Mode Toggle */}
              <button
                onClick={toggleFocusMode}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition shadow-xs cursor-pointer ${
                  focusMode
                    ? "bg-amber-600 text-white border-amber-600"
                    : "bg-white hover:bg-stone-50 text-stone-700 border-stone-200"
                }`}
                title={focusMode ? "Exit Focus Mode" : "Distraction-Free Focus Mode"}
              >
                {focusMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-stone-600" />}
                <span className="hidden sm:inline">{focusMode ? "Focus On" : "Focus"}</span>
              </button>

              <BookmarkButton slug={article.slug} title={article.title} size="md" showLabel />
              <ShareButtons
                title={article.title}
                text={article.excerpt}
                article={article}
                onOpenModal={() => setIsShareModalOpen(true)}
              />
            </div>
          </div>
        </header>

        {/* Floating Focus Mode Banner when active */}
        {focusMode && (
          <div className="max-w-4xl mx-auto mb-6 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs text-amber-900 shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-700" />
              <span className="font-semibold">Distraction-Free Focus Mode Active</span>
              <span className="hidden sm:inline text-amber-800/80">• Ads & sidebars suppressed</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsReaderModalOpen(true)}
                className="px-2.5 py-1 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-900 font-medium transition cursor-pointer"
              >
                Typography
              </button>
              <button
                onClick={toggleFocusMode}
                className="px-2.5 py-1 rounded-md bg-white border border-amber-300 hover:bg-amber-50 text-stone-800 font-medium transition cursor-pointer"
              >
                Exit Focus
              </button>
            </div>
          </div>
        )}

        {/* Ad Slot: Top Article Leaderboard (hidden in focus mode) */}
        {!focusMode && <TopArticleAd />}

        {/* Hero Image */}
        <figure className="max-w-5xl mx-auto mb-10">
          <div className="relative rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-xs">
            <OptimizedImage
              src={article.heroImage}
              alt={article.heroImageAlt || article.title}
              priority={true}
              aspectRatio="aspect-[16/9]"
              className="w-full h-full"
            />
          </div>
          {article.heroImageCaption && (
            <figcaption className="text-xs text-center text-stone-500 mt-2.5 italic">
              {article.heroImageCaption}
            </figcaption>
          )}
        </figure>

        {/* Main Content & Desktop Sidebar Layout */}
        <div
          className={`mx-auto ${
            focusMode
              ? `${getContentWidthClass()}`
              : "max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
          }`}
        >
          {/* Main Article Body */}
          <div
            className={`${
              focusMode ? "w-full" : "lg:col-span-8"
            } bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-10 shadow-xs`}
          >
            {/* Mobile Table of Contents */}
            <div className="lg:hidden mb-8">
              <TableOfContents sections={sections} />
            </div>

            {/* Lead paragraph */}
            {article.content?.lead && (
              <p
                className={`text-xl sm:text-2xl text-stone-900 leading-relaxed font-normal mb-8 pb-6 border-b border-stone-200/70 first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-3.5 first-letter:leading-none first-letter:text-amber-700 ${getProseClasses()}`}
              >
                {article.content.lead}
              </p>
            )}

            {/* Render Article Sections */}
            <div className={`space-y-8 text-[#1f2937] ${getProseClasses()}`}>
              {sections.map((sec, index) => (
                <section key={sec.id} id={sec.id} className="scroll-mt-20 space-y-4">
                  {sec.level === 2 ? (
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950 pt-5 border-t border-stone-100">
                      {sec.title}
                    </h2>
                  ) : (
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 pt-3">
                      {sec.title}
                    </h3>
                  )}

                  {sec.content && (
                    <p className="leading-relaxed whitespace-pre-line text-stone-800">
                      {sec.content}
                    </p>
                  )}

                  {/* Callout box with high clarity and contrast */}
                  {sec.callout && (
                    <div
                      className={`p-5 rounded-xl border text-sm font-sans leading-relaxed my-5 shadow-xs ${
                        sec.callout.type === "danger"
                          ? "bg-red-50/90 border-red-300 text-red-950"
                          : sec.callout.type === "warning"
                          ? "bg-amber-50/90 border-amber-300 text-amber-950"
                          : "bg-blue-50/90 border-blue-300 text-blue-950"
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold mb-1.5">
                        {sec.callout.type === "danger" && <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />}
                        {sec.callout.type === "warning" && <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />}
                        {sec.callout.type === "info" && <Info className="w-4 h-4 text-blue-600 shrink-0" />}
                        <span>{sec.callout.title}</span>
                      </div>
                      <p className="text-stone-800">{sec.callout.body}</p>
                    </div>
                  )}

                  {/* Bullet list with sharp bullets and high legibility */}
                  {sec.list && sec.list.length > 0 && (
                    <ul className="space-y-3 my-5 pl-5 border-l-2 border-amber-600/40 text-stone-800 text-[17px] leading-relaxed">
                      {sec.list.map((item, idx) => (
                        <li key={idx}>
                          <strong className="font-bold text-stone-950">
                            {item.split(":")[0]}:
                          </strong>
                          {item.includes(":") ? item.substring(item.indexOf(":") + 1) : item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Code snippet with clear dark terminal background for readability */}
                  {sec.code && (
                    <div className="my-6 rounded-xl overflow-hidden border border-stone-800 bg-[#0f1117] text-stone-200 font-mono text-xs shadow-md">
                      <div className="px-4 py-2 bg-stone-900 border-b border-stone-800 flex items-center justify-between text-[11px] text-stone-400 font-sans">
                        <span>{sec.code.language}</span>
                        <span>Terminal Snippet</span>
                      </div>
                      <pre className="p-4 overflow-x-auto leading-relaxed">
                        <code>{sec.code.snippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* FAQ Accordion block */}
                  {sec.faq && (
                    <div className="space-y-3 my-6 font-sans">
                      {sec.faq.map((item, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-stone-200 p-4 bg-stone-50/80 shadow-xs"
                        >
                          <h4 className="font-serif text-base font-bold text-stone-900 mb-1.5 flex items-start gap-2">
                            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <span>{item.q}</span>
                          </h4>
                          <p className="text-sm text-stone-700 pl-6 leading-relaxed font-sans">
                            {item.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Ad Slot 1: Mid-Article Ad midway through article (hidden in focus mode) */}
                  {!focusMode && index === 1 && <InArticleAd label="Mid-Article Sponsor Bulletin" />}

                  {/* Ad Slot 2: Second in-article ad slot deeper in content (hidden in focus mode) */}
                  {!focusMode && index === 3 && <InArticleAd label="Further Insights • Sponsored" />}
                </section>
              ))}
            </div>

            {/* Ad Slot 3: Post-Article Ad Banner right before conclusion (hidden in focus mode) */}
            {!focusMode && <PostArticleAd />}

            {/* Tags & Action Footer */}
            <div className="mt-10 pt-6 border-t border-stone-200 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider font-sans">
                  Filed Under:
                </span>
                {article.tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>

              <div className="flex items-center justify-between pt-4">
                <ShareButtons
                  title={article.title}
                  text={article.excerpt}
                  article={article}
                  onOpenModal={() => setIsShareModalOpen(true)}
                />
                <BookmarkButton slug={article.slug} title={article.title} size="md" showLabel />
              </div>
            </div>

            {/* Author Bio Box */}
            {article.author && (
              <div className="my-10 p-6 rounded-2xl border border-stone-200 bg-stone-50/80 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-16 h-16 rounded-full object-cover shrink-0 border border-stone-300 shadow-xs"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 font-sans">
                    Written by
                  </span>
                  <h4 className="font-serif text-lg font-bold text-stone-900">
                    {article.author.name}
                  </h4>
                  <p className="text-xs text-stone-500 mb-2 font-medium font-sans">
                    {article.author.role}
                  </p>
                  <p className="text-xs text-stone-700 leading-relaxed font-sans">
                    {article.author.bio}
                  </p>
                </div>
              </div>
            )}

            {/* Prev / Next Article Navigation Cards */}
            <div className="my-10 grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
              {adjacent.prev ? (
                <Link
                  to={`/article/${adjacent.prev.slug}`}
                  className="group p-4 rounded-xl border border-stone-200 hover:border-stone-300 bg-stone-50/60 hover:bg-stone-50 transition text-left shadow-xs"
                >
                  <span className="text-[11px] text-stone-500 flex items-center gap-1 mb-1 font-medium">
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    Previous Dispatch
                  </span>
                  <h5 className="font-serif text-sm font-bold text-stone-900 line-clamp-2 group-hover:text-amber-700 transition-colors">
                    {adjacent.prev.title}
                  </h5>
                </Link>
              ) : (
                <div />
              )}

              {adjacent.next ? (
                <Link
                  to={`/article/${adjacent.next.slug}`}
                  className="group p-4 rounded-xl border border-stone-200 hover:border-stone-300 bg-stone-50/60 hover:bg-stone-50 transition text-right sm:text-right shadow-xs"
                >
                  <span className="text-[11px] text-stone-500 flex items-center justify-end gap-1 mb-1 font-medium">
                    <span>Next Dispatch</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <h5 className="font-serif text-sm font-bold text-stone-900 line-clamp-2 group-hover:text-amber-700 transition-colors">
                    {adjacent.next.title}
                  </h5>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>

          {/* Desktop Sticky Sidebar (4 cols) with Table of Contents & Ads (hidden in focus mode) */}
          {!focusMode && (
            <aside className="hidden lg:block lg:col-span-4 sticky top-20 space-y-6">
              {/* Table of Contents */}
              <TableOfContents sections={sections} />

              {/* Ad Slot 4: Sticky Sidebar Sponsor Unit */}
              <StickySidebarAd />

              {/* Newsletter invite */}
              <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 font-sans">
                  Newsroom Dispatch
                </span>
                <h4 className="font-serif text-base font-bold text-stone-900 mt-1 mb-2">
                  Enjoyed this deep dive?
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed mb-4 font-sans">
                  Receive our weekly long-form research into software systems and engineering integrity.
                </p>
                <NewsletterForm variant="compact" />
              </div>
            </aside>
          )}
        </div>

        {/* Related Articles Section (hidden in focus mode) */}
        {!focusMode && <RelatedArticles currentSlug={article.slug} />}

        {/* Share Modal with Rich Thumbnail & Preview */}
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          article={article}
        />
      </article>
    </>
  );
}
