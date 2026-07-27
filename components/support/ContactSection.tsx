"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare } from "lucide-react";

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
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ y: -2 }}
            className="bg-primary text-white px-10 py-4 rounded-lg font-bold flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-lg"
          >
            <Mail size={20} />
            Contact Support
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ y: -2 }}
            className="bg-secondary text-white px-10 py-4 rounded-lg font-bold flex items-center justify-center gap-3 hover:bg-secondary/90 transition-all shadow-lg"
          >
            <MessageSquare size={20} />
            Join Discord
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}