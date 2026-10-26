import { getStoredConsent } from "./storage";

let isAdSenseLoaded = false;
const ADSENSE_CLIENT_ID = import.meta.env.VITE_ADSENSE_CLIENT_ID;

/**
 * Returns whether AdSense is configured via environment variable
 */
export function isAdSenseConfigured() {
  return Boolean(
    ADSENSE_CLIENT_ID &&
    ADSENSE_CLIENT_ID.startsWith("ca-pub-") &&
    ADSENSE_CLIENT_ID !== "ca-pub-XXXXXXXXXXXXXXXX"
  );
}

/**
 * Load official Google AdSense script if client ID is configured and user consented to advertising cookies
 */
export function initAdSense() {
  if (typeof window === "undefined") return;
  if (isAdSenseLoaded) return;

  if (!isAdSenseConfigured()) {
    return;
  }

  const consent = getStoredConsent();
  if (!consent.advertising) {
    if (import.meta.env.DEV) {
      console.log("[DailySignal AdSense] User has not consented to advertising cookies. Ads remain in placeholder mode.");
    }
    return;
  }

  if (document.getElementById("google-adsense-script")) {
    isAdSenseLoaded = true;
    return;
  }

  try {
    const script = document.createElement("script");
    script.id = "google-adsense-script";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
    document.head.appendChild(script);
    isAdSenseLoaded = true;
    console.log(`[DailySignal AdSense] AdSense library loaded for client: ${ADSENSE_CLIENT_ID}`);
  } catch (e) {
    console.error("[DailySignal AdSense] Error loading AdSense script", e);
  }
}

/**
 * Request ad fill for an ins slot
 */
export function requestAdFill() {
  if (typeof window !== "undefined" && isAdSenseConfigured()) {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn("[DailySignal AdSense] adsbygoogle push error:", e);
    }
  }
}
