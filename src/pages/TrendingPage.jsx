import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getTrendingArticles } from "../data/articles";
import { ArticleCard } from "../components/articles/ArticleCard";
import { updateSEO } from "../lib/seo";
import { Flame, ChevronRight } from "lucide-react";

export function TrendingPage() {
  const trendingList = getTrendingArticles(12);

  useEffect(() => {
    updateSEO({
      title: "Trending Tech Vlogs & Dispatches — Most Read Engineering Insights",
      description: "The most widely read and referenced technical investigations and video vlogs on DailySignal right now.",
      keywords: [
        "trending tech stories",
        "viral engineering articles",
        "popular developer vlogs",
        "ai tech trends",
        "software architectural deep dives"
      ],
      image: trendingList[0]?.heroImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80",
      ogType: "website"
    });
  }, [trendingList]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav aria-label="Breadcrumbs" className="mb-6">
        <ol className="flex items-center space-x-2 text-xs text-stone-500">
          <li>
            <Link to="/" className="hover:text-stone-900 transition">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3 h-3 text-stone-400" />
          </li>
          <li className="font-semibold text-stone-900">
            Trending Dispatches
          </li>
        </ol>
      </nav>

      <div className="mb-10 pb-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-800 mb-2">
            <Flame className="w-5 h-5 text-amber-700 animate-pulse" />
            <span className="text-xs uppercase font-bold tracking-wider">High Velocity</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-stone-950">
            Trending Dispatches
          </h1>
          <p className="text-sm text-stone-600 mt-2 max-w-2xl">
            The most widely read deep dives, security audits, and architectural guides circulating across the developer community this week.
          </p>
        </div>

        <div className="text-xs text-stone-500 bg-white px-4 py-2 rounded-xl border border-stone-200 shadow-xs">
          Ranked by reader velocity & share volume
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {trendingList.map((article, index) => (
          <div key={article.id} className="relative group h-full">
            <ArticleCard article={article} layout="vertical" rankNumber={index + 1} />
          </div>
        ))}
      </div>
    </div>
  );
}
