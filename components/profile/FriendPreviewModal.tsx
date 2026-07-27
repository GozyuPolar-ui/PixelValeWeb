"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Clock } from "lucide-react";
import Image from "next/image";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

type Props = {
  data: any;
  loading: boolean;
  onClose: () => void;
};

export default function FriendPreviewModal({ data, loading, onClose }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-paper-dark rounded-xl overflow-hidden border border-outline-variant max-w-md w-full max-h-[90vh] overflow-y-auto relative"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 bg-white/90 rounded-full p-1.5 hover:bg-white transition-colors"
          >
            <X size={16} />
          </button>

          {loading || !data ? (
            <div className="p-16 text-center text-ink-muted text-sm">Loading...</div>
          ) : (
            <>
              <div className="relative h-32 w-full bg-surface-container-highest">
                {data.bannerUrl && <Image src={data.bannerUrl} alt="Banner" fill className="object-cover" />}
              </div>
              <div className="px-6 pb-6">
                <div className="relative w-20 h-20 rounded-full border-4 border-paper-dark overflow-hidden -mt-10 mb-3 bg-surface-container-highest">
                  {data.avatarUrl ? (
                    <Image src={data.avatarUrl} alt={data.username} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl font-bold text-secondary">
                      {data.username?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-display text-ink-rich mb-1">{data.username}</h2>
                {data.bio && <p className="text-xs text-ink-muted mb-4">{data.bio}</p>}

                <h3 className="text-xs font-bold text-ink-rich mb-3 uppercase tracking-wide">
                  Recently Played
                </h3>
                {data.libraryGames.length === 0 ? (
                  <p className="text-xs text-ink-muted mb-4">Belum ada game yang dimainkan.</p>
                ) : (
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {data.libraryGames.map((entry: any) => (
                      <div key={entry.id} className="rounded-lg overflow-hidden border border-outline-variant">
                        <div className="relative aspect-video bg-surface-container-highest">
                          <Image src={entry.games.image_url} alt={entry.games.title} fill className="object-cover" />
                        </div>
                        <div className="p-1.5">
                          <p className="text-[10px] font-bold truncate">{entry.games.title}</p>
                          <div className="flex items-center gap-1 text-ink-muted">
                            <Clock size={9} />
                            <span className="text-[9px]">{entry.hours_played}h</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {data.latestAchievement && (
                  <>
                    <h3 className="text-xs font-bold text-ink-rich mb-3 uppercase tracking-wide">
                      Latest Achievement
                    </h3>
                    <AchievementBadge achievement={data.latestAchievement} />
                  </>
                )}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function AchievementBadge({ achievement }: { achievement: any }) {
  const Icon = (Icons[achievement.icon_name as keyof typeof Icons] as LucideIcon) || Icons.Award;
  return (
    <div className="flex items-center gap-3 bg-secondary-fixed/30 border border-secondary/30 rounded-lg p-3">
      <div className="w-9 h-9 rounded bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
        <Icon size={18} />
      </div>
      <div>
        <p className="font-bold text-xs text-ink-rich">{achievement.title}</p>
        <p className="text-[10px] text-ink-muted">{achievement.description}</p>
      </div>
    </div>
  );
}