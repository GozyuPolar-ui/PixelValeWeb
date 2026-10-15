"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  OPEN_SETTINGS_EVENT,
  readConsent,
  saveConsent,
} from "@/lib/cookie-consent";

type Choice = { preferences: boolean; analytics: boolean };

const btnOutline =
  "rounded-lg border-2 border-surface-variant px-4 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-variant hover:text-ink-rich";
const btnPrimary =
  "rounded-lg border-2 border-primary bg-primary px-4 py-2 text-sm font-medium text-on-primary transition-opacity hover:opacity-90";

function Toggle({
  checked,
  onChange,
  disabled = false,
  label,
}: {
  checked: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? "bg-primary" : "bg-surface-variant"
      } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [choice, setChoice] = useState<Choice>({
    preferences: false,
    analytics: false,
  });

  // Cek consent yang sudah tersimpan saat pertama load
  useEffect(() => {
    const saved = readConsent();
    if (saved) {
      setChoice({ preferences: saved.preferences, analytics: saved.analytics });
    } else {
      setShowBanner(true);
    }
  }, []);

  // Buka pengaturan dari tombol "Cookie settings" (footer)
  useEffect(() => {
    const open = () => {
      const saved = readConsent();
      if (saved) {
        setChoice({
          preferences: saved.preferences,
          analytics: saved.analytics,
        });
      }
      setShowSettings(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  // Tutup modal dengan tombol Escape
  useEffect(() => {
    if (!showSettings) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowSettings(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showSettings]);

  const commit = (value: Choice) => {
    saveConsent(value);
    setChoice(value);
    setShowBanner(false);
    setShowSettings(false);
  };

  return (
    <>
      {/* Banner */}
      <AnimatePresence>
        {showBanner && !showSettings && (
          <motion.div
            role="region"
            aria-label="Cookie notice"
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 48, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-xl border-2 border-surface-variant bg-surface-container-low p-5 shadow-2xl"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1">
                <h2 className="font-display text-base text-ink-rich">
                  We use cookies 🍪
                </h2>
                <p className="mt-1 text-xs text-on-surface-variant">
                  Pixelvale uses essential cookies to keep you signed in. With
                  your permission, we also use optional cookies to remember
                  your preferences and understand how the site is used.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:flex-nowrap">
                <button
                  type="button"
                  onClick={() => setShowSettings(true)}
                  className={btnOutline}
                >
                  Customize
                </button>
                <button
                  type="button"
                  onClick={() => commit({ preferences: false, analytics: false })}
                  className={btnOutline}
                >
                  Reject optional
                </button>
                <button
                  type="button"
                  onClick={() => commit({ preferences: true, analytics: true })}
                  className={btnPrimary}
                >
                  Accept all
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal pengaturan */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-settings-title"
              initial={{ scale: 0.95, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-xl border-2 border-surface-variant bg-surface-container-low p-6 shadow-2xl"
            >
              <h2
                id="cookie-settings-title"
                className="font-display text-lg text-ink-rich"
              >
                Cookie settings
              </h2>
              <p className="mt-1 text-xs text-on-surface-variant">
                Choose which cookies you allow. You can change this anytime.
              </p>

              <div className="mt-5 space-y-3">
                <div className="flex items-start justify-between gap-4 rounded-lg border border-surface-variant p-4">
                  <div>
                    <p className="font-display text-sm text-ink-rich">Essential</p>
                    <p className="mt-1 text-xs text-on-surface-variant">
                      Required for login and your session. Always on.
                    </p>
                  </div>
                  <Toggle checked disabled label="Essential cookies" />
                </div>

                <div className="flex items-start justify-between gap-4 rounded-lg border border-surface-variant p-4">
                  <div>
                    <p className="font-display text-sm text-ink-rich">Preferences</p>
                    <p className="mt-1 text-xs text-on-surface-variant">
                      Remember choices such as theme or language.
                    </p>
                  </div>
                  <Toggle
                    checked={choice.preferences}
                    onChange={(v) => setChoice((c) => ({ ...c, preferences: v }))}
                    label="Preference cookies"
                  />
                </div>

                <div className="flex items-start justify-between gap-4 rounded-lg border border-surface-variant p-4">
                  <div>
                    <p className="font-display text-sm text-ink-rich">Analytics</p>
                    <p className="mt-1 text-xs text-on-surface-variant">
                      Help us understand how the site is used so we can improve
                      it.
                    </p>
                  </div>
                  <Toggle
                    checked={choice.analytics}
                    onChange={(v) => setChoice((c) => ({ ...c, analytics: v }))}
                    label="Analytics cookies"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap justify-end gap-2">
                <button
                  type="button"
                  onClick={() => commit({ preferences: false, analytics: false })}
                  className={btnOutline}
                >
                  Reject optional
                </button>
                <button
                  type="button"
                  onClick={() => commit(choice)}
                  className={btnOutline}
                >
                  Save choices
                </button>
                <button
                  type="button"
                  onClick={() => commit({ preferences: true, analytics: true })}
                  className={btnPrimary}
                >
                  Accept all
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}