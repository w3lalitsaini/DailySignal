import React from "react";
import { Bookmark } from "lucide-react";
import { useBookmarks } from "../../context/BookmarkContext";

export function BookmarkButton({ slug, title = "", size = "md", showLabel = false, className = "" }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(slug);

  const sizeClasses = {
    sm: "p-1.5 text-xs",
    md: "p-2 text-sm",
    lg: "p-2.5 text-base"
  }[size];

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  }[size];

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(slug, title);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={bookmarked ? "Remove from bookmarks" : "Save article to bookmarks"}
      title={bookmarked ? "Bookmarked" : "Bookmark this story"}
      className={`inline-flex items-center gap-1.5 rounded-full transition-colors ${
        bookmarked
          ? "bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300"
          : "bg-stone-100/80 text-stone-600 dark:bg-stone-800/80 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
      } ${sizeClasses} ${className}`}
    >
      <Bookmark
        className={`${iconSizes} transition-transform ${bookmarked ? "fill-current scale-110" : ""}`}
      />
      {showLabel && (
        <span className="text-xs font-medium">
          {bookmarked ? "Saved" : "Save"}
        </span>
      )}
    </button>
  );
}
