"use client";

import { motion } from "framer-motion";
import { Users, MessageSquare, Circle } from "lucide-react";
import { communityStats } from "@/lib/data";

const iconMap = { Users, MessageSquare, Circle };

export default function StatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-paper-dark p-6 mb-12 rounded-xl flex flex-wrap gap-12 items-center"
    >
      {communityStats.map((stat, i) => {
        const Icon = iconMap[stat.icon as keyof typeof iconMap];
        return (
          <div key={stat.label} className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Icon
                size={22}
                className={i === 2 ? "text-secondary fill-secondary" : "text-primary fill-primary/20"}
              />
              <div>
                <p className="text-xl font-display leading-none">{stat.value}</p>
                <p className="text-xs text-ink-muted">{stat.label}</p>
              </div>
            </div>
            {i < communityStats.length - 1 && (
              <div className="hidden md:block w-px h-10 bg-outline-variant" />
            )}
          </div>
        );
      })}
    </motion.div>
  );
}