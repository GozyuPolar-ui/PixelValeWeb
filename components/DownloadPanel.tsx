"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GameDetailData } from "@/lib/types";

const platforms = ["Windows", "Mac", "Android"] as const;

export default function DownloadPanel({ game }: { game: GameDetailData }) {
  const [active, setActive] = useState<(typeof platforms)[number]>("Windows");

  const activeLink =
    active === "Windows"
      ? game.downloadLinks.windows
      : active === "Mac"
      ? game.downloadLinks.mac
      : game.downloadLinks.android;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-container-max mx-auto px-6 md:px-16 mt-16"
    >
      <div className="bg-paper-dark p-8 rounded-xl border-4 border-surface-variant shadow-inner flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 w-full">
          <div className="flex gap-2 mb-6">
            {platforms.map((p) => (
              <button
                key={p}
                onClick={() => setActive(p)}
                className={`px-6 py-2 rounded-t-lg font-bold text-xs uppercase transition-colors ${
                  active === p
                    ? "bg-primary text-white"
                    : "text-ink-muted hover:bg-surface-container"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-white/50 rounded-lg">
              <p className="text-ink-muted text-xs uppercase">Size</p>
              <p className="font-display text-secondary">{game.download.size || "—"}</p>
            </div>
            <div className="p-4 bg-white/50 rounded-lg">
              <p className="text-ink-muted text-xs uppercase">Version</p>
              <p className="font-display text-secondary">{game.download.version || "—"}</p>
            </div>
          </div>
        </div>

        <div className="w-px h-32 bg-outline-variant hidden md:block" />

        <div className="text-center">
          <motion.a
            href={activeLink ?? undefined}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-block bg-primary text-white px-16 py-6 rounded-lg font-display text-xl shadow-xl ${
              !activeLink ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            DOWNLOAD
          </motion.a>
          <p className="mt-4 text-ink-muted text-sm italic">
            {activeLink
              ? `Compatible with ${active}`
              : `Not available for ${active} yet`}
          </p>
        </div>
      </div>
    </motion.div>
  );
}