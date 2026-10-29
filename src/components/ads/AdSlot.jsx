import React, { useEffect, useRef } from "react";
import { isAdSenseConfigured, requestAdFill } from "../../lib/adsense";
import { useConsent } from "../../context/ConsentContext";

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

  if (!allowed) {
    return null;
  }

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
        className="w-full flex items-center justify-center rounded border border-stone-200/60 bg-stone-50/40 p-3 transition-colors"
      >
        <ins
          className="adsbygoogle"
          style={{ display: "block", minHeight }}
          data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      </div>
    </aside>
  );
}
