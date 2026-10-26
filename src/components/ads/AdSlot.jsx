import React, { useEffect, useRef } from "react";
import { isAdSenseConfigured, requestAdFill } from "../../lib/adsense";
import { useConsent } from "../../context/ConsentContext";
import { Info } from "lucide-react";

export function AdSlot({
  slotId = "0000000001",
  format = "auto",
  responsive = true,
  minHeight = "120px",
  label = "Advertisement",
  className = ""
}) {
  const adRef = useRef(null);
  const { consent } = useConsent();
  const configured = isAdSenseConfigured();
  const allowed = configured && consent.advertising;

  useEffect(() => {
    if (allowed) {
      requestAdFill();
    }
  }, [allowed, slotId]);

  return (
    <aside
      aria-label="Advertisement Container"
      className={`my-8 text-center overflow-hidden transition-all ${className}`}
    >
      {/* Editorial compliance disclaimer: ALWAYS distinct from content */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-[10px] tracking-widest uppercase font-semibold text-stone-400">
          — {label} —
        </span>
      </div>

      <div
        ref={adRef}
        style={{ minHeight }}
        className="w-full flex items-center justify-center rounded border border-dashed border-stone-200 bg-stone-50/70 p-4 transition-colors"
      >
        {allowed ? (
          <ins
            className="adsbygoogle"
            style={{ display: "block", minHeight }}
            data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID}
            data-ad-slot={slotId}
            data-ad-format={format}
            data-full-width-responsive={responsive ? "true" : "false"}
          />
        ) : (
          <div className="max-w-md mx-auto text-center py-4 px-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 mb-1">
              <Info className="w-3.5 h-3.5 text-amber-700" />
              <span>AdSense Ready Placeholder</span>
            </div>
            <p className="text-[11px] text-stone-400 leading-normal">
              Slot ID: <code className="font-mono text-stone-600">{slotId}</code> • Format: {format}
            </p>
            <p className="text-[11px] text-stone-400 mt-1">
              Activates automatically when <code className="font-mono text-[10px] bg-stone-200 px-1 py-0.5 rounded">VITE_ADSENSE_CLIENT_ID</code> is configured in <code className="font-mono text-[10px]">.env</code> and user grants advertising consent.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
