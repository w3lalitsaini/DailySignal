import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { searchArticles } from "../data/articles";
import { ArticleCard } from "../components/articles/ArticleCard";
import { SearchBar } from "../components/ui/SearchBar";
import { EmptyState } from "../components/ui/EmptyState";
import { updateSEO } from "../lib/seo";
import { trackSearch } from "../lib/analytics";
import { Search, Sparkles } from "lucide-react";

const SUGGESTED_QUERIES = [
  "AI agents",
  "UPI safety",
  "React vs Next.js",
  "Electric vehicles",
  "Digital privacy",
  "SEO checklist",
  "Cloud hosting",
  "Scams in India"
];

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const qParam = searchParams.get("q") || "";
  const [query, setQuery] = useState(qParam);

  useEffect(() => {
    setQuery(qParam);
    if (qParam) {
      updateSEO({
        title: `Search: "${qParam}" — DailySignal`,
        description: `Search results for "${qParam}" across DailySignal archives.`
      });
      trackSearch(qParam, results.length);
    } else {
      updateSEO({
        title: "Search DailySignal Dispatches",
        description: "Search all 15 articles across technology, engineering, privacy, and economics."
      });
    }
  }, [qParam]);

  const results = useMemo(() => {
    return searchArticles(query);
  }, [query]);

  const handleQueryChange = (val) => {
    setQuery(val);
    if (val.trim()) {
      setSearchParams({ q: val.trim() }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const handleSelectSuggested = (sq) => {
    setQuery(sq);
    setSearchParams({ q: sq }, { replace: true });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 mb-3">
          <Search className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
          <span>Full Archive Search</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-stone-950 dark:text-stone-50 mb-3">
          Search the DailySignal Archives
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          Instant full-text index across all 15 technical investigations and deep-dive reports.
        </p>

        <div className="mt-6">
          <SearchBar
            initialValue={query}
            onSearchChange={handleQueryChange}
            placeholder="Type keywords, topics, or author names..."
            className="shadow-sm"
          />
        </div>

        {/* Suggested Queries */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-xs">
          <span className="text-stone-400 dark:text-stone-500 flex items-center gap-1 text-[11px]">
            <Sparkles className="w-3 h-3 text-amber-500" /> Suggestions:
          </span>
          {SUGGESTED_QUERIES.map((sq) => (
            <button
              key={sq}
              onClick={() => handleSelectSuggested(sq)}
              className="px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition text-[11px]"
            >
              {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-6 pb-2 border-b border-stone-100 dark:border-stone-800">
        <span>
          {query ? (
            <>
              Found <strong>{results.length}</strong> {results.length === 1 ? "story" : "stories"} for "
              <span className="text-stone-900 dark:text-stone-100 font-medium">{query}</span>"
            </>
          ) : (
            <>Showing all <strong>{results.length}</strong> available stories</>
          )}
        </span>
      </div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((article) => (
            <ArticleCard key={article.id} article={article} layout="vertical" />
          ))}
        </div>
      ) : (
        <EmptyState
          title={`No results for "${query}"`}
          description="Try broadening your search terms or selecting one of our curated categories."
          onReset={() => handleQueryChange("")}
          resetLabel="Show All Stories"
        />
      )}
    </div>
  );
}
