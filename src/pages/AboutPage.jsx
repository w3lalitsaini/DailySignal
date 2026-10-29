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
  HelpCircle,
  TrendingUp,
  Users,
  BookOpen,
  Globe2,
  FileText,
  Lock
} from "lucide-react";

export function AboutPage() {
  useEffect(() => {
    updateSEO({
      title: "About DailySignal — Editorial Charter, Newsroom Standards & Independence",
      description: "Learn about DailySignal's mission, newsroom standards, engineering team, and commitment to independent digital journalism.",
      keywords: [
        "about dailysignal",
        "editorial charter",
        "tech journalism ethics",
        "engineering newsroom",
        "independent tech publication",
        "technology journalists"
      ],
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
      ogType: "website"
    });
  }, []);

  const authorsList = Object.values(authors);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <span className="text-xs uppercase font-bold tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Editorial Charter & Mission
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-stone-950 mt-3 mb-6 tracking-tight">
          Rigorous Reporting for the Modern Digital Age.
        </h1>
        <p className="text-lg sm:text-xl text-stone-700 leading-relaxed font-light">
          DailySignal was founded on a simple conviction: technology journalism should respect the reader's intelligence. We produce verifiable, deep architectural analysis free from sensationalism, sponsored puff-pieces, and clickbait.
        </p>
      </div>

      {/* Featured Editorial Photo Showcase */}
      <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm mb-16">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
          alt="DailySignal editorial team collaborating in newsroom"
          className="w-full h-72 sm:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent flex items-end p-6 sm:p-8">
          <p className="text-white text-sm sm:text-base font-serif italic max-w-2xl">
            "We believe truth is best served through deep technical comprehension, reproducible benchmarks, and relentless independence from commercial coercion."
          </p>
        </div>
      </div>

      {/* Editorial Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
        <div className="p-6 rounded-2xl border border-stone-200 bg-white text-center shadow-xs">
          <BookOpen className="w-6 h-6 text-amber-700 mx-auto mb-2" />
          <div className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">25+</div>
          <p className="text-xs text-stone-500 font-medium uppercase tracking-wider mt-1">In-Depth Guides</p>
        </div>
        <div className="p-6 rounded-2xl border border-stone-200 bg-white text-center shadow-xs">
          <Users className="w-6 h-6 text-amber-700 mx-auto mb-2" />
          <div className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">250K+</div>
          <p className="text-xs text-stone-500 font-medium uppercase tracking-wider mt-1">Monthly Readers</p>
        </div>
        <div className="p-6 rounded-2xl border border-stone-200 bg-white text-center shadow-xs">
          <Globe2 className="w-6 h-6 text-amber-700 mx-auto mb-2" />
          <div className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">100%</div>
          <p className="text-xs text-stone-500 font-medium uppercase tracking-wider mt-1">Open Access</p>
        </div>
        <div className="p-6 rounded-2xl border border-stone-200 bg-white text-center shadow-xs">
          <Lock className="w-6 h-6 text-amber-700 mx-auto mb-2" />
          <div className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">0</div>
          <p className="text-xs text-stone-500 font-medium uppercase tracking-wider mt-1">Paywalls or Trackers</p>
        </div>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
        <div className="p-6 sm:p-8 rounded-2xl border border-stone-200 bg-white shadow-xs">
          <Feather className="w-7 h-7 text-amber-700 mb-4" />
          <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">
            Technical Rigor
          </h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            Every software guide, security investigation, and infrastructure comparison is written and peer-reviewed by practitioners with real-world production experience.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl border border-stone-200 bg-white shadow-xs">
          <Shield className="w-7 h-7 text-amber-700 mb-4" />
          <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">
            Editorial Independence
          </h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            Our newsroom maintains an impenetrable firewall between editorial coverage and commercial advertising. We never accept paid reviews or sponsored articles disguised as reporting.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl border border-stone-200 bg-white shadow-xs">
          <Award className="w-7 h-7 text-amber-700 mb-4" />
          <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">
            Public Interest First
          </h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            From uncovering cyber fraud syndicates to auditing client-side telemetry and data brokers, our journalism champions reader sovereignty, privacy, and digital literacy.
          </p>
        </div>
      </div>

      {/* Editorial Team */}
      <section className="my-16">
        <div className="mb-8">
          <span className="text-xs uppercase font-bold tracking-wider text-amber-800">
            Newsroom Masthead
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-medium text-stone-900 mt-1">
            Staff Writers & Technical Editors
          </h2>
          <p className="text-sm text-stone-600 mt-2 max-w-2xl">
            Meet the domain experts who research, write, and verify our technical guides and investigations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authorsList.map((author) => (
            <div
              key={author.id}
              className="p-6 rounded-2xl border border-stone-200 bg-white text-center sm:text-left flex flex-col items-center sm:items-start shadow-xs hover:border-amber-400 transition"
            >
              <img
                src={author.avatar}
                alt={author.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-stone-100 shadow-xs mb-4"
              />
              <h3 className="font-serif text-lg font-semibold text-stone-900">
                {author.name}
              </h3>
              <span className="text-xs text-amber-700 font-medium mb-3">
                {author.role}
              </span>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                {author.bio}
              </p>
              <div className="mt-auto flex items-center gap-3 text-xs text-stone-400">
                <span>{author.twitter}</span>
                <span>•</span>
                <span>github/{author.github}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ethics & Advertising Policy */}
      <section id="standards" className="my-16 p-8 sm:p-10 rounded-2xl border border-stone-200 bg-stone-50">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-6">
          Editorial Standards & Code of Ethics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-stone-700 leading-relaxed">
          <div className="space-y-4">
            <div>
              <h4 className="font-serif font-semibold text-stone-900 mb-1 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Fact-Checking & Reproducibility
              </h4>
              <p className="text-xs sm:text-sm text-stone-600">
                All benchmark numbers, code blocks, and hardware specifications undergo empirical testing in our lab before publication. When reproducing open-source repos, we cite the exact commit SHAs.
              </p>
            </div>

            <div>
              <h4 className="font-serif font-semibold text-stone-900 mb-1 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Corrections & Errata Transparency
              </h4>
              <p className="text-xs sm:text-sm text-stone-600">
                When errors are found, we append an explicit correction box at the top of the article explaining what was changed, why, and the exact timestamp of update.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-serif font-semibold text-stone-900 mb-1 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Generative AI Usage Disclosure
              </h4>
              <p className="text-xs sm:text-sm text-stone-600">
                We do not publish autogenerated AI articles. AI tools are strictly used for copyediting assistance and preliminary research summaries. Every published word is crafted, verified, and signed by a named author.
              </p>
            </div>

            <div>
              <h4 className="font-serif font-semibold text-stone-900 mb-1 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Advertising & Affiliate Boundaries
              </h4>
              <p className="text-xs sm:text-sm text-stone-600">
                Advertisements (including future Google AdSense modules) are unambiguously marked with "ADVERTISEMENT". Advertisers hold zero editorial preview or review privileges.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
