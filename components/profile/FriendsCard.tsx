"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import Image from "next/image";
import { profileFriends } from "@/lib/data";

export default function FriendsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-paper-dark border border-outline-variant rounded-lg p-6"
    >
      <h3 className="font-bold mb-6 flex items-center gap-2 text-lg">
        <Users size={20} className="text-secondary" /> Friends
      </h3>
      <div className="space-y-4">
        {profileFriends.map((friend) => (
          <div key={friend.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-outline-variant">
                <Image src={friend.avatar} alt={friend.name} fill className="object-cover" />
              </div>
              <span className={`font-semibold ${friend.online ? "text-ink-rich" : "text-ink-muted"}`}>
                {friend.name}
              </span>
            </div>
            <div className={`w-2 h-2 rounded-full ${friend.online ? "bg-secondary" : "bg-ink-muted"}`} />
          </div>
        ))}
      </div>
      <button className="w-full mt-6 py-2 text-xs text-secondary font-bold uppercase tracking-widest hover:bg-moss-light transition-colors rounded">
        View All Friends
      </button>
    </motion.div>
  );
}