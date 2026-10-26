import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { authors } from "../data/authors";
import { updateSEO } from "../lib/seo";
import {
  Shield,
  Award,
  Feather,
  Sparkles,
  Layers,
  CheckCircle,
  HelpCircle
} from "lucide-react";

export function AboutPage() {
  useEffect(() => {
    updateSEO({
      title: "About DailySignal — Editorial Charter & Independence",
      description: "Learn about DailySignal's mission, newsroom standards, engineering team, and commitment to independent digital journalism.",
      ogType: "website"
    });
  }, []);

  const authorsList = Object.values(authors);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <span className="text-xs uppercase font-bold tracking-wider text-amber-700 dark:text-amber-500">
          Editorial Charter
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-stone-950 dark:text-stone-50 mt-1 mb-4">
          Rigorous Reporting for the Modern Digital Age.
        </h1>
        <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-light">
          DailySignal was founded on a simple conviction: technology journalism should respect the reader's intelligence. We produce verifiable, deep architectural analysis free from sensationalism, sponsored puff-pieces, and clickbait.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
        <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40">
          <Feather className="w-6 h-6 text-amber-600 dark:text-amber-500 mb-3" />
          <h3 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100 mb-2">
            Technical Rigor
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            Every software guide, security investigation, and infrastructure comparison is written by practitioners with real-world production experience.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40">
          <Shield className="w-6 h-6 text-amber-600 dark:text-amber-500 mb-3" />
          <h3 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100 mb-2">
            Editorial Independence
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            Our newsroom maintains an impenetrable firewall between editorial coverage and commercial advertising. We never accept paid reviews or sponsored article inserts disguised as editorial.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40">
          <Award className="w-6 h-6 text-amber-600 dark:text-amber-500 mb-3" />
          <h3 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100 mb-2">
            Public Interest First
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            From uncovering cross-border cyber fraud syndicates in India to investigating EV battery degradation, our journalism champions consumer sovereignty and safety.
          </p>
        </div>
      </div>

      {/* Editorial Team */}
      <section className="my-16">
        <div className="mb-8">
          <span className="text-xs uppercase font-bold tracking-wider text-stone-400">
            Newsroom Masthead
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 dark:text-stone-100 mt-1">
            Staff Writers & Technical Editors
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authorsList.map((author) => (
            <div
              key={author.id}
              className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 text-center sm:text-left flex flex-col items-center sm:items-start"
            >
              <img
                src={author.avatar}
                alt={author.name}
                className="w-14 h-14 rounded-full object-cover border border-stone-200 dark:border-stone-700 mb-3"
              />
              <h3 className="font-serif text-base font-semibold text-stone-900 dark:text-stone-100">
                {author.name}
              </h3>
              <span className="text-xs text-amber-700 dark:text-amber-400 font-medium mb-2">
                {author.role}
              </span>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                {author.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Ethics & Advertising Policy */}
      <section id="standards" className="my-16 p-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/30">
        <h2 className="font-serif text-2xl font-medium text-stone-900 dark:text-stone-100 mb-4">
          Editorial Standards & Advertising Disclosures
        </h2>
        <div className="space-y-4 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          <p>
            <strong>Corrections Policy:</strong> When factual errors occur, we append an explicit, transparent correction notice at the header of the article detailing the correction and timestamp.
          </p>
          <p id="ad-disclosure">
            <strong>Advertising Disclosures:</strong> Commercial advertisements (including future programmatic Google AdSense slots and partner banners) are strictly labeled with "ADVERTISEMENT" or "SPONSORED". Advertisements are never styled to mimic editorial news stories, and advertisers hold zero preview access or influence over our reporting.
          </p>
          <p>
            <strong>Technical Architecture:</strong> DailySignal is built using modern client-side technologies: Vite, React, React Router, and Tailwind CSS. All articles are statically loaded for lightning-fast reader performance without tracking or database overhead.
          </p>
        </div>
      </section>
    </div>
  );
}
