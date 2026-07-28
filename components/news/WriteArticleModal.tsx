"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ImagePlus, Loader2, ImageDown } from "lucide-react";
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
  const [uploadingInline, setUploadingInline] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inlineFileInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const supabase = createClient();
  const router = useRouter();

  const uploadToBucket = async (file: File, prefix: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Kamu harus login dulu.");
      return null;
    }

    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}/${prefix}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("article-images")
      .upload(filePath, file);

    if (uploadError) {
      setError("Gagal upload gambar: " + uploadError.message);
      return null;
    }

    const { data } = supabase.storage.from("article-images").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    setError("");
    const url = await uploadToBucket(file, "cover");
    if (url) setImageUrl(url);
    setUploading(false);
  };

  const handleInlineImageUpload = async (file: File) => {
    setUploadingInline(true);
    setError("");
    const url = await uploadToBucket(file, "inline");
    setUploadingInline(false);
    if (!url) return;

    const textarea = contentRef.current;
    const markdownImage = `\n\n![](${url})\n\n`;

    if (textarea) {
      const start = textarea.selectionStart ?? content.length;
      const end = textarea.selectionEnd ?? content.length;
      const newContent = content.slice(0, start) + markdownImage + content.slice(end);
      setContent(newContent);
      // restore focus & cursor after the inserted image, on next tick
      requestAnimationFrame(() => {
        textarea.focus();
        const cursorPos = start + markdownImage.length;
        textarea.setSelectionRange(cursorPos, cursorPos);
      });
    } else {
      setContent((prev) => prev + markdownImage);
    }
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
              <label className="block text-xs font-bold text-ink-muted mb-1">
  Cover Image <span className="font-normal text-ink-muted/70">(foto sampul/thumbnail artikel)</span>
</label>
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
  <span className="text-white text-xs font-bold">Ganti Foto Sampul</span>
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
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-ink-muted">
  Content <span className="font-normal text-ink-muted/70">(isi artikel)</span>
</label>
                <input
                  ref={inlineFileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleInlineImageUpload(file);
                    e.target.value = "";
                  }}
                />
                <button
                  type="button"
                  onClick={() => inlineFileInputRef.current?.click()}
                  disabled={uploadingInline}
                  className="flex items-center gap-1 text-[11px] font-bold text-primary hover:underline disabled:opacity-50"
                >
                  {uploadingInline ? (
                    <>
                      <Loader2 size={12} className="animate-spin" /> Uploading...
                    </>
                  ) : (
                    <>
                      <ImageDown size={12} /> Sisipkan Gambar ke Artikel
                    </>
                  )}
                </button>
              </div>
              <textarea
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                placeholder="Isi lengkap artikel. Taruh kursor di posisi yang mau disisipin gambar, terus klik 'Insert Image' di atas."
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
              <p className="text-[10px] text-ink-muted mt-1">
                Tip: gambar yang disisip otomatis ditulis sebagai <code>![](url)</code> — jangan
                dihapus manual kalau gak mau gambarnya ilang.
              </p>
            </div>
          </div>

          {error && <p className="text-red-600 text-xs mt-4">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={submitting || uploading || uploadingInline}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-60 mt-6"
          >
            {submitting ? "Mengirim..." : "Publish Article"}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}