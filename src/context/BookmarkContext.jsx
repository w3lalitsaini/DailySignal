import React, { createContext, useContext, useState, useEffect } from "react";
import { getStoredBookmarks, toggleArticleBookmark, clearAllStoredBookmarks } from "../lib/storage";
import { trackBookmark } from "../lib/analytics";

const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    setBookmarks(getStoredBookmarks());
  }, []);

  const toggleBookmark = (slug, title = "") => {
    const { updated, added } = toggleArticleBookmark(slug);
    setBookmarks(updated);
    trackBookmark(slug, added);

    const message = added
      ? `Saved "${title || slug}" to your bookmarks`
      : `Removed "${title || slug}" from bookmarks`;
    setToastMessage({ text: message, id: Date.now() });
  };

  const isBookmarked = (slug) => {
    return bookmarks.includes(slug);
  };

  const clearBookmarks = () => {
    clearAllStoredBookmarks();
    setBookmarks([]);
    setToastMessage({ text: "All bookmarks cleared", id: Date.now() });
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        bookmarkCount: bookmarks.length,
        toggleBookmark,
        isBookmarked,
        clearBookmarks,
        toastMessage,
        clearToast: () => setToastMessage(null)
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error("useBookmarks must be used within BookmarkProvider");
  return ctx;
}
