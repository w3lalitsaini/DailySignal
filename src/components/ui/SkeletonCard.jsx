import React from "react";

export function SkeletonCard({ layout = "vertical" }) {
  if (layout === "horizontal") {
    return (
      <div className="flex flex-col sm:flex-row gap-5 p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-900/40 animate-pulse">
        <div className="w-full sm:w-48 h-36 bg-stone-200 dark:bg-stone-800 rounded"></div>
        <div className="flex-1 space-y-3 py-1">
          <div className="w-20 h-4 bg-stone-200 dark:bg-stone-800 rounded"></div>
          <div className="w-3/4 h-6 bg-stone-200 dark:bg-stone-800 rounded"></div>
          <div className="w-full h-4 bg-stone-200 dark:bg-stone-800 rounded"></div>
          <div className="w-1/3 h-3 bg-stone-200 dark:bg-stone-800 rounded mt-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 p-4 space-y-4 animate-pulse">
      <div className="w-full h-48 bg-stone-200 dark:bg-stone-800 rounded-md"></div>
      <div className="w-24 h-4 bg-stone-200 dark:bg-stone-800 rounded"></div>
      <div className="w-5/6 h-6 bg-stone-200 dark:bg-stone-800 rounded"></div>
      <div className="w-full h-4 bg-stone-200 dark:bg-stone-800 rounded"></div>
      <div className="w-4/5 h-4 bg-stone-200 dark:bg-stone-800 rounded"></div>
      <div className="pt-2 flex items-center justify-between">
        <div className="w-24 h-3 bg-stone-200 dark:bg-stone-800 rounded"></div>
        <div className="w-16 h-3 bg-stone-200 dark:bg-stone-800 rounded"></div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6, layout = "vertical" }) {
  return (
    <div className={layout === "vertical" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} layout={layout} />
      ))}
    </div>
  );
}
