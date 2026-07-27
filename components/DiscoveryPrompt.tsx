"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function DiscoveryPrompt() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-secondary/5 border-2 border-secondary/20 border-dashed rounded-xl p-6 text-center"
    >
      <Sparkles className="mx-auto mb-4 text-secondary" size={28} />
      <h4 className="font-display text-base text-secondary mb-2">Find your next favorite</h4>
      <p className="text-xs text-secondary/70 mb-4 px-2 leading-relaxed">
        Check out the latest hand-picked indie gems in our store.
      </p>
      <Link href="/" className="text-secondary font-bold text-sm hover:underline">
        Browse Store →
      </Link>
    </motion.section>
  );
}