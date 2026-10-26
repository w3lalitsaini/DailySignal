import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { articles } from "../data/articles";
import { useBookmarks } from "../context/BookmarkContext";
import { ArticleCard } from "../components/articles/ArticleCard";
import { EmptyState } from "../components/ui/EmptyState";
import { updateSEO } from "../lib/seo";
import { Bookmark, Trash2, Clock, BookOpen, ChevronRight } from "lucide-react";

export function BookmarksPage() {
  const { bookmarks, clearBookmarks } = useBookmarks();

  useEffect(() => {
    updateSEO({
      title: "Your Saved Bookmarks — DailySignal",
      description: "Manage and read your offline saved technical dispatches and architectural analyses."
    });
  }, []);

  // Filter articles matching bookmarks array
  const bookmarkedArticles = articles.filter((a) => bookmarks.includes(a.slug));

  // Compute total reading time
  const totalReadingMinutes = bookmarkedArticles.reduce((acc, curr) => {
    return acc + (parseInt(curr.readingTime, 10) || 0);
  }, 0);

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
            Reading Queue
          </li>
        </ol>
      </nav>

      {/* Header and Queue Stats */}
      <div className="p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900/40 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-500 mb-1.5">
              <Bookmark className="w-4 h-4 fill-current" />
              <span className="text-xs uppercase font-bold tracking-wider">Saved For Later</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-stone-950 dark:text-stone-50">
              Your Personal Reading Queue
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
              Stored locally on this device via browser storage. Never tracked or monetized without consent.
            </p>
          </div>

          {bookmarkedArticles.length > 0 && (
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right hidden sm:block">
                <div className="text-xs text-stone-400 flex items-center justify-end gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Total Queue Time</span>
                </div>
                <div className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                  ~{totalReadingMinutes} minutes
                </div>
              </div>

              <button
                onClick={clearBookmarks}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20 text-red-700 dark:text-red-400 hover:bg-red-100 transition"
                title="Remove all articles from saved bookmarks"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid or Empty State */}
      {bookmarkedArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} layout="vertical" />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Bookmark}
          title="Your reading list is empty"
          description="Click the bookmark icon on any article card or reading page to save stories to this queue for focused offline reading."
          actionLabel="Explore Recommended Stories"
          actionHref="/articles"
        />
      )}
    </div>
  );
}
