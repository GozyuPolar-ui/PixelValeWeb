"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ImagePlus, Loader2 } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const categories = ["Update", "Devlog", "Event", "Sale"];

export default function WriteArticleModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Update");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();
  const router = useRouter();

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Kamu harus login dulu.");
      setUploading(false);
      return;
    }

    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("article-images")
      .upload(filePath, file);

    if (uploadError) {
      setError("Gagal upload gambar: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("article-images").getPublicUrl(filePath);
    setImageUrl(data.publicUrl);
    setUploading(false);
  };

  const handleSubmit = async () => {
    setError("");
    if (!title.trim() || !excerpt.trim() || !content.trim()) {
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
    const { error: insertError } = await supabase.from("articles").insert({
      author_id: user.id,
      title,
      excerpt,
      content,
      category,
      image_url: imageUrl || null,
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
          <h3 className="text-xl font-display text-ink-rich mb-4">Write an Article</h3>

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
                placeholder="Judul artikel"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-muted mb-1">Cover Image</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
              />
              {imageUrl ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative aspect-video rounded-lg overflow-hidden border border-outline-variant cursor-pointer group"
                >
                  <Image src={imageUrl} alt="Cover" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-white text-xs font-bold">Ganti gambar</span>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full aspect-video rounded-lg border-2 border-dashed border-outline-variant flex flex-col items-center justify-center gap-2 text-ink-muted hover:border-primary hover:text-primary transition-colors"
                >
                  {uploading ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      <span className="text-xs">Mengupload...</span>
                    </>
                  ) : (
                    <>
                      <ImagePlus size={24} />
                      <span className="text-xs">Klik untuk pilih gambar</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-muted mb-1">Excerpt (ringkasan singkat)</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                placeholder="1-2 kalimat ringkasan"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-muted mb-1">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                placeholder="Isi lengkap artikel"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>
          </div>

          {error && <p className="text-red-600 text-xs mt-4">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={submitting || uploading}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-60 mt-6"
          >
            {submitting ? "Mengirim..." : "Publish Article"}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}