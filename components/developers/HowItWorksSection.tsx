"use client";

import { motion } from "framer-motion";

const steps = [
  { title: "Submit Your Application", desc: "Tell us about your team and the vision for your game." },
  { title: "We Review Your Game", desc: "Our curation team plays your build and checks the fit." },
  { title: "Go Live on the Store", desc: "Launch with a dedicated feature on our homepage." },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-surface">
      <div className="px-6 md:px-16 max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-display text-ink-rich mb-4">How It Works</h2>
        </div>
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-4">
          <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 border-t-2 border-dashed border-outline-variant z-0" />
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative z-10 flex-1 text-center bg-surface px-4"
            >
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-display border-4 border-surface">
                {i + 1}
              </div>
              <h4 className="font-display text-ink-rich mb-2">{step.title}</h4>
              <p className="text-sm text-on-surface-variant">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}