"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase";

type Props = {
  userId: string;
  avatarUrl: string;
  bannerUrl: string;
  onAvatarChange: (url: string) => void;
  onBannerChange: (url: string) => void;
};

export default function AvatarBannerCard({ userId, avatarUrl, bannerUrl, onAvatarChange, onBannerChange }: Props) {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const supabase = createClient();

  const handleFileUpload = async (
    file: File,
    bucket: "avatars" | "banners",
    onSuccess: (url: string) => void,
    setLoading: (val: boolean) => void
  ) => {
    setLoading(true);
    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}/${bucket === "avatars" ? "avatar" : "banner"}.${fileExt}`;

    const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
      upsert: true,
    });

    if (error) {
      alert("Upload gagal: " + error.message);
      setLoading(false);
      return;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    onSuccess(`${data.publicUrl}?t=${Date.now()}`);
    setLoading(false);
  };

  return (
    <aside className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-paper-dark p-8 rounded-xl border border-outline-variant flex flex-col items-center text-center"
      >
        <div className="relative w-32 h-32 rounded-full border-4 border-surface-container-low overflow-hidden mb-6 group cursor-pointer shadow-sm">
          {avatarUrl && <Image src={avatarUrl} alt="Avatar" fill className="object-cover" />}
          <div
            onClick={() => avatarInputRef.current?.click()}
            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {uploadingAvatar ? (
              <Loader2 size={22} className="text-white animate-spin" />
            ) : (
              <Camera size={22} className="text-white" />
            )}
          </div>
        </div>
        <input
          ref={avatarInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file, "avatars", onAvatarChange, setUploadingAvatar);
          }}
        />
        <button
          onClick={() => avatarInputRef.current?.click()}
          className="w-full py-2.5 px-4 rounded-lg border-2 border-secondary text-secondary text-xs font-bold hover:bg-secondary hover:text-white transition-all"
        >
          Change Photo
        </button>
        <p className="text-xs text-ink-muted mt-4">JPG, PNG or GIF. Max 2MB.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-paper-dark p-8 rounded-xl border border-outline-variant"
      >
        <h3 className="text-lg font-display text-ink-rich mb-4">Profile Banner</h3>
        <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-surface-container-highest mb-6 bg-surface-container-low group cursor-pointer">
          {bannerUrl && <Image src={bannerUrl} alt="Banner" fill className="object-cover" />}
          <div
            onClick={() => bannerInputRef.current?.click()}
            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {uploadingBanner ? (
              <Loader2 size={22} className="text-white animate-spin" />
            ) : (
              <ImageIcon size={22} className="text-white" />
            )}
          </div>
        </div>
        <input
          ref={bannerInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file, "banners", onBannerChange, setUploadingBanner);
          }}
        />
        <button
          onClick={() => bannerInputRef.current?.click()}
          className="w-full py-2.5 px-4 rounded-lg border-2 border-secondary text-secondary text-xs font-bold hover:bg-secondary hover:text-white transition-all"
        >
          Change Banner
        </button>
        <p className="text-xs text-ink-muted mt-4">Recommended: 1500 x 500 px</p>
      </motion.div>
    </aside>
  );
}