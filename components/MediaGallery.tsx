"use client";

import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import { gameDetail } from "@/lib/data";

export default function MediaGallery() {
  return (
    <div className="max-w-container-max mx-auto px-6 md:px-16 mt-16">
      <h3 className="text-xl font-display mb-6 border-b-4 border-surface-variant inline-block pb-1">
        Media Gallery
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {gameDetail.gallery.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative min-w-[320px] aspect-video rounded-lg border-2 border-outline-variant overflow-hidden group cursor-pointer shrink-0"
          >
            <Image src={item.image} alt="Gallery" fill className="object-cover" />
            {item.type === "video" && (
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                <PlayCircle size={56} className="text-white drop-shadow-lg fill-white/20" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}