import React, { useState, useEffect } from "react";
import { useConsent } from "../context/ConsentContext";
import { updateSEO } from "../lib/seo";
import { Cookie, Check } from "lucide-react";

export function CookiePreferencesPage() {
  const { consent, updateCustomConsent, acceptAll, rejectNonEssential } = useConsent();

  const [analytics, setAnalytics] = useState(consent.analytics);
  const [advertising, setAdvertising] = useState(consent.advertising);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    updateSEO({
      title: "Cookie & Tracking Preferences — DailySignal Privacy Center",
      description: "Manage your consent choices for essential storage, Google Analytics 4, and Google AdSense.",
      keywords: [
        "cookie preferences",
        "tracking consent",
        "privacy settings",
        "consent management",
        "browser storage consent"
      ],
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80",
      ogType: "website"
    });
  }, []);

  useEffect(() => {
    setAnalytics(consent.analytics);
    setAdvertising(consent.advertising);
  }, [consent]);

  const handleSave = () => {
    updateCustomConsent({
      analytics,
      advertising
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="mb-10 pb-6 border-b border-stone-200">
        <div className="flex items-center gap-2 text-amber-800 mb-2">
          <Cookie className="w-5 h-5 text-amber-700" />
          <span className="text-xs uppercase font-bold tracking-wider">Privacy Center</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-950 mb-3">
          Cookie & Storage Preferences
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Control how cookies and client storage are utilized during your visit to DailySignal.
        </p>
      </div>

      {savedNotice && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Your cookie preferences have been saved and applied to your current session.</span>
        </div>
      )}

      <div className="space-y-6">
        {/* 1. Strictly Essential */}
        <div className="p-6 rounded-2xl border border-stone-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-serif text-base font-semibold text-stone-900">
                1. Strictly Necessary & Functional Storage
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                Always Required
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Enables core user features such as saving articles to your local reading queue (bookmarks), storing your reading preferences, and remembering font size settings. Uses HTML5 <code>localStorage</code>; never tracks you across third-party websites.
            </p>
          </div>
          <div className="shrink-0">
            <span className="text-xs font-semibold text-stone-400 select-none">
              Always Active
            </span>
          </div>
        </div>

        {/* 2. Google Analytics 4 */}
        <div className="p-6 rounded-2xl border border-stone-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-serif text-base font-semibold text-stone-900">
                2. Performance & Analytics (Google Analytics 4)
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Provides aggregated, anonymized metrics on article views, search interactions, and page transitions. When disabled, the Google tag script will never initialize or transmit telemetry from your browser.
            </p>
          </div>
          <div className="shrink-0 flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-700"></div>
            </label>
          </div>
        </div>

        {/* 3. Google AdSense */}
        <div className="p-6 rounded-2xl border border-stone-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-serif text-base font-semibold text-stone-900">
                3. Advertising & Marketing (Google AdSense)
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Enables Google and its advertising network partners to serve contextual and interest-based sponsor dispatches. When disabled, AdSense scripts remain completely unloaded and only default non-tracking editorial placeholders will be displayed.
            </p>
          </div>
          <div className="shrink-0 flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={advertising}
                onChange={(e) => setAdvertising(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-700"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={acceptAll}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition"
          >
            Accept All Cookies
          </button>
          <button
            onClick={rejectNonEssential}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-stone-300 hover:bg-stone-100 text-stone-700 transition"
          >
            Reject Non-Essential
          </button>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2 text-xs font-semibold rounded-lg bg-amber-700 hover:bg-amber-600 text-white transition shadow-sm"
        >
          Save Custom Preferences
        </button>
      </div>
    </div>
  );
}
