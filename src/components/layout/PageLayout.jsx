import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { AnnouncementStrip } from "./AnnouncementStrip";
import { Footer } from "./Footer";
import { CookieBanner } from "./CookieBanner";
import { Toast } from "../ui/Toast";
import { FakePageLoader, EditorialSkeletonOverlay } from "../ui/FakePageLoader";
import { trackPageView } from "../../lib/analytics";

export function PageLayout({ children }) {
  const location = useLocation();

  // Automated realistic loading simulation on route change (~450ms)
  const [isSimulatingLoading, setIsSimulatingLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Track SPA page view
    trackPageView(location.pathname + location.search);

    // Trigger realistic fake loading state on route transitions
    setIsSimulatingLoading(true);
    setProgress(25);

    const step1 = setTimeout(() => {
      setProgress(70);
    }, 160);

    const step2 = setTimeout(() => {
      setProgress(95);
    }, 340);

    const stepComplete = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsSimulatingLoading(false);
        setProgress(0);
      }, 120);
    }, 450);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(stepComplete);
    };
  }, [location.pathname, location.search]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9] text-[#111827] selection:bg-amber-200 selection:text-stone-900 transition-colors duration-150">
      {/* Top Simulated Network Progress Bar */}
      <FakePageLoader isSimulatingLoading={isSimulatingLoading} progress={progress} />

      <AnnouncementStrip />
      <Navbar />

      {/* Main Content Area - Displays Skeleton while loading, then smoothly reveals children */}
      <main className="flex-1 w-full relative">
        {isSimulatingLoading ? (
          <EditorialSkeletonOverlay />
        ) : (
          <div className="animate-in fade-in duration-150">
            {children}
          </div>
        )}
      </main>

      <Footer />
      <CookieBanner />
      <Toast />
    </div>
  );
}
