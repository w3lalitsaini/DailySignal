import React, { useEffect } from "react";
import { updateSEO } from "../lib/seo";
import { AlertTriangle, ShieldAlert } from "lucide-react";

export function DisclaimerPage() {
  useEffect(() => {
    updateSEO({
      title: "Editorial & Professional Disclaimer — DailySignal",
      description: "Important legal disclaimers regarding technology benchmarks, financial reporting, and cybersecurity guidance on DailySignal."
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="mb-10 pb-6 border-b border-stone-200 dark:border-stone-800">
        <span className="text-xs uppercase font-bold tracking-wider text-amber-700 dark:text-amber-500">
          Risk & Responsibility
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-950 dark:text-stone-50 mt-1 mb-3">
          Editorial & Advice Disclaimer
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Last revised: March 2026
        </p>
      </div>

      <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 space-y-6 leading-relaxed">
        <div className="p-4 rounded-xl border border-amber-200/80 dark:border-amber-900/40 bg-amber-50/70 dark:bg-amber-950/20 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Summary:</strong> DailySignal publishes educational journalism, architectural analyses, and news commentary. We do not provide licensed financial, legal, or professional cybersecurity audit services.
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100">
            1. No Financial or Investment Advice
          </h2>
          <p>
            Articles discussing creator monetization, EV total cost of ownership, banking protocols, or business models are intended solely for general informational and educational purposes. Nothing on this website constitutes financial, investment, or tax advice. Always consult certified financial planners or tax counsel before undertaking major capital commitments.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100">
            2. Cybersecurity & Law Enforcement Inquiries
          </h2>
          <p>
            Our investigative reporting on digital payment frauds, UPI vulnerabilities, and cybercrime syndicates provides preventative guidance. In the event of active financial extortion, cyber fraud, or digital arrest scams, citizens should immediately contact official statutory authorities, the National Cyber Crime Helpline (dial <strong>1930</strong> in India), or file reports via <strong>cybercrime.gov.in</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100">
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
