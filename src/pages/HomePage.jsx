import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  articles,
  getFeaturedArticle,
  getTrendingArticles
} from "../data/articles";
import { categories } from "../data/categories";
import { ArticleHero } from "../components/articles/ArticleHero";
import { ArticleCard } from "../components/articles/ArticleCard";
import { NewsletterForm } from "../components/forms/NewsletterForm";
import { SidebarAd, FooterAd, FeedAd, TopArticleAd } from "../components/ads/InArticleAd";
import { updateSEO } from "../lib/seo";
import {
  TrendingUp,
  ArrowRight,
  Flame,
  Award,
  BookOpen,
  Layers
} from "lucide-react";

export function HomePage() {
  const featuredArticle = getFeaturedArticle();
  const trendingArticles = getTrendingArticles(4);
  const latestArticles = articles.filter((a) => a.id !== featuredArticle?.id).slice(0, 9);
  const popularArticles = articles.slice(2, 7);

  useEffect(() => {
    updateSEO({
      title: "DailySignal — Tech, Engineering & Digital Culture Vlogs & Dispatches",
      description: "In-depth engineering analysis, investigative reporting, digital security guides, and architectural deep-dives for developers, founders, and curious minds.",
      keywords: [
        "tech vlogs",
        "engineering dispatches",
        "software architecture",
        "ai agents",
        "developer tutorials",
        "frontend performance",
        "cybersecurity investigations",
        "web development",
        "system design"
      ],
      image: featuredArticle?.heroImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80",
      ogType: "website"
    });
  }, [featuredArticle]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      {/* 1. Redesigned Editorial Hero Section */}
      <ArticleHero article={featuredArticle} secondaryArticles={popularArticles} />

      {/* 2. Trending Dispatches & Vlogs Section (2 cards per row on mobile) */}
      <section aria-label="Trending Dispatches & Vlogs" className="mb-14 sm:mb-16">
        <div className="flex items-center justify-between pb-3 mb-5 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-amber-500/10 text-amber-600">
              <Flame className="w-4 h-4" />
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider font-sans text-stone-900">
              Trending Dispatches & Vlogs
            </h3>
          </div>
          <Link
            to="/trending"
            className="text-xs font-semibold text-amber-700 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Responsive Grid: 2 columns on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {trendingArticles.map((art, index) => (
            <ArticleCard
              key={art.id}
              article={art}
              layout="vertical"
              rankNumber={index + 1}
            />
          ))}
        </div>
      </section>

      {/* 3. Curated Fields of Inquiry Showcase with Associated Images */}
      <section aria-label="Explore Categories" className="mb-14 sm:mb-16">
        <div className="flex items-center justify-between pb-3 mb-5 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-blue-500/10 text-blue-600">
              <Layers className="w-4 h-4" />
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider font-sans text-stone-900">
              Curated Fields of Inquiry
            </h3>
          </div>
          <span className="text-[11px] text-stone-400 font-mono hidden sm:inline">
            6 Specialized Verticals
          </span>
        </div>

        {/* Category cards with associated imagery */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group relative rounded-xl border border-stone-200 overflow-hidden bg-stone-900 h-32 sm:h-36 flex flex-col justify-end p-3 hover:shadow-md transition-all"
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:opacity-60 group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
              <div className="relative z-10">
                <span className="text-[9px] uppercase font-mono font-bold text-amber-400 tracking-wider">
                  {cat.articleCount} Dispatches
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-200 transition-colors mt-0.5 leading-snug">
                  {cat.name}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Latest Articles & Vlogs Grid with Sidebar (2 cards per row on mobile) */}
      <section aria-label="Latest Articles & Vlogs" className="mb-14 sm:mb-16">
        <div className="flex items-center justify-between pb-3 mb-5 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-stone-500/10 text-stone-700">
              <BookOpen className="w-4 h-4" />
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider font-sans text-stone-900">
              Latest Investigative Reporting & Vlogs
            </h3>
          </div>
          <Link
            to="/articles"
            className="text-xs font-semibold text-amber-700 hover:underline flex items-center gap-1"
          >
            <span>Browse All 25 Dispatches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Articles Stream (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Lead Horizontal Spotlight Card */}
            {latestArticles[0] && (
              <ArticleCard article={latestArticles[0]} layout="horizontal" />
            )}

            {/* In-Feed Advertisement Placement */}
            <FeedAd />

            {/* Supporting Grid: 2 columns on mobile, 2 columns on tablet/desktop */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 pt-2">
              {latestArticles.slice(1, 7).map((art) => (
                <ArticleCard key={art.id} article={art} layout="vertical" />
              ))}
            </div>
          </div>

          {/* Right Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Popular / Editor's Pick Box */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-stone-100">
                <Award className="w-4 h-4 text-amber-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Editor's Key Recommendations
                </h4>
              </div>
              <div className="divide-y divide-stone-100">
                {popularArticles.map((art, idx) => (
                  <div key={art.id} className="py-3 first:pt-0 last:pb-0">
                    <ArticleCard article={art} layout="compact" />
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Ad Placement */}
            <SidebarAd />

            {/* Quick Newsletter Box in Sidebar */}
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-5">
              <h4 className="font-serif text-base font-medium text-stone-900 mb-1.5">
                The DailySignal Brief
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                No clickbait. Just deep architectural breakdowns delivered directly to your inbox.
              </p>
              <NewsletterForm variant="compact" />
            </div>
          </aside>
        </div>
      </section>

      {/* 5. Leaderboard Ad Placement */}
      <FooterAd />
    </div>
  );
}
