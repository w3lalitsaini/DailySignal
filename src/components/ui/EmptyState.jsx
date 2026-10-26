import React from "react";
import { Link } from "react-router-dom";
import { FileQuestion, ArrowRight, RotateCcw } from "lucide-react";

export function EmptyState({
  icon: Icon = FileQuestion,
  title = "No stories found",
  description = "We couldn't find any articles matching your criteria.",
  actionLabel = "Browse All Articles",
  actionHref = "/articles",
  onReset = null,
  resetLabel = "Clear Filters"
}) {
  return (
    <div className="text-center py-16 px-4 max-w-md mx-auto my-8 border border-dashed border-stone-200 rounded-xl bg-stone-50/50">
      <div className="w-14 h-14 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-500 mb-4 border border-stone-200">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-serif font-medium text-stone-900 mb-2">
        {title}
      </h3>
      <p className="text-sm text-stone-600 mb-6 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {onReset && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {resetLabel}
          </button>
        )}
        {actionHref && (
          <Link
            to={actionHref}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md bg-stone-900 text-white hover:bg-stone-800 transition"
          >
            <span>{actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
