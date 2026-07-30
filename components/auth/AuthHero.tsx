"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const images = [
  "/lp1.jpg",
  "/lp2.jpg",
  "/lp3.jpg",
  "/lp4.jpg",
  "/lp5.jpg",
  "/lp6.jpg",
];

const SLIDE_DURATION = 7000;

export default function AuthHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => {
        if (images.length <= 1) return prev;
        let next = Math.floor(Math.random() * images.length);
        while (next === prev) next = Math.floor(Math.random() * images.length);
        return next;
      });
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-ink-rich">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.15 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.6, ease: "easeInOut" },
            scale: { duration: SLIDE_DURATION / 1000 + 1.6, ease: "linear" },
          }}
        >
          <Image
            src={images[index]}
            alt="Pixelvale valley"
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark + blur overlay biar form tetap kebaca */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
    </div>
  );
}