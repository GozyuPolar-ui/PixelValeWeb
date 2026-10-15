export type ConsentCategory = "necessary" | "preferences" | "analytics";

export interface ConsentState {
  necessary: true; // selalu aktif (login/session Supabase)
  preferences: boolean;
  analytics: boolean;
  version: number;
  updatedAt: string;
}

export const CONSENT_COOKIE = "pv_cookie_consent";
export const CONSENT_VERSION = 1; // naikkan angka ini kalau kategori cookie berubah, banner muncul lagi
export const CONSENT_EVENT = "pv:cookie-consent-change";
export const OPEN_SETTINGS_EVENT = "pv:open-cookie-settings";

const MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 hari

export function readConsent(): ConsentState | null {
  if (typeof document === "undefined") return null;

  const row = document.cookie
    .split("; ")
    .find((r) => r.startsWith(`${CONSENT_COOKIE}=`));
  if (!row) return null;

  try {
    const raw = decodeURIComponent(row.slice(CONSENT_COOKIE.length + 1));
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(choice: {
  preferences: boolean;
  analytics: boolean;
}): ConsentState {
  const state: ConsentState = {
    necessary: true,
    preferences: choice.preferences,
    analytics: choice.analytics,
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
  };

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie =
    `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(state))}` +
    `; Path=/; Max-Age=${MAX_AGE_SECONDS}; SameSite=Lax${secure}`;

  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
  return state;
}

export function hasConsent(category: ConsentCategory): boolean {
  if (category === "necessary") return true;
  const state = readConsent();
  return state ? state[category] : false;
}