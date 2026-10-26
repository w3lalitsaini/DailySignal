import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticlesByTag } from "../data/articles";
import { ArticleCard } from "../components/articles/ArticleCard";
import { EmptyState } from "../components/ui/EmptyState";
import { updateSEO } from "../lib/seo";
import { Hash, ChevronRight } from "lucide-react";

export function TagPage() {
  const { tag } = useParams();
  const decodedTag = decodeURIComponent(tag || "");
  const articlesList = getArticlesByTag(decodedTag);

  useEffect(() => {
    updateSEO({
      title: `#${decodedTag} Articles — DailySignal`,
      description: `Browse all articles tagged with #${decodedTag}.`,
      ogType: "website"
    });
  }, [decodedTag]);

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
          <li>
            <Link to="/articles" className="hover:text-stone-900 dark:hover:text-white transition">
              Tags
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3 h-3 text-stone-400" />
          </li>
          <li className="font-semibold text-stone-800 dark:text-stone-200">
            #{decodedTag}
          </li>
        </ol>
      </nav>

      <div className="mb-10 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-500 mb-2">
          <Hash className="w-5 h-5" />
          <span className="text-xs uppercase font-bold tracking-wider">Subject Tag</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-stone-950 dark:text-stone-50 mb-2">
          {decodedTag}
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          Showing {articlesList.length} articles matching tag "{decodedTag}"
        </p>
      </div>

      {articlesList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articlesList.map((article) => (
            <ArticleCard key={article.id} article={article} layout="vertical" />
          ))}
        </div>
      ) : (
        <EmptyState
          title={`No articles tagged with #${decodedTag}`}
          description="Explore our complete archives to find relevant stories."
        />
      )}
    </div>
  );
}
