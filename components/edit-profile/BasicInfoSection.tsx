"use client";

import { motion } from "framer-motion";
import { UserCircle } from "lucide-react";

const genres = ["RPG", "Adventure", "Puzzle", "Cozy", "Strategy", "Indie", "Sim", "World"];

type Props = {
  username: string;
  bio: string;
  genre: string;
  onUsernameChange: (val: string) => void;
  onBioChange: (val: string) => void;
  onGenreChange: (val: string) => void;
};

export default function BasicInfoSection({
  username,
  bio,
  genre,
  onUsernameChange,
  onBioChange,
  onGenreChange,
}: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-xl border border-outline-variant"
    >
      <div className="flex items-center gap-2 mb-8">
        <UserCircle size={22} className="text-primary" />
        <h2 className="text-xl font-display text-ink-rich">Basic Info</h2>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-ink-muted mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-ink-muted mb-2">Bio</label>
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => onBioChange(e.target.value)}
            maxLength={500}
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
          />
          <p className="text-xs text-ink-muted mt-2 text-right">{bio.length}/500 characters</p>
        </div>
        <div>
          <label className="block text-xs font-bold text-ink-muted mb-2">Favorite Genre</label>
          <select
            value={genre}
            onChange={(e) => onGenreChange(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-pointer"
          >
            {genres.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>
    </motion.section>
  );
}