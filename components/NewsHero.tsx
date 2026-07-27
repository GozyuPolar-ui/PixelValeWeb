"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { categoryFilters } from "@/lib/data";

export default function NewsHero() {
  const [active, setActive] = useState("All");

  return (
    <section className="mb-16">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-display text-ink-rich mb-2"
      >
        Platform News
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-lg text-on-surface-variant max-w-2xl mb-8"
      >
        Updates, devlogs, and announcements from the heart of the Vale. Stay
        informed on your favorite cozy journeys.
      </motion.p>
      <div className="flex flex-wrap gap-3">
        {categoryFilters.map((cat) => (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActive(cat)}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
              active === cat
                ? "bg-primary text-white shadow-sm"
                : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>
    </section>
  );
}