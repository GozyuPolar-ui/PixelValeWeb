"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export type Contributor = {
  username: string;
  avatar_url: string | null;
  total: number;
  badge: string;
  badgeColor: string;
  highlighted: boolean;
};

export default function TopContributors({
  contributors,
}: {
  contributors: Contributor[];
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-paper-dark p-6 rounded-xl border border-surface-variant"
    >
      <h2 className="text-lg font-display text-ink-rich mb-6 flex items-center gap-2">
        <Sparkles size={20} className="text-primary" />
        Top Contributors
      </h2>

      {contributors.length === 0 ? (
        <p className="text-sm text-ink-muted">No contributors yet.</p>
      ) : (
        <ul className="space-y-4">
          {contributors.map((c) => (
            <li key={c.username} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`relative w-8 h-8 rounded-full overflow-hidden ${
                    c.highlighted ? "border-2 border-primary" : ""
                  }`}
                >
                  <Image
                    src={c.avatar_url || "/PixelVale.jpeg"}
                    alt={c.username}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-bold text-sm">{c.username}</span>
              </div>
              <span className={`${c.badgeColor} px-2 py-1 rounded text-[10px] font-bold`}>
                {c.badge}
              </span>
            </li>
          ))}
        </ul>
      )}
    </motion.section>
  );
}