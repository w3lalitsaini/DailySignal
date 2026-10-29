import React from "react";
import { X, Sliders, Eye, RotateCcw, Check, Sparkles } from "lucide-react";
import { useReaderPreferences } from "../../context/ReaderPreferencesContext";

export function ReaderControlsModal() {
  const {
    fontFamily,
    setFontFamily,
    fontSize,
    setFontSize,
    lineSpacing,
    setLineSpacing,
    contentWidth,
    setContentWidth,
    focusMode,
    toggleFocusMode,
    isReaderModalOpen,
    setIsReaderModalOpen,
    resetPreferences
  } = useReaderPreferences();

  if (!isReaderModalOpen) return null;

  const fontOptions = [
    { id: "reading", name: "Lora", label: "Literary Serif", preview: "The quick brown fox" },
    { id: "serif", name: "Newsreader", label: "Editorial Classic", preview: "The quick brown fox" },
    { id: "sans", name: "Plus Jakarta", label: "Clean Modern Sans", preview: "The quick brown fox" },
    { id: "mono", name: "JetBrains Mono", label: "Developer Monospace", preview: "The quick brown fox" }
  ];

  const sizeOptions = [
    { id: "sm", label: "16px", title: "Compact" },
    { id: "base", label: "18px", title: "Standard" },
    { id: "lg", label: "20px", title: "Comfortable" },
    { id: "xl", label: "22px", title: "Large" }
  ];

  const spacingOptions = [
    { id: "compact", label: "Compact (1.65)" },
    { id: "relaxed", label: "Relaxed (1.85)" },
    { id: "spacious", label: "Spacious (2.10)" }
  ];

  const widthOptions = [
    { id: "narrow", label: "Focused (680px)" },
    { id: "normal", label: "Editorial (840px)" },
    { id: "wide", label: "Wide Canvas (1024px)" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reader-settings-title"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 id="reader-settings-title" className="font-serif text-lg font-bold text-stone-900">
                Reader Customization
              </h3>
              <p className="text-xs text-stone-500">
                Tailor your reading typography, spacing, and focus
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsReaderModalOpen(false)}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition"
            aria-label="Close reader settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Live Preview Box */}
          <div className="p-4 rounded-xl border border-amber-200/70 bg-amber-50/40">
            <div className="flex items-center justify-between mb-2 text-[11px] font-semibold text-amber-900">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                Live Typography Preview
              </span>
              <span className="text-stone-400 font-mono text-[10px]">
                {fontFamily.toUpperCase()} • {fontSize.toUpperCase()}
              </span>
            </div>
            <p
              className={`text-stone-800 transition-all ${
                fontFamily === "serif"
                  ? "font-serif"
                  : fontFamily === "sans"
                  ? "font-sans"
                  : fontFamily === "mono"
                  ? "font-mono"
                  : "font-reading"
              } ${
                fontSize === "sm"
                  ? "text-sm"
                  : fontSize === "base"
                  ? "text-base"
                  : fontSize === "lg"
                  ? "text-lg"
                  : "text-xl"
              } ${
                lineSpacing === "compact"
                  ? "leading-snug"
                  : lineSpacing === "relaxed"
                  ? "leading-relaxed"
                  : "leading-loose"
              }`}
            >
              "The design of digital publications should disappear behind the substance of journalism. Typography and cadence shape how clarity is formed."
            </p>
          </div>

          {/* 1. Font Family */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
              Typeface
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {fontOptions.map((opt) => {
                const isSelected = fontFamily === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setFontFamily(opt.id)}
                    className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                      isSelected
                        ? "border-amber-600 bg-amber-50/50 text-stone-900 ring-1 ring-amber-600/30 shadow-xs"
                        : "border-stone-200 bg-white hover:bg-stone-50 text-stone-700"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-semibold text-xs text-stone-900">{opt.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-700" />}
                    </div>
                    <span className="text-[10px] text-stone-500">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Font Size */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Text Size
              </label>
              <span className="text-stone-400 font-mono text-[11px]">
                {sizeOptions.find((s) => s.id === fontSize)?.title}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {sizeOptions.map((s) => {
                const isSelected = fontSize === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setFontSize(s.id)}
                    className={`py-2 px-3 rounded-lg border text-center font-medium transition ${
                      isSelected
                        ? "border-stone-900 bg-stone-900 text-white shadow-xs"
                        : "border-stone-200 bg-white hover:bg-stone-50 text-stone-700"
                    }`}
                  >
                    <span className="block text-xs font-bold">{s.label}</span>
                    <span className="block text-[9px] opacity-80">{s.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Line Spacing */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
              Line Spacing & Breathing Room
            </label>
            <div className="grid grid-cols-3 gap-2">
              {spacingOptions.map((sp) => {
                const isSelected = lineSpacing === sp.id;
                return (
                  <button
                    key={sp.id}
                    onClick={() => setLineSpacing(sp.id)}
                    className={`py-2 px-2.5 rounded-lg border text-center transition text-xs font-medium ${
                      isSelected
                        ? "border-amber-600 bg-amber-50 text-amber-900 font-semibold"
                        : "border-stone-200 bg-white hover:bg-stone-50 text-stone-600"
                    }`}
                  >
                    {sp.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Reading Width */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
              Reading Column Width
            </label>
            <div className="grid grid-cols-3 gap-2">
              {widthOptions.map((w) => {
                const isSelected = contentWidth === w.id;
                return (
                  <button
                    key={w.id}
                    onClick={() => setContentWidth(w.id)}
                    className={`py-2 px-2.5 rounded-lg border text-center transition text-xs font-medium ${
                      isSelected
                        ? "border-amber-600 bg-amber-50 text-amber-900 font-semibold"
                        : "border-stone-200 bg-white hover:bg-stone-50 text-stone-600"
                    }`}
                  >
                    {w.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Distraction-Free Focus Mode Toggle */}
          <div className="pt-2 border-t border-stone-200">
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-stone-200 bg-stone-50">
              <div className="flex items-center gap-2.5">
                <Eye className="w-4 h-4 text-stone-600" />
                <div>
                  <h4 className="font-semibold text-xs text-stone-900">Distraction-Free Focus Mode</h4>
                  <p className="text-[11px] text-stone-500">
                    Hides header, sidebar, and sponsor blocks on articles
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleFocusMode}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  focusMode ? "bg-amber-600" : "bg-stone-300"
                }`}
                role="switch"
                aria-checked={focusMode}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    focusMode ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-stone-200 bg-stone-50/70 flex items-center justify-between">
          <button
            onClick={resetPreferences}
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 font-medium transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>
          <button
            onClick={() => setIsReaderModalOpen(false)}
            className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
