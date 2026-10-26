import React from "react";
import { AdSlot } from "./AdSlot";
import { siteConfig } from "../../data/siteConfig";

export function TopArticleAd() {
  return (
    <div className="max-w-4xl mx-auto my-6 border-b border-stone-200/80 pb-4">
      <AdSlot
        slotId={siteConfig.ads.slots.header || "0000000001"}
        format="horizontal"
        minHeight="90px"
        label="Editorial Sponsor • Leaderboard"
      />
    </div>
  );
}

export function InArticleAd({ label = "Sponsored Section / In-Article Ad" }) {
  return (
    <div className="my-10 border-y border-stone-200/80 py-4">
      <AdSlot
        slotId={siteConfig.ads.slots.inArticle}
        format="fluid"
        minHeight="140px"
        label={label}
      />
    </div>
  );
}

export function PostArticleAd() {
  return (
    <div className="my-10 border border-stone-200/90 rounded-xl bg-stone-50/60 p-4">
      <AdSlot
        slotId="0000000005"
        format="rectangle"
        minHeight="250px"
        label="Recommended Partner Dispatch"
      />
    </div>
  );
}

export function SidebarAd() {
  return (
    <div className="my-6">
      <AdSlot
        slotId={siteConfig.ads.slots.sidebar}
        format="rectangle"
        minHeight="250px"
        label="Partner Dispatch"
      />
    </div>
  );
}

export function StickySidebarAd() {
  return (
    <div className="my-6">
      <AdSlot
        slotId="0000000006"
        format="vertical"
        minHeight="350px"
        label="Sponsor Showcase"
      />
    </div>
  );
}

export function FeedAd() {
  return (
    <div className="my-8 p-4 rounded-xl border border-stone-200/90 bg-stone-50/50">
      <AdSlot
        slotId="0000000007"
        format="fluid"
        minHeight="120px"
        label="Promoted Bulletin"
      />
    </div>
  );
}

export function FooterAd() {
  return (
    <div className="max-w-5xl mx-auto px-4 my-8">
      <AdSlot
        slotId={siteConfig.ads.slots.footer}
        format="horizontal"
        minHeight="90px"
        label="Leaderboard Sponsor"
      />
    </div>
  );
}
