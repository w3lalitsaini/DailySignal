import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function FakePageLoader({ isSimulatingLoading, progress }) {
  if (!isSimulatingLoading && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none overflow-hidden bg-transparent"
    >
      <div
        className="h-full bg-amber-600 transition-all duration-200 ease-out shadow-[0_0_8px_rgba(217,119,6,0.6)]"
        style={{
          width: `${progress}%`,
          opacity: progress >= 100 ? 0 : 1,
          transition: progress >= 100 ? "width 150ms ease-out, opacity 250ms ease-in" : "width 200ms ease-out"
        }}
      />
    </div>
  );
}

/**
 * Editorial Page Skeleton shown during simulated route navigation
 */
export function EditorialSkeletonOverlay() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse space-y-8">
      {/* Skeleton Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="w-24 h-4 bg-stone-200 rounded"></div>
        <div className="w-4/5 h-10 bg-stone-200 rounded-md"></div>
        <div className="w-full h-5 bg-stone-200 rounded"></div>
        <div className="w-2/3 h-5 bg-stone-200 rounded"></div>
      </div>

      {/* Skeleton Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-8 space-y-6">
          <div className="aspect-[16/9] w-full bg-stone-200 rounded-xl"></div>
          <div className="space-y-3">
            <div className="w-full h-4 bg-stone-200 rounded"></div>
            <div className="w-full h-4 bg-stone-200 rounded"></div>
            <div className="w-3/4 h-4 bg-stone-200 rounded"></div>
          </div>
        </div>
        <div className="md:col-span-4 space-y-4">
          <div className="h-44 w-full bg-stone-200 rounded-xl"></div>
          <div className="h-32 w-full bg-stone-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
