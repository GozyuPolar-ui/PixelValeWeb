"use client";

import { motion } from "framer-motion";
import { MonitorDown, CloudDownload, PlayCircle } from "lucide-react";

const steps = [
  { icon: MonitorDown, title: "1. Install the Launcher", desc: "Our dedicated hub for all your indie discoveries." },
  { icon: CloudDownload, title: "2. Download your game", desc: "Automatic updates keep your journey running smooth." },
  { icon: PlayCircle, title: "3. Start playing", desc: "Jump into the world of Pixelvale immediately." },
];

export default function NextSteps() {
  return (
    <section className="max-w-4xl mx-auto mb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-full bg-paper-dark border-2 border-outline-variant flex items-center justify-center mb-4">
              <step.icon size={22} className="text-secondary" />
            </div>
            <h3 className="font-display text-base mb-2">{step.title}</h3>
            <p className="text-xs text-ink-muted">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}