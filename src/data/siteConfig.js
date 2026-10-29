export const siteConfig = {
  name: "DailySignal",
  tagline: "The Modern Digital Publication for Technology, Engineering, & Digital Culture",
  description: "In-depth engineering analysis, investigative reporting, digital security guides, and architectural deep-dives for developers, founders, and curious minds.",
  url: "https://dailysignal.dev",
  author: "DailySignal Editorial Board",
  locale: "en-US",
  defaultImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80",
  defaultKeywords: [
    "technology vlogs",
    "engineering analysis",
    "software development",
    "ai agents",
    "cybersecurity",
    "tech magazine",
    "web performance",
    "digital culture"
  ],
  announcement: {
    enabled: true,
    badge: "Special Report",
    text: "India's Digital Arrest Scam Surge: How organized syndicates exploit fear & UPI protocols.",
    link: "/article/recognizing-online-scams-in-india"
  },
  navItems: [
    {
      label: "Home",
      href: "/",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
      description: "Frontpage editorial features and breaking investigations"
    },
    {
      label: "All Stories",
      href: "/articles",
      image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
      description: "Complete archive of 25 engineering deep dives and guides"
    },
    {
      label: "AI & Tech",
      href: "/category/ai-tech",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      description: "Agentic systems, foundation models, and LLM orchestration"
    },
    {
      label: "Development",
      href: "/category/development",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      description: "Frontend architecture, performance, and craftsmanship"
    },
    {
      label: "Security",
      href: "/category/security",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      description: "Investigative cyber defense, scams, and banking security"
    },
    {
      label: "Business",
      href: "/category/business",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      description: "Creator monetization, online ventures, and media models"
    },
    {
      label: "Productivity",
      href: "/category/productivity",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
      description: "Actionable engineering workflows and cognitive systems"
    },
    {
      label: "Digital Life",
      href: "/category/digital-life",
      image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80",
      description: "EV realities, consumer tech shifts, and hardware teardowns"
    },
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
  contactFormEndpoint: "https://formspree.io/f/mnnzblkd",
  analytics: {
    gaId: import.meta.env.VITE_GA_MEASUREMENT_ID || ""
  }
};
