"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import GameCard from "./GameCard";
import EmptyState from "./EmptyState";
import { GameSummary } from "@/lib/types";

type SortKey = "newest" | "title" | "price-asc" | "price-desc" | "rating";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Top Rated" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "title", label: "Name A–Z" },
];

type Props = {
  games: GameSummary[];
  title?: string;
  showFreeFilter?: boolean;
};

export default function StoreBrowser({
  games,
  title,
  showFreeFilter = true,
}: Props) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [freeOnly, setFreeOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = [...games];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.genre.toLowerCase().includes(q)
      );
    }

    if (freeOnly) {
      list = list.filter((g) => g.isFree);
    }

    switch (sort) {
      case "title":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        // biarkan urutan asal (biasanya newest dari server)
        break;
    }

    return list;
  }, [games, query, sort, freeOnly]);

  return (
    <div>
      {title && (
        <h1 className="text-3xl font-display text-ink-rich mb-2">{title}</h1>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8 mt-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search games..."
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-outline-variant bg-white text-sm outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-ink-muted" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="py-2.5 px-3 rounded-lg border border-outline-variant bg-white text-sm outline-none focus:ring-2 focus:ring-primary/40"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {showFreeFilter && (
            <label className="flex items-center gap-2 text-sm text-ink-muted cursor-pointer select-none">
              <input
                type="checkbox"
                checked={freeOnly}
                onChange={(e) => setFreeOnly(e.target.checked)}
                className="rounded border-outline-variant text-primary focus:ring-primary"
              />
              Free only
            </label>
          )}
        </div>
      </div>

      <p className="text-sm text-ink-muted mb-6">
        {filtered.length} game{filtered.length === 1 ? "" : "s"}
        {query || freeOnly ? " found" : ""}
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          icon="search"
          title="No Games Found"
          description="Try adjusting your search or filter to find what you're looking for."
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filtered.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}