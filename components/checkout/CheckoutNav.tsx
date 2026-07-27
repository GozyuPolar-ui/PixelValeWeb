"use client";

import { motion } from "framer-motion";
import { Lock, ChevronRight } from "lucide-react";

export default function CheckoutNav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-surface border-b-4 border-surface-container-highest w-full sticky top-0 z-50"
    >
      <div className="flex justify-between items-center px-6 md:px-16 py-4 max-w-container-max mx-auto">
        <span className="text-2xl font-display font-bold text-primary">Pixelvale</span>

        <div className="hidden md:flex items-center gap-2 text-ink-muted text-xs">
          <span>Cart</span>
          <ChevronRight size={16} />
          <span className="text-primary font-bold border-b-2 border-primary pb-0.5">Payment</span>
          <ChevronRight size={16} />
          <span>Confirmation</span>
        </div>

        <div className="flex items-center gap-2 text-primary font-display">
          <Lock size={20} className="fill-primary/20" />
          <span className="hidden sm:inline text-sm">Secure Checkout</span>
        </div>
      </div>
    </motion.nav>
  );
}