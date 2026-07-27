"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, PenLine } from "lucide-react";
import WriteReviewModal from "./game-detail/WriteReviewModal";

type Review = {
  id: string;
  rating: number;
  review_text: string;
  profiles: { username: string; avatar_url: string } | null;
};

export default function CommunityReviews({
  gameId,
  reviews,
  hasReviewed,
}: {
  gameId: string;
  reviews: Review[];
  hasReviewed: boolean;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-container-max mx-auto px-6 md:px-16 mt-16">
      <div className="flex justify-between items-end mb-8">
        <h3 className="text-xl font-display border-b-4 border-surface-variant inline-block pb-1">
          Community Reviews
        </h3>
{!hasReviewed && (
          <button
            onClick={() => setShowModal(true)}
            className="text-primary font-bold flex items-center gap-2 hover:underline text-sm"
          >
            Write a Review <PenLine size={16} />
          </button>
        )}
      </div>

      {reviews.length === 0 ? (
        <p className="text-ink-muted text-sm">Belum ada review untuk game ini. Jadilah yang pertama!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-6 bg-white border border-outline-variant rounded-xl shadow-pixel hover:shadow-pixel-hover transition-shadow"
            >
              <div className="flex gap-1 text-yellow-500 mb-3">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={16} className={idx < review.rating ? "fill-yellow-500" : "fill-none"} />
                ))}
              </div>
              <p className="text-on-surface-variant italic mb-4 text-sm">{review.review_text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center font-bold text-secondary text-sm">
                  {review.profiles?.username?.charAt(0).toUpperCase() || "?"}
                </div>
                <p className="font-bold text-sm">{review.profiles?.username || "Anonymous"}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showModal && <WriteReviewModal gameId={gameId} onClose={() => setShowModal(false)} />}
    </div>
  );
}