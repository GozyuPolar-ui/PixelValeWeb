"use client";

import { motion } from "framer-motion";
import { Monitor, Laptop, Smartphone } from "lucide-react";
import { GameDetailData } from "@/lib/types";

export default function AboutDetails({ game }: { game: GameDetailData }) {
  return (
    <div className="max-w-container-max mx-auto px-6 md:px-16 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="lg:col-span-2"
      >
        <h3 className="text-xl font-display mb-6 border-b-4 border-surface-variant inline-block pb-1">
          About the Journey
        </h3>
        <div className="space-y-4 text-on-surface-variant leading-relaxed">
          {game.description.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="bg-surface-container-low p-6 rounded-xl border border-outline-variant h-fit"
      >
        <h4 className="text-lg font-display mb-4 text-primary">Details</h4>
        <div className="space-y-4">
          <div className="flex justify-between border-b border-outline-variant pb-2">
            <span className="text-ink-muted">Developer</span>
            <span className="font-bold text-secondary">{game.details.developer}</span>
          </div>
          <div className="flex justify-between border-b border-outline-variant pb-2">
            <span className="text-ink-muted">Publisher</span>
            <span className="font-bold">{game.details.publisher}</span>
          </div>
          <div className="flex justify-between border-b border-outline-variant pb-2">
            <span className="text-ink-muted">Release Date</span>
            <span className="font-bold">{game.details.releaseDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-ink-muted">Platforms</span>
            <div className="flex gap-2 text-ink-muted">
              {game.downloadLinks.windows && <Monitor size={18} />}
              {game.downloadLinks.mac && <Laptop size={18} />}
              {game.downloadLinks.android && <Smartphone size={18} />}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}