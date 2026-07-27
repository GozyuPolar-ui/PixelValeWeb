"use client";

import { motion } from "framer-motion";
import {
  Swords,
  Map,
  Puzzle,
  Leaf,
  Brain,
  Sparkles,
  Home,
  Compass,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Swords,
  Map,
  PuzzleIcon: Puzzle,
  Leaf,
  Brain,
  Sparkles,
  Home,
  Compass,
};

const genres = [
  { name: "Action", icon: "Swords" },
  { name: "RPG", icon: "Map" },
  { name: "Puzzle", icon: "PuzzleIcon" },
  { name: "Cozy", icon: "Leaf" },
  { name: "Strategy", icon: "Brain" },
  { name: "Indie", icon: "Sparkles" },
  { name: "Sim", icon: "Home" },
  { name: "World", icon: "Compass" },
];

export default function GenreGrid() {
  return (
    <section className="bg-surface-container-low py-24">
      <div className="px-6 md:px-16 max-w-container-max mx-auto">
        <h2 className="text-2xl font-display text-ink-rich mb-12 text-center">
          Browse by Genre
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {genres.map((genre, i) => {
            const Icon = iconMap[genre.icon];
            return (
              <motion.div
                key={genre.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-surface p-6 rounded-lg shadow-pixel hover:shadow-pixel-hover transition-shadow cursor-pointer text-center group"
              >
                <motion.div whileHover={{ scale: 1.15, rotate: 5 }}>
                  <Icon className="w-8 h-8 mb-3 mx-auto text-primary" />
                </motion.div>
                <p className="text-xs font-bold uppercase tracking-wider">
                  {genre.name}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}