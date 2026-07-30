"use client";

import { motion } from "framer-motion";
import { Gamepad2, Heart } from "lucide-react";
import Image from "next/image";

export default function DeveloperHero() {
  return (
    <section className="relative pt-16 pb-16 px-6 md:px-16 max-w-container-max mx-auto overflow-hidden">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-secondary-fixed text-secondary mb-6">
            <Gamepad2 size={16} />
            <span className="text-xs font-bold tracking-wide">DEV PARTNERSHIP</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display text-ink-rich mb-6 leading-tight">
            Bring Your Game <br /> to the <span className="text-primary">Vale</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-xl mb-10">
            A warm invitation for indie developers to join a cozy, supportive community.
            We prioritize discovery, craft, and the humans behind the pixels.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="#apply"
              className="bg-primary text-white font-bold px-8 py-4 rounded-lg hover:brightness-110 transition-all flex items-center gap-2"
            >
              Start Application
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <div className="aspect-square bg-paper-dark border-2 border-outline-variant rounded-2xl overflow-hidden shadow-pixel relative">
                <Image
              src="/devimg.jpg"
              alt="Cozy developer desk"
              fill
              className="object-cover opacity-90"
            />
            <div className="absolute bottom-6 right-6 bg-surface px-6 py-4 rounded-xl border-2 border-outline-variant shadow-pixel">
              <Gamepad2 size={36} className="text-primary" />
            </div>
          </div>
          <Heart size={56} className="absolute -top-4 -left-4 text-primary opacity-30 fill-primary/20" />
        </motion.div>
      </div>
    </section>
  );
}