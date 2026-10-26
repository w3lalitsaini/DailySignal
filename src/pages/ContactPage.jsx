import React, { useEffect } from "react";
import { ContactForm } from "../components/forms/ContactForm";
import { updateSEO } from "../lib/seo";
import { Mail, MapPin, Send, HelpCircle, Newspaper } from "lucide-react";

export function ContactPage() {
  useEffect(() => {
    updateSEO({
      title: "Contact Newsroom & Editorial Tips — DailySignal",
      description: "Get in touch with the DailySignal editorial newsroom, pitch a technical investigation, or report an errata.",
      ogType: "website"
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="max-w-3xl mb-12">
        <span className="text-xs uppercase font-bold tracking-wider text-amber-700 dark:text-amber-500">
          Newsroom Desk
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-stone-950 dark:text-stone-50 mt-1 mb-4">
          Contact DailySignal
        </h1>
        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-light">
          Have an engineering insight to share, a security vulnerability to disclose, or feedback on our coverage? Our editors review every submission.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        {/* Right: Info & Pitch Guidelines (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 space-y-4">
            <h3 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-600 dark:text-amber-500" />
              Direct Editorial Inboxes
            </h3>

            <div className="space-y-3 text-xs text-stone-600 dark:text-stone-400">
              <div>
                <strong className="block text-stone-900 dark:text-stone-200 font-semibold">
                  Editorial Tips & Whistleblowing:
                </strong>
                <a href="mailto:tips@dailysignal.dev" className="text-amber-700 dark:text-amber-400 underline">
                  tips@dailysignal.dev
                </a>
              </div>

              <div>
                <strong className="block text-stone-900 dark:text-stone-200 font-semibold">
                  Corrections & Errata Desk:
                </strong>
                <a href="mailto:corrections@dailysignal.dev" className="text-amber-700 dark:text-amber-400 underline">
                  corrections@dailysignal.dev
                </a>
              </div>

              <div>
                <strong className="block text-stone-900 dark:text-stone-200 font-semibold">
                  Syndication & Partnerships:
                </strong>
                <a href="mailto:partnerships@dailysignal.dev" className="text-amber-700 dark:text-amber-400 underline">
                  partnerships@dailysignal.dev
                </a>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40 space-y-3">
            <h4 className="font-serif text-base font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-stone-600 dark:text-stone-400" />
              Contributor Pitch Guidelines
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              We seek deep technical contributions from practicing software engineers, cybersecurity researchers, and infrastructure specialists. Please include code examples, production benchmarks, and demonstrable findings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
