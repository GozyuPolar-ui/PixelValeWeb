"use client";

import { motion } from "framer-motion";

export default function FavoriteGenreCard({ genre }: { genre: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="border-2 border-dashed border-outline-variant rounded-lg p-6 flex flex-col items-center text-center"
    >
      <span className="text-[10px] uppercase font-bold tracking-widest text-ink-muted mb-2">
        Favorite Genre
      </span>
      <div className="text-3xl font-display text-primary leading-tight">{genre}</div>
    </motion.div>
  );
}