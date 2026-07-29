"use client";

import { motion } from "framer-motion";
import { Users, MessageSquare, Circle } from "lucide-react";

type Stat = {
  icon: "Users" | "MessageSquare" | "Circle";
  value: string;
  label: string;
};

const iconMap = { Users, MessageSquare, Circle };

export default function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-paper-dark p-6 mb-12 rounded-xl flex flex-wrap gap-12 items-center"
    >
      {stats.map((stat, i) => {
        const Icon = iconMap[stat.icon];
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
            {i < stats.length - 1 && (
              <div className="hidden md:block w-px h-10 bg-outline-variant" />
            )}
          </div>
        );
      })}
    </motion.div>
  );
}