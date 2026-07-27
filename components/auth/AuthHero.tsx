"use client";

import { motion } from "framer-motion";
import { Mountain } from "lucide-react";
import Image from "next/image";

export default function AuthHero() {
  return (
    <div className="hidden md:flex md:w-1/2 relative overflow-hidden group">
      <Image
        src="https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1000&h=1200&fit=crop"
        alt="Pixelvale valley"
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-rich/60 via-transparent to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-16 left-16 right-16"
      >
        <p className="text-3xl font-display text-white mb-2 leading-tight">
          Your adventure in the Vale awaits
        </p>
        <div className="flex items-center gap-2 text-white/80">
          <Mountain size={20} className="fill-white/20" />
          <span>Join 10,000+ explorers today</span>
        </div>
      </motion.div>
    </div>
  );
}