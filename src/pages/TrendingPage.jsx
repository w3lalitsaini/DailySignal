import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getTrendingArticles } from "../data/articles";
import { ArticleCard } from "../components/articles/ArticleCard";
import { updateSEO } from "../lib/seo";
import { TrendingUp, Flame, ChevronRight } from "lucide-react";

export function TrendingPage() {
  const trendingList = getTrendingArticles(10);

  useEffect(() => {
    updateSEO({
      title: "Trending Dispatches — DailySignal",
      description: "The most widely read and referenced technical investigations on DailySignal right now.",
      ogType: "website"
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav aria-label="Breadcrumbs" className="mb-6">
        <ol className="flex items-center space-x-2 text-xs text-stone-500 dark:text-stone-400">
          <li>
            <Link to="/" className="hover:text-stone-900 dark:hover:text-white transition">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3 h-3 text-stone-400" />
          </li>
          <li className="font-semibold text-stone-800 dark:text-stone-200">
            Trending Dispatches
          </li>
        </ol>
      </nav>

      <div className="mb-10 pb-6 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-500 mb-2">
            <Flame className="w-5 h-5 text-amber-600 animate-pulse" />
            <span className="text-xs uppercase font-bold tracking-wider">High Velocity</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-stone-950 dark:text-stone-50">
            Trending Dispatches
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            Top stories receiving sustained reader engagement, shares, and engineering debate this week.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingList.map((article, index) => (
          <div key={article.id} className="relative">
            <div className="absolute top-3 left-3 z-10 w-7 h-7 rounded-full bg-stone-900/90 text-white dark:bg-stone-100/90 dark:text-stone-900 flex items-center justify-center text-xs font-bold font-serif shadow-md pointer-events-none">
              #{index + 1}
            </div>
            <ArticleCard article={article} layout="vertical" />
          </div>
        ))}
      </div>
    </div>
  );
}
