import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticlesByCategory } from "../data/articles";
import { categories } from "../data/categories";
import { ArticleCard } from "../components/articles/ArticleCard";
import { EmptyState } from "../components/ui/EmptyState";
import { updateSEO } from "../lib/seo";
import { trackCategorySelect } from "../lib/analytics";
import { ChevronRight } from "lucide-react";

export function CategoryPage() {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);
  const articlesList = getArticlesByCategory(slug);

  useEffect(() => {
    if (category) {
      updateSEO({
        title: `${category.name} Vlogs & Dispatches — Technical Analysis`,
        description: category.description,
        keywords: category.keywords || [category.name, `${category.name} vlogs`, "software engineering", "tech journalism"],
        image: category.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80",
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
            <Link to="/articles" className="hover:text-stone-900 transition">
              Categories
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3 h-3 text-stone-400" />
          </li>
          <li className="font-semibold text-stone-900 uppercase">
            {category.name}
          </li>
        </ol>
      </nav>

      {/* Category Banner with Associated Image */}
      <div className="relative rounded-2xl border border-stone-200 overflow-hidden mb-10 shadow-xs bg-stone-900 min-h-[220px] flex items-center">
        <img
          src={category.image}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-stone-900/40" />

        <div className="relative z-10 p-6 sm:p-10 max-w-3xl">
          <span className="text-xs uppercase font-bold tracking-wider text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30">
            Curated Desk
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-3 mb-3">
            {category.name}
          </h1>
          <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-light mb-4">
            {category.description}
          </p>
          <div className="inline-flex items-center gap-2 text-xs text-stone-300 bg-white/10 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/20 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{articlesList.length} In-Depth Dispatches & Vlogs</span>
          </div>
        </div>
      </div>

      {/* Articles Grid: 2 columns on mobile, 3 on desktop */}
      {articlesList.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
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
