"use client";

import { motion } from "framer-motion";
import { Library, Heart, MessageSquare, Search, PackageOpen, type LucideIcon } from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, LucideIcon> = {
  library: Library,
  heart: Heart,
  message: MessageSquare,
  search: Search,
  package: PackageOpen,
};

type Props = {
  icon?: keyof typeof iconMap;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
};

export default function EmptyState({
  icon = "package",
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: Props) {
  const Icon = iconMap[icon] ?? PackageOpen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center py-20 px-6"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
        <Icon size={28} className="text-primary" />
      </div>
      <h3 className="font-display text-xl text-ink-rich mb-2">{title}</h3>
      <p className="text-sm text-ink-muted max-w-sm mb-6 leading-relaxed">{description}</p>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
        >
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && !actionHref && (
        <button
          onClick={onAction}
          className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}