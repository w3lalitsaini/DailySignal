import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../components/ui/SearchBar";
import { updateSEO } from "../lib/seo";
import { FileQuestion, ArrowLeft, Home, Compass } from "lucide-react";
import { categories } from "../data/categories";

export function NotFoundPage() {
  useEffect(() => {
    updateSEO({
      title: "404 Page Not Found — DailySignal Archives",
      description: "The requested article, vlog, or page could not be located in the DailySignal archives.",
      keywords: ["404 error", "page not found", "dailysignal archives"],
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80",
      ogType: "website"
    });
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-600 mx-auto flex items-center justify-center mb-6 border border-stone-200">
        <FileQuestion className="w-8 h-8 text-amber-700" />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
        Error 404
      </span>

      <h1 className="font-serif text-3xl sm:text-5xl font-medium text-stone-950 mt-3 mb-4">
        Story Not Found in Archives
      </h1>

      <p className="text-sm text-stone-600 leading-relaxed mb-8 max-w-md mx-auto">
        The article or URL you requested might have been moved, updated, or re-filed. Use the search bar below or browse by editorial category.
      </p>

      {/* Embedded Search */}
      <div className="mb-10 max-w-md mx-auto">
        <SearchBar autoNavigate placeholder="Search articles or topics..." />
      </div>

      {/* Suggested Categories */}
      <div className="mb-10">
        <h4 className="text-xs uppercase font-semibold text-stone-400 tracking-wider mb-3">
          Popular Editorial Categories
        </h4>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="px-3 py-1.5 rounded-full border border-stone-200 text-xs font-medium text-stone-700 hover:bg-stone-100 transition"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
