"use client";

import GameCard from "./GameCard";
import { relatedGames } from "@/lib/data";

export default function RelatedGames() {
  return (
    <div className="max-w-container-max mx-auto px-6 md:px-16 mt-16 mb-24">
      <h3 className="text-xl font-display mb-8 border-b-4 border-surface-variant inline-block pb-1">
        Related Discoveries
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {relatedGames.map((game, i) => (
          <GameCard key={game.id} game={game} index={i} />
        ))}
      </div>
    </div>
  );
}