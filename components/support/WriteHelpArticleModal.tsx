"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const categories = [
  "Download & Installation",
  "Account & Billing",
  "Technical Issues",
  "Refunds & Purchases",
  "Launcher Help",
  "Report a Bug",
];

export default function WriteHelpArticleModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const supabase = createClient();
  const router = useRouter();

  const handleSubmit = async () => {
    setError("");
    if (!title.trim() || !summary.trim() || !content.trim()) {
      setError("Judul, ringkasan, dan isi wajib diisi.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Kamu harus login dulu.");
      return;
    }

    setSubmitting(true);
    const { error: insertError } = await supabase.from("help_articles").insert({
      author_id: user.id,
      title,
      summary,
      content,
      category,
    });
    setSubmitting(false);

    if (insertError) {
      setError("Gagal mengirim artikel. Coba lagi.");
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
          className="bg-white rounded-xl p-6 max-w-lg w-full relative max-h-[90vh] overflow-y-auto"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-ink-muted hover:text-primary">
            <X size={20} />
          </button>
          <h3 className="text-xl font-display text-ink-rich mb-4">Write a Help Article</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-ink-muted mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-muted mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Cara reset password akun"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-muted mb-1">
                Summary (ringkasan singkat, tampil di list)
              </label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={2}
                placeholder="1 kalimat ringkasan"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-muted mb-1">
                Content (isi lengkap artikel)
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                placeholder="Tulis langkah-langkah / penjelasan lengkap di sini"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>
          </div>

          {error && <p className="text-red-600 text-xs mt-4">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-60 mt-6"
          >
            {submitting ? "Mengirim..." : "Publish Article"}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}