import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { updateSEO } from "../lib/seo";

export function TermsPage() {
  useEffect(() => {
    updateSEO({
      title: "Terms and Conditions of Use — DailySignal",
      description: "Terms governing use of DailySignal's digital editorial content, intellectual property, and frontend services."
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="mb-10 pb-6 border-b border-stone-200 dark:border-stone-800">
        <span className="text-xs uppercase font-bold tracking-wider text-amber-700 dark:text-amber-500">
          Editorial Governance
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-950 dark:text-stone-50 mt-1 mb-3">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Last revised: March 2026
        </p>
      </div>

      <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 space-y-6 leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100">
            1. Intellectual Property & Syndication Rights
          </h2>
          <p>
            All original editorial essays, code architecture walkthroughs, custom graphics, and investigative reports published on DailySignal are the intellectual property of the publication and its contributing authors, protected under applicable international copyright treaties.
          </p>
          <p>
            Fair use quotations are permitted provided clear attribution and a direct canonical backlink to the original article URL are visibly included. Mass scraping, automated AI model training without permission, or unauthorized whole-article republishing is strictly prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100">
            2. Open Source Code Snippets
          </h2>
          <p>
            Code examples and architectural snippets included within our technical articles are provided under the MIT License for educational and professional implementation unless otherwise explicitly noted.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100">
            3. Disclaimer of Warranties
          </h2>
          <p>
            Content on DailySignal is provided "as is" for informational and educational purposes only. For details, refer to our comprehensive <Link to="/disclaimer" className="underline text-amber-600">Editorial Disclaimer</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
