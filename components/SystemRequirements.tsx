"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Monitor, Apple, Smartphone, LucideIcon } from "lucide-react";
import { GameDetailData } from "@/lib/types";

const platformIcons: Record<string, LucideIcon> = {
  windows: Monitor,
  mac: Apple,
  android: Smartphone,
};

const platformLabels: Record<string, string> = {
  windows: "Windows",
  mac: "Mac",
  android: "Android",
};

export default function SystemRequirements({ game }: { game: GameDetailData }) {
  const availablePlatforms = Object.keys(game.requirements || {});
  const [activePlatform, setActivePlatform] = useState(availablePlatforms[0] || "windows");

  if (availablePlatforms.length === 0) {
    return null;
  }

  const current = game.requirements?.[activePlatform] || {};

  return (
    <div className="max-w-container-max mx-auto px-6 md:px-16 mt-16">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h3 className="text-xl font-display border-b-4 border-surface-variant inline-block pb-1">
          System Requirements
        </h3>
        <div className="flex gap-2">
          {availablePlatforms.map((p) => {
            const Icon = platformIcons[p] || Monitor;
            return (
              <button
                key={p}
                onClick={() => setActivePlatform(p)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                  activePlatform === p
                    ? "bg-primary text-white"
                    : "bg-surface-container text-ink-muted hover:bg-surface-container-high"
                }`}
              >
                <Icon size={14} /> {platformLabels[p] || p}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {current.minimum && (
          <motion.div
            key={`${activePlatform}-min`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-surface-container p-6 rounded-lg border border-outline-variant"
          >
            <h4 className="font-display text-secondary mb-4 flex items-center gap-2">
              <ShieldCheck size={20} /> Minimum
            </h4>
            <ul className="space-y-4">
              {Object.entries(current.minimum).map(([key, val]) => (
                <li key={key} className="flex justify-between text-sm gap-4">
                  <span className="text-ink-muted uppercase text-xs tracking-wide shrink-0">{key}</span>
                  <span className="font-semibold text-right">{String(val)}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {current.recommended && (
          <motion.div
            key={`${activePlatform}-rec`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-surface-container p-6 rounded-lg border border-outline-variant"
          >
            <h4 className="font-display text-primary mb-4 flex items-center gap-2">
              <Sparkles size={20} /> Recommended
            </h4>
            <ul className="space-y-4">
              {Object.entries(current.recommended).map(([key, val]) => (
                <li key={key} className="flex justify-between text-sm gap-4">
                  <span className="text-ink-muted uppercase text-xs tracking-wide shrink-0">{key}</span>
                  <span className="font-semibold text-right">{String(val)}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}