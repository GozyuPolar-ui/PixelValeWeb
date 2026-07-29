"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GameSummary } from "@/lib/types";
import { formatIDR } from "@/lib/format";

export default function GameCard({ game, index }: { game: GameSummary; index: number }) {
  return (
    <Link href={`/games/${game.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.06 }}
        whileHover={{ y: -6 }}
        className="group cursor-pointer"
      >
        <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-pixel transition-shadow group-hover:shadow-pixel-hover bg-surface-container-high">
          {game.image && (
            <Image src={game.image} alt={game.title} fill className="object-cover" sizes="200px" />
          )}
          {game.rating > 0 && (
            <div className="absolute bottom-2 right-2 bg-ink-rich/80 px-2 py-1 rounded text-[10px] text-white flex items-center gap-1">
              <Star size={10} className="fill-yellow-400 text-yellow-400" />
              {game.rating}
            </div>
          )}
        </div>
        <h4 className="mt-4 font-display text-sm text-ink-rich group-hover:text-primary truncate">
          {game.title}
        </h4>
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-on-surface-variant">{game.genre}</p>
<p className={`font-bold ${game.owned ? "text-secondary" : game.isFree ? "text-secondary" : "text-primary"}`}>
            {game.owned ? "Owned" : game.isFree ? "Free" : formatIDR(game.price)}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}