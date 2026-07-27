"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { LucideIcon, Lock } from "lucide-react";

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  category: string;
  threshold: number;
};

type Props = {
  achievements: Achievement[];
  libraryCount: number;
  wishlistCount: number;
  reviewCount: number;
  friendCount: number;
  memberDays: number;
};

export default function AchievementsList({
  achievements,
  libraryCount,
  wishlistCount,
  reviewCount,
  friendCount,
  memberDays,
}: Props) {
  const getProgress = (category: string) => {
    switch (category) {
      case "library": return libraryCount;
      case "wishlist": return wishlistCount;
      case "reviews": return reviewCount;
      case "friends": return friendCount;
      case "membership": return memberDays;
      default: return 0;
    }
  };

  if (achievements.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-ink-muted">Belum ada data achievement (cek tabel `achievements` di database).</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {achievements.map((a, i) => {
        const Icon = (Icons[a.icon_name as keyof typeof Icons] as LucideIcon) || Icons.Award;
        const progress = getProgress(a.category);
        const unlocked = progress >= a.threshold;
        const percent = Math.min(100, Math.round((progress / Math.max(a.threshold, 1)) * 100));

        return (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            className={`p-4 rounded-lg border flex gap-4 items-start ${
              unlocked ? "bg-secondary-fixed/30 border-secondary/30" : "bg-paper-dark border-outline-variant"
            }`}
          >
            <div
              className={`w-12 h-12 rounded shrink-0 flex items-center justify-center ${
                unlocked ? "bg-secondary-fixed text-secondary" : "bg-surface-container-highest text-ink-muted"
              }`}
            >
              {unlocked ? <Icon size={22} /> : <Lock size={18} />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`font-bold text-sm ${unlocked ? "text-ink-rich" : "text-ink-muted"}`}>
                {a.title}
              </h4>
              <p className="text-xs text-ink-muted mb-2">{a.description}</p>
              {!unlocked && (
                <>
                  <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-ink-muted mt-1">
                    {progress} / {a.threshold}
                  </p>
                </>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}