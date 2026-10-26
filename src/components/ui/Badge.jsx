import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../../data/categories";

export function CategoryBadge({ categorySlug, size = "md", clickable = true }) {
  const category = categories.find((c) => c.slug === categorySlug);
  const name = category ? category.name : categorySlug;
  const badgeStyle = category?.badgeBg || "bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-700";

  const sizeClasses = {
    sm: "text-[11px] px-2 py-0.5 tracking-wider",
    md: "text-xs px-2.5 py-1 tracking-wide font-medium",
    lg: "text-sm px-3.5 py-1.5 font-medium"
  }[size];

  const content = (
    <span
      className={`inline-flex items-center uppercase tracking-wider rounded-sm border font-sans ${sizeClasses} ${badgeStyle} transition-colors duration-200`}
    >
      {name}
    </span>
  );

  if (clickable) {
    return (
      <Link
        to={`/category/${categorySlug}`}
        onClick={(e) => e.stopPropagation()}
        className="inline-block hover:opacity-85 transition-opacity"
      >
        {content}
      </Link>
    );
  }

  return content;
}

export function TagBadge({ tag, clickable = true }) {
  const content = (
    <span className="inline-flex items-center text-xs px-2.5 py-1 rounded bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white border border-stone-200 dark:border-stone-700/60 transition-colors">
      #{tag}
    </span>
  );

  if (clickable) {
    return (
      <Link
        to={`/tag/${encodeURIComponent(tag.toLowerCase())}`}
        onClick={(e) => e.stopPropagation()}
        className="inline-block"
      >
        {content}
      </Link>
    );
  }

  return content;
}
