import React, { useState } from "react";
import { Send, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Editorial Pitch / Story Tip",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // "idle" | "submitting" | "submitted"

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Please provide your name.";
    if (!formData.email.trim()) {
      errs.email = "Please provide your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please provide a valid email address.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      errs.message = "Message must be at least 15 characters long.";
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("submitting");

    setTimeout(() => {
      setStatus("submitted");
    }, 700);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      subject: "Editorial Pitch / Story Tip",
      message: ""
    });
    setStatus("idle");
  };

  if (status === "submitted") {
    return (
      <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 p-8 text-center animate-in fade-in duration-300">
        <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
        <h3 className="font-serif text-xl font-medium text-stone-900 dark:text-stone-100 mb-2">
          Demo Message Received
        </h3>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto mb-4">
          Thank you, <strong>{formData.name}</strong>. Your inquiry regarding "<em>{formData.subject}</em>" has been validated in the browser.
        </p>

        <div className="inline-block text-left text-xs bg-white dark:bg-stone-900 p-4 rounded-lg border border-stone-200 dark:border-stone-800 max-w-md w-full mb-6 text-stone-600 dark:text-stone-400">
          <p className="font-mono text-[11px] text-stone-400 mb-1">PROTOTYPE PAYLOAD PREVIEW:</p>
          <p><strong>From:</strong> {formData.email}</p>
          <p><strong>Subject:</strong> {formData.subject}</p>
          <p className="mt-2 line-clamp-2"><strong>Message:</strong> "{formData.message}"</p>
        </div>

        <div>
          <button
            onClick={handleReset}
            className="px-4 py-2 text-xs font-medium rounded-md bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white transition"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Explicit frontend limitation alert as required */}
      <div className="mb-6 p-4 rounded-lg bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
          <strong>Notice:</strong> This is an interactive frontend demo. Form inputs are thoroughly validated client-side, but no network transmission will occur until connected to a mail backend (e.g., Formspree, Resend, or your server API).
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Vikramaditya Roy"
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                errors.name ? "border-red-400 dark:border-red-600" : "border-stone-200 dark:border-stone-800"
              } bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-600`}
            />
            {errors.name && (
              <p className="text-[11px] text-red-600 dark:text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@domain.com"
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                errors.email ? "border-red-400 dark:border-red-600" : "border-stone-200 dark:border-stone-800"
              } bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-600`}
            />
            {errors.email && (
              <p className="text-[11px] text-red-600 dark:text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
            Subject
          </label>
          <select
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-600"
          >
            <option value="Editorial Pitch / Story Tip">Editorial Pitch / Story Tip</option>
            <option value="Correction / Errata Report">Correction / Errata Report</option>
            <option value="Syndication & Licensing Inquiry">Syndication & Licensing Inquiry</option>
            <option value="Advertising & Sponsorship">Advertising & Sponsorship</option>
            <option value="General Feedback">General Feedback</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Please detail your tip, question, or partnership proposal with relevant URLs or context..."
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
              errors.message ? "border-red-400 dark:border-red-600" : "border-stone-200 dark:border-stone-800"
            } bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-600`}
          />
          {errors.message && (
            <p className="text-[11px] text-red-600 dark:text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white transition disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span>{status === "submitting" ? "Validating Input..." : "Submit Message (Demo)"}</span>
        </button>
      </form>
    </div>
  );
}
