"use client";

import { motion } from "framer-motion";
import { PenLine, Scale, Users } from "lucide-react";

const reasons = [
  {
    icon: PenLine,
    title: "Simple Submission",
    desc: "Easy application process designed by developers, for developers. No bureaucratic hurdles.",
    bg: "bg-moss-light",
    color: "text-secondary",
  },
  {
    icon: Scale,
    title: "Fair & Transparent",
    desc: "Direct communication, no hidden fees, and a developer-first approach you'll love.",
    bg: "bg-primary-fixed",
    color: "text-primary",
  },
  {
    icon: Users,
    title: "Grow With Us",
    desc: "A growing community of cozy game lovers waiting to discover their next favorite obsession.",
    bg: "bg-secondary-fixed",
    color: "text-secondary",
  },
];

export default function WhyJoinSection() {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="px-6 md:px-16 max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-display text-ink-rich mb-4">Why Join Pixelvale</h2>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface p-8 rounded-xl border border-outline-variant flex flex-col gap-4 hover:border-primary transition-colors"
            >
              <div className={`w-14 h-14 ${r.bg} rounded-lg flex items-center justify-center ${r.color}`}>
                <r.icon size={26} />
              </div>
              <h3 className="text-lg font-display text-ink-rich">{r.title}</h3>
              <p className="text-sm text-on-surface-variant">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}