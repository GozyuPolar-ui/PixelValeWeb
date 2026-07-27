"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Save, Check, Loader2 } from "lucide-react";
import Link from "next/link";

type Props = {
  onSave: () => void;
  status: "idle" | "saving" | "saved" | "error";
};

export default function FormActions({ onSave, status }: Props) {
  return (
    <div className="flex items-center justify-end gap-4 pt-4">
      <Link href="/profile">
        <button type="button" className="py-3 px-8 rounded-lg border-2 border-outline text-ink-muted text-xs font-bold hover:bg-surface-container-highest transition-all">
          Cancel
        </button>
      </Link>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onSave}
        disabled={status !== "idle"}
        className={`py-3 px-10 rounded-lg text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 ${
          status === "saved" ? "bg-secondary" : status === "error" ? "bg-red-600" : "bg-primary hover:brightness-110"
        }`}
      >
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.span key="idle" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Save size={16} /> Save Changes
            </motion.span>
          )}
          {status === "saving" && (
            <motion.span key="saving" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Loader2 size={16} className="animate-spin" /> Saving...
            </motion.span>
          )}
          {status === "saved" && (
            <motion.span key="saved" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Check size={16} /> Saved!
            </motion.span>
          )}
          {status === "error" && (
            <motion.span key="error" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Failed, try again
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}