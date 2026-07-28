"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Search,
  FileText,
  DownloadCloud,
  CreditCard,
  Wrench,
  ShoppingCart,
  Rocket,
  Bug,
  ChevronDown,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";

type HelpArticle = {
  id: string;
  title: string;
  summary: string;
  category: string;
  created_at: string;
};

const categories: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: DownloadCloud, title: "Download & Installation", desc: "Troubleshoot file errors, installer loops, and speed issues." },
  { icon: CreditCard, title: "Account & Billing", desc: "Manage payment methods, subscriptions, and profile security." },
  { icon: Wrench, title: "Technical Issues", desc: "Fix crashes, black screens, and hardware compatibility problems." },
  { icon: ShoppingCart, title: "Refunds & Purchases", desc: "Learn about our refund policy and track recent orders." },
  { icon: Rocket, title: "Launcher Help", desc: "Optimize your Pixelvale Launcher settings and library view." },
  { icon: Bug, title: "Report a Bug", desc: "Submit feedback directly to our indie developers." },
];

const PAGE_SIZE = 6;

export default function HelpCenter({ articles }: { articles: HelpArticle[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = articles.filter((a) => {
    const matchesQuery =
      !query.trim() ||
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.summary.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = !activeCategory || a.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setVisibleCount(PAGE_SIZE);
  };

  const handleCategoryClick = (title: string) => {
    setActiveCategory((prev) => (prev === title ? null : title));
    setVisibleCount(PAGE_SIZE);
  };

  const clearCategory = () => {
    setActiveCategory(null);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <>
      <section className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center gap-4 mb-6"
        >
          <Lightbulb size={36} className="text-primary fill-primary/20" />
          <h1 className="text-3xl md:text-5xl font-display text-ink-rich">How can we help?</h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="max-w-2xl mx-auto relative"
        >
          <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search for help articles, error codes, or topics..."
            className="w-full pl-14 pr-6 py-5 bg-surface-container border-2 border-surface-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none placeholder:text-ink-muted"
          />
        </motion.div>
        <p className="text-xs text-ink-muted mt-3">
          Results update instantly as you type or pick a category below — no need to press search.
        </p>
      </section>

      <section className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.title;
            return (
              <motion.button
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                onClick={() => handleCategoryClick(cat.title)}
                className={`text-left p-8 border-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 border-primary shadow-sm"
                    : "bg-surface-container-low border-surface-variant hover:border-primary/40"
                }`}
              >
                <div className="mb-4 text-primary">
                  <Icon size={44} />
                </div>
                <h3 className="text-xl font-display mb-2 text-ink-rich">{cat.title}</h3>
                <p className="text-sm text-on-surface-variant">{cat.desc}</p>
                {isActive && (
                  <span className="inline-block mt-4 text-[10px] font-bold text-primary uppercase tracking-wide">
                    ✓ Selected
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </section>

      <section className="mb-24">
        <div className="flex items-center gap-4 mb-2">
          <h2 className="text-2xl font-display text-ink-rich whitespace-nowrap">
            Popular Articles
          </h2>
          <div className="flex-grow border-t-2 border-surface-variant/50" />
        </div>

        {activeCategory ? (
          <p className="text-xs text-on-surface-variant mb-6">
            Showing results for <span className="font-bold text-primary">{activeCategory}</span>
            {" — "}
            <button onClick={clearCategory} className="underline hover:text-primary">
              clear filter
            </button>
          </p>
        ) : (
          <div className="mb-6" />
        )}

        {filtered.length === 0 ? (
          <p className="text-ink-muted text-center py-12 text-sm">
            {articles.length === 0
              ? "No help articles yet."
              : "No articles match your search or category."}
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
              {visible.map((article, i) => (
                <Link key={article.id} href={`/support/articles/${article.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group flex items-start gap-4 p-4 rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    <FileText size={20} className="text-secondary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-bold text-ink-rich group-hover:text-primary transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-xs text-ink-muted">{article.summary}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="flex items-center gap-2 text-sm font-bold text-primary border-2 border-primary/30 rounded-full px-6 py-2.5 hover:bg-primary hover:text-white transition-colors"
                >
                  Show More <ChevronDown size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}