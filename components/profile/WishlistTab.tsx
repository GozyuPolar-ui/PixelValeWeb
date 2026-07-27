"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, X } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type WishlistGame = {
  id: string;
  game_id: string;
  games: {
    title: string;
    genre: string;
    price: number;
    is_free: boolean;
    image_url: string;
  };
};

export default function WishlistTab({ games }: { games: WishlistGame[] }) {
  const [items, setItems] = useState(games);
  const supabase = createClient();
  const router = useRouter();

  const handleRemove = async (wishlistId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== wishlistId));
    await supabase.from("user_wishlist").delete().eq("id", wishlistId);
    router.refresh();
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart size={32} className="mx-auto text-ink-muted mb-3" />
        <p className="text-ink-muted mb-2">Wishlist kamu masih kosong.</p>
        <a href="/" className="text-primary font-bold hover:underline">
          Jelajahi Store →
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((entry, i) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="bg-paper-dark border border-outline-variant rounded-lg overflow-hidden group relative"
        >
          <button
            onClick={() => handleRemove(entry.id)}
            className="absolute top-2 right-2 z-10 bg-white/90 rounded-full p-1.5 hover:bg-red-50 hover:text-red-600 transition-colors"
            title="Hapus dari wishlist"
          >
            <X size={14} />
          </button>
          <div className="relative aspect-video bg-surface-container-highest overflow-hidden">
            <Image
              src={entry.games.image_url}
              alt={entry.games.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-4">
            <h3 className="font-bold text-ink-rich truncate mb-1">{entry.games.title}</h3>
            <div className="flex justify-between items-center">
              <p className="text-xs text-ink-muted">{entry.games.genre}</p>
              <span className={`font-bold text-sm ${entry.games.is_free ? "text-secondary" : "text-primary"}`}>
                {entry.games.is_free ? "Free" : `$${entry.games.price}`}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}