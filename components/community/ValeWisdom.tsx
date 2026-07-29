"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ValeWisdom() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="bg-white p-6 rounded-xl border-2 border-dashed border-primary/30"
    >
      <h2 className="text-lg font-display text-ink-rich mb-3">Vale Wisdom</h2>
      <p className="text-ink-muted text-sm mb-4 leading-relaxed">
        Be kind to fellow travelers. Share discoveries, protect spoilers, and keep
        discussions constructive. We are all here to explore and create together.
      </p>
      <Link
        href="/community/guidelines"
        className="text-primary font-bold hover:underline flex items-center gap-1 group text-sm"
      >
        Read Full Guidelines
        <ArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-1"
        />
      </Link>
    </motion.section>
  );
}