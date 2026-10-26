import React, { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";
import { TwitterIcon, LinkedinIcon } from "../ui/SocialIcons";
import { shareArticle } from "../../lib/sharing";

export function ShareButtons({ title, text, url, className = "" }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const res = await shareArticle({ title, text, url });
    if (res.success && res.method === "clipboard") {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const currentUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title || "DailySignal Dispatch");

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 text-xs font-medium transition cursor-pointer shadow-xs"
        title="Share or copy article link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-medium">Link Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </>
        )}
      </button>

      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X / Twitter"
        className="p-2 rounded-full border border-stone-200 bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition"
      >
        <TwitterIcon className="w-3.5 h-3.5" />
      </a>

      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="p-2 rounded-full border border-stone-200 bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition"
      >
        <LinkedinIcon className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
