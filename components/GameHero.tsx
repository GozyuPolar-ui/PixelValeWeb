"use client";

import { motion } from "framer-motion";
import { Star, Bookmark } from "lucide-react";
import Image from "next/image";
import { gameDetail } from "@/lib/data";
import { useState } from "react";
import { createClient } from "@/lib/supabase";

export default function GameHero() {
  const [wishlisted, setWishlisted] = useState(false);
  const supabase = createClient();

  const handleWishlist = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: game } = await supabase
      .from("games")
      .select("id")
      .eq("title", gameDetail.title)
      .single();

    if (game) {
      await supabase.from("user_wishlist").insert({ user_id: user.id, game_id: game.id });
      setWishlisted(true);
    }
  };
  return (
    <section className="max-w-container-max mx-auto px-6 md:px-16 mt-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full aspect-[21/9] rounded-xl overflow-hidden border-4 border-surface-variant"
      >
        <Image
          src={gameDetail.heroImage}
          alt={gameDetail.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            {gameDetail.tags.map((tag, i) => (
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
            {gameDetail.title}
          </motion.h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center text-yellow-400">
              <Star size={18} className="fill-yellow-400" />
              <span className="font-bold ml-1 text-white">{gameDetail.rating}</span>
              <span className="text-white/80 ml-2 text-sm">
                ({gameDetail.reviewCount} reviews)
              </span>
            </div>
            <span className="text-white font-display text-xl ml-auto">
              {gameDetail.price}
            </span>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-4 mt-8">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="bg-primary text-white px-10 py-4 rounded-lg font-display font-bold shadow-lg hover:brightness-110 transition-all"
        >
          Download Now
        </motion.button>
<motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleWishlist}
          disabled={wishlisted}
          className="border-2 border-secondary text-secondary px-8 py-4 rounded-lg font-bold hover:bg-secondary/5 transition-all flex items-center gap-2 disabled:opacity-60"
        >
          <Bookmark size={18} /> {wishlisted ? "Added!" : "Add to Wishlist"}
        </motion.button>
      </div>
    </section>
  );
}