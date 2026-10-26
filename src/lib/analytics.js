import { getStoredConsent } from "./storage";

let isInitialized = false;
let lastTrackedPath = null;

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

/**
 * Initializes Google Analytics 4 if measurement ID exists and user granted analytics consent.
 */
export function initAnalytics() {
  if (typeof window === "undefined") return;

  if (isInitialized) return;

  if (!GA_ID || GA_ID.trim() === "" || GA_ID === "G-XXXXXXXXXX") {
    // Only log once in dev mode
    if (import.meta.env.DEV && !window.__GA_DEV_LOGGED) {
      console.log(
        "%c[DailySignal Analytics]%c GA4 is unconfigured (VITE_GA_MEASUREMENT_ID is empty). Events will log to console in development mode.",
        "color: #c2410c; font-weight: bold;",
        "color: inherit;"
      );
      window.__GA_DEV_LOGGED = true;
    }
    return;
  }

  // Check consent
  const consent = getStoredConsent();
  if (!consent.analytics) {
    if (import.meta.env.DEV) {
      console.log("[DailySignal Analytics] User has not consented to analytics cookies. GA4 paused.");
    }
    return;
  }

  // Check if script already exists
  if (document.getElementById("ga4-script")) {
    isInitialized = true;
    return;
  }

  // Inject official Google Tag script
  try {
    const script = document.createElement("script");
    script.id = "ga4-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag("js", new Date());
    gtag("config", GA_ID, {
      send_page_view: false, // We handle page views manually for SPA route changes
      anonymize_ip: true,
      cookie_flags: "SameSite=None;Secure"
    });

    isInitialized = true;
    console.log(`[DailySignal Analytics] GA4 initialized successfully with ID: ${GA_ID}`);
  } catch (err) {
    console.error("[DailySignal Analytics] Failed to initialize GA4 script:", err);
  }
}

/**
 * Track SPA Route change
 */
export function trackPageView(path, title) {
  if (typeof window === "undefined") return;
  if (lastTrackedPath === path) return; // Prevent duplicate triggers
  lastTrackedPath = path;

  // Send to GA4 if ready
  if (isInitialized && window.gtag && GA_ID) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href
    });
  } else if (import.meta.env.DEV) {
    console.log(`%c[Analytics Event]%c page_view -> ${path} ("${title || document.title}")`, "color: #3b82f6; font-weight: bold;", "color: inherit;");
  }
}

/**
 * Track specific article read event
 */
export function trackArticleView(article) {
  if (!article) return;
  const payload = {
    event_category: "Editorial",
    article_id: article.id,
    article_slug: article.slug,
    article_title: article.title,
    article_category: article.category,
    reading_time: article.readingTime
  };

  if (isInitialized && window.gtag) {
    window.gtag("event", "view_article", payload);
  } else if (import.meta.env.DEV) {
    console.log("%c[Analytics Event]%c view_article", "color: #10b981; font-weight: bold;", "color: inherit;", payload);
  }
}

/**
 * Track user search queries
 */
export function trackSearch(query, resultCount) {
  if (!query || query.trim() === "") return;
  const payload = {
    search_term: query,
    result_count: resultCount
  };

  if (isInitialized && window.gtag) {
    window.gtag("event", "search", payload);
  } else if (import.meta.env.DEV) {
    console.log("%c[Analytics Event]%c search", "color: #8b5cf6; font-weight: bold;", "color: inherit;", payload);
  }
}

/**
 * Track category filter / navigation
 */
export function trackCategorySelect(categorySlug) {
  const payload = {
    category_slug: categorySlug
  };

  if (isInitialized && window.gtag) {
    window.gtag("event", "select_category", payload);
  } else if (import.meta.env.DEV) {
    console.log("%c[Analytics Event]%c select_category", "color: #f59e0b; font-weight: bold;", "color: inherit;", payload);
  }
}

/**
 * Track bookmark action
 */
export function trackBookmark(articleSlug, isBookmarked) {
  const payload = {
    article_slug: articleSlug,
    action: isBookmarked ? "add" : "remove"
  };

  if (isInitialized && window.gtag) {
    window.gtag("event", "bookmark_interaction", payload);
  } else if (import.meta.env.DEV) {
    console.log("%c[Analytics Event]%c bookmark_interaction", "color: #ec4899; font-weight: bold;", "color: inherit;", payload);
  }
}

/**
 * Track newsletter interaction
 */
export function trackNewsletter(status, source = "footer") {
  const payload = {
    status, // "submitted_demo", "error_invalid_email", "attempted"
    source
  };

  if (isInitialized && window.gtag) {
    window.gtag("event", "newsletter_engagement", payload);
  } else if (import.meta.env.DEV) {
    console.log("%c[Analytics Event]%c newsletter_engagement", "color: #06b6d4; font-weight: bold;", "color: inherit;", payload);
  }
}

/**
 * Track outbound click
 */
export function trackOutboundClick(url, label) {
  const payload = {
    outbound_url: url,
    link_label: label
  };

  if (isInitialized && window.gtag) {
    window.gtag("event", "click_outbound", payload);
  } else if (import.meta.env.DEV) {
    console.log("%c[Analytics Event]%c click_outbound", "color: #64748b; font-weight: bold;", "color: inherit;", payload);
  }
}
