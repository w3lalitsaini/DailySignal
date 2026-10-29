import React, { createContext, useContext, useState, useEffect } from "react";

const ReaderPreferencesContext = createContext();

export function ReaderPreferencesProvider({ children }) {
  // 1. Font Family: 'serif' | 'sans' | 'reading' | 'mono'
  const [fontFamily, setFontFamily] = useState(() => {
    return localStorage.getItem("dailysignal_font_family") || "reading";
  });

  // 2. Font Size: 'sm' | 'base' | 'lg' | 'xl'
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem("dailysignal_font_size") || "base";
  });

  // 3. Line Spacing: 'compact' | 'relaxed' | 'spacious'
  const [lineSpacing, setLineSpacing] = useState(() => {
    return localStorage.getItem("dailysignal_line_spacing") || "relaxed";
  });

  // 4. Content Width: 'narrow' | 'normal' | 'wide'
  const [contentWidth, setContentWidth] = useState(() => {
    return localStorage.getItem("dailysignal_content_width") || "normal";
  });

  // 5. Focus Mode (Distraction-free)
  const [focusMode, setFocusMode] = useState(false);

  // 6. Reader Controls Modal State
  const [isReaderModalOpen, setIsReaderModalOpen] = useState(false);

  // Persist settings
  useEffect(() => {
    localStorage.setItem("dailysignal_font_family", fontFamily);
  }, [fontFamily]);

  useEffect(() => {
    localStorage.setItem("dailysignal_font_size", fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("dailysignal_line_spacing", lineSpacing);
  }, [lineSpacing]);

  useEffect(() => {
    localStorage.setItem("dailysignal_content_width", contentWidth);
  }, [contentWidth]);

  const toggleFocusMode = () => {
    setFocusMode((prev) => !prev);
  };

  // Helper mappings for CSS classes
  const getProseClasses = () => {
    // Font family
    const fontClass = {
      serif: "font-serif",
      sans: "font-sans",
      reading: "font-reading",
      mono: "font-mono"
    }[fontFamily] || "font-reading";

    // Font size
    const sizeClass = {
      sm: "text-[16px] sm:text-[17px]",
      base: "text-[18px] sm:text-[19px]",
      lg: "text-[20px] sm:text-[21px]",
      xl: "text-[22px] sm:text-[23px]"
    }[fontSize] || "text-[18px] sm:text-[19px]";

    // Line spacing
    const spacingClass = {
      compact: "leading-[1.65]",
      relaxed: "leading-[1.85]",
      spacious: "leading-[2.1]"
    }[lineSpacing] || "leading-[1.85]";

    return `${fontClass} ${sizeClass} ${spacingClass}`;
  };

  const getContentWidthClass = () => {
    return {
      narrow: "max-w-2xl",
      normal: "max-w-4xl",
      wide: "max-w-5xl"
    }[contentWidth] || "max-w-4xl";
  };

  const resetPreferences = () => {
    setFontFamily("reading");
    setFontSize("base");
    setLineSpacing("relaxed");
    setContentWidth("normal");
    setFocusMode(false);
  };

  return (
    <ReaderPreferencesContext.Provider
      value={{
        fontFamily,
        setFontFamily,
        fontSize,
        setFontSize,
        lineSpacing,
        setLineSpacing,
        contentWidth,
        setContentWidth,
        focusMode,
        setFocusMode,
        toggleFocusMode,
        isReaderModalOpen,
        setIsReaderModalOpen,
        getProseClasses,
        getContentWidthClass,
        resetPreferences
      }}
    >
      {children}
    </ReaderPreferencesContext.Provider>
  );
}

export function useReaderPreferences() {
  const context = useContext(ReaderPreferencesContext);
  if (!context) {
    throw new Error("useReaderPreferences must be used within a ReaderPreferencesProvider");
  }
  return context;
}
