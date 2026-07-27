"use client";

import { motion } from "framer-motion";
import { Play, Download } from "lucide-react";
import Image from "next/image";

type Props = {
  title: string;
  genre: string;
  installed: boolean;
  image: string;
  index: number;
};

export default function LibraryGameCard({ title, genre, installed, image, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className={`group bg-paper-dark border border-outline-variant/40 rounded-xl overflow-hidden transition-all hover:border-primary/50 ${
        !installed ? "opacity-90" : ""
      }`}
    >
      <div className="aspect-video relative overflow-hidden bg-surface-container">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {installed && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-secondary flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> Installed
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg text-ink-rich mb-1">{title}</h3>
        <p className="text-xs text-ink-muted mb-4">{genre}</p>
        {installed ? (
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full bg-primary text-white py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
          >
            <Play size={16} /> Play Now
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full border-2 border-secondary text-secondary py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-secondary hover:text-white transition-all"
          >
            <Download size={16} /> Download
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}