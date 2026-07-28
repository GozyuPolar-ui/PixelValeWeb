"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { formatIDR } from "@/lib/format";

type Props = {
  title: string;
  image: string;
  price: number;
};

export default function OrderSummary({ title, image, price }: Props) {
  return (
    <aside className="lg:col-span-4 lg:sticky lg:top-24">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-paper-dark shadow-pixel p-6 space-y-6"
      >
        <h3 className="text-xl font-display border-b-2 border-surface-container-highest pb-4">
          Order Summary
        </h3>

        <div className="flex gap-4">
          <div className="relative w-24 h-24 shrink-0 bg-surface-container-highest rounded overflow-hidden border border-outline-variant">
            {image && <Image src={image} alt={title} fill className="object-cover" />}
          </div>
          <div className="flex flex-col justify-center">
            <h4 className="font-bold text-ink-rich">{title}</h4>
            <p className="text-xs text-ink-muted mt-1 italic">Digital Edition</p>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-outline-variant">
          <div className="flex justify-between pt-2 border-t-2 border-primary mt-2">
            <span className="text-xl font-display text-primary">Total</span>
            <span className="text-xl font-display text-primary">{formatIDR(price)}</span>
          </div>
        </div>
      </motion.div>
    </aside>
  );
}