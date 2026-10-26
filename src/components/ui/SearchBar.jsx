import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

export function SearchBar({
  initialValue = "",
  placeholder = "Search 25 curated dispatches by topic, keyword, or author...",
  onSearchChange = null,
  autoNavigate = false,
  className = ""
}) {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (autoNavigate) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    } else if (onSearchChange) {
      onSearchChange(query);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (onSearchChange) {
      onSearchChange(val);
    }
  };

  const handleClear = () => {
    setQuery("");
    if (onSearchChange) {
      onSearchChange("");
    }
  };

  return (
    <form onSubmit={handleSubmit} role="search" className={`relative ${className}`}>
      <label htmlFor="site-search" className="sr-only">
        Search articles
      </label>
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-4 h-4 text-stone-400 pointer-events-none" />
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-11 pr-10 py-3 text-sm rounded-lg border border-stone-200 bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 transition"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3.5 p-1 text-stone-400 hover:text-stone-700"
            aria-label="Clear search query"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
}
