import React from "react";
import { Link } from "react-router-dom";
import { Clock, Calendar, Play } from "lucide-react";
import { CategoryBadge } from "../ui/Badge";
import { BookmarkButton } from "./BookmarkButton";
import { OptimizedImage } from "../ui/OptimizedImage";

export function ArticleCard({ article, layout = "vertical", rankNumber = null }) {
  if (!article) return null;

  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  const isVlog = article.mediaType === "vlog" || article.hasVideo;

  // Numbered layout (Popular 01, 02, 03... with optional thumbnail)
  if (layout === "numbered") {
    return (
      <article className="group flex items-start gap-3 sm:gap-4 py-3 sm:py-4 border-b border-stone-200/60 last:border-b-0">
        {rankNumber && (
          <span className="font-serif text-2xl sm:text-3xl font-light text-stone-300 select-none group-hover:text-amber-600 transition-colors w-7 sm:w-8 shrink-0">
            {String(rankNumber).padStart(2, "0")}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <CategoryBadge categorySlug={article.category} size="xs" />
            <span className="text-[10px] sm:text-[11px] text-stone-400 flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3" />
              {article.readingTime}
            </span>
          </div>
          <h4 className="font-serif text-xs sm:text-base font-bold sm:font-medium text-stone-900 leading-snug group-hover:text-amber-700 transition-colors line-clamp-2">
            <Link to={`/article/${article.slug}`} className="hover:underline">
              {article.title}
            </Link>
          </h4>
          <p className="text-[11px] sm:text-xs text-stone-500 mt-1 line-clamp-1 sm:line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </article>
    );
  }

  // Horizontal layout (for list view)
  if (layout === "horizontal") {
    return (
      <article className="group flex flex-col sm:flex-row gap-5 p-4 rounded-xl border border-stone-200/90 bg-white hover:border-stone-300 hover:shadow-xs transition duration-200">
        <Link
          to={`/article/${article.slug}`}
          className="relative w-full sm:w-60 h-48 sm:h-auto rounded-lg overflow-hidden shrink-0 bg-stone-100"
        >
          <OptimizedImage
            src={article.heroImage}
            alt={article.heroImageAlt || article.title}
            aspectRatio="aspect-auto h-full min-h-[160px]"
            className="group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2.5 right-2.5 z-10">
            <BookmarkButton slug={article.slug} title={article.title} size="sm" />
          </div>
        </Link>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <CategoryBadge categorySlug={article.category} size="sm" />
              <span className="text-xs text-stone-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formattedDate}
              </span>
              <span className="text-xs text-stone-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readingTime}
              </span>
            </div>

            <h3 className="font-serif text-xl font-medium text-stone-900 group-hover:text-amber-700 transition-colors leading-snug mb-2">
              <Link to={`/article/${article.slug}`}>
                {article.title}
              </Link>
            </h3>

            <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            {article.author ? (
              <div className="flex items-center gap-2">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  loading="lazy"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="font-medium text-stone-700">
                  {article.author.name}
                </span>
              </div>
            ) : (
              <span>DailySignal Staff</span>
            )}
            <Link
              to={`/article/${article.slug}`}
              className="font-medium text-amber-700 hover:underline"
            >
              Read story &rarr;
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Compact layout (for sidebars & related)
  if (layout === "compact") {
    return (
      <article className="group flex gap-3.5 py-3 border-b border-stone-100 last:border-b-0">
        <Link
          to={`/article/${article.slug}`}
          className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-stone-100"
        >
          <OptimizedImage
            src={article.heroImage}
            alt={article.heroImageAlt || article.title}
            aspectRatio="aspect-square"
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <CategoryBadge categorySlug={article.category} size="sm" />
            <span className="text-[11px] text-stone-400">
              {article.readingTime}
            </span>
          </div>
          <h4 className="font-serif text-sm font-medium text-stone-900 line-clamp-2 group-hover:text-amber-700 transition-colors">
            <Link to={`/article/${article.slug}`}>
              {article.title}
            </Link>
          </h4>
        </div>
      </article>
    );
  }

  // Default Standard Vertical Card (Optimized for 2-column mobile grids & desktop)
  return (
    <article className="group flex flex-col rounded-xl border border-stone-200/90 bg-white hover:border-stone-300 hover:shadow-xs transition-all duration-200 overflow-hidden h-full">
      {/* Image container with OptimizedImage and aspect ratio */}
      <div className="relative overflow-hidden bg-stone-100 aspect-[16/10]">
        <Link to={`/article/${article.slug}`} className="block w-full h-full">
          <OptimizedImage
            src={article.heroImage}
            alt={article.heroImageAlt || article.title}
            aspectRatio="aspect-[16/10]"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Rank Number Badge (for trending grids) */}
        {rankNumber && (
          <div className="absolute bottom-2 left-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-stone-900/90 text-white flex items-center justify-center font-serif text-xs sm:text-sm font-bold shadow-md backdrop-blur-xs">
            {String(rankNumber).padStart(2, "0")}
          </div>
        )}

        {/* Video / Vlog Play Badge */}
        {isVlog && (
          <div className="absolute inset-0 bg-stone-950/20 flex items-center justify-center pointer-events-none group-hover:bg-stone-950/30 transition-colors">
            <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-600/90 text-white flex items-center justify-center shadow-md backdrop-blur-xs group-hover:scale-110 transition-transform">
              <Play className="w-4 h-4 ml-0.5 fill-current" />
            </span>
          </div>
        )}

        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10">
          <CategoryBadge categorySlug={article.category} size="xs" />
        </div>
        <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10">
          <BookmarkButton slug={article.slug} title={article.title} size="sm" />
        </div>
      </div>

      {/* Card Content - Responsive spacing for 2-column mobile layouts */}
      <div className="flex-1 p-3 sm:p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-stone-400 mb-1.5 sm:mb-2 font-mono">
            <span className="truncate">{formattedDate}</span>
            <span>•</span>
            <span className="flex items-center gap-1 shrink-0">
              <Clock className="w-3 h-3" />
              {article.readingTime}
            </span>
          </div>

          <h3 className="font-serif text-xs sm:text-base lg:text-lg font-bold sm:font-medium text-stone-900 group-hover:text-amber-700 transition-colors leading-snug line-clamp-2 mb-1.5 sm:mb-2.5">
            <Link to={`/article/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          <p className="hidden sm:line-clamp-2 text-xs text-stone-600 leading-relaxed mb-3">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-2 sm:pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] sm:text-xs text-stone-500">
          {article.author ? (
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                loading="lazy"
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover shrink-0"
              />
              <span className="truncate text-[10px] sm:text-xs font-medium text-stone-700">
                {article.author.name}
              </span>
            </div>
          ) : (
            <span className="text-[10px] sm:text-xs">DailySignal</span>
          )}
          <Link
            to={`/article/${article.slug}`}
            className="text-amber-700 font-semibold text-[10px] sm:text-xs hover:underline flex items-center gap-0.5 shrink-0"
          >
            <span>Read</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
