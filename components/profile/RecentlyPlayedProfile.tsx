"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import Image from "next/image";

type LibraryGame = {
  id: string;
  hours_played: number;
  games: { title: string; genre: string; image_url: string };
};

export default function RecentlyPlayedProfile({ games }: { games: LibraryGame[] }) {
  const topGames = [...games].sort((a, b) => b.hours_played - a.hours_played).slice(0, 3);

  if (topGames.length === 0) {
    return (
      <section>
        <h2 className="text-xl font-display text-ink-rich mb-6">Recently Played</h2>
        <p className="text-ink-muted text-sm">Belum ada game yang dimainkan.</p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-xl font-display text-ink-rich mb-6">Recently Played</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {topGames.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="group bg-paper-dark border border-outline-variant rounded-lg overflow-hidden cursor-pointer"
          >
            <div className="relative aspect-video bg-surface-container-highest overflow-hidden">
              <Image
                src={entry.games.image_url}
                alt={entry.games.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-ink-rich truncate mb-1">{entry.games.title}</h3>
              <div className="flex items-center gap-2 text-ink-muted">
                <Clock size={16} />
                <span className="text-sm">{entry.hours_played} Hours</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}