"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Download, Monitor, Apple, Smartphone } from "lucide-react";
import { GameDetailData } from "@/lib/types";
import { createClient } from "@/lib/supabase";
import { formatIDR } from "@/lib/format";

export default function DownloadPanel({ game }: { game: GameDetailData }) {
  const [owned, setOwned] = useState(false);
  const [checking, setChecking] = useState(true);
  const [processing, setProcessing] = useState(false);
  const supabase = createClient();

const allPlatforms = [
    { key: "windows", label: "Windows", icon: Monitor, url: game.downloadLinks.windows },
    { key: "mac", label: "Mac", icon: Apple, url: game.downloadLinks.mac },
    { key: "android", label: "Android", icon: Smartphone, url: game.downloadLinks.android },
  ];
  const availablePlatforms = allPlatforms.filter((p) => p.url);

  const [selectedPlatform, setSelectedPlatform] = useState(
    availablePlatforms[0]?.key || allPlatforms[0]?.key || "windows"
  );

  useEffect(() => {
    const checkOwnership = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("user_library")
          .select("id")
          .eq("user_id", user.id)
          .eq("game_id", game.id)
          .maybeSingle();
        setOwned(!!data);
      }
      setChecking(false);
    };
    checkOwnership();
  }, [game.id]);

  const handleAddToLibrary = async () => {
    if (owned || processing) return;
    setProcessing(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await supabase.from("user_library").insert({
        user_id: user.id,
        game_id: game.id,
        hours_played: 0,
      });
      setOwned(true);
    }

    setProcessing(false);
  };

const activePlatform = allPlatforms.find((p) => p.key === selectedPlatform);

  return (
<motion.div
      id="download-panel"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-container-max mx-auto px-6 md:px-16 mt-16 scroll-mt-24"
    >
      <div className="bg-paper-dark p-8 rounded-xl border-4 border-surface-variant shadow-inner flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 w-full">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-white/50 rounded-lg">
              <p className="text-ink-muted text-xs uppercase">Size</p>
              <p className="font-display text-secondary">{game.download.size || "—"}</p>
            </div>
            <div className="p-4 bg-white/50 rounded-lg">
              <p className="text-ink-muted text-xs uppercase">Version</p>
              <p className="font-display text-secondary">{game.download.version || "—"}</p>
            </div>
          </div>
        </div>

        <div className="w-px h-32 bg-outline-variant hidden md:block" />

        <div className="text-center min-w-[280px]">
          {checking ? (
            <div className="h-20 flex items-center justify-center text-ink-muted text-sm">Loading...</div>
          ) : owned ? (
            <>
<div className="flex gap-2 justify-center mb-4">
                {allPlatforms.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => p.url && setSelectedPlatform(p.key)}
                    disabled={!p.url}
                    className={`p-3 rounded-lg border transition-colors relative ${
                      !p.url
                        ? "border-outline-variant text-ink-muted/40 cursor-not-allowed"
                        : selectedPlatform === p.key
                        ? "bg-primary text-white border-primary"
                        : "border-outline-variant text-ink-muted hover:bg-surface-container-low"
                    }`}
                    title={p.url ? p.label : `${p.label} — Coming Soon`}
                  >
                    <p.icon size={20} />
                  </button>
                ))}
              </div>
              {activePlatform?.url ? (
                <>
                  <motion.a
                    href={activePlatform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 bg-primary text-white px-12 py-5 rounded-lg font-display text-lg shadow-xl"
                  >
                    <Download size={20} /> DOWNLOAD
                  </motion.a>
                  <p className="mt-4 text-ink-muted text-sm italic">
                    Compatible with {activePlatform.label}
                  </p>
                </>
              ) : (
                <>
                  <div className="inline-flex items-center gap-3 bg-surface-container-highest text-ink-muted px-12 py-5 rounded-lg font-display text-lg cursor-not-allowed">
                    COMING SOON
                  </div>
                  <p className="mt-4 text-ink-muted text-sm italic">
                    {allPlatforms.find((p) => p.key === selectedPlatform)?.label} version is on its way
                  </p>
                </>
              )}
            </>
          ) : (
<>
              {game.isFree ? (
                <>
                  <motion.button
                    onClick={handleAddToLibrary}
                    disabled={processing}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 bg-primary text-white px-16 py-6 rounded-lg font-display text-xl shadow-xl disabled:opacity-70"
                  >
                    <Check size={22} /> {processing ? "..." : "ADD TO LIBRARY"}
                  </motion.button>
                  <p className="mt-4 text-ink-muted text-sm italic">
                    Free to add · downloads managed in Library
                  </p>
                </>
              ) : (
                <>
                  <motion.a
                    href={`/checkout?gameId=${game.id}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 bg-primary text-white px-16 py-6 rounded-lg font-display text-xl shadow-xl"
                  >
                    <Check size={22} /> BUY NOW
                  </motion.a>
                  <p className="mt-4 text-ink-muted text-sm italic">
                    {formatIDR(game.price)} · secure payment via Midtrans
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}