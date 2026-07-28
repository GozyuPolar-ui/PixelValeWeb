"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function SearchOverlay({
  onClose,
  initialGenre,
}: {
  onClose: () => void;
  initialGenre?: string;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim() && !initialGenre) {
        setResults([]);
        return;
      }
      setLoading(true);

      let request = supabase
        .from("games")
        .select("id, slug, title, genre, price, is_free, image_url")
        .limit(12);

      if (query.trim()) {
        request = request.ilike("title", `%${query}%`);
      } else if (initialGenre) {
        request = request.ilike("genre", `%${initialGenre}%`);
      }

      const { data } = await request;
      setResults(data || []);
      setLoading(false);
    };

    const timeout = setTimeout(fetchResults, 300);
    return () => clearTimeout(timeout);
  }, [query, initialGenre]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-[100] flex items-start justify-center pt-24 p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl w-full max-w-xl overflow-hidden"
        >
          <div className="flex items-center gap-3 p-4 border-b border-outline-variant">
            <Search size={20} className="text-ink-muted" />
              <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={initialGenre ? `Showing: ${initialGenre}` : "Cari game..."}
              className="flex-1 outline-none text-sm"
            />
            <button onClick={onClose}>
              <X size={20} className="text-ink-muted" />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {loading && <p className="text-center text-xs text-ink-muted py-6">Mencari...</p>}
                {!loading && (query || initialGenre) && results.length === 0 && (
              <p className="text-center text-xs text-ink-muted py-6">Tidak ada game ditemukan.</p>
            )}
            {results.map((game) => (
                <Link
                key={game.id}
                href={`/games/${game.slug}`}
                onClick={onClose}
                className="flex items-center gap-3 p-3 hover:bg-surface-container-low transition-colors"
              >
                <div className="relative w-12 h-12 rounded overflow-hidden bg-surface-container-highest shrink-0">
                  {game.image_url && <Image src={game.image_url} alt={game.title} fill className="object-cover" />}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{game.title}</p>
                  <p className="text-xs text-ink-muted">{game.genre}</p>
                </div>
                <span className={`font-bold text-sm ${game.is_free ? "text-secondary" : "text-primary"}`}>
                  {game.is_free ? "Free" : `$${game.price}`}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}