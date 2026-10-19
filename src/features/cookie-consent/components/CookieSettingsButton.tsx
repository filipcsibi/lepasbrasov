"use client";

import { CreastaButton } from "@/shared/ui/creasta";
import { OPEN_SETTINGS_EVENT } from "../lib/consent";

/** Re-opens the cookie preference centre (e.g. from the Cookies Policy page). */
export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <CreastaButton tint="#111" onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}>
      {label}
    </CreastaButton>
  );
}
