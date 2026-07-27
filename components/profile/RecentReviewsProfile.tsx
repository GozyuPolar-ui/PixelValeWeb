"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { profileReviews } from "@/lib/data";

export default function RecentReviewsProfile() {
  return (
    <section>
      <h2 className="text-xl font-display text-ink-rich mb-6">Recent Reviews</h2>
      <div className="space-y-6">
        {profileReviews.map((review, i) => (
          <motion.div
            key={review.game}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-paper-dark border border-outline-variant rounded-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-4">
                <div className="relative w-12 h-12 bg-surface-container-highest rounded-lg overflow-hidden border border-outline-variant">
                  <Image src={review.image} alt={review.game} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-ink-rich">{review.game}</h4>
                  <div className="flex text-primary">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={16} className={idx < review.rating ? "fill-primary" : "fill-none"} />
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-xs text-ink-muted">{review.date}</span>
            </div>
            <p className="text-ink-muted italic text-sm">{review.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}