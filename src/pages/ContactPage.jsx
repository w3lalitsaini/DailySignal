import React, { useEffect } from "react";
import { ContactForm } from "../components/forms/ContactForm";
import { updateSEO } from "../lib/seo";
import { Mail, MapPin, Send, HelpCircle, Newspaper, Clock, ShieldCheck, MessageSquare } from "lucide-react";

export function ContactPage() {
  useEffect(() => {
    updateSEO({
      title: "Contact Newsroom & Editorial Tips — DailySignal",
      description: "Get in touch with the DailySignal editorial newsroom, pitch a technical investigation, or report an errata.",
      ogType: "website"
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="max-w-3xl mb-12">
        <span className="text-xs uppercase font-bold tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Newsroom Desk & Inquiries
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-stone-950 mt-3 mb-4 tracking-tight">
          Connect with DailySignal.
        </h1>
        <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-light">
          Have an engineering insight to share, a security vulnerability to disclose, or feedback on our coverage? Our editors review every submission.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        {/* Left: Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs">
          <h2 className="font-serif text-2xl font-medium text-stone-900 mb-2">Send an Editorial Message</h2>
          <p className="text-xs text-stone-500 mb-6">Fill out the secure submission form below. All technical pitches are reviewed within 48 business hours.</p>
          <ContactForm />
        </div>

        {/* Right: Info & Pitch Guidelines (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl border border-stone-200 bg-white shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-medium text-stone-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-700" />
              Direct Editorial Inboxes
            </h3>

            <div className="space-y-4 text-xs text-stone-600">
              <div className="pb-3 border-b border-stone-100">
                <strong className="block text-stone-900 font-semibold mb-0.5">
                  Editorial Tips & Whistleblowing:
                </strong>
                <a href="mailto:tips@dailysignal.dev" className="text-amber-800 underline font-medium">
                  tips@dailysignal.dev
                </a>
                <p className="text-[11px] text-stone-400 mt-0.5">PGP Key ID: 0x4F92B81A (Available on request)</p>
              </div>

              <div className="pb-3 border-b border-stone-100">
                <strong className="block text-stone-900 font-semibold mb-0.5">
                  Corrections & Errata Desk:
                </strong>
                <a href="mailto:corrections@dailysignal.dev" className="text-amber-800 underline font-medium">
                  corrections@dailysignal.dev
                </a>
                <p className="text-[11px] text-stone-400 mt-0.5">Please provide article URL and specific paragraph citations.</p>
              </div>

              <div>
                <strong className="block text-stone-900 font-semibold mb-0.5">
                  Syndication & Licensing:
                </strong>
                <a href="mailto:partnerships@dailysignal.dev" className="text-amber-800 underline font-medium">
                  partnerships@dailysignal.dev
                </a>
                <p className="text-[11px] text-stone-400 mt-0.5">Academic and corporate redistribution licenses.</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-stone-200 bg-amber-50/50 space-y-3">
            <h4 className="font-serif text-base font-semibold text-stone-900 flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-amber-700" />
              Contributor Pitch Guidelines
            </h4>
            <p className="text-xs text-stone-700 leading-relaxed">
              We seek deep technical contributions from practicing software engineers, cybersecurity researchers, and infrastructure specialists. Please include code examples, production benchmarks, and demonstrable findings.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-stone-200 bg-white shadow-xs space-y-3">
            <h4 className="font-serif text-base font-semibold text-stone-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-700" />
              Response SLA & Newsroom Hours
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Our newsroom operates Monday through Friday, 08:00 - 18:00 UTC. Urgent security vulnerability disclosures are triaged 24/7.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Inquiries Section */}
      <section className="pt-8 border-t border-stone-200">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-6">
          Frequently Asked Newsroom Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-stone-200 bg-white shadow-xs">
            <h4 className="font-serif font-semibold text-stone-900 mb-2">Can I pitch a guest technical article?</h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Yes. We accept unsolicited pitches from practicing engineers and researchers. Your pitch should outline the architectural problem, your proposed solution, and empirical benchmarks. We do not accept promotional SEO guest posts.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-stone-200 bg-white shadow-xs">
            <h4 className="font-serif font-semibold text-stone-900 mb-2">How do you protect whistleblowers and confidential sources?</h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We uphold journalistic shield protections. You may contact us via Signal, PGP-encrypted email, or secure anonymous postal drop. We never log IP addresses or client telemetry on source inquiries.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-stone-200 bg-white shadow-xs">
            <h4 className="font-serif font-semibold text-stone-900 mb-2">Can I syndicate DailySignal articles for internal company training?</h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              All our articles are open access for individual readers. For organization-wide intranet syndication or university course packet reprints, email our partnerships desk for free educational clearance.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-stone-200 bg-white shadow-xs">
            <h4 className="font-serif font-semibold text-stone-900 mb-2">How fast do you issue factual corrections?</h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Verified factual errata are corrected within 4 hours of receipt. A formal revision notice is permanently preserved at the top of the article for public auditability.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
