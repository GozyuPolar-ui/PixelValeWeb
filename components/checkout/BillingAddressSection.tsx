"use client";

import { motion } from "framer-motion";

export default function BillingAddressSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-8 rounded-full bg-paper-dark border border-outline flex items-center justify-center font-display text-primary text-sm">
          3
        </span>
        <h2 className="text-xl font-display">Billing Address</h2>
      </div>
      <div className="bg-paper-dark p-8 rounded-lg border border-outline-variant grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-full">
          <label className="block text-xs font-bold mb-2">Country</label>
          <select className="w-full bg-surface-container-low rounded p-3 focus:ring-2 focus:ring-primary outline-none border border-outline-variant">
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
            <option>European Union</option>
            <option>Japan</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold mb-2">City</label>
          <input
            type="text"
            placeholder="Silverton"
            className="w-full bg-surface-container-low rounded p-3 focus:ring-2 focus:ring-primary outline-none border border-outline-variant"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold mb-2">Postal Code</label>
          <input
            type="text"
            placeholder="12345"
            className="w-full bg-surface-container-low rounded p-3 focus:ring-2 focus:ring-primary outline-none border border-outline-variant"
          />
        </div>
      </div>
    </motion.section>
  );
}