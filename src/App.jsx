import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { BookmarkProvider } from "./context/BookmarkContext";
import { ConsentProvider } from "./context/ConsentContext";
import { ReaderPreferencesProvider } from "./context/ReaderPreferencesContext";
import { ReaderControlsModal } from "./components/reader/ReaderControlsModal";
import { PageLayout } from "./components/layout/PageLayout";

import { HomePage } from "./pages/HomePage";
import { ArticleDetailPage } from "./pages/ArticleDetailPage";
import { ExplorePage } from "./pages/ExplorePage";
import { CategoryPage } from "./pages/CategoryPage";
import { TagPage } from "./pages/TagPage";
import { SearchPage } from "./pages/SearchPage";
import { TrendingPage } from "./pages/TrendingPage";
import { BookmarksPage } from "./pages/BookmarksPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { DisclaimerPage } from "./pages/DisclaimerPage";
import { CookiePreferencesPage } from "./pages/CookiePreferencesPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <ThemeProvider>
      <ConsentProvider>
        <BookmarkProvider>
          <ReaderPreferencesProvider>
            <BrowserRouter>
              <PageLayout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/articles" element={<ExplorePage />} />
                  <Route path="/article/:slug" element={<ArticleDetailPage />} />
                  <Route path="/category/:slug" element={<CategoryPage />} />
                  <Route path="/tag/:tag" element={<TagPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/trending" element={<TrendingPage />} />
                  <Route path="/bookmarks" element={<BookmarksPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/disclaimer" element={<DisclaimerPage />} />
                  <Route path="/cookies" element={<CookiePreferencesPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <ReaderControlsModal />
              </PageLayout>
            </BrowserRouter>
          </ReaderPreferencesProvider>
        </BookmarkProvider>
      </ConsentProvider>
    </ThemeProvider>
  );
}
