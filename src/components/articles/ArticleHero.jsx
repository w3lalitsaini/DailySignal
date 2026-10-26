import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import { CategoryBadge } from "../ui/Badge";
import { BookmarkButton } from "./BookmarkButton";
import { OptimizedImage } from "../ui/OptimizedImage";

export function ArticleHero({ article }) {
  if (!article) return null;

  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <section aria-label="Featured Story" className="mb-14">
      <div className="relative rounded-2xl border border-stone-200/90 bg-white overflow-hidden shadow-xs hover:shadow-md transition duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  Lead Investigation
                </span>
                <CategoryBadge categorySlug={article.category} size="sm" />
                <div className="text-xs text-stone-400 flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formattedDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readingTime}
                  </span>
                </div>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-stone-900 leading-tight mb-4 hover:text-amber-700 transition-colors">
                <Link to={`/article/${article.slug}`}>
                  {article.title}
                </Link>
              </h2>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed line-clamp-3 mb-6">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
              {article.author && (
                <div className="flex items-center gap-3">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    loading="eager"
                    className="w-10 h-10 rounded-full object-cover border border-stone-200"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900">
                      {article.author.name}
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      {article.author.role}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2.5">
                <BookmarkButton slug={article.slug} title={article.title} size="md" showLabel />
                <Link
                  to={`/article/${article.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Hero Right Image - Optimized with high fetch priority */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden bg-stone-100">
            <Link to={`/article/${article.slug}`} className="block h-full w-full">
              <OptimizedImage
                src={article.heroImage}
                alt={article.heroImageAlt || article.title}
                priority={true}
                aspectRatio="aspect-auto h-full min-h-[300px]"
                className="w-full h-full hover:scale-105 transition-transform duration-500"
              />
            </Link>
            {article.heroImageCaption && (
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-stone-900/80 via-stone-900/40 to-transparent text-[11px] text-stone-200 line-clamp-1">
                {article.heroImageCaption}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
