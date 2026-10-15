"use client";

import { OPEN_SETTINGS_EVENT } from "@/lib/cookie-consent";

export default function CookieSettingsButton({
  className = "text-sm text-zinc-400 hover:text-white transition",
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
      className={className}
    >
      Cookie settings
    </button>
  );
}