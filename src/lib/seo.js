import { siteConfig } from "../data/siteConfig";

/**
 * Updates DOM head metadata dynamically for SPA routes
 */
export function updateSEO({
  title,
  description,
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

  // Open Graph
  setMeta("og:title", title || siteConfig.name, true);
  setMeta("og:description", metaDesc, true);
  setMeta("og:type", ogType, true);
  setMeta("og:url", currentCanonical, true);
  setMeta("og:site_name", siteConfig.name, true);
  const ogImg = image || `${siteConfig.url}/images/og-default.jpg`;
  setMeta("og:image", ogImg, true);

  // Twitter
  setMeta("twitter:card", image ? "summary_large_image" : "summary");
  setMeta("twitter:title", title || siteConfig.name);
  setMeta("twitter:description", metaDesc);
  setMeta("twitter:image", ogImg);

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
    description: siteConfig.description,
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
