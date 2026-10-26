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
  const latestArticles = articles.filter((a) => a.id !== featuredArticle?.id).slice(0, 6);
  const popularArticles = articles.slice(2, 6);

  useEffect(() => {
    updateSEO({
      title: "DailySignal — Independent Tech, AI & Digital Culture Magazine",
      description: "In-depth engineering analysis, investigative reporting, digital security guides, and architectural deep-dives for developers, founders, and curious minds.",
      ogType: "website"
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. Editorial Hero */}
      <ArticleHero article={featuredArticle} />

      {/* 2. Trending Now Section */}
      <section aria-label="Trending Dispatches" className="mb-16">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-amber-500/10 text-amber-600">
              <Flame className="w-4 h-4" />
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider font-sans text-stone-900">
              Trending Dispatches
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingArticles.map((art, index) => (
            <ArticleCard
              key={art.id}
              article={art}
              layout="numbered"
              rankNumber={index + 1}
            />
          ))}
        </div>
      </section>

      {/* 3. Category Showcase Bar */}
      <section aria-label="Explore Categories" className="mb-16">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-blue-500/10 text-blue-600">
              <Layers className="w-4 h-4" />
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider font-sans text-stone-900">
              Curated Fields of Inquiry
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group p-4 rounded-xl border border-stone-200/90 bg-white hover:border-amber-500 hover:shadow-xs transition text-left flex flex-col justify-between h-28"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                  Field
                </span>
                <h4 className="text-sm font-semibold text-stone-900 group-hover:text-amber-700 transition-colors mt-0.5">
                  {cat.name}
                </h4>
              </div>
              <span className="text-[11px] text-stone-400 font-medium">
                {cat.articleCount} Dispatches &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Latest Articles Grid with Sidebar */}
      <section aria-label="Latest Articles" className="mb-16">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-stone-500/10 text-stone-700">
              <BookOpen className="w-4 h-4" />
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider font-sans text-stone-900">
              Latest Investigative Reporting & Guides
            </h3>
          </div>
          <Link
            to="/articles"
            className="text-xs font-semibold text-amber-700 hover:underline flex items-center gap-1"
          >
            <span>Browse All 15 Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Articles Stream (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* First Large Highlight Card */}
            {latestArticles[0] && (
              <ArticleCard article={latestArticles[0]} layout="horizontal" />
            )}

            {/* In-Feed Advertisement Placement */}
            <FeedAd />

            {/* Supporting 2-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {latestArticles.slice(1, 5).map((art) => (
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
                    <ArticleCard article={art} layout="numbered" rankNumber={idx + 1} />
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
