"use client";

import { useState } from "react";
import { PenLine } from "lucide-react";
import ThreadCard, { Thread } from "./ThreadCard";
import NewThreadModal from "./NewThreadModal";

const PAGE_SIZE = 8;

export default function CommunityFeed({
  pinnedThreads,
  regularThreads,
}: {
  pinnedThreads: Thread[];
  regularThreads: Thread[];
}) {
  const [showModal, setShowModal] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleRegular = regularThreads.slice(0, visibleCount);
  const hasMore = regularThreads.length > visibleCount;

  return (
    <>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
        >
          <PenLine size={16} /> New Thread
        </button>
      </div>

      {pinnedThreads.length === 0 && regularThreads.length === 0 ? (
        <p className="text-ink-muted text-center py-16">
          No threads yet. Be the first to start a conversation!
        </p>
      ) : (
        <>
          {pinnedThreads.map((thread, i) => (
            <ThreadCard key={thread.id} thread={thread} index={i} />
          ))}

          {pinnedThreads.length > 0 && regularThreads.length > 0 && (
            <div className="h-1 bg-surface-variant opacity-50 my-8" />
          )}

          <div className="space-y-6">
            {visibleRegular.map((thread, i) => (
              <ThreadCard key={thread.id} thread={thread} index={i} />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center pt-8">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="bg-surface border-2 border-primary text-primary px-12 py-3 rounded-lg font-bold hover:bg-primary hover:text-white transition-all"
              >
                Load More Travelers
              </button>
            </div>
          )}
        </>
      )}

      {showModal && <NewThreadModal onClose={() => setShowModal(false)} />}
    </>
  );
}