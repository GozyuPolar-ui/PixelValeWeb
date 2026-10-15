"use client";

import { OPEN_SETTINGS_EVENT } from "@/lib/cookie-consent";

export default function CookieSettingsButton({
  className = "text-xs text-on-surface-variant hover:text-primary transition-colors",
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