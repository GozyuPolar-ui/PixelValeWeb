"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { popularThisWeek } from "@/lib/data";

export default function NewsSidebar() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <aside className="lg:col-span-4 space-y-12">
      <div className="sticky top-24 space-y-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-surface-container-low p-6 rounded-xl border border-outline-variant"
        >
          <h4 className="text-lg font-display mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" />
            Popular This Week
          </h4>
          <ul className="space-y-6">
            {popularThisWeek.map((item, i) => (
              <li
                key={item.title}
                className={`group cursor-pointer ${i > 0 ? "border-t border-surface-variant pt-4" : ""}`}
              >
                <p className="text-xs text-primary mb-1">{item.category}</p>
                <h5 className="font-bold text-sm group-hover:text-primary transition-colors leading-tight">
                  {item.title}
                </h5>
                <p className="text-xs text-ink-muted mt-1">{item.reads}</p>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="p-8 bg-paper-dark border-4 border-surface-variant relative"
        >
          <h4 className="text-xl font-display mb-3 text-ink-rich">The Vale Dispatch</h4>
          <p className="text-on-surface-variant mb-6 text-sm">
            Get the latest pixel-perfect news delivered straight to your inbox.
          </p>
          {subscribed ? (
            <p className="text-secondary font-bold text-sm">You&apos;re subscribed! 🎉</p>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@vale.com"
                className="w-full bg-surface border-2 border-outline-variant px-4 py-3 focus:border-primary outline-none"
              />
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 hover:bg-primary/90 transition-colors"
              >
                Notify Me
              </motion.button>
            </form>
          )}
          <p className="text-[10px] text-ink-muted mt-4 text-center">
            Unsubscribe at any time. We value your tranquility.
          </p>
        </motion.section>
      </div>
    </aside>
  );
}