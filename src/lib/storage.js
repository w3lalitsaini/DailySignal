const STORAGE_KEYS = {
  BOOKMARKS: "dailysignal_bookmarks_v1",
  THEME: "dailysignal_theme_v1",
  READING_FONT_SIZE: "dailysignal_fontsize_v1",
  COOKIE_CONSENT: "dailysignal_cookie_consent_v1",
  NEWSLETTER_MOCK: "dailysignal_newsletter_subscribers_v1"
};

export function getStoredBookmarks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("Error reading bookmarks from localStorage", e);
    return [];
  }
}

export function saveStoredBookmarks(bookmarks) {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  } catch (e) {
    console.warn("Error saving bookmarks to localStorage", e);
  }
}

export function isArticleBookmarked(slug) {
  const list = getStoredBookmarks();
  return list.includes(slug);
}

export function toggleArticleBookmark(slug) {
  const list = getStoredBookmarks();
  let updated;
  let added = false;
  if (list.includes(slug)) {
    updated = list.filter((s) => s !== slug);
    added = false;
  } else {
    updated = [slug, ...list];
    added = true;
  }
  saveStoredBookmarks(updated);
  return { updated, added };
}

export function clearAllStoredBookmarks() {
  try {
    localStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
  } catch (e) {
    console.warn("Error clearing bookmarks", e);
  }
}

// Cookie Consent Preferences
export function getStoredConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COOKIE_CONSENT);
    if (!raw) {
      return {
        decided: false,
        essential: true,
        analytics: false,
        advertising: false
      };
    }
    return JSON.parse(raw);
  } catch (e) {
    return { decided: false, essential: true, analytics: false, advertising: false };
  }
}

export function saveStoredConsent(consent) {
  try {
    localStorage.setItem(
      STORAGE_KEYS.COOKIE_CONSENT,
      JSON.stringify({ ...consent, decided: true, updatedAt: new Date().toISOString() })
    );
  } catch (e) {
    console.warn("Error saving consent", e);
  }
}

// Reading preferences
export function getStoredReadingSize() {
  try {
    return localStorage.getItem(STORAGE_KEYS.READING_FONT_SIZE) || "normal";
  } catch (e) {
    return "normal";
  }
}

export function setStoredReadingSize(size) {
  try {
    localStorage.setItem(STORAGE_KEYS.READING_FONT_SIZE, size);
  } catch (e) {
    console.warn("Error saving font size", e);
  }
}
