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
      title: `#${decodedTag} — Technical Investigations & Vlogs`,
      description: `Browse all articles and technical video guides tagged with #${decodedTag}.`,
      keywords: [
        decodedTag,
        `${decodedTag} tech`,
        `${decodedTag} vlogs`,
        "developer tutorials",
        "engineering articles"
      ],
      image: articlesList[0]?.heroImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80",
      ogType: "website"
    });
  }, [decodedTag, articlesList]);

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
          <li>
            <Link to="/articles" className="hover:text-stone-900 transition">
              Tags
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3 h-3 text-stone-400" />
          </li>
          <li className="font-semibold text-stone-900">
            #{decodedTag}
          </li>
        </ol>
      </nav>

      <div className="mb-10 pb-6 border-b border-stone-200">
        <div className="flex items-center gap-2 text-amber-800 mb-2">
          <Hash className="w-5 h-5 text-amber-700" />
          <span className="text-xs uppercase font-bold tracking-wider">Subject Tag</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-stone-950 mb-2">
          #{decodedTag}
        </h1>
        <p className="text-sm text-stone-600">
          Showing {articlesList.length} articles matching tag "#{decodedTag}"
        </p>
      </div>

      {articlesList.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
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
