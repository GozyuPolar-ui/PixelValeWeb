"use client";

import { motion } from "framer-motion";
import { FaDiscord, FaYoutube, FaGithub } from "react-icons/fa";

const links = [
  {
    label: "Discord",
    href: "https://discord.gg/QG8yNNrKm",
    icon: FaDiscord,
    color: "bg-indigo-600 hover:bg-indigo-700",
  },
  {
    label: "YouTube",
    href: "http://www.youtube.com/@ZaiaUltra",
    icon: FaYoutube,
    color: "bg-red-600 hover:bg-red-700",
  },
  {
    label: "GitHub",
    href: "https://github.com/GozyuPolar-ui",
    icon: FaGithub,
    color: "bg-neutral-800 hover:bg-neutral-900",
  },
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
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.97 }}
            className={`flex items-center justify-center gap-3 text-white py-3 rounded-lg transition-colors font-bold ${link.color}`}
          >
            <link.icon size={18} />
            {link.label}
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}