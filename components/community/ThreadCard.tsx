"use client";

import { motion } from "framer-motion";
import { Pin, MessageCircle, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { timeAgo } from "@/lib/utils";

export type Thread = {
  id: string;
  title: string;
  content: string;
  tag: string | null;
  pinned: boolean;
  reply_count: number;
  likes_count: number;
  created_at: string;
  cover_url: string | null;
  author: {
    username: string | null;
    avatar_url: string | null;
  } | null;
};

export default function ThreadCard({ thread, index }: { thread: Thread; index: number }) {
  const authorName = thread.author?.username ?? "Unknown Traveler";
  const avatar = thread.author?.avatar_url || "/PixelVale.jpeg";

  return (
    <Link href={`/community/${thread.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        className={`rounded-xl overflow-hidden transition-all cursor-pointer group ${
          thread.pinned
            ? "bg-surface-container-low border border-primary/20 hover:bg-white"
            : "border border-surface-variant hover:border-outline hover:bg-white"
        }`}
      >
        {thread.cover_url && (
          <div className="relative w-full h-40 bg-surface-container">
            <Image
              src={thread.cover_url}
              alt={thread.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="p-6 flex gap-4">
          <div className="shrink-0 relative w-12 h-12 rounded-lg overflow-hidden bg-surface-container">
            <Image src={avatar} alt={authorName} fill className="object-cover" />
          </div>
          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {thread.pinned && <Pin size={16} className="text-primary fill-primary" />}
              <span className="text-sm font-bold">{authorName}</span>
              {thread.tag && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-secondary-fixed text-secondary">
                  {thread.tag}
                </span>
              )}
            </div>
            <h3 className="text-lg font-display text-ink-rich mb-2 group-hover:text-primary transition-colors">
              {thread.title}
            </h3>
            <p className="text-ink-muted line-clamp-1 mb-4 text-sm">{thread.content}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-4 text-ink-muted text-xs">
                <span className="flex items-center gap-1">
                  <MessageCircle size={14} /> {thread.reply_count}
                </span>
                <span className="flex items-center gap-1">
                  <Heart size={14} /> {thread.likes_count}
                </span>
              </div>
              <span className="text-xs text-ink-muted">{timeAgo(thread.created_at)}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}