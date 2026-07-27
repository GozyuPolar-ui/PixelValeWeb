"use client";

import { motion } from "framer-motion";
import { Snowflake, ArrowRight } from "lucide-react";

export default function PromoCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      whileHover={{ y: -2 }}
      className="bg-primary text-white rounded-lg p-6 relative overflow-hidden group cursor-pointer"
    >
      <div className="relative z-10">
        <h4 className="font-bold text-lg mb-2">Winter Sale</h4>
        <p className="text-sm opacity-90 mb-4">Discover cozy titles at 50% off this week.</p>
        <span className="inline-flex items-center gap-2 font-bold group-hover:gap-3 transition-all text-sm">
          Shop Now <ArrowRight size={16} />
        </span>
      </div>
      <Snowflake
        size={120}
        className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700"
      />
    </motion.div>
  );
}