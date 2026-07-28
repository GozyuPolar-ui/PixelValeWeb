"use client";

import { useState } from "react";
import LibraryFilters from "./LibraryFilters";
import LibraryGameCard from "./LibraryGameCard";

export default function LibraryContent({ games }: { games: any[] }) {
  const [activeTab, setActiveTab] = useState("All Games");

  const sortedGames =
    activeTab === "Recently Added"
      ? [...games].sort(
          (a, b) => new Date(b.acquired_at).getTime() - new Date(a.acquired_at).getTime()
        )
      : games;

  return (
    <>
      <LibraryFilters active={activeTab} onChange={setActiveTab} />
      {sortedGames.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-ink-muted mb-4">Library kamu masih kosong.</p>
          <a href="/" className="text-primary font-bold hover:underline">
            Jelajahi Store →
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {sortedGames.map((entry, i) => (
            <LibraryGameCard key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      )}
    </>
  );
}