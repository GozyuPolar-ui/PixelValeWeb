"use client";

import { motion } from "framer-motion";
import { BellRing } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";

type Props = {
  notifyNewReleases: boolean;
  notifySales: boolean;
  notifyFriendActivity: boolean;
  onChange: (field: string, value: boolean) => void;
};

export default function NotificationsSection({
  notifyNewReleases,
  notifySales,
  notifyFriendActivity,
  onChange,
}: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-xl border border-outline-variant"
    >
      <div className="flex items-center gap-2 mb-8">
        <BellRing size={22} className="text-primary" />
        <h2 className="text-xl font-display text-ink-rich">Notifications</h2>
      </div>
      <div className="space-y-6">
        <ToggleSwitch
          label="New Releases"
          description="Email alerts for games on your wishlist."
          checked={notifyNewReleases}
          onChange={(val) => onChange("notify_new_releases", val)}
        />
        <ToggleSwitch
          label="Sales & Promotions"
          description="Don't miss out on seasonal pixel festivals."
          checked={notifySales}
          onChange={(val) => onChange("notify_sales", val)}
        />
        <ToggleSwitch
          label="Friend Activity"
          description="Notify when friends invite you to play."
          checked={notifyFriendActivity}
          onChange={(val) => onChange("notify_friend_activity", val)}
        />
      </div>
    </motion.section>
  );
}