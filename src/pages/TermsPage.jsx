import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { updateSEO } from "../lib/seo";

export function TermsPage() {
  useEffect(() => {
    updateSEO({
      title: "Terms and Conditions of Use — DailySignal",
      description: "Terms governing use of DailySignal's digital editorial content, intellectual property, and frontend services.",
      keywords: [
        "terms of service",
        "intellectual property terms",
        "editorial syndication",
        "content licensing",
        "code sample usage terms"
      ],
      image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1600&q=80",
      ogType: "website"
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="mb-10 pb-6 border-b border-stone-200">
        <span className="text-xs uppercase font-bold tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Editorial Governance & Terms
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-950 mt-3 mb-3">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Last revised: March 2026 • Effective across all DailySignal digital properties
        </p>
      </div>

      <div className="text-xs sm:text-sm text-stone-700 space-y-8 leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
            1. Intellectual Property & Syndication Rights
          </h2>
          <p>
            All original editorial essays, code architecture walkthroughs, custom graphics, and investigative reports published on DailySignal are the intellectual property of the publication and its contributing authors, protected under applicable international copyright treaties.
          </p>
          <p>
            Fair use quotations are permitted provided clear attribution and a direct canonical backlink to the original article URL are visibly included. Automated scraping for unauthorized republication or commercial content aggregation without written agreement is strictly prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
            2. Permitted Use of Code Examples (MIT License)
          </h2>
          <p>
            All code snippets, schemas, Dockerfiles, and algorithmic scripts published in our technical articles are released under the terms of the MIT License. You are free to integrate these snippets into commercial, internal, or open-source software applications without paying royalties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
            3. AI Training & Automated Data Mining
          </h2>
          <p>
            DailySignal asserts its full reservation of rights regarding commercial text and data mining under EU Directive 2019/790 and US Fair Use doctrines. Unauthorized automated bulk extraction for training commercial closed-source AI foundational models is not permitted without explicit licensing agreement.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
            4. Limitation of Liability & Professional Advice
          </h2>
          <p>
            The analyses published by DailySignal reflect journalistic investigations and technical commentary. They do not constitute formal investment, legal, or production architectural guarantees. Consult our comprehensive <Link to="/disclaimer" className="underline text-amber-700 font-medium">Editorial & Financial Disclaimer</Link> for detailed risk notices.
          </p>
        </section>
      </div>
    </div>
  );
}
