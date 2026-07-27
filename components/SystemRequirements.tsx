"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";
import { GameDetailData } from "@/lib/types";

export default function SystemRequirements({ game }: { game: GameDetailData }) {
  const { minimum, recommended } = game.requirements;

  return (
    <div className="max-w-container-max mx-auto px-6 md:px-16 mt-16">
      <h3 className="text-xl font-display mb-8 border-b-4 border-surface-variant inline-block pb-1">
        System Requirements
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-surface-container p-6 rounded-lg border border-outline-variant"
        >
          <h4 className="font-display text-secondary mb-4 flex items-center gap-2">
            <ShieldCheck size={20} /> Minimum
          </h4>
          <ul className="space-y-4">
            {Object.entries(minimum).map(([key, val]) => (
              <li key={key} className="flex justify-between">
                <span className="text-ink-muted uppercase text-xs tracking-wide">{key}</span>
                <span className="font-semibold">{val}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-surface-container p-6 rounded-lg border border-outline-variant"
        >
          <h4 className="font-display text-primary mb-4 flex items-center gap-2">
            <Sparkles size={20} /> Recommended
          </h4>
          <ul className="space-y-4">
            {Object.entries(recommended).map(([key, val]) => (
              <li key={key} className="flex justify-between">
                <span className="text-ink-muted uppercase text-xs tracking-wide">{key}</span>
                <span className="font-semibold">{val}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}