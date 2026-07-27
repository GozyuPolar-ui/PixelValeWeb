"use client";

import { useState } from "react";
import { communityTabsList } from "@/lib/data";

export default function CommunityTabs() {
  const [active, setActive] = useState("All");

  return (
    <div className="flex gap-8 mb-8 border-b border-surface-variant overflow-x-auto whitespace-nowrap pb-1">
      {communityTabsList.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`pb-4 text-sm transition-colors ${
            active === tab
              ? "font-bold text-primary border-b-4 border-primary"
              : "text-ink-muted hover:text-primary"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}