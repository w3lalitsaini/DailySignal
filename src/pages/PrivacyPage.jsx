import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { updateSEO } from "../lib/seo";
import { ShieldCheck, Lock, Cookie, Eye } from "lucide-react";

export function PrivacyPage() {
  useEffect(() => {
    updateSEO({
      title: "Privacy Policy — DailySignal",
      description: "Transparency on how DailySignal handles visitor data, local storage, analytics, and cookie consent.",
      ogType: "website"
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="mb-10 pb-6 border-b border-stone-200 dark:border-stone-800">
        <span className="text-xs uppercase font-bold tracking-wider text-amber-700 dark:text-amber-500">
          Legal & Compliance Template
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-950 dark:text-stone-50 mt-1 mb-3">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Last revised: March 2026 • Effective immediately
        </p>
      </div>

      <div className="prose prose-stone dark:prose-invert max-w-none text-xs sm:text-sm text-stone-700 dark:text-stone-300 space-y-6 leading-relaxed">
        <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40 text-xs">
          <strong>Notice for Deployers:</strong> This privacy policy is an editable, production-minded template tailored for a frontend-only digital magazine utilizing optional Google Analytics 4 and Google AdSense integrations. Please modify this document to reflect your specific legal entity before deploying to production.
        </div>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100">
            1. Information We Collect
          </h2>
          <p>
            DailySignal is built on a client-side architecture. We do not maintain a user registration database, password stores, or centralized profile repositories. The information we process falls into three categories:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Local Browser Storage:</strong> We store your reading preferences (light/dark theme, font size adjustments), article bookmarks, and cookie consent choices locally in your browser via HTML5 <code>localStorage</code>. This data never leaves your device.
            </li>
            <li>
              <strong>Optional Analytics (Google Analytics 4):</strong> If and only if you grant explicit consent via our <Link to="/cookies" className="underline text-amber-600">Cookie Preferences</Link> and an active GA4 Measurement ID is configured, anonymous telemetry (pages viewed, search queries, referral sources) is processed with IP anonymization enabled.
            </li>
            <li>
              <strong>Interactive Demo Submissions:</strong> Forms submitted on this frontend demo (newsletter signups and contact submissions) are validated entirely client-side and are not transmitted to third-party databases.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100">
            2. Cookies & Advertising Networks (Google AdSense)
          </h2>
          <p>
            When Google AdSense is activated and you provide advertising consent, Google and its certified ad partners use cookies and web beacons to serve advertisements based on your prior visits to this website or other websites on the Internet.
          </p>
          <p>
            You can opt out of personalized advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="underline text-amber-600">
              Google Ads Settings
            </a>{" "}
            or by managing your settings in our{" "}
            <Link to="/cookies" className="underline text-amber-600">Cookie Preferences</Link>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100">
            3. Data Retention & Your Rights
          </h2>
          <p>
            Because your bookmarks and preferences are stored exclusively on your device, you have complete sovereignty over your data. You can erase all bookmarks and preferences at any moment by clearing your browser cache or clicking "Clear All" in your Bookmarks queue.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100">
            4. Contacting Privacy Officers
          </h2>
          <p>
            For privacy inquiries or data subject access requests, please contact our privacy compliance desk at <a href="mailto:privacy@dailysignal.dev" className="underline text-amber-600">privacy@dailysignal.dev</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
