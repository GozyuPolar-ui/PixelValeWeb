"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Lock } from "lucide-react";
import { PayPalIcon, GooglePayIcon } from "@/components/auth/BrandIcons";

const methods = [
  { id: "card", label: "Credit Card", type: "lucide" as const, icon: CreditCard },
  { id: "paypal", label: "PayPal", type: "svg" as const, icon: PayPalIcon },
  { id: "gpay", label: "Google Pay", type: "svg" as const, icon: GooglePayIcon },
];
export default function PaymentMethodSection() {
  const [selected, setSelected] = useState("card");

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-display text-sm">
          2
        </span>
        <h2 className="text-xl font-display">Payment Method</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
{methods.map((method) => (
  <label
    key={method.id}
    className={`relative bg-paper-dark p-4 rounded-lg cursor-pointer flex flex-col items-center gap-2 transition-all hover:bg-surface-container-high ${
      selected === method.id ? "border-2 border-primary" : "border border-outline-variant"
    }`}
  >
    <input
      type="radio"
      name="payment_method"
      checked={selected === method.id}
      onChange={() => setSelected(method.id)}
      className="absolute top-2 right-2 accent-primary"
    />
    {method.type === "lucide" ? (
      <method.icon
        size={26}
        className={selected === method.id ? "text-primary" : "text-ink-muted opacity-60"}
      />
    ) : (
      <div className={selected !== method.id ? "opacity-50 grayscale" : ""}>
        <method.icon size={26} />
      </div>
    )}
    <span className="text-xs font-bold">{method.label}</span>
  </label>
))}
      </div>

      {selected === "card" && (
        <div className="bg-paper-dark p-8 rounded-lg border border-outline-variant space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold mb-2">Card Number</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3.5 text-ink-muted" />
                <input
                  type="text"
                  placeholder="XXXX XXXX XXXX XXXX"
                  className="w-full bg-surface-container-low rounded p-3 pl-10 focus:ring-2 focus:ring-primary outline-none border border-outline-variant"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold mb-2">Cardholder Name</label>
              <input
                type="text"
                placeholder="Jane Adventurer"
                className="w-full bg-surface-container-low rounded p-3 focus:ring-2 focus:ring-primary outline-none border border-outline-variant"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-2">Expiry Date</label>
              <input
                type="text"
                placeholder="MM / YY"
                className="w-full bg-surface-container-low rounded p-3 focus:ring-2 focus:ring-primary outline-none border border-outline-variant"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-2">CVV</label>
              <input
                type="password"
                placeholder="***"
                className="w-full bg-surface-container-low rounded p-3 focus:ring-2 focus:ring-primary outline-none border border-outline-variant"
              />
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
}