"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import GameCard from "./GameCard";
import { GameSummary } from "@/lib/types";

export default function NewReleases({ games }: { games: GameSummary[] }) {
  return (
    <section className="px-6 md:px-16 max-w-container-max mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-2xl font-display text-ink-rich">New Releases</h2>
          <div className="w-16 h-1 bg-primary mt-2" />
        </div>
        <Link href="/store">
          <motion.span
            whileHover={{ x: 4 }}
            className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer"
          >
            View All <ArrowRight size={14} />
          </motion.span>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {games.map((game, i) => (
          <GameCard key={game.id} game={game} index={i} />
        ))}
      </div>
    </section>
  );
}