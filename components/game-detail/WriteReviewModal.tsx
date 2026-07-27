"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Star } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Props = {
  gameId: string;
  onClose: () => void;
};

export default function WriteReviewModal({ gameId, onClose }: Props) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const supabase = createClient();
  const router = useRouter();

  const handleSubmit = async () => {
    setError("");
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Kamu harus login dulu.");
      return;
    }

    setSubmitting(true);
    const { error: insertError } = await supabase.from("reviews").insert({
      user_id: user.id,
      game_id: gameId,
      rating,
      review_text: text,
    });

    setSubmitting(false);

if (insertError) {
      if (insertError.code === "23505") {
        setError("Kamu sudah pernah menulis review untuk game ini.");
      } else {
        setError("Gagal mengirim review. Coba lagi.");
      }
      return;
    }

    

    router.refresh();
    onClose();
  };

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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl p-6 max-w-md w-full relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-ink-muted hover:text-primary">
            <X size={20} />
          </button>
          <h3 className="text-xl font-display text-ink-rich mb-4">Write a Review</h3>

          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)}>
                <Star size={28} className={star <= rating ? "fill-primary text-primary" : "text-outline-variant"} />
              </button>
            ))}
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="Bagaimana pengalaman kamu dengan game ini?"
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary/20 resize-none mb-4"
          />

          {error && <p className="text-red-600 text-xs mb-4">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={submitting || !text.trim()}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-60"
          >
            {submitting ? "Mengirim..." : "Submit Review"}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}