import { siteConfig } from "../data/siteConfig";

const DEFAULT_PAGE_IMAGE =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80";

const DEFAULT_KEYWORDS = [
  "technology vlogs",
  "ai engineering",
  "software architecture",
  "cybersecurity investigations",
  "developer guides",
  "web development",
  "daily signal",
  "tech magazine",
  "coding tutorials"
].join(", ");

/**
 * Updates DOM head metadata dynamically for SPA routes with rich SEO, OpenGraph, Twitter, and Schema
 */
export function updateSEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = "website",
  image,
  publishedAt,
  updatedAt,
  authorName,
  schema = null
}) {
  if (typeof document === "undefined") return;

  // Title
  const formattedTitle = title
    ? `${title} — ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;
  document.title = formattedTitle;

  // Meta helper
  const setMeta = (name, content, isProperty = false) => {
    if (!content) return;
    const attr = isProperty ? "property" : "name";
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  // Standard Meta
  const metaDesc = description || siteConfig.description;
  setMeta("description", metaDesc);

  const formattedKeywords = Array.isArray(keywords)
    ? keywords.join(", ")
    : keywords || DEFAULT_KEYWORDS;
  setMeta("keywords", formattedKeywords);

  setMeta("author", authorName || siteConfig.author);
  setMeta("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  setMeta("googlebot", "index, follow");

  // Canonical link
  const currentCanonical = canonicalUrl || `${siteConfig.url}${window.location.pathname}`;
  let canonicalEl = document.querySelector("link[rel='canonical']");
  if (!canonicalEl) {
    canonicalEl = document.createElement("link");
    canonicalEl.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute("href", currentCanonical);

  // Resolved High-Res Associated Image for Social & SEO
  const resolvedImage = image || siteConfig.defaultImage || DEFAULT_PAGE_IMAGE;

  // Open Graph
  setMeta("og:title", title || siteConfig.name, true);
  setMeta("og:description", metaDesc, true);
  setMeta("og:type", ogType, true);
  setMeta("og:url", currentCanonical, true);
  setMeta("og:site_name", siteConfig.name, true);
  setMeta("og:image", resolvedImage, true);
  setMeta("og:image:alt", title || siteConfig.name, true);
  setMeta("og:image:width", "1200", true);
  setMeta("og:image:height", "630", true);

  // Twitter Cards
  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", title || siteConfig.name);
  setMeta("twitter:description", metaDesc);
  setMeta("twitter:image", resolvedImage);
  setMeta("twitter:image:alt", title || siteConfig.name);

  // Structured Data (JSON-LD)
  let scriptEl = document.getElementById("structured-data-jsonld");
  if (!scriptEl) {
    scriptEl = document.createElement("script");
    scriptEl.id = "structured-data-jsonld";
    scriptEl.type = "application/ld+json";
    document.head.appendChild(scriptEl);
  }

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: metaDesc,
    image: resolvedImage,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/favicon.svg`
      }
    }
  };

  scriptEl.textContent = JSON.stringify(schema || defaultSchema, null, 2);
}
