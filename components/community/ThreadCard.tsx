"use client";

import { motion } from "framer-motion";
import { Pin, MessageCircle, Heart } from "lucide-react";
import Image from "next/image";

type Props = {
  avatar: string;
  title: string;
  excerpt: string;
  replies: number;
  likes: number;
  lastActive: string;
  index: number;
  pinned?: boolean;
  tagLabel?: string;
  author?: string;
  badge?: string;
  badgeColor?: string;
};

export default function ThreadCard({
  avatar,
  title,
  excerpt,
  replies,
  likes,
  lastActive,
  index,
  pinned,
  tagLabel,
  author,
  badge,
  badgeColor,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`p-6 rounded-xl flex gap-4 transition-all cursor-pointer group ${
        pinned
          ? "bg-surface-container-low border border-primary/20 hover:bg-white"
          : "border border-surface-variant hover:border-outline hover:bg-white"
      }`}
    >
      <div className="shrink-0 relative w-12 h-12 rounded-lg overflow-hidden">
        <Image src={avatar} alt={author || "avatar"} fill className="object-cover" />
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {pinned ? (
            <>
              <Pin size={16} className="text-primary fill-primary" />
              <span className="text-xs text-primary uppercase font-bold">{tagLabel}</span>
            </>
          ) : (
            <>
              <span className="text-sm font-bold">{author}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${badgeColor}`}>
                {badge}
              </span>
            </>
          )}
        </div>
        <h3 className="text-lg font-display text-ink-rich mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-ink-muted line-clamp-1 mb-4 text-sm">{excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-4 text-ink-muted text-xs">
            <span className="flex items-center gap-1">
              <MessageCircle size={14} /> {replies}
            </span>
            <span className="flex items-center gap-1">
              <Heart size={14} /> {likes}
            </span>
          </div>
          <span className="text-xs text-ink-muted">{lastActive}</span>
        </div>
      </div>
    </motion.div>
  );
}