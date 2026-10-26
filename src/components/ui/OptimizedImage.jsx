import React, { useState } from "react";

/**
 * Builds responsive Unsplash srcSet if the URL is an Unsplash image
 */
function buildSrcSet(url) {
  if (!url || !url.includes("images.unsplash.com")) {
    return undefined;
  }
  const cleanUrl = url.split("?")[0];
  const widths = [480, 768, 1080, 1440];
  return widths
    .map((w) => `${cleanUrl}?auto=format&fit=crop&w=${w}&q=80 ${w}w`)
    .join(", ");
}

export function OptimizedImage({
  src,
  alt,
  aspectRatio = "aspect-[16/10]",
  priority = false,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  objectFit = "object-cover"
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const srcSet = buildSrcSet(src);

  return (
    <div className={`relative overflow-hidden ${aspectRatio} bg-stone-100 ${className}`}>
      {/* Subtle skeleton shimmer placeholder until loaded */}
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 animate-pulse"
        />
      )}

      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt || "Article illustration"}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full ${objectFit} transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
