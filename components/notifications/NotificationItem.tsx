"use client";

import { motion } from "framer-motion";
import { UserPlus, UserCheck } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useState } from "react";

type Props = {
  id: string;
  type: string;
  actorUsername: string;
  isRead: boolean;
  createdAt: string;
};

export default function NotificationItem({ id, type, actorUsername, isRead, createdAt }: Props) {
  const [read, setRead] = useState(isRead);
  const supabase = createClient();

  const handleClick = async () => {
    if (!read) {
      await supabase.from("notifications").update({ is_read: true }).eq("id", id);
      setRead(true);
    }
  };

  const icon = type === "friend_request" ? UserPlus : UserCheck;
  const Icon = icon;
  const text =
    type === "friend_request"
      ? `${actorUsername} mengirim permintaan pertemanan`
      : `${actorUsername} menerima permintaan pertemanan kamu`;

  return (
    <motion.div
      onClick={handleClick}
      whileHover={{ x: 2 }}
      className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-colors ${
        read ? "bg-transparent" : "bg-primary/5"
      } hover:bg-surface-container-low`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
        read ? "bg-surface-container-highest text-ink-muted" : "bg-primary/10 text-primary"
      }`}>
        <Icon size={18} />
      </div>
      <div className="flex-1">
        <p className={`text-sm ${read ? "text-ink-muted" : "text-ink-rich font-medium"}`}>{text}</p>
        <p className="text-xs text-ink-muted mt-1">
          {new Date(createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
      {!read && <div className="w-2 h-2 rounded-full bg-primary shrink-0" />}
    </motion.div>
  );
}