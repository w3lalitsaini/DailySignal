import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { AnnouncementStrip } from "./AnnouncementStrip";
import { Footer } from "./Footer";
import { CookieBanner } from "./CookieBanner";
import { Toast } from "../ui/Toast";
import { trackPageView } from "../../lib/analytics";

export function PageLayout({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on navigation
    window.scrollTo(0, 0);

    // Track SPA page view
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9] text-[#111827] selection:bg-amber-200 selection:text-stone-900 transition-colors duration-150">
      <AnnouncementStrip />
      <Navbar />

      {/* Main Content Area - Immediate and smooth editorial rendering */}
      <main className="flex-1 w-full relative">
        <div className="animate-in fade-in duration-200">
          {children}
        </div>
      </main>

      <Footer />
      <CookieBanner />
      <Toast />
    </div>
  );
}
