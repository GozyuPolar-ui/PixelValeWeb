"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { recentlyPlayed } from "@/lib/data";

export default function RecentlyPlayed() {
  return (
    <section>
      <h2 className="font-display text-lg text-ink-rich mb-6 px-2">Recently Played</h2>
      <div className="space-y-4">
        {recentlyPlayed.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 4 }}
            className="group flex items-center gap-4 p-2 rounded-xl hover:bg-paper-dark transition-colors cursor-pointer"
          >
            <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-outline-variant/20 bg-surface-container">
              <Image src={game.image} alt={game.title} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm truncate text-ink-rich group-hover:text-primary transition-colors">
                {game.title}
              </h4>
              <p className="text-xs text-ink-muted">{game.hours}</p>
            </div>
            <ChevronRight
              size={16}
              className="text-ink-muted group-hover:translate-x-1 transition-transform"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}