import React, { useState } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../data/siteConfig";
import { ArrowRight, X } from "lucide-react";

export function AnnouncementStrip() {
  const [dismissed, setDismissed] = useState(false);
  const announcement = siteConfig.announcement;

  if (!announcement || !announcement.enabled || dismissed) return null;

  return (
    <div
      role="region"
      aria-label="Publication Announcement"
      className="bg-stone-900 text-stone-100 dark:bg-stone-950 dark:text-stone-200 text-xs py-2 px-4 border-b border-stone-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 text-center truncate">
          <span className="inline-block bg-amber-600 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shrink-0">
            {announcement.badge}
          </span>
          <span className="truncate">{announcement.text}</span>
          <Link
            to={announcement.link}
            className="inline-flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300 underline shrink-0 ml-1"
          >
            <span>Read Investigation</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss announcement"
          className="text-stone-400 hover:text-stone-200 p-1 shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
