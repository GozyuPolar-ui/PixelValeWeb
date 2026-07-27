"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import { featuredArticle } from "@/lib/data";

export default function FeaturedArticle() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-20"
    >
      <div className="group relative overflow-hidden rounded-xl bg-paper-dark border border-outline-variant flex flex-col lg:flex-row shadow-sm hover:shadow-md transition-shadow">
        <div className="lg:w-3/5 h-[300px] lg:h-[400px] relative overflow-hidden">
          <Image
            src={featuredArticle.image}
            alt={featuredArticle.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="lg:w-2/5 p-8 flex flex-col justify-center">
          <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] font-bold tracking-widest uppercase mb-4 w-fit rounded">
            {featuredArticle.tag}
          </span>
          <h2 className="text-2xl md:text-3xl font-display text-ink-rich mb-4 leading-tight">
            {featuredArticle.title}
          </h2>
          <p className="text-on-surface-variant mb-6">{featuredArticle.excerpt}</p>
          <div className="flex items-center gap-4 mb-8 text-xs text-ink-muted">
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {featuredArticle.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} /> {featuredArticle.readTime}
            </span>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-fit px-8 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors"
          >
            Read More
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}