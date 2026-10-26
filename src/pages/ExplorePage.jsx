import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { articles } from "../data/articles";
import { categories } from "../data/categories";
import { ArticleCard } from "../components/articles/ArticleCard";
import { SearchBar } from "../components/ui/SearchBar";
import { EmptyState } from "../components/ui/EmptyState";
import { Pagination } from "../components/ui/Pagination";
import { updateSEO } from "../lib/seo";
import { trackSearch, trackCategorySelect } from "../lib/analytics";
import {
  Filter,
  Grid,
  List as ListIcon,
  SlidersHorizontal,
  RotateCcw
} from "lucide-react";

const ARTICLES_PER_PAGE = 6;

export function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "all";
  const sortParam = searchParams.get("sort") || "newest";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortOrder, setSortOrder] = useState(sortParam);
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"

  useEffect(() => {
    updateSEO({
      title: "All Articles & Dispatches — DailySignal",
      description: "Browse all 25 in-depth technical investigations, software architecture reviews, and cybersecurity analysis.",
      ogType: "website"
    });
  }, []);

  // Update URL params when filters change
  const updateParams = (newQuery, newCategory, newSort, newPage) => {
    const params = new URLSearchParams();
    if (newQuery) params.set("q", newQuery);
    if (newCategory && newCategory !== "all") params.set("category", newCategory);
    if (newSort && newSort !== "newest") params.set("sort", newSort);
    if (newPage && newPage > 1) params.set("page", newPage.toString());
    setSearchParams(params, { replace: true });
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
    updateParams(val, selectedCategory, sortOrder, 1);
    if (val.trim()) trackSearch(val, filteredArticles.length);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    updateParams(searchQuery, cat, sortOrder, 1);
    trackCategorySelect(cat);
  };

  const handleSortChange = (sort) => {
    setSortOrder(sort);
    setCurrentPage(1);
    updateParams(searchQuery, selectedCategory, sort, 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateParams(searchQuery, selectedCategory, sortOrder, page);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortOrder("newest");
    setCurrentPage(1);
    setSearchParams({}, { replace: true });
  };

  // Filter & sort logic
  const filteredArticles = useMemo(() => {
    let result = [...articles];

    // Filter category
    if (selectedCategory !== "all") {
      result = result.filter((a) => a.category === selectedCategory);
    }

    // Filter query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortOrder === "newest") {
      result.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    } else if (sortOrder === "oldest") {
      result.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
    } else if (sortOrder === "reading-time") {
      result.sort((a, b) => {
        const aT = parseInt(a.readingTime, 10) || 0;
        const bT = parseInt(b.readingTime, 10) || 0;
        return bT - aT;
      });
    }

    return result;
  }, [searchQuery, selectedCategory, sortOrder]);

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="max-w-3xl mb-8">
        <span className="text-xs uppercase tracking-wider font-semibold text-amber-700">
          The Full Archive
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-950 mt-1 mb-3">
          Explore All Stories
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Search across 25 complete, peer-reviewed engineering dispatches, fraud analyses, and creator economics frameworks.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="p-4 sm:p-5 rounded-2xl border border-stone-200 bg-white shadow-xs mb-8 space-y-4">
        {/* Top: Search bar */}
        <SearchBar
          initialValue={searchQuery}
          onSearchChange={handleSearchChange}
          placeholder="Filter articles by keywords (e.g. AI, UPI, Docker, Next.js, SEO)..."
        />

        {/* Bottom Filter Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition shrink-0 ${
                selectedCategory === "all"
                  ? "bg-stone-900 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              All Topics ({articles.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition shrink-0 ${
                  selectedCategory === cat.slug
                    ? "bg-stone-900 text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort & View Mode Switches */}
          <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={sortOrder}
                onChange={(e) => handleSortChange(e.target.value)}
                aria-label="Sort articles"
                className="py-1.5 px-2.5 rounded-md border border-stone-200 bg-white text-stone-700 text-xs focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="reading-time">Longest Read</option>
              </select>
            </div>

            {/* Grid / List switch */}
            <div className="flex items-center border border-stone-200 rounded-md p-0.5 bg-stone-50">
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                className={`p-1.5 rounded ${
                  viewMode === "grid"
                    ? "bg-white text-stone-900 shadow-xs"
                    : "text-stone-400 hover:text-stone-600"
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                aria-label="List view"
                className={`p-1.5 rounded ${
                  viewMode === "list"
                    ? "bg-white text-stone-900 shadow-xs"
                    : "text-stone-400 hover:text-stone-600"
                }`}
              >
                <ListIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Count & Filter Indicators */}
      <div className="flex items-center justify-between text-xs text-stone-500 mb-6 pb-2 border-b border-stone-200">
        <div>
          Showing <strong>{filteredArticles.length}</strong> of {articles.length} dispatches
          {selectedCategory !== "all" && (
            <span className="ml-2 px-2 py-0.5 rounded bg-stone-200 text-stone-700">
              Category: {selectedCategory}
            </span>
          )}
          {searchQuery && (
            <span className="ml-2 px-2 py-0.5 rounded bg-amber-100 text-amber-900">
              Query: "{searchQuery}"
            </span>
          )}
        </div>

        {(selectedCategory !== "all" || searchQuery) && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-amber-700 hover:underline font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Articles Stream / Empty State */}
      {paginatedArticles.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4 max-w-4xl mx-auto"
          }
        >
          {paginatedArticles.map((art) => (
            <ArticleCard
              key={art.id}
              article={art}
              layout={viewMode === "grid" ? "vertical" : "horizontal"}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No articles match your query"
          description={`We couldn't find any articles matching "${searchQuery}" in category "${selectedCategory}".`}
          onReset={handleResetFilters}
          resetLabel="Reset All Filters"
        />
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
