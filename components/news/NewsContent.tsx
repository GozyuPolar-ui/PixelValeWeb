"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PenLine, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import WriteArticleModal from "./WriteArticleModal";

const categoryFilters = ["All", "Update", "Devlog", "Event", "Sale"];

type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image_url: string | null;
  created_at: string;
};

export default function NewsContent({ articles }: { articles: Article[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const filtered =
    activeCategory === "All" ? articles : articles.filter((a) => a.category === activeCategory);

  const [featured, ...rest] = filtered;

  return (
    <>
      <section className="mb-16">
        <div className="flex justify-between items-start mb-8 gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-display text-ink-rich mb-2">Platform News</h1>
            <p className="text-lg text-on-surface-variant max-w-2xl">
              Updates, devlogs, and announcements from the heart of the Vale.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors shrink-0"
          >
            <PenLine size={16} /> Write Article
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {categoryFilters.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {filtered.length === 0 ? (
        <p className="text-ink-muted text-center py-16">Belum ada artikel di kategori ini.</p>
      ) : (
        <>
          {featured && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-20"
            >
              <Link href={`/news/${featured.id}`}>
                <div className="group relative overflow-hidden rounded-xl bg-paper-dark border border-outline-variant flex flex-col lg:flex-row shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="lg:w-3/5 h-[300px] lg:h-[400px] relative overflow-hidden bg-surface-container-highest">
                    {featured.image_url && (
                      <Image
                        src={featured.image_url}
                        alt={featured.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                  </div>
                  <div className="lg:w-2/5 p-8 flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] font-bold tracking-widest uppercase mb-4 w-fit rounded">
                      {featured.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-display text-ink-rich mb-4 leading-tight group-hover:text-primary transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-on-surface-variant mb-6">{featured.excerpt}</p>
                    <p className="text-xs text-ink-muted">
                      {new Date(featured.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.section>
          )}

          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {rest.map((article, i) => (
                <Link key={article.id} href={`/news/${article.id}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-pixel hover:shadow-pixel-hover transition-all cursor-pointer group h-full"
                  >
                    <div className="aspect-video relative overflow-hidden bg-surface-container">
                      {article.image_url && (
                        <Image
                          src={article.image_url}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-primary text-xs font-bold mb-2 uppercase tracking-wide">
                        {article.category}
                      </span>
                      <h3 className="text-xl font-display mb-3 text-ink-rich group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-on-surface-variant mb-6 line-clamp-3 text-sm">
                        {article.excerpt}
                      </p>
                      <div className="mt-auto flex justify-between items-center">
                        <span className="text-xs text-ink-muted">
                          {new Date(article.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <ArrowRight
                          size={14}
                          className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          )}
        </>
      )}

      {showModal && <WriteArticleModal onClose={() => setShowModal(false)} />}
    </>
  );
}