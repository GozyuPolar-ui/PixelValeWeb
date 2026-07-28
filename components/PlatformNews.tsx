"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image_url: string | null;
  created_at: string;
};

export default function PlatformNews({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="py-24 bg-paper-dark/30 border-y-4 border-surface-variant" id="news">
      <div className="max-w-container-max mx-auto px-6 md:px-16">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-2xl font-display text-ink-rich">Platform News</h2>
          <Link href="/news" className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {articles.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden shrink-0 border-2 border-outline-variant bg-surface-container-highest">
                {item.image_url && (
                  <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                )}
              </div>
              <div className="flex-grow">
                <span className="text-xs font-bold text-secondary uppercase tracking-widest mb-2 block">
                  {item.category}
                </span>
                <h3 className="text-xl font-display mb-3 text-ink-rich hover:text-primary transition-colors cursor-pointer">
                  {item.title}
                </h3>
                <p className="text-on-surface-variant line-clamp-3">{item.excerpt}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}