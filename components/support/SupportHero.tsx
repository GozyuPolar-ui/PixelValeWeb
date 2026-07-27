"use client";

import { motion } from "framer-motion";
import { Lightbulb, Search } from "lucide-react";

export default function SupportHero() {
  return (
    <section className="text-center mb-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center justify-center gap-4 mb-6"
      >
        <Lightbulb size={36} className="text-primary fill-primary/20" />
        <h1 className="text-3xl md:text-5xl font-display text-ink-rich">How can we help?</h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="max-w-2xl mx-auto relative"
      >
        <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-ink-muted" />
        <input
          type="text"
          placeholder="Search for help articles, error codes, or topics..."
          className="w-full pl-14 pr-6 py-5 bg-surface-container border-2 border-surface-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none placeholder:text-ink-muted"
        />
      </motion.div>
    </section>
  );
}