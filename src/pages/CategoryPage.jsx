import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticlesByCategory } from "../data/articles";
import { categories } from "../data/categories";
import { ArticleCard } from "../components/articles/ArticleCard";
import { EmptyState } from "../components/ui/EmptyState";
import { updateSEO } from "../lib/seo";
import { trackCategorySelect } from "../lib/analytics";
import { ChevronRight, ArrowLeft } from "lucide-react";

export function CategoryPage() {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);
  const articlesList = getArticlesByCategory(slug);

  useEffect(() => {
    if (category) {
      updateSEO({
        title: `${category.name} Dispatches — DailySignal`,
        description: category.description,
        ogType: "website"
      });
      trackCategorySelect(category.slug);
    }
  }, [category]);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState
          title="Category Not Found"
          description={`The topic "${slug}" does not exist in our editorial catalog.`}
          actionLabel="Browse All Categories"
          actionHref="/articles"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
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
              Categories
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3 h-3 text-stone-400" />
          </li>
          <li className="font-semibold text-stone-800 dark:text-stone-200 uppercase">
            {category.name}
          </li>
        </ol>
      </nav>

      {/* Category Banner */}
      <div className="p-8 sm:p-10 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-gradient-to-br from-stone-50 to-white dark:from-stone-900/60 dark:to-stone-900/20 mb-10">
        <div className="max-w-3xl">
          <span className="text-xs uppercase font-bold tracking-wider text-amber-700 dark:text-amber-500">
            Curated Desk
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-950 dark:text-stone-50 mt-1 mb-4">
            {category.name}
          </h1>
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-light mb-6">
            {category.description}
          </p>
          <div className="inline-flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 bg-white dark:bg-stone-800 px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>{articlesList.length} In-Depth Dispatches Published</span>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {articlesList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articlesList.map((article) => (
            <ArticleCard key={article.id} article={article} layout="vertical" />
          ))}
        </div>
      ) : (
        <EmptyState
          title={`No articles currently in ${category.name}`}
          description="Check back soon for new investigations and dispatches."
        />
      )}
    </div>
  );
}
