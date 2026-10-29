import React, { useState } from "react";
import { Mail, Check, AlertCircle, ArrowRight, Sparkles } from "lucide-react";
import { trackNewsletter } from "../../lib/analytics";
import { siteConfig } from "../../data/siteConfig";

const FORMSPREE_ENDPOINT = siteConfig.contactFormEndpoint || "https://formspree.io/f/mnnzblkd";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address (e.g., name@domain.com).");
      trackNewsletter("error_invalid_email", variant);
      return;
    }

    setStatus("loading");
    trackNewsletter("attempted", variant);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          email: email.trim(),
          subscription: title,
          variant,
          formType: "Newsletter Subscription",
          source: "DailySignal Brief",
          subscribedAt: new Date().toISOString()
        })
      });

      if (response.ok) {
        setStatus("success");
        trackNewsletter("submitted_formspree", variant);
      } else {
        const data = await response.json().catch(() => null);
        setStatus("error");
        setErrorMsg(
          data?.error || data?.errors?.map((err) => err.message).join(", ") || "Failed to subscribe. Please try again."
        );
      }
    } catch (err) {
      console.error("Newsletter submission error:", err);
      setStatus("error");
      setErrorMsg("Network error contacting server. Please check your connection and retry.");
    }
  };

  const handleReset = () => {
    setEmail("");
    setStatus("idle");
    setErrorMsg("");
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-6 text-center animate-in fade-in duration-300">
        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-3">
          <Check className="w-5 h-5" />
        </div>
        <h4 className="font-serif font-bold text-stone-900 text-base mb-1">
          Subscription Confirmed!
        </h4>
        <p className="text-xs text-stone-600 mb-2 max-w-sm mx-auto">
          You are subscribed with <strong className="font-semibold text-stone-800">{email}</strong>.
        </p>
        <p className="text-xs text-stone-500 mb-3">
          We've added your address to the Sunday dispatch digest.
        </p>
        <div>
          <button
            onClick={handleReset}
            className="text-xs underline text-stone-500 hover:text-stone-800 cursor-pointer"
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
              className="w-full pl-10 pr-24 py-2.5 text-xs rounded-lg border border-stone-200 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-md bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition"
            >
              Join
            </button>
          </div>
          {status === "error" && (
            <p className="text-[11px] text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errorMsg}
            </p>
          )}
        </form>
        <p className="text-[10px] text-stone-400 mt-2">
          No spam, ever. Unsubscribe at any time.
        </p>
      </div>
    );
  }

  // Default "card" variant
  return (
    <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-8 md:p-10 shadow-xs">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Curated Sunday Digest</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-serif font-medium text-stone-900 tracking-tight mb-3">
          {title}
        </h3>

        <p className="text-sm text-stone-600 leading-relaxed mb-6 max-w-xl mx-auto">
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
                className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border border-stone-200 bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition cursor-pointer shadow-sm shrink-0"
            >
              <span>Subscribe Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {status === "error" && (
            <p className="text-xs text-red-600 flex items-center justify-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errorMsg}
            </p>
          )}

          <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-stone-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Direct delivery to our editorial dispatch desk. Privacy guaranteed.</span>
          </div>
        </form>
      </div>
    </div>
  );
}
