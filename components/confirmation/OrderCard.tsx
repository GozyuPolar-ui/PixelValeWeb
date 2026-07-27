"use client";

import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { confirmationOrder } from "@/lib/data";

export default function OrderCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="max-w-[500px] mx-auto bg-surface-container-low border border-surface-container-highest rounded-xl overflow-hidden mb-16"
    >
      <div className="aspect-video w-full relative">
        <Image
          src={confirmationOrder.image}
          alt={confirmationOrder.gameTitle}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-4 left-4">
          <span className="bg-ink-rich/80 backdrop-blur-sm text-white px-3 py-1 rounded text-xs uppercase font-bold">
            {confirmationOrder.platform}
          </span>
        </div>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-display text-ink-rich">{confirmationOrder.gameTitle}</h2>
            <p className="text-xs text-ink-muted">
              Order #{confirmationOrder.orderNumber} • {confirmationOrder.date}
            </p>
          </div>
          <span className="text-xl font-display text-primary">{confirmationOrder.price}</span>
        </div>

        <div className="flex flex-col gap-3 mb-8">
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <Download size={20} />
            Download Now
          </motion.button>
          <Link href="/library">
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 border-2 border-secondary text-secondary rounded-lg font-bold hover:bg-moss-light transition-colors"
            >
              Go to Library
            </motion.button>
          </Link>
        </div>

        <div className="bg-surface-container p-4 rounded-lg flex gap-3 items-start">
          <Mail size={20} className="text-ink-muted shrink-0" />
          <p className="text-xs text-ink-muted leading-relaxed">
            A confirmation email with your receipt has been sent to your
            registered address.
          </p>
        </div>
      </div>
    </motion.div>
  );
}