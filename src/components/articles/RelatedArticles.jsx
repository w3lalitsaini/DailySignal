import React from "react";
import { getRelatedArticles } from "../../data/articles";
import { ArticleCard } from "./ArticleCard";

export function RelatedArticles({ currentSlug }) {
  const related = getRelatedArticles(currentSlug, 3);
  if (!related || related.length === 0) return null;

  return (
    <section aria-label="Related Dispatches" className="my-16 pt-12 border-t border-stone-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
            Further Reading
          </span>
          <h3 className="font-serif text-2xl font-medium text-stone-900 mt-1">
            Related Dispatches & Deep Dives
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
        {related.map((article) => (
          <ArticleCard key={article.id} article={article} layout="vertical" />
        ))}
      </div>
    </section>
  );
}
