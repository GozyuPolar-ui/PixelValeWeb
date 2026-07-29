"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight, Gamepad2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GameSummary } from "@/lib/types";
import { formatIDR } from "@/lib/format";

export default function CommunityFavorites({ games }: { games: GameSummary[] }) {
  const favorites = games.slice(0, 3);

  return (
    <section className="px-6 md:px-16 max-w-container-max mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-2xl font-display text-ink-rich">Community Favorites</h2>
          <div className="w-16 h-1 bg-secondary mt-2" />
        </div>
        <motion.a
          whileHover={{ x: 4 }}
          href="#"
          className="text-secondary text-xs font-bold uppercase tracking-widest flex items-center gap-2"
        >
          Explore Rankings <ArrowRight size={14} />
        </motion.a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {favorites.map((game, i) => (
          <Link key={game.id} href={`/games/${game.slug}`}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group bg-surface-container p-4 rounded-xl shadow-pixel hover:shadow-pixel-hover transition-shadow cursor-pointer"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-surface-variant">
                {game.image ? (
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Gamepad2 className="w-10 h-10 text-outline-variant" />
                  </div>
                )}
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-display text-ink-rich mb-1">{game.title}</h3>
                  <p className="text-xs text-on-surface-variant">{game.genre}</p>
                </div>
                <div className="text-right shrink-0 pl-4">
<p className={`font-bold ${game.owned ? "text-secondary" : game.isFree ? "text-secondary" : "text-primary"}`}>
  {game.owned ? "Owned" : game.isFree ? "Free" : formatIDR(game.price)}
</p>
                  <div className="flex text-yellow-500 mt-1">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        size={14}
                        className={idx < Math.round(game.rating) ? "fill-yellow-500" : "fill-none"}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}