import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mountain } from "lucide-react";
import Image from "next/image";

// Replace these with your own images once ready (place in /public and use "/filename.jpg")
const images = [
  "/lp1.jpg",
  "/lp2.jpg",
  "/lp3.jpg",
  "/lp4.jpg",
  "/lp5.jpg",
  "/lp6.jpg",
].filter((url) => !url.includes("verything")); // safety filter, ignore

const SLIDE_DURATION = 6000;

const particles = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: 2 + Math.random() * 4,
  duration: 7 + Math.random() * 9,
  delay: Math.random() * 6,
  drift: (Math.random() - 0.5) * 60,
}));

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
    <div className="hidden md:flex md:w-1/2 relative overflow-hidden group bg-ink-rich">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          animate={{
            opacity: 1,
            scale: 1.18,
            filter: "blur(0px)",
          }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{
            opacity: { duration: 1.8, ease: "easeInOut" },
            filter: { duration: 1.8, ease: "easeInOut" },
            scale: { duration: SLIDE_DURATION / 1000 + 1.8, ease: "linear" },
          }}
        >
          <Image
            src={images[index]}
            alt="Pixelvale valley"
            fill
            className="object-cover"
            priority={index === 0}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-ink-rich/70 via-ink-rich/10 to-transparent pointer-events-none" />

      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-white/80 blur-[0.5px] pointer-events-none"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            bottom: "5%",
          }}
          animate={{
            y: [0, -300, -650, -900],
            x: [0, p.drift * 0.5, p.drift, p.drift * 1.3],
            opacity: [0, 0.9, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-16 left-16 right-16 z-10"
      >
        <p className="text-3xl font-display text-white mb-2 leading-tight drop-shadow-lg">
          Your adventure in the Vale awaits
        </p>
        <div className="flex items-center gap-2 text-white/90 drop-shadow">
          <Mountain size={20} className="fill-white/30" />
          <span>Join 10,000+ explorers today</span>
        </div>
      </motion.div>
    </div>
  );
}