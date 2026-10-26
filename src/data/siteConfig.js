export const siteConfig = {
  name: "DailySignal",
  tagline: "The Modern Digital Publication for Technology, Engineering, & Digital Culture",
  description: "In-depth engineering analysis, investigative reporting, digital security guides, and architectural deep-dives for developers, founders, and curious minds.",
  url: "https://dailysignal.dev",
  author: "DailySignal Editorial Board",
  locale: "en-US",
  announcement: {
    enabled: true,
    badge: "Special Report",
    text: "India's Digital Arrest Scam Surge: How organized syndicates exploit fear & UPI protocols.",
    link: "/article/recognizing-online-scams-in-india"
  },
  navItems: [
    { label: "Home", href: "/" },
    { label: "All Stories", href: "/articles" },
    { label: "AI & Tech", href: "/category/ai-tech" },
    { label: "Development", href: "/category/development" },
    { label: "Security", href: "/category/security" },
    { label: "Business", href: "/category/business" },
    { label: "Productivity", href: "/category/productivity" },
    { label: "Digital Life", href: "/category/digital-life" },
  ],
  socials: [
    { label: "Twitter / X", href: "https://twitter.com", icon: "Twitter" },
    { label: "GitHub", href: "https://github.com", icon: "Github" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
    { label: "RSS Feed", href: "/rss.xml", icon: "Rss" },
  ],
  footerLinks: {
    publication: [
      { label: "About DailySignal", href: "/about" },
      { label: "Editorial Standards & Ethics", href: "/about#standards" },
      { label: "Contact Newsroom", href: "/contact" },
      { label: "Explore All Articles", href: "/articles" },
      { label: "Trending Dispatch", href: "/trending" },
      { label: "Saved Bookmarks", href: "/bookmarks" },
    ],
    categories: [
      { label: "AI & Future Tech", href: "/category/ai-tech" },
      { label: "Web Engineering", href: "/category/development" },
      { label: "Cybersecurity & Scams", href: "/category/security" },
      { label: "Digital Business & Creators", href: "/category/business" },
      { label: "Productivity Systems", href: "/category/productivity" },
      { label: "Consumer Tech & Clean Energy", href: "/category/digital-life" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Editorial Disclaimer", href: "/disclaimer" },
      { label: "Cookie Preferences", href: "/cookies" },
    ]
  },
  ads: {
    enabled: false, // Default false until VITE_ADSENSE_CLIENT_ID is provided
    client: import.meta.env.VITE_ADSENSE_CLIENT_ID || "",
    slots: {
      header: import.meta.env.VITE_ADSENSE_HEADER_SLOT || "0000000001",
      inArticle: import.meta.env.VITE_ADSENSE_ARTICLE_SLOT || "0000000002",
      sidebar: import.meta.env.VITE_ADSENSE_SIDEBAR_SLOT || "0000000003",
      footer: import.meta.env.VITE_ADSENSE_FOOTER_SLOT || "0000000004",
    }
  },
  analytics: {
    gaId: import.meta.env.VITE_GA_MEASUREMENT_ID || ""
  }
};
