"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import Image from "next/image";

type LibraryGame = {
  id: string;
  hours_played: number;
  games: {
    title: string;
    genre: string;
    image_url: string;
  };
};

export default function LibraryTab({ games }: { games: LibraryGame[] }) {
  if (games.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-ink-muted mb-2">Belum ada game di library kamu.</p>
        <a href="/" className="text-primary font-bold hover:underline">
          Jelajahi Store →
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((entry, i) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ y: -4 }}
          className="bg-paper-dark border border-outline-variant rounded-lg overflow-hidden cursor-pointer"
        >
          <div className="relative aspect-video bg-surface-container-highest overflow-hidden">
            <Image
              src={entry.games.image_url}
              alt={entry.games.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-bold text-ink-rich truncate mb-1">{entry.games.title}</h3>
            <p className="text-xs text-ink-muted mb-2">{entry.games.genre}</p>
            <div className="flex items-center gap-2 text-ink-muted">
              <Clock size={14} />
              <span className="text-xs">{entry.hours_played} Hours</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}