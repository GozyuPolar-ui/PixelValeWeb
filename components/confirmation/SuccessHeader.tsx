"use client";

import { motion } from "framer-motion";
import { CheckCircle2, PackageOpen } from "lucide-react";

export default function SuccessHeader({ status }: { status: string }) {
  const isPaid = status === "paid";

  return (
    <>
      <div className="flex items-center justify-center gap-4 mb-16 max-w-lg mx-auto">
        <div className="flex items-center gap-2 text-secondary">
          <CheckCircle2 size={22} className="fill-secondary/20" />
          <span className="text-xs uppercase tracking-wider font-bold">Cart</span>
        </div>
        <div className="flex-grow h-0.5 bg-outline-variant opacity-40" />
        <div className="flex items-center gap-2 text-secondary">
          <CheckCircle2 size={22} className="fill-secondary/20" />
          <span className="text-xs uppercase tracking-wider font-bold">Payment</span>
        </div>
        <div className="flex-grow h-0.5 bg-outline-variant opacity-40" />
        <div className="flex items-center gap-2 text-primary">
          <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center font-bold text-[10px]">
            3
          </div>
          <span className="text-xs uppercase tracking-wider font-bold">Success</span>
        </div>
      </div>

      <section className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "backOut" }}
          className="mb-6 flex justify-center"
        >
          <div className="w-24 h-24 bg-moss-light rounded-xl flex items-center justify-center border-2 border-secondary relative">
            <PackageOpen size={40} className="text-secondary" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rotate-45" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-primary rotate-45" />
          </div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-display text-ink-rich mb-4"
        >
          {isPaid ? "Thank you for your purchase!" : "Payment is being processed"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-ink-muted"
        >
          {isPaid
            ? "Your adventure in Pixelvale begins now."
            : "We'll update your library as soon as the payment is confirmed."}
        </motion.p>
      </section>
    </>
  );
}