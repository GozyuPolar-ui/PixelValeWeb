"use client";

import { motion } from "framer-motion";

type Props = {
  label: string;
  description: string;
  checked: boolean;
  onChange: (val: boolean) => void;
};

export default function ToggleSwitch({ label, description, checked, onChange }: Props) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h4 className="font-bold text-ink-rich text-sm">{label}</h4>
        <p className="text-xs text-ink-muted">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
          className={`w-12 h-6 rounded-full transition-colors duration-200 relative shrink-0 border ${
          checked ? "bg-primary border-primary" : "bg-surface-container-highest border-outline-variant"
        }`}
      >
          <motion.div
          animate={{ x: checked ? 24 : 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 bg-white rounded-full border border-outline-variant shadow-sm"
        />
      </button>
    </div>
  );
}