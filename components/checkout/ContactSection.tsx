"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-8 rounded-full bg-paper-dark border border-outline flex items-center justify-center font-display text-primary text-sm">
          1
        </span>
        <h2 className="text-xl font-display">Contact Information</h2>
      </div>
      <div className="bg-paper-dark p-6 rounded-lg border border-outline-variant">
        <label htmlFor="email" className="block text-xs font-bold mb-2 text-ink-rich">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="adventurer@pixelvale.com"
          className="w-full bg-surface-container-low rounded p-3 focus:ring-2 focus:ring-primary outline-none border border-outline-variant"
        />
        <p className="mt-2 text-xs text-ink-muted">Order confirmation will be sent here.</p>
      </div>
    </motion.section>
  );
}