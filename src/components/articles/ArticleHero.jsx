import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Play,
  ShieldCheck,
  Flame,
  CheckCircle2,
  TrendingUp
} from "lucide-react";
import { CategoryBadge } from "../ui/Badge";
import { BookmarkButton } from "./BookmarkButton";
import { OptimizedImage } from "../ui/OptimizedImage";

export function ArticleHero({ article, secondaryArticles = [] }) {
  if (!article) return null;

  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  const isVlog = article.mediaType === "vlog" || article.hasVideo;
  const topTags = article.tags?.slice(0, 3) || [];

  return (
    <section aria-label="Editorial Featured Lead Story" className="mb-12 sm:mb-16">
      {/* Top Editorial Issue Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-6 border-b border-stone-200 text-xs text-stone-500 font-sans">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-600"></span>
          </span>
          <span className="font-bold uppercase tracking-wider text-stone-900 text-[11px]">
            Frontpage Lead Dispatch
          </span>
          <span className="text-stone-300">•</span>
          <span className="text-stone-500 text-[11px] hidden sm:inline font-medium">
            Independent Engineering Analysis & System Architecture
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono text-stone-400">
          <span className="text-stone-700 font-semibold">EDITION 2026.4</span>
          <span>•</span>
          <span>PUBLISHED DAILY</span>
        </div>
      </div>

      {/* Main Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Primary Lead Feature (8 cols) */}
        <article className="lg:col-span-8 flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white overflow-hidden shadow-xs hover:border-stone-300 transition-all duration-300 group">
          {/* Hero Media Container */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-900">
            <Link to={`/article/${article.slug}`} className="block w-full h-full relative" aria-label={`Read ${article.title}`}>
              <OptimizedImage
                src={article.heroImage}
                alt={article.heroImageAlt || article.title}
                priority={true}
                aspectRatio="aspect-[16/9]"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/25 to-transparent" />

              {/* Play Badge Overlay if Vlog */}
              {isVlog && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex flex-col items-center gap-2">
                    <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-600/95 text-white flex items-center justify-center shadow-2xl backdrop-blur-sm group-hover:scale-110 group-hover:bg-amber-500 transition-all">
                      <Play className="w-8 h-8 ml-1 fill-current" />
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-stone-950/80 text-[10px] font-mono text-amber-300 tracking-wider backdrop-blur-md">
                      {article.videoDuration || "FEATURED VLOG"}
                    </span>
                  </div>
                </div>
              )}

              {/* Floating Top Badges */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  Cover Investigation
                </span>
                <CategoryBadge categorySlug={article.category} size="sm" />
              </div>

              {/* Bottom Overlay Info on Image */}
              <div className="absolute bottom-4 inset-x-4 z-10 flex items-end justify-between text-white text-xs">
                <div className="flex items-center gap-3 font-mono text-[11px] text-stone-200 bg-stone-950/60 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {article.readingTime}
                  </span>
                  <span>•</span>
                  <span>{article.wordCount} words</span>
                </div>
                {article.heroImageCaption && (
                  <span className="hidden md:inline-block text-[11px] text-stone-300 italic line-clamp-1 max-w-md bg-stone-950/50 backdrop-blur-xs px-2.5 py-1 rounded">
                    {article.heroImageCaption}
                  </span>
                )}
              </div>
            </Link>
          </div>

          {/* Hero Story Body */}
          <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
            <div>
              {/* Meta Verification Strip */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-stone-500 mb-3 font-mono">
                <span className="flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-sans font-semibold text-[11px] border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Peer Reviewed
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-stone-500">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  {formattedDate}
                </span>
                {topTags.length > 0 && (
                  <>
                    <span className="hidden sm:inline text-stone-300">•</span>
                    <div className="hidden sm:flex items-center gap-1.5">
                      {topTags.map((t) => (
                        <span key={t} className="text-[10px] text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded font-mono">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-950 leading-[1.2] mb-4 group-hover:text-amber-800 transition-colors">
                <Link to={`/article/${article.slug}`}>
                  {article.title}
                </Link>
              </h1>

              {/* Excerpt */}
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-reading line-clamp-3 mb-6">
                {article.excerpt}
              </p>
            </div>

            {/* Author Byline & CTAs */}
            <div className="pt-6 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
              {article.author && (
                <div className="flex items-center gap-3">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    loading="lazy"
                    className="w-11 h-11 rounded-full object-cover border-2 border-stone-200 shadow-xs"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1">
                      {article.author.name}
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                    </h4>
                    <p className="text-[11px] text-stone-500 font-medium">
                      {article.author.role}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2.5">
                <BookmarkButton slug={article.slug} title={article.title} size="md" showLabel />
                <Link
                  to={`/article/${article.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs hover:shadow transition-all"
                >
                  <span>{isVlog ? "Watch & Read" : "Read Investigation"}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Secondary Editorial Column (4 cols) - Curated Dispatch Stream */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div className="p-5 rounded-2xl border border-stone-200/90 bg-white shadow-xs flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-amber-500/10 text-amber-600">
                  <Flame className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-900 font-sans">
                  The Curated Wire
                </span>
              </div>
              <span className="text-[10px] font-mono font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                TOP PICKS
              </span>
            </div>

            <div className="divide-y divide-stone-100 flex-1 flex flex-col justify-around">
              {secondaryArticles.slice(0, 3).map((item, idx) => (
                <article key={item.id} className="py-4 first:pt-0 last:pb-0 group/item">
                  <div className="flex gap-3.5 items-start">
                    {/* Small preview thumbnail with ratio lock */}
                    <Link
                      to={`/article/${item.slug}`}
                      className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden shrink-0 bg-stone-100 relative group-hover/item:opacity-90 transition-opacity"
                    >
                      <OptimizedImage
                        src={item.heroImage}
                        alt={item.heroImageAlt || item.title}
                        aspectRatio="aspect-square h-full w-full"
                        className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                      />
                      {(item.mediaType === "vlog" || item.hasVideo) && (
                        <div className="absolute inset-0 bg-stone-950/40 flex items-center justify-center">
                          <Play className="w-5 h-5 text-white fill-current" />
                        </div>
                      )}
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="font-mono text-[10px] font-bold text-stone-400">
                          0{idx + 1}
                        </span>
                        <CategoryBadge categorySlug={item.category} size="xs" />
                        <span className="text-[10px] text-stone-400 font-mono">
                          {item.readingTime}
                        </span>
                      </div>
                      <h4 className="font-serif text-xs sm:text-sm font-bold text-stone-900 group-hover/item:text-amber-700 transition-colors line-clamp-2 leading-snug">
                        <Link to={`/article/${item.slug}`}>
                          {item.title}
                        </Link>
                      </h4>
                      {item.author && (
                        <p className="text-[11px] text-stone-400 mt-1 line-clamp-1">
                          By {item.author.name}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-4 pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs">
              <Link
                to="/trending"
                className="font-semibold text-amber-700 hover:text-amber-800 transition flex items-center gap-1"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Trending Leaderboard</span>
              </Link>
              <Link
                to="/articles"
                className="text-stone-500 hover:text-stone-800 transition"
              >
                All 25 &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
