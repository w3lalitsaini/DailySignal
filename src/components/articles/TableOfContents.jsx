import React, { useState, useEffect } from "react";
import { List, ChevronDown } from "lucide-react";

export function TableOfContents({ sections = [] }) {
  const [activeId, setActiveId] = useState("");
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  useEffect(() => {
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0% -60% 0%",
        threshold: 0
      }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  if (!sections || sections.length === 0) return null;

  const scrollToHeading = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 88; // Offset for sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveId(id);
      setIsOpenMobile(false);
    }
  };

  return (
    <nav
      aria-label="Table of Contents"
      className="rounded-xl border border-stone-200 bg-white/80 p-4 shadow-xs"
    >
      {/* Mobile Toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-700 py-1"
        >
          <span className="flex items-center gap-2">
            <List className="w-4 h-4 text-stone-500" />
            Table of Contents ({sections.length})
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpenMobile ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center gap-2 pb-3 mb-3 border-b border-stone-100">
        <List className="w-4 h-4 text-amber-700" />
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-900 font-sans">
          In this article
        </span>
      </div>

      {/* Links List */}
      <ul
        className={`space-y-1.5 text-xs text-stone-600 ${
          isOpenMobile ? "block mt-3 pt-3 border-t border-stone-100" : "hidden md:block"
        }`}
      >
        {sections.map((sec) => {
          const isActive = activeId === sec.id;
          const isH3 = sec.level === 3;
          return (
            <li key={sec.id} className={isH3 ? "pl-3" : ""}>
              <button
                onClick={() => scrollToHeading(sec.id)}
                className={`text-left w-full py-1 px-2 rounded-sm border-l-2 transition-all duration-150 leading-snug ${
                  isActive
                    ? "border-amber-700 text-stone-900 font-medium bg-amber-50"
                    : "border-transparent hover:border-stone-300 hover:text-stone-900"
                }`}
              >
                {sec.title}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
