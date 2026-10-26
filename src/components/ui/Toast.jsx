import React, { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";
import { useBookmarks } from "../../context/BookmarkContext";

export function Toast() {
  const { toastMessage, clearToast } = useBookmarks();

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      clearToast();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toastMessage, clearToast]);

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-stone-900 text-white rounded-lg shadow-xl border border-stone-800 text-xs font-medium max-w-sm transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
    >
      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      <span className="flex-1">{toastMessage.text}</span>
      <button
        onClick={clearToast}
        aria-label="Close notification"
        className="opacity-70 hover:opacity-100 p-0.5"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
