/**
 * Shares an article using Web Share API or falls back to copying URL to clipboard
 */
export async function shareArticle({ title, text, url }) {
  const shareData = {
    title: title || document.title,
    text: text || "Thoughtful engineering and tech journalism on DailySignal.",
    url: url || window.location.href
  };

  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return { success: true, method: "native" };
    } catch (err) {
      if (err.name !== "AbortError") {
        console.warn("Native share error, falling back to clipboard:", err);
      } else {
        return { success: false, method: "aborted" };
      }
    }
  }

  // Fallback to clipboard
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(shareData.url);
      return { success: true, method: "clipboard" };
    } else {
      // Legacy fallback
      const textArea = document.createElement("textarea");
      textArea.value = shareData.url;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return { success: true, method: "clipboard" };
    }
  } catch (err) {
    console.error("Clipboard copy failed:", err);
    return { success: false, method: "failed" };
  }
}
