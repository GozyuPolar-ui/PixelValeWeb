"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { popularArticles } from "@/lib/data";

export default function PopularArticles() {
  return (
    <section className="mb-24">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-2xl font-display text-ink-rich whitespace-nowrap">
          Popular Articles
        </h2>
        <div className="flex-grow border-t-2 border-surface-variant/50" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
        {popularArticles.map((article, i) => (
          <motion.a
            key={article.title}
            href="#"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group flex items-start gap-4 p-4 rounded-lg hover:bg-surface-container transition-colors"
          >
            <FileText size={20} className="text-secondary mt-1 shrink-0" />
            <div>
              <h4 className="font-bold group-hover:text-primary transition-colors">
                {article.title}
              </h4>
              <p className="text-xs text-ink-muted">{article.desc}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}