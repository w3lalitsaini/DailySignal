import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { siteConfig } from "../../data/siteConfig";
import { categories } from "../../data/categories";
import { useBookmarks } from "../../context/BookmarkContext";
import {
  Search,
  Bookmark,
  Menu,
  X,
  TrendingUp
} from "lucide-react";

export function Navbar() {
  const { bookmarkCount } = useBookmarks();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll detection to decrease header height even further
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-[#fafaf9]/95 backdrop-blur-md border-b transition-all duration-200 ease-in-out ${
        isScrolled
          ? "border-stone-300 shadow-xs"
          : "border-stone-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Masthead Bar - Decreased height for maximum reading focus */}
        <div
          className={`flex items-center justify-between border-b border-stone-200/60 transition-all duration-200 ease-in-out ${
            isScrolled ? "h-11 sm:h-12" : "h-14 sm:h-16"
          }`}
        >
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="p-1.5 rounded text-stone-700 hover:bg-stone-100 transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Compact Brand Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <span
                className={`rounded bg-stone-900 text-white flex items-center justify-center font-serif font-bold transition-all duration-200 ${
                  isScrolled ? "w-5 h-5 text-xs" : "w-6 h-6 text-sm"
                }`}
              >
                D
              </span>
              <div className="flex items-baseline gap-1.5">
                <span
                  className={`font-serif font-bold tracking-tight text-stone-950 transition-all duration-200 ${
                    isScrolled ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
                  }`}
                >
                  {siteConfig.name}
                  <span className="text-amber-600 font-serif">.</span>
                </span>
                <span className="hidden xl:inline text-[9px] uppercase tracking-wider text-stone-400 font-semibold font-sans">
                  Magazine
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Actions (Search, Trending, Bookmarks) - Net toggle removed as requested */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Toggle search input"
              className="p-1.5 rounded-full text-stone-600 hover:text-stone-950 hover:bg-stone-100 transition"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Trending Quick Link */}
            <Link
              to="/trending"
              aria-label="Trending dispatches"
              className="hidden md:flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition"
            >
              <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
              <span>Trending</span>
            </Link>

            {/* Bookmarks */}
            <Link
              to="/bookmarks"
              aria-label={`View bookmarks (${bookmarkCount})`}
              className="relative p-1.5 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-amber-600 text-white text-[9px] font-bold flex items-center justify-center animate-in zoom-in">
                  {bookmarkCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Desktop Category Navigation Bar - Ultra-compact height */}
        <nav
          aria-label="Category Navigation"
          className={`hidden lg:flex items-center justify-between text-[11px] font-medium uppercase tracking-wider overflow-x-auto no-scrollbar transition-all duration-200 ${
            isScrolled ? "py-1" : "py-1.5"
          }`}
        >
          <div className="flex items-center space-x-5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `py-0.5 border-b-2 transition-colors ${
                  isActive
                    ? "border-amber-600 text-stone-900 font-semibold"
                    : "border-transparent text-stone-600 hover:text-stone-950"
                }`
              }
            >
              Latest
            </NavLink>
            <NavLink
              to="/articles"
              className={({ isActive }) =>
                `py-0.5 border-b-2 transition-colors ${
                  isActive
                    ? "border-amber-600 text-stone-900 font-semibold"
                    : "border-transparent text-stone-600 hover:text-stone-950"
                }`
              }
            >
              All Stories (15)
            </NavLink>
            {categories.map((cat) => (
              <NavLink
                key={cat.id}
                to={`/category/${cat.slug}`}
                className={({ isActive }) =>
                  `py-0.5 border-b-2 transition-colors ${
                    isActive
                      ? "border-amber-600 text-stone-900 font-semibold"
                      : "border-transparent text-stone-600 hover:text-stone-950"
                  }`
                }
              >
                {cat.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center space-x-3.5 pl-3 border-l border-stone-200 text-stone-500">
            <NavLink
              to="/about"
              className="hover:text-stone-900 normal-case text-xs tracking-normal"
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="hover:text-stone-900 normal-case text-xs tracking-normal"
            >
              Contact
            </NavLink>
          </div>
        </nav>

        {/* Dropdown Quick Search Bar */}
        {searchOpen && (
          <div className="py-2.5 px-1 border-t border-stone-200 animate-in fade-in slide-in-from-top-1">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 pointer-events-none" />
              <input
                type="search"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all 25 articles..."
                className="w-full pl-9 pr-16 py-1.5 text-xs rounded-md border border-stone-200 bg-white text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
              />
              <button
                type="submit"
                className="absolute right-1 px-2.5 py-1 rounded bg-stone-900 text-white text-[10px] font-medium"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#fafaf9] px-4 pt-3 pb-6 space-y-4 max-h-[85vh] overflow-y-auto">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dispatches..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-stone-200 bg-white text-stone-900"
            />
          </form>

          <div>
            <h4 className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider mb-2">
              Editorial Categories
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/articles"
                className="px-3 py-2 text-xs rounded-md bg-stone-100 text-stone-900 font-medium"
              >
                All Stories (15)
              </Link>
              <Link
                to="/trending"
                className="px-3 py-2 text-xs rounded-md bg-stone-100 text-stone-900 font-medium flex items-center gap-1.5"
              >
                <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                Trending
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className="px-3 py-2 text-xs rounded-md border border-stone-200 hover:bg-stone-100 text-stone-700"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-stone-200 space-y-2">
            <Link
              to="/about"
              className="block text-xs font-medium text-stone-700 hover:text-stone-900"
            >
              About DailySignal & Standards
            </Link>
            <Link
              to="/contact"
              className="block text-xs font-medium text-stone-700 hover:text-stone-900"
            >
              Contact & Pitch Story
            </Link>
            <Link
              to="/bookmarks"
              className="block text-xs font-medium text-stone-700 hover:text-stone-900"
            >
              Saved Bookmarks ({bookmarkCount})
            </Link>
            <Link
              to="/cookies"
              className="block text-xs font-medium text-stone-700 hover:text-stone-900"
            >
              Cookie & Tracking Preferences
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
