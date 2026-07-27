"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { recommendedAfterPurchase } from "@/lib/data";

export default function RecommendedGames() {
  return (
    <section className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-display">You might also like</h2>
        <div className="h-1 bg-surface-container-highest flex-grow ml-6" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {recommendedAfterPurchase.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="rounded-xl p-4 flex flex-col cursor-pointer border border-transparent hover:border-outline hover:bg-paper-dark transition-all"
          >
            <div className="relative aspect-square bg-surface-container-highest rounded-lg overflow-hidden mb-4">
              <Image src={game.image} alt={game.title} fill className="object-cover" />
            </div>
            <h4 className="font-display text-sm text-ink-rich">{game.title}</h4>
            <span className="text-xs text-primary mt-1 font-bold">{game.price}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}