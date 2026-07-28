"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import Link from "next/link";

export default function ContactSection() {
  return (
    <section className="mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-paper-dark p-12 text-center rounded-lg border-2 border-primary shadow-pixel"
      >
        <h2 className="text-3xl font-display mb-4 text-ink-rich">Still stuck?</h2>
        <p className="max-w-xl mx-auto mb-10 text-on-surface-variant">
          Our small team is here to help you get back to your games as
          quickly as possible. Choose a channel below.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <Link href="/support/contact">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ y: -2 }}
              className="w-full bg-primary text-white px-10 py-4 rounded-lg font-bold flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-lg"
            >
              <Mail size={20} />
              Contact Support
            </motion.button>
          </Link>
          <a href="https://discord.gg/QG8yNNrKm" target="_blank" rel="noopener noreferrer">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ y: -2 }}
              className="w-full bg-secondary text-white px-10 py-4 rounded-lg font-bold flex items-center justify-center gap-3 hover:bg-secondary/90 transition-all shadow-lg"
            >
              <FaDiscord size={20} />
              Join Discord
            </motion.button>
          </a>
        </div>
      </motion.div>
    </section>
  );
}