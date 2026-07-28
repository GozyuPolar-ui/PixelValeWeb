"use client";

import GameCard from "./GameCard";
import { GameSummary } from "@/lib/types";

export default function RelatedGames({ games }: { games: GameSummary[] }) {
  if (games.length === 0) return null;

  return (
    <div className="max-w-container-max mx-auto px-6 md:px-16 mt-16 mb-24">
      <h3 className="text-xl font-display mb-8 border-b-4 border-surface-variant inline-block pb-1">
        Related Discoveries
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {games.map((game, i) => (
          <GameCard key={game.id} game={game} index={i} />
        ))}
      </div>
    </div>
  );
}