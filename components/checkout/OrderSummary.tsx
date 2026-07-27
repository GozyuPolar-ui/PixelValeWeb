"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, ShieldCheck, Download, ScrollText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OrderSummary() {
  const [promo, setPromo] = useState("");

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
            <Image
              src="https://images.unsplash.com/photo-1500534623283-312aade485b7?w=200&h=200&fit=crop"
              alt="Pixelvale: Origins"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h4 className="font-bold text-ink-rich">Pixelvale: Origins</h4>
            <span className="text-xs text-secondary bg-secondary-fixed px-2 py-0.5 rounded inline-block w-max mt-1">
              PC/Mac
            </span>
            <p className="text-xs text-ink-muted mt-1 italic">Digital Edition</p>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-outline-variant">
          <div className="flex justify-between">
            <span className="text-ink-muted">Subtotal</span>
            <span className="font-bold">$24.99</span>
          </div>
          <div className="flex justify-between text-tertiary">
            <span>Indie Support Discount</span>
            <span className="font-bold">-$5.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-muted">Estimated Tax</span>
            <span className="font-bold">$1.60</span>
          </div>
          <div className="flex justify-between pt-4 border-t-2 border-primary mt-2">
            <span className="text-xl font-display text-primary">Total</span>
            <span className="text-xl font-display text-primary">$21.59</span>
          </div>
        </div>

        <div className="pt-4">
          <label className="block text-xs text-ink-muted mb-2">Promo Code</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="PIXEL-2024"
              className="flex-grow bg-surface-container-low rounded p-2 text-sm focus:ring-2 focus:ring-primary outline-none border border-outline-variant"
            />
            <button className="bg-outline text-white px-4 py-2 rounded text-xs font-bold hover:bg-ink-rich transition-colors">
              Apply
            </button>
          </div>
        </div>

        <div className="bg-moss-light p-4 rounded text-center text-secondary border border-secondary/20">
          <p className="text-xs">
            You are supporting <strong>2 indie developers</strong> with this purchase. Thank you!
          </p>
        </div>
      </motion.div>

      <Link
        href="/library"
        className="mt-6 flex items-center justify-center gap-1 text-ink-muted hover:text-primary transition-all text-xs underline underline-offset-4"
      >
        <ArrowLeft size={16} />
        Back to Cart
      </Link>
    </aside>
  );
}