import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../data/siteConfig";
import { categories } from "../../data/categories";
import { NewsletterForm } from "../forms/NewsletterForm";
import { TwitterIcon, GithubIcon, LinkedinIcon } from "../ui/SocialIcons";
import {
  Rss,
  ShieldCheck
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-stone-200 bg-stone-100/70 text-stone-600 text-xs transition-colors">
      {/* Newsletter Footer Band */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <NewsletterForm
          variant="card"
          title="Stay Ahead of the Engineering Curve"
          description="Every Sunday morning, we dissect the architecture of autonomous agents, modern frontend performance, digital security fraud, and independent publishing."
        />
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-stone-200/80">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-stone-900 text-white flex items-center justify-center font-serif font-bold text-sm">
                D
              </span>
              <span className="font-serif text-xl font-bold tracking-tight text-stone-950">
                {siteConfig.name}
              </span>
            </Link>

            <p className="text-stone-500 text-xs leading-relaxed max-w-sm">
              An independent digital publication dedicated to rigorous analysis, software engineering architecture, cybersecurity investigations, and the creator economy.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DailySignal on X"
                className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:border-stone-400 transition"
              >
                <TwitterIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DailySignal on GitHub"
                className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:border-stone-400 transition"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DailySignal on LinkedIn"
                className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:border-stone-400 transition"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DailySignal RSS Feed"
                className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-amber-600 hover:border-amber-500 transition"
              >
                <Rss className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Editorial Categories */}
          <div>
            <h4 className="font-sans font-semibold text-xs uppercase tracking-wider text-stone-900 mb-3">
              Categories
            </h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="hover:text-amber-700 transition"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation & Dispatches */}
          <div>
            <h4 className="font-sans font-semibold text-xs uppercase tracking-wider text-stone-900 mb-3">
              Editorial
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/articles" className="hover:text-stone-900 transition">
                  All 25 Stories
                </Link>
              </li>
              <li>
                <Link to="/trending" className="hover:text-stone-900 transition">
                  Trending Now
                </Link>
              </li>
              <li>
                <Link to="/bookmarks" className="hover:text-stone-900 transition">
                  Saved Bookmarks
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-stone-900 transition">
                  About & Newsroom
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-stone-900 transition">
                  Contact & Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Legal */}
          <div>
            <h4 className="font-sans font-semibold text-xs uppercase tracking-wider text-stone-900 mb-3">
              Legal & Privacy
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="hover:text-stone-900 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-stone-900 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-stone-900 transition">
                  Editorial Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-stone-900 transition">
                  Cookie Preferences
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclosures & Copyright */}
        <div className="mt-12 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              © {currentYear} {siteConfig.name}. Built with Vite, React & Tailwind CSS. Warm Editorial Light Theme.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/cookies" className="hover:underline">
              Manage Tracking
            </Link>
            <span>•</span>
            <Link to="/about#ad-disclosure" className="hover:underline">
              Advertising Disclosure
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
