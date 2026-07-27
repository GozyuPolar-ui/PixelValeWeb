"use client";

import { motion } from "framer-motion";
import { MessageSquarePlus } from "lucide-react";

export default function CommunityHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-display text-ink-rich mb-2"
        >
          Community
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-ink-muted"
        >
          Connect with fellow travelers of the Vale
        </motion.p>
      </div>
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ y: -2 }}
        className="bg-primary text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-pixel hover:shadow-pixel-hover"
      >
        <MessageSquarePlus size={20} />
        New Discussion
      </motion.button>
    </div>
  );
}