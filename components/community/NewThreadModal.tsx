"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ImagePlus } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";

const tags = ["Discussion", "Fan Art", "Guide", "Question", "Feedback"];

export default function NewThreadModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState(tags[0]);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const inlineImageRef = useRef<HTMLInputElement>(null);

  const supabase = createClient();
  const router = useRouter();

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Cover must be an image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Cover image must be under 5MB.");
      return;
    }
    setError("");
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const removeCover = () => {
    setCoverFile(null);
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setCoverPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const insertAtCursor = (textToInsert: string) => {
    const el = contentRef.current;
    if (!el) {
      setContent((prev) => prev + textToInsert);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    
    // Gunakan callback prev untuk nilai state paling aman
    setContent((prev) => {
      const next = prev.slice(0, start) + textToInsert + prev.slice(end);
      return next;
    });

    requestAnimationFrame(() => {
      el.focus();
      const newPos = start + textToInsert.length;
      el.setSelectionRange(newPos, newPos);
    });
  };

  const handleInlineImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("File must be an image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError("You need to be logged in first.");
      return;
    }

    setUploadingImage(true);
    setError("");

    const ext = file.name.split(".").pop() || "jpg";
    const path = `${user.id}/${Date.now()}-inline.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("community")
      .upload(path, file, { cacheControl: "3600", upsert: false });

    setUploadingImage(false);
    if (inlineImageRef.current) inlineImageRef.current.value = "";

    if (uploadError) {
      setError("Failed to upload image.");
      return;
    }

    const { data: urlData } = supabase.storage.from("community").getPublicUrl(path);
    insertAtCursor(`\n![image](${urlData.publicUrl})\n`);
  };

  const handleSubmit = async () => {
    setError("");
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You need to be logged in first.");
      return;
    }

    setSubmitting(true);

    let cover_url: string | null = null;

    if (coverFile) {
      const ext = coverFile.name.split(".").pop() || "jpg";
      const path = `${user.id}/${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("community")
        .upload(path, coverFile, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        setSubmitting(false);
        setError("Failed to upload cover image.");
        return;
      }

      const { data: urlData } = supabase.storage.from("community").getPublicUrl(path);
      cover_url = urlData.publicUrl;
    }

    const { error: insertError } = await supabase.from("community_threads").insert({
      author_id: user.id,
      title,
      content,
      tag,
      cover_url,
    });

    setSubmitting(false);

    if (insertError) {
      setError("Failed to create thread. Please try again.");
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
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-ink-muted hover:text-primary"
          >
            <X size={20} />
          </button>
          <h3 className="text-xl font-display text-ink-rich mb-4">Start a New Thread</h3>

          <div className="space-y-4">
            {/* Cover image */}
            <div>
              <label className="block text-xs font-bold text-ink-muted mb-1">
                Cover Image <span className="font-normal">(optional)</span>
              </label>
              {coverPreview ? (
                <div className="relative w-full h-40 rounded-lg overflow-hidden bg-surface-container">
                  <Image src={coverPreview} alt="Cover preview" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={removeCover}
                    className="absolute top-2 right-2 bg-black/60 text-white p-1.5 rounded-full hover:bg-black/80"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-full h-28 rounded-lg border-2 border-dashed border-outline-variant flex flex-col items-center justify-center gap-2 text-ink-muted hover:border-primary hover:text-primary transition-colors"
                >
                  <ImagePlus size={24} />
                  <span className="text-xs font-bold">Add cover image</span>
                </button>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                className="hidden"
              />
            </div>

            {/* Tag Selection */}
            <div>
              <label className="block text-xs font-bold text-ink-muted mb-1">Tag</label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              >
                {tags.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Title Input */}
            <div>
              <label className="block text-xs font-bold text-ink-muted mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Content Textarea with Inline Image Support */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-ink-muted">Content</label>
                <button
                  type="button"
                  onClick={() => inlineImageRef.current?.click()}
                  disabled={uploadingImage}
                  className="flex items-center gap-1 text-xs font-bold text-primary hover:underline disabled:opacity-50"
                >
                  <ImagePlus size={14} />
                  {uploadingImage ? "Uploading..." : "Insert image"}
                </button>
              </div>
              <textarea
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                placeholder="Share your thoughts with the community..."
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
              <input
                ref={inlineImageRef}
                type="file"
                accept="image/*"
                onChange={handleInlineImage}
                className="hidden"
              />
            </div>
          </div>

          {error && <p className="text-red-600 text-xs mt-4">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-60 mt-6"
          >
            {submitting ? "Posting..." : "Post Thread"}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}