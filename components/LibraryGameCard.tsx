"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Apple, Smartphone, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  entry: {
    id: string;
    hours_played: number;
    games: {
      slug: string;
      title: string;
      genre: string;
      image_url: string;
      download_windows: string | null;
      download_mac: string | null;
      download_android: string | null;
    };
  };
  index: number;
};

export default function LibraryGameCard({ entry, index }: Props) {
  const { games, hours_played } = entry;
  const platforms = [
    { key: "windows", label: "Windows", icon: Monitor, url: games.download_windows },
    { key: "mac", label: "Mac", icon: Apple, url: games.download_mac },
    { key: "android", label: "Android", icon: Smartphone, url: games.download_android },
  ].filter((p) => p.url);

  const [selected, setSelected] = useState(platforms[0]?.key || "windows");
  const activePlatform = platforms.find((p) => p.key === selected);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="bg-paper-dark border border-outline-variant rounded-xl overflow-hidden"
    >
<Link href={`/games/${games.slug}`}>
        <div className="relative aspect-video bg-surface-container-highest cursor-pointer">
          {games.image_url && <Image src={games.image_url} alt={games.title} fill className="object-cover" />}
        </div>
      </Link>
      <div className="p-5">
        <Link href={`/games/${games.slug}`}>
          <h3 className="font-display text-lg text-ink-rich mb-1 hover:text-primary transition-colors cursor-pointer">
            {games.title}
          </h3>
        </Link>
        <p className="text-xs text-ink-muted mb-4">
          {games.genre} · {hours_played}h played
        </p>

        {platforms.length === 0 ? (
          <p className="text-xs text-ink-muted italic">No download links available yet.</p>
        ) : (
          <>
            <div className="flex gap-2 mb-3">
              {platforms.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setSelected(p.key)}
                  className={`p-2 rounded-lg border transition-colors ${
                    selected === p.key
                      ? "bg-primary text-white border-primary"
                      : "border-outline-variant text-ink-muted hover:bg-surface-container-low"
                  }`}
                  title={p.label}
                >
                  <p.icon size={16} />
                </button>
              ))}
            </div>
            <a
              href={activePlatform?.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-primary text-white py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <Download size={16} /> Download for {activePlatform?.label}
            </a>
          </>
        )}
      </div>
    </motion.div>
  );
}