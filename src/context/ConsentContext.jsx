import React, { createContext, useContext, useState, useEffect } from "react";
import { getStoredConsent, saveStoredConsent } from "../lib/storage";
import { initAnalytics } from "../lib/analytics";
import { initAdSense } from "../lib/adsense";

const ConsentContext = createContext();

export function ConsentProvider({ children }) {
  const [consent, setConsent] = useState(() => getStoredConsent());
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if consent was already decided
    if (!consent.decided) {
      // Show banner after brief delay
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    } else {
      // Trigger integrations if consent already granted
      if (consent.analytics) initAnalytics();
      if (consent.advertising) initAdSense();
    }
  }, [consent]);

  const acceptAll = () => {
    const updated = {
      decided: true,
      essential: true,
      analytics: true,
      advertising: true
    };
    saveStoredConsent(updated);
    setConsent(updated);
    setShowBanner(false);
    initAnalytics();
    initAdSense();
  };

  const rejectNonEssential = () => {
    const updated = {
      decided: true,
      essential: true,
      analytics: false,
      advertising: false
    };
    saveStoredConsent(updated);
    setConsent(updated);
    setShowBanner(false);
  };

  const updateCustomConsent = (custom) => {
    const updated = {
      ...consent,
      ...custom,
      decided: true,
      essential: true
    };
    saveStoredConsent(updated);
    setConsent(updated);
    setShowBanner(false);
    if (updated.analytics) initAnalytics();
    if (updated.advertising) initAdSense();
  };

  return (
    <ConsentContext.Provider
      value={{
        consent,
        showBanner,
        setShowBanner,
        acceptAll,
        rejectNonEssential,
        updateCustomConsent
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}
