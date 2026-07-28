"use client";

import { motion } from "framer-motion";

export default function LibraryHeader({ count }: { count: number }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-12"
    >
      <h1 className="text-4xl font-display text-primary mb-2">My Library</h1>
      <p className="text-lg text-ink-muted">{count} games in your collection</p>
    </motion.header>
  );
}