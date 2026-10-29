import React, { useState } from "react";
import {
  X,
  Copy,
  Check,
  Share2,
  Code,
  Play
} from "lucide-react";
import { TwitterIcon, LinkedinIcon } from "../ui/SocialIcons";

export function ShareModal({ isOpen, onClose, article }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedRich, setCopiedRich] = useState(false);

  if (!isOpen || !article) return null;

  const currentUrl = typeof window !== "undefined"
    ? `${window.location.origin}/article/${article.slug}`
    : `https://dailysignal.dev/article/${article.slug}`;

  const imageUrl = article.heroImage;
  const isVlog = article.mediaType === "vlog" || article.hasVideo;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const handleCopyRichMarkdown = async () => {
    // Markdown rich card link: image embedded inside clickable link
    const markdownSnippet = `[![${article.title}](${imageUrl})](${currentUrl})\n\n**${article.title}**\n${article.excerpt}\nRead on [DailySignal](${currentUrl})`;
    try {
      await navigator.clipboard.writeText(markdownSnippet);
      setCopiedRich(true);
      setTimeout(() => setCopiedRich(false), 2500);
    } catch (err) {
      console.error("Failed to copy rich snippet:", err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: `${article.title} — ${article.excerpt}`,
          url: currentUrl
        });
        onClose();
      } catch (err) {
        if (err.name !== "AbortError") {
          console.warn("Native share error:", err);
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(`${article.title} — DailySignal`);
  const encodedText = encodeURIComponent(article.excerpt);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%0A${encodedText}%0A%0A${encodedUrl}`;
  const telegramUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
      >
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-amber-700" />
            <h3 id="share-modal-title" className="font-serif text-base font-bold text-stone-900">
              Share Dispatch & Thumbnail
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition"
            aria-label="Close share dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Rich Preview Card with Thumbnail Image */}
          <div>
            <div className="flex items-center justify-between mb-1.5 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              <span>Accompanied Link & Image Preview</span>
              <span className="text-amber-700 font-bold lowercase">dailysignal.dev</span>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50/70 overflow-hidden shadow-xs hover:shadow-sm transition">
              {/* Media Thumbnail */}
              <div className="relative aspect-[16/9] w-full bg-stone-100 overflow-hidden">
                <img
                  src={imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                {isVlog ? (
                  <div className="absolute inset-0 bg-stone-900/30 flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full bg-amber-600/90 text-white flex items-center justify-center shadow-lg backdrop-blur-xs">
                      <Play className="w-6 h-6 ml-0.5 fill-current" />
                    </span>
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-stone-900/90 text-white text-[10px] font-mono font-semibold">
                      {article.videoDuration || "16:40"} • {article.videoResolution || "4K Vlog"}
                    </span>
                  </div>
                ) : (
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-stone-900/80 text-white text-[10px] font-medium backdrop-blur-xs">
                    {article.readingTime}
                  </div>
                )}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-white/90 text-stone-900 text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                  {article.category.replace("-", " ")}
                </div>
              </div>

              {/* Text Snippet */}
              <div className="p-3 bg-white">
                <h4 className="font-serif text-sm font-bold text-stone-900 line-clamp-2 leading-snug">
                  {article.title}
                </h4>
                <p className="text-[11px] text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="mt-2 pt-2 border-t border-stone-100 text-[10px] text-stone-400 font-mono flex items-center justify-between">
                  <span>OpenGraph & Twitter Card Active</span>
                  <span className="text-amber-700 font-medium">Image accompanies link</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Copy Link Bar */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
              Article Link URL
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 px-3 py-2 rounded-lg border border-stone-200 bg-stone-50 text-xs text-stone-700 font-mono select-all focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shrink-0 ${
                  copiedLink
                    ? "bg-emerald-600 text-white"
                    : "bg-stone-900 text-white hover:bg-stone-800"
                }`}
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Social Share Grid */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2">
              Share to Platforms (Includes Preview Image)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-lg border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-stone-700 text-xs font-medium transition"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                  W
                </span>
                <span>WhatsApp</span>
              </a>

              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-lg border border-stone-200 hover:border-stone-800 hover:bg-stone-50 text-stone-700 text-xs font-medium transition"
              >
                <TwitterIcon className="w-4 h-4 text-stone-900" />
                <span>X / Twitter</span>
              </a>

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-lg border border-stone-200 hover:border-blue-600 hover:bg-blue-50/50 text-stone-700 text-xs font-medium transition"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-700" />
                <span>LinkedIn</span>
              </a>

              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-lg border border-stone-200 hover:border-sky-500 hover:bg-sky-50/50 text-stone-700 text-xs font-medium transition"
              >
                <span className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px] font-bold">
                  T
                </span>
                <span>Telegram</span>
              </a>
            </div>
          </div>

          {/* Rich Snippet (Markdown / Discord / Notion) */}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
            <button
              onClick={handleCopyRichMarkdown}
              className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-amber-800 font-medium transition"
            >
              <Code className="w-3.5 h-3.5 text-amber-600" />
              <span>{copiedRich ? "Copied Markdown Card!" : "Copy Rich Image Card (Markdown)"}</span>
            </button>

            {typeof navigator !== "undefined" && navigator.share && (
              <button
                onClick={handleNativeShare}
                className="inline-flex items-center gap-1 text-xs text-amber-700 hover:underline font-semibold"
              >
                <span>Device Share &rarr;</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
