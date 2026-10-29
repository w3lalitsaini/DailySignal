import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, ShieldCheck, RefreshCw } from "lucide-react";
import { siteConfig } from "../../data/siteConfig";

const FORMSPREE_ENDPOINT = siteConfig.contactFormEndpoint || "https://formspree.io/f/mnnzblkd";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Editorial Pitch / Story Tip",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // "idle" | "submitting" | "submitted" | "error"
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Please provide your name.";
    if (!formData.email.trim()) {
      errs.email = "Please provide your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please provide a valid email address.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters long.";
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("submitting");
    setServerError("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject,
          message: formData.message.trim(),
          formSource: "DailySignal Newsroom & Story Pitch Desk",
          submittedAt: new Date().toISOString()
        })
      });

      if (response.ok) {
        setStatus("submitted");
      } else {
        const data = await response.json().catch(() => null);
        setStatus("error");
        setServerError(
          data?.error || data?.errors?.map((err) => err.message).join(", ") || "Failed to deliver message to editorial desk. Please try again."
        );
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      setServerError("A network error occurred while contacting Formspree. Please check your connection and retry.");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      subject: "Editorial Pitch / Story Tip",
      message: ""
    });
    setStatus("idle");
    setServerError("");
  };

  if (status === "submitted") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-8 text-center animate-in fade-in duration-300">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-4 shadow-xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
          Message Successfully Transmitted
        </h3>
        <p className="text-sm text-stone-600 max-w-md mx-auto mb-5 leading-relaxed">
          Thank you, <strong>{formData.name}</strong>. Your dispatch regarding "<em>{formData.subject}</em>" has been securely received by the DailySignal newsroom via Formspree.
        </p>

        <div className="inline-block text-left text-xs bg-white p-4 rounded-xl border border-stone-200 max-w-md w-full mb-6 text-stone-600 shadow-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100 text-[11px] font-mono text-emerald-800">
            <span className="flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Formspree Endpoint Active
            </span>
            <span>mnnzblkd</span>
          </div>
          <p><strong>Sender:</strong> {formData.email}</p>
          <p><strong>Subject:</strong> {formData.subject}</p>
          <p className="mt-1.5 text-stone-700 line-clamp-3">
            <strong>Brief:</strong> "{formData.message}"
          </p>
        </div>

        <div>
          <button
            onClick={handleReset}
            className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-stone-900 text-white hover:bg-stone-800 transition shadow-xs cursor-pointer"
          >
            Send Another Dispatch
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Live Formspree Connection Status Strip */}
      <div className="mb-5 p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs text-stone-600">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
          </span>
          <span className="font-semibold text-stone-900 font-sans">
            Direct Newsroom Gateway
          </span>
          <span className="text-stone-300">•</span>
          <span className="font-mono text-[11px] text-stone-500 hidden sm:inline">
            formspree.io/f/mnnzblkd
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
          LIVE ENDPOINT
        </span>
      </div>

      {status === "error" && (
        <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <strong className="block font-semibold mb-0.5">Delivery Issue:</strong>
            <p>{serverError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1.5">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Vikramaditya Roy"
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                errors.name ? "border-red-400" : "border-stone-200"
              } bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400`}
            />
            {errors.name && (
              <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@domain.com"
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                errors.email ? "border-red-400" : "border-stone-200"
              } bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400`}
            />
            {errors.email && (
              <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1.5">
            Subject
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-200 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
          >
            <option value="Editorial Pitch / Story Tip">Editorial Pitch / Story Tip</option>
            <option value="Correction / Errata Report">Correction / Errata Report</option>
            <option value="Syndication & Licensing Inquiry">Syndication & Licensing Inquiry</option>
            <option value="Advertising & Sponsorship">Advertising & Sponsorship</option>
            <option value="General Feedback">General Feedback</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1.5">
            Message Details & Context <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Please detail your story pitch, technical findings, code references, or inquiry..."
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
              errors.message ? "border-red-400" : "border-stone-200"
            } bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400`}
          />
          {errors.message && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-stone-900 text-white hover:bg-stone-800 transition disabled:opacity-60 cursor-pointer shadow-xs"
        >
          {status === "submitting" ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Transmitting to Formspree...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send to Newsroom</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
