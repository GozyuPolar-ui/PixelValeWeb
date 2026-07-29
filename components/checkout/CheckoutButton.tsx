"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, ShieldCheck, Download, ScrollText, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    snap: any;
  }
}

export default function CheckoutButton({ gameId }: { gameId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCheckout = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Gagal memulai pembayaran.");
        setLoading(false);
        return;
      }

      window.snap.pay(data.token, {
        onSuccess: () => {
          router.push(`/checkout/confirmation?order_id=${data.orderId}`);
        },
        onPending: () => {
          router.push(`/checkout/confirmation?order_id=${data.orderId}`);
        },
        onError: () => {
          setError("Pembayaran gagal. Coba lagi.");
          setLoading(false);
        },
        onClose: () => {
          setLoading(false);
        },
      });
    } catch (err) {
      setError("Terjadi kesalahan. Coba lagi.");
      setLoading(false);
    }
  };

  return (
    <div className="pt-6 border-t-4 border-surface-container-highest">
      <motion.button
        onClick={handleCheckout}
        disabled={loading}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-primary text-white font-display text-lg py-6 hover:bg-primary/90 transition-all flex items-center justify-center gap-3 rounded-lg disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 size={22} className="animate-spin" /> Processing...
          </>
        ) : (
          <>
            <ShoppingBag size={22} /> Complete Purchase
          </>
        )}
      </motion.button>

      {error && <p className="text-red-600 text-sm text-center mt-4">{error}</p>}

      <div className="mt-8 flex flex-wrap justify-center gap-8 text-ink-muted">
        <div className="flex items-center gap-2">
          <ShieldCheck size={20} className="text-secondary" />
          <span className="text-xs">Secure Payment</span>
        </div>
        <div className="flex items-center gap-2">
          <Download size={20} className="text-secondary" />
          <span className="text-xs">Instant Digital Delivery</span>
        </div>
        <div className="flex items-center gap-2">
          <ScrollText size={20} className="text-secondary" />
          <span className="text-xs">DRM-Free Content</span>
        </div>
      </div>
    </div>
  );
}