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

export default function AchievementsGrid({
  achievements,
  libraryCount,
  wishlistCount,
  reviewCount,
  friendCount,
  memberDays,
}: Props) {
  const getProgress = (category: string) => {
    switch (category) {
      case "library":
        return libraryCount;
      case "wishlist":
        return wishlistCount;
      case "reviews":
        return reviewCount;
      case "friends":
        return friendCount;
      case "membership":
        return memberDays;
      default:
        return 0;
    }
  };

  const badges = achievements.map((a) => ({
    ...a,
    unlocked: getProgress(a.category) >= a.threshold,
  }));

  return (
    <section>
      <h2 className="text-xl font-display text-ink-rich mb-6">Achievements</h2>
      <div className="flex flex-wrap gap-4 p-6 bg-moss-light/30 border border-secondary/20 rounded-lg">
        {badges.map((badge, i) => {
          const Icon = (Icons[badge.icon_name as keyof typeof Icons] as LucideIcon) || Icons.Award;
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              whileHover={badge.unlocked ? { y: -4 } : {}}
              title={`${badge.title} — ${badge.description}`}
              className={`w-14 h-14 rounded flex items-center justify-center border transition-transform ${
                badge.unlocked
                  ? "bg-secondary-fixed border-secondary/30"
                  : "bg-surface-container-highest/50 border-outline-variant opacity-40"
              }`}
            >
              {badge.unlocked ? (
                <Icon size={22} className="text-secondary" />
              ) : (
                <Lock size={20} className="text-ink-muted" />
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}