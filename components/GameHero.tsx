"use client";

import { motion } from "framer-motion";
import { Star, Bookmark } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { GameDetailData } from "@/lib/types";
import { formatIDR } from "@/lib/format";

export default function GameHero({ game }: { game: GameDetailData }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [checking, setChecking] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const checkWishlist = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("user_wishlist")
          .select("id")
          .eq("user_id", user.id)
          .eq("game_id", game.id)
          .maybeSingle();
        setWishlisted(!!data);
      }
      setChecking(false);
    };
    checkWishlist();
  }, [game.id]);

  const handleWishlist = async () => {
    if (wishlisted || checking) return;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("user_wishlist").insert({ user_id: user.id, game_id: game.id });
    setWishlisted(true);
  };

  return (
    <section className="max-w-container-max mx-auto px-6 md:px-16 mt-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full aspect-[21/9] rounded-xl overflow-hidden border-4 border-surface-variant"
      >
        <Image src={game.heroImage} alt={game.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            {game.tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="px-3 py-1 bg-secondary-fixed text-secondary rounded-full text-[10px] font-bold uppercase tracking-wider"
              >
                {tag}
              </motion.span>
            ))}
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-5xl font-display font-bold text-white drop-shadow-md"
          >
            {game.title}
          </motion.h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center text-yellow-400">
              <Star size={18} className="fill-yellow-400" />
              <span className="font-bold ml-1 text-white">{game.rating}</span>
              <span className="text-white/80 ml-2 text-sm">({game.reviewCount} reviews)</span>
            </div>
            <span className="text-white font-display text-xl ml-auto">
              {game.isFree ? "Free" : formatIDR(game.price)}
            </span>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-4 mt-8">
        <motion.a
          href="#download-panel"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="inline-block bg-primary text-white px-10 py-4 rounded-lg font-display font-bold shadow-lg hover:brightness-110 transition-all text-center"
        >
          Get This Game
        </motion.a>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleWishlist}
          disabled={wishlisted || checking}
          className="border-2 border-secondary text-secondary px-8 py-4 rounded-lg font-bold hover:bg-secondary/5 transition-all flex items-center gap-2 disabled:opacity-60"
        >
          <Bookmark size={18} /> {wishlisted ? "Added!" : "Add to Wishlist"}
        </motion.button>
      </div>
    </section>
  );
}