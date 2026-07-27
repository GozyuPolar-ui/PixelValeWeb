"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

type Props = {
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  index: number;
};

export default function NewsCard({
  category,
  categoryColor,
  title,
  excerpt,
  date,
  image,
  index,
}: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="flex flex-col bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-pixel hover:shadow-pixel-hover transition-all"
    >
      <div className="aspect-video relative overflow-hidden bg-surface-container">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <span className={`${categoryColor} text-xs font-bold mb-2 uppercase tracking-wide`}>
          {category}
        </span>
        <h3 className="text-xl font-display mb-3 text-ink-rich">{title}</h3>
        <p className="text-on-surface-variant mb-6 line-clamp-3 text-sm">{excerpt}</p>
        <div className="mt-auto flex justify-between items-center">
          <span className="text-xs text-ink-muted">{date}</span>
          <a href="#" className="text-primary font-bold hover:underline flex items-center gap-1 text-sm">
            Read <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}