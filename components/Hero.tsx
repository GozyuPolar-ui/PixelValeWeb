"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { GameSummary } from "@/lib/types";
import { formatIDR } from "@/lib/format";


export default function Hero({ games }: { games: GameSummary[] }) {
  const featured = games[0];
  const trendingGames = games.slice(0, 3);

  return (
    <header className="relative pt-28 pb-12 px-6 md:px-16 max-w-container-max mx-auto" id="home">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:h-[500px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-2 relative group overflow-hidden rounded-xl shadow-pixel cursor-pointer h-[320px] lg:h-full bg-surface-container-high"
        >
          {featured?.image && (
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-rich/90 via-transparent to-transparent flex flex-col justify-end p-8">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-primary text-white text-[10px] font-bold uppercase px-3 py-1 w-fit mb-4"
            >
              Featured
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-5xl font-display font-bold text-white mb-2"
            >
              {featured?.title ?? "Coming Soon"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/80 max-w-lg mb-6"
            >
              {featured?.tagline ?? "New games are on the way. Stay tuned."}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4"
            >
              {featured && (
                <Link href={`/games/${featured.slug}`}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white text-ink-rich px-8 py-3 font-display font-bold hover:bg-primary hover:text-white transition-colors rounded"
                  >
                    View Game
                  </motion.button>
                </Link>
              )}
            </motion.div>
          </div>
        </motion.div>

        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-display text-secondary border-b-2 border-surface-variant pb-2">
            Trending Now
          </h3>
          <div className="flex-grow space-y-4">
            {trendingGames.map((game, i) => (
              <Link key={game.id} href={`/games/${game.slug}`}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex gap-4 group cursor-pointer bg-surface-container-low p-3 rounded-lg hover:bg-surface-variant transition-colors"
                >
                  <div className="relative w-24 h-24 rounded overflow-hidden shrink-0 shadow-sm bg-surface-variant">
                    {game.image && (
                      <Image src={game.image} alt={game.title} fill className="object-cover" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-display text-sm text-ink-rich group-hover:text-primary transition-colors">
                      {game.title}
                    </h4>
                    <p className="text-xs text-on-surface-variant mb-2">{game.genre}</p>
                      <span
                      className={`font-bold ${
                        game.isFree ? "text-secondary" : "text-primary"
                      }`}
                    >
                      {game.isFree ? "Free" : formatIDR(game.price)}
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}