"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const tabs = ["All Games", "Installed", "Not Installed", "Favorites"];
const sortOptions = ["Recently Played", "Recently Added", "A - Z"];

export default function LibraryFilters() {
  const [activeTab, setActiveTab] = useState("All Games");

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
      <div className="flex gap-8 border-b-2 border-surface-container w-full md:w-auto overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 whitespace-nowrap text-xs font-bold uppercase tracking-wide transition-all ${
              activeTab === tab
                ? "text-primary border-b-4 border-primary"
                : "text-ink-muted hover:text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative flex-1 md:flex-none">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
          />
          <input
            type="text"
            placeholder="Filter games..."
            className="bg-paper-dark border border-outline-variant/30 rounded-lg pl-9 pr-4 py-2 w-full md:w-48 focus:border-primary outline-none"
          />
        </div>
        <select className="bg-paper-dark border border-outline-variant/30 rounded-lg px-4 py-2 focus:border-primary outline-none">
          {sortOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>
    </div>
  );
}