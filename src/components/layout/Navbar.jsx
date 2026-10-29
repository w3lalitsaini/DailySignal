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
  TrendingUp,
  BookOpen,
  Shield,
  Mail,
  Layers,
  Flame
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
              All Stories
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

      {/* Redesigned Mobile Drawer Menu with Associated Images & Rich Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#fafaf9] border-b border-stone-200 shadow-2xl max-h-[calc(100vh-3.5rem)] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-5 space-y-6">
            {/* 1. Mobile Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all 25 stories & vlogs..."
                className="w-full pl-9 pr-20 py-2.5 text-xs rounded-xl border border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-3 py-1.5 rounded-lg bg-stone-900 text-white text-[11px] font-semibold hover:bg-stone-800 transition"
              >
                Search
              </button>
            </form>

            {/* 2. Primary Destinations with Visual Thumbnails */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 font-mono">
                  Primary Feeds
                </span>
                <span className="text-[10px] text-amber-700 font-semibold font-mono">25 STORIES</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  to="/articles"
                  className="group relative rounded-xl border border-stone-200 overflow-hidden bg-stone-900 h-20 flex flex-col justify-end p-2.5"
                >
                  <img
                    src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=400&q=80"
                    alt="All Stories"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
                  <div className="relative z-10">
                    <span className="text-[9px] uppercase font-bold text-amber-400 tracking-wider font-mono">
                      Full Archive
                    </span>
                    <h5 className="text-xs font-bold text-white group-hover:text-amber-200">
                      All Stories (25) &rarr;
                    </h5>
                  </div>
                </Link>

                <Link
                  to="/trending"
                  className="group relative rounded-xl border border-stone-200 overflow-hidden bg-stone-900 h-20 flex flex-col justify-end p-2.5"
                >
                  <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80"
                    alt="Trending"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
                  <div className="relative z-10">
                    <span className="text-[9px] uppercase font-bold text-orange-400 tracking-wider font-mono flex items-center gap-1">
                      <Flame className="w-2.5 h-2.5" /> High Velocity
                    </span>
                    <h5 className="text-xs font-bold text-white group-hover:text-orange-200">
                      Trending Board &rarr;
                    </h5>
                  </div>
                </Link>
              </div>
            </div>

            {/* 3. Editorial Verticals with Image Cards (2-per-row) */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 font-mono">
                  Editorial Fields (6 Desks)
                </span>
                <span className="text-[10px] text-stone-400 font-mono">TAP TO EXPLORE</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    className="group relative rounded-xl border border-stone-200 overflow-hidden bg-stone-900 h-16 flex flex-col justify-end p-2"
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                        {cat.name}
                      </span>
                      <span className="text-[9px] font-mono text-stone-300">
                        {cat.articleCount}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 4. Quick Actions (Bookmarks & Reading Queue) */}
            <div className="p-3 rounded-xl border border-stone-200 bg-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
                  <Bookmark className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h6 className="text-xs font-bold text-stone-900">Personal Reading Queue</h6>
                  <p className="text-[10px] text-stone-500">Offline cached bookmarks on this device</p>
                </div>
              </div>
              <Link
                to="/bookmarks"
                className="px-3 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition"
              >
                View ({bookmarkCount})
              </Link>
            </div>

            {/* 5. Publication Meta Links */}
            <div className="pt-4 border-t border-stone-200 grid grid-cols-2 gap-2 text-xs">
              <Link
                to="/about"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-stone-100 text-stone-700 font-medium transition"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                <span>About Charter</span>
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-stone-100 text-stone-700 font-medium transition"
              >
                <Mail className="w-3.5 h-3.5 text-amber-700" />
                <span>Contact Desk</span>
              </Link>
              <Link
                to="/privacy"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-stone-100 text-stone-700 font-medium transition"
              >
                <Shield className="w-3.5 h-3.5 text-stone-500" />
                <span>Privacy Policy</span>
              </Link>
              <Link
                to="/cookies"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-stone-100 text-stone-700 font-medium transition"
              >
                <Layers className="w-3.5 h-3.5 text-stone-500" />
                <span>Cookies & Tracking</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
