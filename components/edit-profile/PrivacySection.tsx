"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";

type Props = {
  showPublicProfile: boolean;
  showLibrary: boolean;
  showOnlineStatus: boolean;
  onChange: (field: string, value: boolean) => void;
};

export default function PrivacySection({ showPublicProfile, showLibrary, showOnlineStatus, onChange }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-xl border border-outline-variant"
    >
      <div className="flex items-center gap-2 mb-8">
        <Lock size={22} className="text-primary" />
        <h2 className="text-xl font-display text-ink-rich">Privacy</h2>
      </div>
      <div className="space-y-6">
        <ToggleSwitch
          label="Public Profile"
          description="Allow anyone to view your bio and activity."
          checked={showPublicProfile}
          onChange={(val) => onChange("show_public_profile", val)}
        />
        <ToggleSwitch
          label="Library Visibility"
          description="Friends can see which games you own and play."
          checked={showLibrary}
          onChange={(val) => onChange("show_library", val)}
        />
        <ToggleSwitch
          label="Show Online Status"
          description="Broadcast when you are actively in-game."
          checked={showOnlineStatus}
          onChange={(val) => onChange("show_online_status", val)}
        />
      </div>
    </motion.section>
  );
}