"use client";

import { motion } from "framer-motion";
import {
  DownloadCloud,
  CreditCard,
  Wrench,
  ShoppingCart,
  Rocket,
  Bug,
  LucideIcon,
} from "lucide-react";
import { helpCategories } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  DownloadCloud,
  CreditCard,
  Wrench,
  ShoppingCart,
  Rocket,
  Bug,
};

export default function HelpCategories() {
  return (
    <section className="mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {helpCategories.map((cat, i) => {
          const Icon = iconMap[cat.icon];
          return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="bg-surface-container-low p-8 border border-surface-variant rounded-xl hover:bg-primary hover:text-white transition-all duration-300 group cursor-pointer"
            >
              <div className="mb-4 text-primary group-hover:text-white transition-colors">
                <Icon size={44} />
              </div>
              <h3 className="text-xl font-display mb-2">{cat.title}</h3>
              <p className="text-on-surface-variant group-hover:text-white/90 text-sm">
                {cat.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}