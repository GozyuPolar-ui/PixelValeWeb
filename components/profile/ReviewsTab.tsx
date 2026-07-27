"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

type ReviewItem = {
  id: string;
  rating: number;
  review_text: string;
  created_at: string;
  games: { title: string; image_url: string };
};

export default function ReviewsTab({ reviews }: { reviews: ReviewItem[] }) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-ink-muted">Kamu belum menulis review apapun.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review, i) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="p-6 bg-paper-dark border border-outline-variant rounded-lg"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-4">
              <div className="relative w-12 h-12 bg-surface-container-highest rounded-lg overflow-hidden border border-outline-variant">
                <Image src={review.games.image_url} alt={review.games.title} fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-ink-rich">{review.games.title}</h4>
                <div className="flex text-primary">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={16} className={idx < review.rating ? "fill-primary" : "fill-none"} />
                  ))}
                </div>
              </div>
            </div>
            <span className="text-xs text-ink-muted">
              {new Date(review.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <p className="text-ink-muted italic text-sm">{review.review_text}</p>
        </motion.div>
      ))}
    </div>
  );
}