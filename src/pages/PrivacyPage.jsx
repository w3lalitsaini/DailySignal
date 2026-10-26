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
      <div className="mb-10 pb-6 border-b border-stone-200">
        <span className="text-xs uppercase font-bold tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Privacy & Data Protection Charter
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-950 mt-3 mb-3">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Last revised: March 2026 • Effective immediately across all DailySignal domains
        </p>
      </div>

      <div className="prose prose-stone max-w-none text-xs sm:text-sm text-stone-700 space-y-8 leading-relaxed">
        <div className="p-5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-700">
          <strong className="text-stone-900 block mb-1">Our Core Privacy Commitment:</strong> DailySignal operates on a privacy-by-default architecture. We do not maintain user tracking databases, sell consumer profiles to brokers, or secretly fingerprint your browser.
        </div>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
            1. Information We Collect & How It Is Handled
          </h2>
          <p>
            DailySignal is built on a client-first static architecture. We do not maintain a user registration database, password stores, or centralized profile repositories. The information we process falls into three categories:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Local Browser Storage:</strong> We store your reading preferences (font size adjustments, bookmarks, and cookie consent choices) locally in your browser via HTML5 <code>localStorage</code>. This data remains on your physical device.
            </li>
            <li>
              <strong>Optional Analytics (Google Analytics 4):</strong> If and only if you grant explicit consent via our <Link to="/cookies" className="underline text-amber-700 font-medium">Cookie Preferences</Link> and an active GA4 Measurement ID is configured, anonymous telemetry (pages viewed, search queries, referral sources) is processed with IP anonymization enabled.
            </li>
            <li>
              <strong>Form Submissions:</strong> Contact submissions and newsletter registrations are validated securely and never sold or shared with third-party marketing brokers.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
            2. Cookies & Advertising Networks (Google AdSense & Certified Partners)
          </h2>
          <p>
            When Google AdSense is activated and you provide advertising consent, Google and its certified third-party ad technology providers use cookies to serve advertisements based on your prior visits to this or other websites.
          </p>
          <p>
            You can customize or withdraw consent for personalized advertising at any time through our{" "}
            <Link to="/cookies" className="underline text-amber-700 font-medium">Interactive Cookie Preferences Center</Link>{" "}
            or via Google's{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="underline text-amber-700 font-medium">
              Ads Settings Portal
            </a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
            3. GDPR & CCPA/CPRA Compliance Rights
          </h2>
          <p>
            Under the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA/CPRA), visitors possess explicit rights regarding their personal data:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Right of Access & Portability:</strong> You may request export of any personal information we retain.</li>
            <li><strong>Right to Erasure (Be Forgotten):</strong> You may request deletion of all server logs containing your IP address.</li>
            <li><strong>Right to Opt-Out of Sale/Sharing:</strong> DailySignal never sells your personal data.</li>
            <li><strong>Non-Discrimination:</strong> We never restrict article access or degrade reading experience if you decline advertising cookies.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
            4. Data Retention & Contact
          </h2>
          <p>
            Local bookmarks and reading queue data can be purged instantly by clearing browser site data or utilizing the "Clear All" action on the Bookmarks page. For compliance inquiries, contact our Data Protection Officer at <a href="mailto:privacy@dailysignal.dev" className="underline text-amber-700 font-medium">privacy@dailysignal.dev</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
