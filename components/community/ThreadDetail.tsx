"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, MessageCircle, Pin, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { timeAgo } from "@/lib/utils";
import { Thread } from "./ThreadCard";

type Reply = {
  id: string;
  content: string;
  created_at: string;
  author: { username: string | null; avatar_url: string | null } | null;
};

export default function ThreadDetail({
  thread,
  replies,
  initialLiked,
  isLoggedIn,
}: {
  thread: Thread;
  replies: Reply[];
  initialLiked: boolean;
  isLoggedIn: boolean;
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(thread.likes_count);
  const [likeLoading, setLikeLoading] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const supabase = createClient();
  const router = useRouter();

  const authorName = thread.author?.username ?? "Unknown Traveler";
  const avatar = thread.author?.avatar_url || "/PixelVale.jpeg";

  const handleLike = async () => {
    if (!isLoggedIn) {
      setError("You need to be logged in to like a thread.");
      return;
    }
    if (likeLoading) return;
    setLikeLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setLikeLoading(false);
      return;
    }

    if (liked) {
      await supabase
        .from("community_thread_likes")
        .delete()
        .eq("thread_id", thread.id)
        .eq("user_id", user.id);
      setLiked(false);
      setLikesCount((c) => Math.max(c - 1, 0));
    } else {
      await supabase.from("community_thread_likes").insert({
        thread_id: thread.id,
        user_id: user.id,
      });
      setLiked(true);
      setLikesCount((c) => c + 1);
    }
    setLikeLoading(false);
  };

  const handleReply = async () => {
    setError("");
    if (!replyText.trim()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError("You need to be logged in to reply.");
      return;
    }

    setSubmitting(true);
    const { error: insertError } = await supabase.from("community_replies").insert({
      thread_id: thread.id,
      author_id: user.id,
      content: replyText,
    });
    setSubmitting(false);

    if (insertError) {
      setError("Failed to post reply. Please try again.");
      return;
    }

    setReplyText("");
    router.refresh();
  };

  return (
    <>
      <Link
        href="/community"
        className="flex w-fit items-center gap-2 text-sm text-ink-muted hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Community
      </Link>

      <div className="border border-surface-variant rounded-xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-surface-container shrink-0">
            <Image src={avatar} alt={authorName} fill className="object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              {thread.pinned && <Pin size={14} className="text-primary fill-primary" />}
              <span className="font-bold text-sm">{authorName}</span>
            </div>
            <span className="text-xs text-ink-muted">{timeAgo(thread.created_at)}</span>
          </div>
          {thread.tag && (
            <span className="ml-auto px-2 py-0.5 rounded text-[10px] font-bold bg-secondary-fixed text-secondary">
              {thread.tag}
            </span>
          )}
        </div>

        <h1 className="text-2xl md:text-3xl font-display text-ink-rich mb-4">{thread.title}</h1>
        <p className="text-ink-rich leading-relaxed whitespace-pre-wrap mb-6">{thread.content}</p>

        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            disabled={likeLoading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
              liked ? "bg-primary/10 text-primary" : "bg-surface-container text-ink-muted hover:bg-surface-container-high"
            }`}
          >
            <Heart size={16} className={liked ? "fill-primary" : ""} />
            {likesCount}
          </button>
          <span className="flex items-center gap-2 text-sm text-ink-muted">
            <MessageCircle size={16} /> {thread.reply_count} replies
          </span>
        </div>
      </div>

      <h2 className="text-xl font-display text-ink-rich mb-4">Replies</h2>

      {replies.length === 0 ? (
        <p className="text-ink-muted text-sm mb-8">No replies yet. Be the first to respond!</p>
      ) : (
        <div className="space-y-4 mb-8">
          {replies.map((reply) => {
            const replyAuthor = reply.author?.username ?? "Unknown Traveler";
            const replyAvatar = reply.author?.avatar_url || "/PixelVale.jpeg";
            return (
              <motion.div
                key={reply.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 p-4 rounded-lg bg-surface-container-low"
              >
                <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-surface-container shrink-0">
                  <Image src={replyAvatar} alt={replyAuthor} fill className="object-cover" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm">{replyAuthor}</span>
                    <span className="text-xs text-ink-muted">{timeAgo(reply.created_at)}</span>
                  </div>
                  <p className="text-sm text-ink-rich whitespace-pre-wrap">{reply.content}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="border border-surface-variant rounded-xl p-4">
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          rows={3}
          placeholder={isLoggedIn ? "Write a reply..." : "Log in to join the conversation"}
          disabled={!isLoggedIn}
          className="w-full bg-transparent outline-none resize-none text-sm placeholder:text-ink-muted disabled:opacity-60"
        />
        <div className="flex justify-between items-center mt-2">
          {error && <p className="text-red-600 text-xs">{error}</p>}
          <button
            onClick={handleReply}
            disabled={!isLoggedIn || submitting || !replyText.trim()}
            className="ml-auto flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Send size={14} /> {submitting ? "Posting..." : "Reply"}
          </button>
        </div>
      </div>
    </>
  );
}