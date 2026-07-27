"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Pause, X } from "lucide-react";
import Image from "next/image";
import { activeDownload } from "@/lib/data";

export default function DownloadWidget() {
  const [progress, setProgress] = useState(activeDownload.percent);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p < 100 ? p + Math.random() * 0.5 : p));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-paper-dark border border-outline-variant/40 rounded-xl p-6"
    >
      <h2 className="font-display text-lg text-primary mb-4 flex items-center gap-2">
        <Download size={20} /> Downloading
      </h2>
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16 rounded overflow-hidden shrink-0 bg-surface-container">
          <Image src={activeDownload.image} alt={activeDownload.title} fill className="object-cover" />
        </div>
        <div className="flex-1 overflow-hidden">
          <h4 className="font-bold text-sm truncate text-ink-rich">{activeDownload.title}</h4>
          <p className="text-xs text-ink-muted">
            {activeDownload.downloaded} / {activeDownload.total}
          </p>
        </div>
      </div>
      <div className="w-full bg-surface-container-high rounded-full h-2 mb-2 overflow-hidden">
        <motion.div
          className="bg-primary h-full rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="flex justify-between items-center text-[10px] font-bold text-ink-muted uppercase tracking-wider mb-4">
        <span>{Math.floor(progress)}% Complete</span>
        <span>{activeDownload.speed}</span>
      </div>
      <div className="flex gap-2">
        <button className="flex-1 border border-outline-variant rounded py-1.5 hover:bg-surface-container transition-colors flex items-center justify-center">
          <Pause size={16} />
        </button>
        <button className="flex-1 border border-outline-variant rounded py-1.5 hover:bg-surface-container transition-colors text-red-600 flex items-center justify-center">
          <X size={16} />
        </button>
      </div>
    </motion.section>
  );
}