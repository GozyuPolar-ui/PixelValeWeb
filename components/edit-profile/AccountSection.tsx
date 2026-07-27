"use client";

import { motion } from "framer-motion";
import { UserCog, CheckCircle2 } from "lucide-react";

export default function AccountSection({ email }: { email: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-xl border border-outline-variant"
    >
      <div className="flex items-center gap-2 mb-8">
        <UserCog size={22} className="text-primary" />
        <h2 className="text-xl font-display text-ink-rich">Account</h2>
      </div>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <label className="block text-xs font-bold text-ink-muted mb-1">Email Address</label>
            <p className="text-ink-rich">{email}</p>
          </div>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-moss-light text-secondary rounded-full text-xs font-bold w-fit">
            <CheckCircle2 size={14} /> Verified
          </span>
        </div>
        <div className="pt-4 border-t border-surface-container-highest flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-ink-rich">Password</p>
            <p className="text-xs text-ink-muted">Last changed 3 months ago</p>
          </div>
          <button className="py-2.5 px-6 rounded-lg border-2 border-secondary text-secondary text-xs font-bold hover:bg-secondary hover:text-white transition-all">
            Change Password
          </button>
        </div>
      </div>
    </motion.section>
  );
}