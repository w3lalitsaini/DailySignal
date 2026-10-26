import React, { useState } from "react";
import { Mail, Check, AlertCircle, ArrowRight, Sparkles } from "lucide-react";
import { trackNewsletter } from "../../lib/analytics";

export function NewsletterForm({
  variant = "card", // "card" | "compact" | "inline"
  title = "The Weekly Editorial Dispatch",
  description = "Join 28,000+ developers, architects, and founders receiving our curated Sunday brief on AI engineering, systems design, and digital privacy."
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("");

  const validateEmail = (val) => {
    return String(val)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address (e.g., name@domain.com).");
      trackNewsletter("error_invalid_email", variant);
      return;
    }

    setStatus("loading");
    trackNewsletter("attempted", variant);

    // Simulate friendly frontend demo delay
    setTimeout(() => {
      setStatus("success");
      trackNewsletter("submitted_demo", variant);
    }, 600);
  };

  const handleReset = () => {
    setEmail("");
    setStatus("idle");
    setErrorMsg("");
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/50 dark:bg-emerald-950/20 p-6 text-center animate-in fade-in duration-300">
        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-3">
          <Check className="w-5 h-5" />
        </div>
        <h4 className="font-serif font-medium text-stone-900 dark:text-stone-100 text-base mb-1">
          Demo Subscription Recorded!
        </h4>
        <p className="text-xs text-stone-600 dark:text-stone-400 mb-3 max-w-sm mx-auto">
          You subscribed with <strong className="font-semibold text-stone-800 dark:text-stone-200">{email}</strong>.
        </p>
        <div className="inline-block bg-amber-100/70 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-[11px] px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800/50 mb-3">
          Notice: Frontend demo mode active. No emails are dispatched until connected to an ESP.
        </div>
        <div>
          <button
            onClick={handleReset}
            className="text-xs underline text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200"
          >
            Enter another address
          </button>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="relative">
            <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="Your professional email..."
              className="w-full pl-10 pr-24 py-2.5 text-xs rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-600"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-md bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-medium hover:bg-stone-800 dark:hover:bg-white transition"
            >
              Join
            </button>
          </div>
          {status === "error" && (
            <p className="text-[11px] text-red-600 dark:text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errorMsg}
            </p>
          )}
        </form>
        <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-2">
          Frontend demo mode • No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    );
  }

  // Default "card" variant
  return (
    <div className="relative overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-800/80 bg-gradient-to-b from-stone-50 to-white dark:from-stone-900/60 dark:to-stone-900/20 p-8 md:p-10">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Sunday Digest</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-serif font-medium text-stone-900 dark:text-stone-100 tracking-tight mb-3">
          {title}
        </h3>

        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-6 max-w-xl mx-auto">
          {description}
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="developer@company.com"
                aria-label="Email address"
                className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-600"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white transition cursor-pointer shadow-sm shrink-0"
            >
              <span>Subscribe Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {status === "error" && (
            <p className="text-xs text-red-600 dark:text-red-400 flex items-center justify-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errorMsg}
            </p>
          )}

          <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-stone-400 dark:text-stone-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Frontend demo: Validates input locally. No real email dispatch without ESP configuration.</span>
          </div>
        </form>
      </div>
    </div>
  );
}
