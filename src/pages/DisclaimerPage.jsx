import React, { useEffect } from "react";
import { updateSEO } from "../lib/seo";
import { AlertTriangle } from "lucide-react";

export function DisclaimerPage() {
  useEffect(() => {
    updateSEO({
      title: "Editorial & Professional Disclaimer — DailySignal",
      description: "Important legal disclaimers regarding technology benchmarks, financial reporting, and cybersecurity guidance on DailySignal.",
      keywords: [
        "editorial disclaimer",
        "legal notice",
        "technology benchmarks disclaimer",
        "cybersecurity advisory notice"
      ],
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80",
      ogType: "website"
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="mb-10 pb-6 border-b border-stone-200">
        <span className="text-xs uppercase font-bold tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Risk & Responsibility
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-950 mt-3 mb-3">
          Editorial & Advice Disclaimer
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Last revised: March 2026 • DailySignal Independent Media
        </p>
      </div>

      <div className="text-xs sm:text-sm text-stone-700 space-y-6 leading-relaxed">
        <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 text-xs text-amber-900 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Summary:</strong> DailySignal publishes educational journalism, architectural analyses, and news commentary. We do not provide licensed financial, legal, or professional cybersecurity audit services.
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
            1. No Financial or Investment Advice
          </h2>
          <p>
            Articles discussing creator monetization, EV total cost of ownership, banking protocols, or business models are intended solely for general informational and educational purposes. Nothing on this website constitutes financial, investment, or tax advice. Always consult certified financial planners or tax counsel before undertaking major capital commitments.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
            2. Cybersecurity & Law Enforcement Inquiries
          </h2>
          <p>
            Our investigative reporting on digital payment frauds, UPI vulnerabilities, and cybercrime syndicates provides preventative guidance. In the event of active financial extortion, cyber fraud, or digital arrest scams, citizens should immediately contact official statutory authorities, the National Cyber Crime Helpline (dial <strong>1930</strong> in India), or file reports via <strong>cybercrime.gov.in</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
            3. Software Architecture & Production Benchmarks
          </h2>
          <p>
            Performance metrics, memory consumption comparisons, and code snippets are evaluated against specific hardware and environment baselines. Readers are strongly advised to run independent benchmarks within their own infrastructure prior to deploying architectural changes to production systems.
          </p>
        </section>
      </div>
    </div>
  );
}
