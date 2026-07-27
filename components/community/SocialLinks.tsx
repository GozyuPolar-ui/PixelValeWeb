"use client";

import { motion } from "framer-motion";
import { DiscordIcon, TwitterXIcon, YouTubeIcon } from "@/components/auth/BrandIcons";

const links = [
  { label: "Discord", icon: DiscordIcon, color: "bg-indigo-600 hover:bg-indigo-700" },
  { label: "Twitter", icon: TwitterXIcon, color: "bg-black hover:bg-gray-800" },
  { label: "YouTube", icon: YouTubeIcon, color: "bg-red-600 hover:bg-red-700" },
];

export default function SocialLinks() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="bg-paper-dark p-6 rounded-xl shadow-pixel"
    >
      <h2 className="text-lg font-display text-ink-rich mb-6">Join the Outpost</h2>
      <div className="grid grid-cols-1 gap-3">
        {links.map((link) => (
          <motion.button
            key={link.label}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center justify-center gap-3 text-white py-3 rounded-lg transition-colors font-bold ${link.color}`}
          >
            <link.icon size={18} />
            {link.label}
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}