import React from "react";
import { Link } from "react-router-dom";
import { useConsent } from "../../context/ConsentContext";
import { Cookie, Shield } from "lucide-react";

export function CookieBanner() {
  const { showBanner, acceptAll, rejectNonEssential } = useConsent();

  if (!showBanner) return null;

  return (
    <div
      role="region"
      aria-label="Cookie and Privacy Consent Banner"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-stone-900/95 dark:bg-stone-950/95 text-stone-200 border-t border-stone-800 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom duration-300"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <Cookie className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-xs text-stone-300 leading-relaxed max-w-3xl">
            <span className="font-semibold text-white">Your Privacy & Consent:</span> We use strictly essential local storage for reading preferences and saved bookmarks. Optional cookies for Google Analytics 4 (SPA page telemetry) and Google AdSense (advertising placeholders) remain <strong>disabled by default</strong> until you grant explicit consent. Learn more in our{" "}
            <Link to="/privacy" className="underline text-amber-400 hover:text-amber-300">
              Privacy Policy
            </Link>{" "}
            or customize preferences.
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto justify-end">
          <Link
            to="/cookies"
            className="px-3.5 py-2 text-xs font-medium rounded-lg border border-stone-700 hover:bg-stone-800 text-stone-300 transition"
          >
            Customize
          </Link>

          <button
            onClick={rejectNonEssential}
            className="px-3.5 py-2 text-xs font-medium rounded-lg border border-stone-700 hover:bg-stone-800 text-stone-300 transition"
          >
            Reject Non-Essential
          </button>

          <button
            onClick={acceptAll}
            className="px-4 py-2 text-xs font-medium rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold transition shadow-sm"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
